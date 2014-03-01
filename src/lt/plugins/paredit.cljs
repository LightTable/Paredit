(ns lt.plugins.paredit
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.util.cljs :refer [str-contains?]]))

(def opposites {")" "("
                "(" ")"
                "{" "}"
                "}" "{"
                "[" "]"
                "]" "["})

(def dir-swap {:left :right
               :right :left})

(def form-start #"[\{\(\[]")
(def form-end #"[\}\)\]]")

(defn get-ch [ed loc]
  (get (editor/line ed (:line loc)) (:ch loc)))

(defn end-loc [ed]
  (let [last-line (editor/last-line ed)]
    {:line last-line
     :ch (max 0 (dec (editor/line-length ed last-line)))}))

(defn loc>loc [l1 l2]
  (cond
   (> (:line l1) (:line l2)) true
   (> (:line l2) (:line l1)) false
   (> (:ch l1) (:ch l2)) true
   :else false))

(defn move-loc-line [ed loc dir]
  (when loc
    (let [neue (update-in loc [:line] + (if (= dir :up)
                                          -1
                                          1))]
      (cond
       (< (:line neue) 0) nil
       (>= (:line neue) (editor/last-line ed)) nil
       :else (assoc neue :ch (if (= dir :up)
                               (max (dec (editor/line-length ed (:line neue))) 0)
                               0))))))

(defn move-loc [ed loc dir]
  (when loc
    (let [len (editor/line-length ed (:line loc))
          neue (editor/adjust-loc loc (if (= dir :left)
                                        -1
                                        1))]
      (cond
       (< (:ch neue) 0) (move-loc-line ed loc :up)
       (>= (:ch neue) len) (move-loc-line ed loc :down)
       :else neue))))

(defn within-range [[start end] cur]
  (>= end (:line cur) start))

(defn scan [{:keys [dir ed loc regex skip] :or {skip (fn [ed loc] false)} :as opts}]
  (let [search-range [(- (:line loc) 100) (+ (:line loc) 100)]]
    (loop [cur loc
           line (editor/line ed (:line loc))]
      (if (or (not cur)
              (not line)
              (not (within-range search-range cur)))
        nil
        (let [ch (get line (:ch cur))
              next-loc (move-loc ed cur dir)
              next-line (if (not= (:line cur) (:line next-loc))
                          (editor/line ed (:line next-loc))
                          line)]
          (if (and ch (re-seq regex ch) (not (skip ed cur)))
            [ch cur]
            (recur next-loc next-line)))))))

(defn string|comment? [ed cur allow-strings?]
  (let [type (editor/->token-type ed (editor/adjust-loc cur 1))]
    (when type
      (cond
       (str-contains? type "comment-form") false
       (str-contains? type "comment") true
       (str-contains? type "string") (when-not allow-strings?
                                       true)
       :else false))))

(defn comment? [ed cur]
  (let [type (editor/->token-type ed (editor/adjust-loc cur 1))]
    (and type
         (not (str-contains? type "comment-form"))
         (str-contains? type "comment"))))

(defn paired-scan [{:keys [dir ed loc for negation allow-end? allow-strings? only-for?] :as opts}]
  (let [[stack-chars stack-ends] (if (= dir :left)
                                   [form-end form-start]
                                   [form-start form-end])
        final-loc (end-loc ed)
        search-range [(- (:line loc) 100) (+ (:line loc) 100)]]
    (loop [cur loc
           line (editor/line ed (:line loc))
           stack []]
      (if (or (not cur)
              (not line)
              (not (within-range search-range cur)))
        nil
        (let [ch (get line (:ch cur))
              next-loc (move-loc ed cur dir)
              next-line (if (not= (:line cur) (:line next-loc))
                          (editor/line ed (:line next-loc))
                          line)
              valid? (not (string|comment? ed cur allow-strings?))
              stackable? (not (string|comment? ed cur nil))
              ]
          (cond
           (and allow-end?
                valid?
                (or (= final-loc cur)
                    (not= next-line line))) (if (= dir :right)
                                              [ch (editor/adjust-loc cur 1)]
                                              [ch {:line (:line cur) :ch -1}])

           (and ch
                (re-seq for ch)
                valid?
                (not (seq stack))
                (if negation
                  (negation line cur)
                  true)) [ch cur]

           (and ch
                (not only-for?)
                stackable?
                (re-seq stack-ends ch)
                (not= ch (-> stack last opposites))) nil

           :else (recur next-loc next-line (cond
                                            (and ch stackable? (re-seq stack-chars ch)) (conj stack ch)
                                            (and ch stackable? (= ch (-> stack last opposites))) (pop stack)
                                            :else stack))))))))

(defn form-boundary [ed loc regex]
  (let [[c start] (paired-scan {:dir :left
                                :ed ed
                                :only-for? regex
                                :loc (move-loc ed loc :left)
                                :for (or regex form-start)})
        [c end] (if-not c
                  [nil nil]
                  (paired-scan {:dir :right
                                :ed ed
                                :loc (move-loc ed start :right)
                                :for (re-pattern (str "[\\" (opposites c) "]"))}))]
    [start end]))

(defn escaped-paired-scan [ed loc thing dir]
  (let [[c end] (paired-scan {:dir dir
                              :ed ed
                              :allow-strings? true
                              :loc (move-loc ed loc dir)
                              :negation (fn [line loc]
                                          (not= (get line (editor/adjust-loc loc -1)) "\\"))
                              :for (re-pattern (str "[" thing "]"))})]
    (if (= dir :left)
      [end loc]
      [loc (editor/adjust-loc end 1)])))

(defn string-bounds [ed loc dir]
  (escaped-paired-scan ed loc "\"" dir))

(defn token-bounds [ed loc dir]
  (let [[c end] (paired-scan {:dir dir
                              :ed ed
                              :allow-end? true
                              :loc (editor/adjust-loc loc (if (= dir :left) -1 1))
                              :for #"[\s\)\}\]\"\(\{\[]"})]
    (if (= dir :left)
      [(editor/adjust-loc end 1) loc]
      [loc end])))

(defn first-non-whitespace [opts]
  (scan (assoc opts :regex #"\S")))

(defn anchored-move [ed loc anchor-side dir]
  (let [[start end] (form-boundary ed loc nil)
        ends (if (= dir :left)
               form-start
               form-end)
        point (if (= :left anchor-side)
                start
                end)
        [cur i] (first-non-whitespace {:ed ed
                                       :loc (move-loc ed point dir)
                                       :dir dir})
        next (when cur
               (cond
                (re-seq ends cur) nil
                ;; handle begin form
                (opposites cur) (let [right? (= dir :right)
                                      bounds (form-boundary ed (if right?
                                                                 (move-loc ed i dir)
                                                                 i) nil)]
                                  (if right?
                                    [(first bounds) (editor/adjust-loc (second bounds) 1)]
                                    bounds))

                ;;handle string
                (= "\"" cur) (string-bounds ed i dir)

                ;;any other thing
                :else (token-bounds ed i dir)))]
    {:point point
     :boundary [start end]
     :next next}))

(defn grow [{:keys [ed loc] :as orig} dir]
  (let [{:keys [next point boundary]} (anchored-move ed loc dir dir)
        format-point (if (= dir :left)
                       (second boundary)
                       (first boundary))
        neue-point (if (= dir :left)
                     (first next)
                     (second next))]
    (if neue-point
      (update-in orig [:edits] conj
                 {:type :move
                  :from point
                  :to neue-point}
                 {:type :cursor
                  :from loc
                  :to loc}
                 {:type :format
                  :from format-point
                  :to neue-point})
      orig)))

(defn shrink [{:keys [ed loc] :as orig} anchor-side]
  (let [dir (dir-swap anchor-side)
        {:keys [next point boundary] :as anchor-move} (anchored-move ed loc anchor-side dir)
        format-side (if (= anchor-side :right)
                      (second boundary)
                      (first boundary))
        neue-point (if (= anchor-side :left)
                     (second next)
                     (first next))
        [_ neue-point] (when neue-point (first-non-whitespace {:ed ed
                                                               :loc (move-loc ed neue-point dir)
                                                               :dir dir}))
        neue-point (if (and neue-point (= anchor-side :right))
                     (editor/adjust-loc neue-point 1)
                     neue-point)]
    (if neue-point
      (update-in orig [:edits] conj
                 {:type :move
                  :from point
                  :to neue-point}
                 {:type :cursor
                  :from loc
                  :to loc}
                 {:type :format
                  :from format-side
                  :to neue-point})
      orig)))

(defn select [{:keys [ed loc] :as orig} type]
  (let [[start end] (form-boundary ed loc (when type
                                            (re-pattern (str "[\\" type "]"))))]
    (if (and start end)
      (update-in orig [:edits] conj
                 {:type :cursor
                  :from start
                  :to (editor/adjust-loc end 1)})
      orig)))

(defn unwrap [{:keys [ed loc] :as orig} type]
  (let [[start end] (form-boundary ed loc (when type
                                            (re-pattern (str "[\\" type "]"))))]
    (if (and start end)
      ;; We delete the end pair first because deleting it wouldn't affect
      ;; the start pair's position.
      ;; The opposite is not true when they are on the same line.
      (update-in orig [:edits] conj
                 {:type :delete
                  :from end
                  :to (editor/adjust-loc end 1)}
                 {:type :delete
                  :from start
                  :to (editor/adjust-loc start 1)})
      orig)))

(defn move-up [{:keys [ed loc] :as orig} dir]
  (let [[start end] (form-boundary ed loc nil)
        dest (if (= dir :left) start (editor/adjust-loc end 1))]
    (if (and start end)
      (update-in orig [:edits] conj
                 {:type :cursor
                  :from dest
                  :to dest})
      orig)))

(defn in-string? [ed loc]
  (and (not (nil? (get-ch ed loc)))
       (string|comment? ed loc false)))

(defn move-down [{:keys [ed loc] :as orig} dir]
  (let [backward? (= dir :left)
        [parent-start parent-end] (form-boundary ed loc nil)
        limit (when (and parent-start parent-end)
                (if backward? parent-start parent-end))
        [ends adjust-scan adjust-final] (if backward?
                                          [form-end -1 0]
                                          [form-start 0 1])
        [ch cur] (scan {:ed ed
                        :loc (editor/adjust-loc loc adjust-scan)
                        :dir dir
                        :regex ends
                        :skip in-string?})
        in-bounds? (if limit
                     (if backward? (loc>loc cur limit) (loc>loc limit cur))
                     cur)
        dest (when in-bounds? (editor/adjust-loc cur adjust-final))]
    (if (and dest (not (in-string? ed dest)))
      (update-in orig [:edits] conj
                 {:type :cursor
                  :from dest
                  :to dest})
      orig)))

(defn at-end-of-line? [ed loc]
  (= (:ch loc) (editor/line-length ed (:line loc))))

(defn delete [{:keys [ed loc] :as orig} dir]
  (if (editor/selection? ed)
    (let [bounds (editor/selection-bounds ed)]
      (update-in orig [:edits] conj
                 {:type :delete
                  :from (bounds :from)
                  :to (bounds :to)}))
    (let [backward? (= dir :left)
          forward?  (= dir :right)
          ;; forward: ab|cde    backward: edc|ba
          a (if forward? (move-loc ed (move-loc ed loc :left) :left) (move-loc ed loc :right))
          b (if forward? (move-loc ed loc :left) loc)
          c (if forward? loc (move-loc ed loc :left))
          d (move-loc ed c dir)
          e (move-loc ed d dir)
          a-ch (get-ch ed a)
          b-ch (get-ch ed b)
          c-ch (get-ch ed c)
          d-ch (get-ch ed d)
          adjust (fn [ed loc n alt] (if (= n (- (editor/line-length ed (:line loc)) (loc :ch)))
                                      (assoc loc :ch (+ n (:ch loc)))
                                      alt))
          [del-normal-start del-normal-end] (if forward?
                                              [c (adjust ed c 1 d)]
                                              [c b])
          [del-both-start del-both-end]     (if forward?
                                              [b (adjust ed c 1 d)]
                                              [(adjust ed b 1 a) c])
          [del-two-start del-two-end]       (if forward?
                                              [c (adjust ed c 2 e)]
                                              [d b])
          [enter-delims exit-delims]        (if forward?
                                              [form-start form-end]
                                              [form-end form-start])
          move-in-loc (if forward? d c)
          normal-delete (update-in orig [:edits] conj
                                   {:type :delete
                                    :from del-normal-start
                                    :to del-normal-end})
          line-break    (update-in orig [:edits] conj
                                   {:type :delete
                                    :from {:line (:line c), :ch (inc (:ch c))}
                                    :to b})
          move-in       (update-in orig [:edits] conj
                                   {:type :cursor
                                    :from move-in-loc
                                    :to move-in-loc})
          delete-both   (update-in orig [:edits] conj
                                   {:type :delete
                                    :from del-both-start
                                    :to del-both-end})
          delete-two    (update-in orig [:edits] conj
                                   {:type :delete
                                    :from del-two-start
                                    :to del-two-end})]
      (cond
       (not c)                        orig          ; at beginning of file
       (and forward?
            (at-end-of-line? ed c)
            (comment? ed c)
            (not (comment? ed d)))    orig          ; don't bring code onto comment
       (not c-ch)                     normal-delete ; at end of line
       (and backward?
            (= 0 (:ch loc))
            (comment? ed c)
            (not (comment? ed b)))    orig          ; don't carry code up behind comment
       (and backward?
            (= 0 (:ch loc)))          line-break    ; backspace at beginning of line
       (and (= "\"" c-ch)
            (not (in-string? ed d))
            (not (in-string? ed b))
            forward?)                 move-in       ; enter string in odd case |" foo"
       (and (= "\"" c-ch)
            (not (in-string? ed d))
            (or (not (= "\"" b-ch))
                (= "\\" a-ch)))       orig          ; stay at end of string
       (and (= "\"" c-ch)
            (not (in-string? ed b)))  move-in       ; enter string
       (and (in-string? ed c)
            (in-string? ed d)
            (= "\\" b-ch)
            forward?)                 delete-both   ; delete escaped char from within
       (and (in-string? ed a)
            (in-string? ed b)
            (= "\\" c-ch)
            backward?)                delete-both   ; backspace escaped char from within
       (and (in-string? ed c)
            (= "\\" d-ch)
            backward?)                delete-two    ; backspace entire escaped char
       (and (in-string? ed d)
            (in-string? ed e)
            (= "\\" c-ch)
            forward?)                 delete-two    ; delete entire escaped char
       (and (= "\"" c-ch)
            (= "\"" b-ch)
            (not= "\\" a-ch)
            forward?)                 delete-both   ; delete empty string from within
       (and (= "\"" c-ch)
            (= "\"" b-ch)
            (not= "\\" d-ch)
            backward?)                delete-both   ; backspace empty string from within
       (in-string? ed c)              normal-delete ; normal del/bksp within string
       (re-find enter-delims c-ch)    move-in       ; enter
       (and (re-find exit-delims c-ch)
            (= b-ch (opposites c-ch)))delete-both   ; del both from within
       (and (re-find exit-delims c-ch)
            (not= b-ch (opposites c-ch))) orig      ; stay
       :else                          normal-delete))))

(defn seek-top [ed loc]
  (let [pars (re-pattern "\\(|\\{|\\[")]
    (loop [loc loc]
      (let [cur (second (scan {:ed ed
                               :loc loc
                               :dir :left
                               :regex pars
                               :skip in-string?}))
            adj (editor/adjust-loc cur -1)]
        (if (or (zero? (:ch cur))
                (nil? (:ch cur)))
          cur
          (recur adj))))))

(defn seek-bottom [ed loc]
  (let [adj->top (fn [pos] (editor/adjust-loc pos 1))
        start (seek-top ed loc)
        end (second (form-boundary ed (adj->top start) nil))]
    (adj->top end)))

(defn move-top [{:keys [ed loc] :as orig} dir]
  (let [[start end] (form-boundary ed loc nil)]
    (if (and start end)
      (let [dest (if (= dir :right)
                   (seek-bottom ed loc)
                   (seek-top ed loc))]
        (update-in orig [:edits] conj
                   {:type :cursor
                    :from dest
                    :to dest}))
      orig)))

(defn batched-edits [{:keys [edits ed]}]
  (editor/operation ed (fn []
                         (doseq [e edits]
                           (do-edit e ed)))))

(defmulti do-edit :type)

(defmethod do-edit :move [{:keys [from to]} ed]
  (let [text (editor/range ed from (editor/adjust-loc from 1))]
    (if (loc>loc to from)
      (do
        (do-edit {:type :insert
                  :from to
                  :text text}
                 ed)
        (do-edit {:type :delete
                  :from from
                  :to (editor/adjust-loc from 1)}
                 ed))
      (do
        (do-edit {:type :delete
                  :from from
                  :to (editor/adjust-loc from 1)}
                 ed)
        (do-edit {:type :insert
                  :from to
                  :text text}
                 ed)
        ))))

(defmethod do-edit :insert [{:keys [from text]} ed]
  (editor/replace ed from text))

(defmethod do-edit :delete [{:keys [from to]} ed]
  (editor/replace ed from to ""))

(defmethod do-edit :cursor [{:keys [from to]} ed]
  (if (= from to)
    (editor/move-cursor ed to)
    (editor/set-selection ed from to)))

(defmethod do-edit :format [{:keys [from to]} ed]
  (if (loc>loc to from)
    (editor/indent-lines ed from to "smart")
    (editor/indent-lines ed to from "smart")))

(defn ed->info [ed]
  {:ed ed
   :loc (editor/->cursor ed)
   :edits []})

(cmd/command {:command :paredit.grow.right
              :desc "Paredit: Grow right"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (-> (ed->info ed)
                            (grow :right)
                            (batched-edits)
                            )))})

(cmd/command {:command :paredit.grow.left
              :desc "Paredit: Grow left"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (-> (ed->info ed)
                            (grow :left)
                            (batched-edits)
                            )))})


(cmd/command {:command :paredit.shrink.right
              :desc "Paredit: Shrink right"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (-> (ed->info ed)
                            (shrink :right)
                            (batched-edits)
                            )))})

(cmd/command {:command :paredit.shrink.left
              :desc "Paredit: Shrink left"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (-> (ed->info ed)
                            (shrink :left)
                            (batched-edits)
                            )))})

(cmd/command {:command :paredit.select.parent
              :desc "Paredit: Select expression"
              :exec (fn [type]
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (ed->info ed)
                            (select type)
                            (batched-edits)
                            ))
                      )})

(cmd/command {:command :paredit.move.up.backward
              :desc "Paredit: Move up out of the current form to its beginning"
              :exec (fn [type]
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (ed->info ed)
                            (move-up :left)
                            (batched-edits))))})

(cmd/command {:command :paredit.move.up.forward
              :desc "Paredit: Move up out of the current form to its end"
              :exec (fn [type]
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (ed->info ed)
                            (move-up :right)
                            (batched-edits))))})

(cmd/command {:command :paredit.move.down.forward
              :desc "Paredit: Move down into the next form"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (ed->info ed)
                            (move-down :right)
                            (batched-edits))))})

(cmd/command {:command :paredit.move.down.backward
              :desc "Paredit: Move down into the previous form"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (ed->info ed)
                            (move-down :left)
                            (batched-edits))))})

(cmd/command {:command :paredit.move.top.backward
              :desc "Paredit: Move backward to top level"
              :exec (fn [type]
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (ed->info ed)
                            (move-top :left)
                            (batched-edits))))})

(cmd/command {:command :paredit.move.top.forward
              :desc "Paredit: Move forward to top level"
              :exec (fn [type]
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (ed->info ed)
                            (move-top :right)
                            (batched-edits))))})

(cmd/command {:command :paredit.unwrap.parent
              :desc "Paredit: Unwrap parent. e.g. (a b c) => a b c"
              :exec (fn [type]
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (ed->info ed)
                            (unwrap type)
                            (batched-edits))))})

(cmd/command {:command :paredit.select.clear
              :desc "Paredit: Clear selection and return cursor"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (cmd/exec! :editor.selection.clear)
                        (when (::orig-pos @ed)
                          (editor/move-cursor ed (::orig-pos @ed))
                          (object/merge! ed {::orig-pos nil}))
                        )
                      )})

(cmd/command {:command :paredit.backspace
              :desc "Paredit: Pair and quote aware backspace"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (ed->info ed)
                            (delete :left)
                            (batched-edits))))})

(cmd/command {:command :paredit.delete
              :desc "Paredit: Pair and quote aware delete"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (ed->info ed)
                            (delete :right)
                            (batched-edits))))})
