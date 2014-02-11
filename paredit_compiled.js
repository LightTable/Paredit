if(!lt.util.load.provided_QMARK_('lt.plugins.paredit')) {
goog.provide('lt.plugins.paredit');
goog.require('cljs.core');
goog.require('lt.util.cljs');
goog.require('lt.util.cljs');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
lt.plugins.paredit.opposites = new cljs.core.PersistentArrayMap(null, 6, [")","(","(",")","{","}","}","{","[","]","]","["], null);
lt.plugins.paredit.dir_swap = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",1017222009),new cljs.core.Keyword(null,"right","right",1122416014),new cljs.core.Keyword(null,"right","right",1122416014),new cljs.core.Keyword(null,"left","left",1017222009)], null);
lt.plugins.paredit.form_start = /[\{\(\[]/;
lt.plugins.paredit.form_end = /[\}\)\]]/;
lt.plugins.paredit.end_loc = (function end_loc(ed){var last_line = lt.objs.editor.last_line.call(null,ed);return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),last_line,new cljs.core.Keyword(null,"ch","ch",1013907415),(function (){var x__7064__auto__ = 0;var y__7065__auto__ = (lt.objs.editor.line_length.call(null,ed,last_line) - 1);return ((x__7064__auto__ > y__7065__auto__) ? x__7064__auto__ : y__7065__auto__);
})()], null);
});
lt.plugins.paredit.loc_GT_loc = (function loc_GT_loc(l1,l2){if((new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(l1) > new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(l2)))
{return true;
} else
{if((new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(l2) > new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(l1)))
{return false;
} else
{if((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(l1) > new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(l2)))
{return true;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return false;
} else
{return null;
}
}
}
}
});
lt.plugins.paredit.move_loc_line = (function move_loc_line(ed,loc,dir){if(cljs.core.truth_(loc))
{var neue = cljs.core.update_in.call(null,loc,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"line","line",1017226086)], null),cljs.core._PLUS_,((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"up","up",1013907981)))?-1:1));if((new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(neue) < 0))
{return null;
} else
{if((new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(neue) >= lt.objs.editor.last_line.call(null,ed)))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.assoc.call(null,neue,new cljs.core.Keyword(null,"ch","ch",1013907415),((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"up","up",1013907981)))?(function (){var x__7064__auto__ = (lt.objs.editor.line_length.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(neue)) - 1);var y__7065__auto__ = 0;return ((x__7064__auto__ > y__7065__auto__) ? x__7064__auto__ : y__7065__auto__);
})():0));
} else
{return null;
}
}
}
} else
{return null;
}
});
lt.plugins.paredit.move_loc = (function move_loc(ed,loc,dir){if(cljs.core.truth_(loc))
{var len = lt.objs.editor.line_length.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc));var neue = lt.objs.editor.adjust_loc.call(null,loc,((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?-1:1));if((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(neue) < 0))
{return lt.plugins.paredit.move_loc_line.call(null,ed,loc,new cljs.core.Keyword(null,"up","up",1013907981));
} else
{if((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(neue) >= len))
{return lt.plugins.paredit.move_loc_line.call(null,ed,loc,new cljs.core.Keyword(null,"down","down",1016993812));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return neue;
} else
{return null;
}
}
}
} else
{return null;
}
});
lt.plugins.paredit.within_range = (function within_range(p__8093,cur){var vec__8095 = p__8093;var start = cljs.core.nth.call(null,vec__8095,0,null);var end = cljs.core.nth.call(null,vec__8095,1,null);return ((end >= new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur))) && ((new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur) >= start));
});
lt.plugins.paredit.scan = (function scan(p__8096){var map__8098 = p__8096;var map__8098__$1 = ((cljs.core.seq_QMARK_.call(null,map__8098))?cljs.core.apply.call(null,cljs.core.hash_map,map__8098):map__8098);var opts = map__8098__$1;var skip = cljs.core.get.call(null,map__8098__$1,new cljs.core.Keyword(null,"skip","skip",1017436401),((function (map__8098,map__8098__$1,opts){
return (function (ed,loc){return false;
});})(map__8098,map__8098__$1,opts))
);var regex = cljs.core.get.call(null,map__8098__$1,new cljs.core.Keyword(null,"regex","regex",1122296761));var loc = cljs.core.get.call(null,map__8098__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__8098__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = cljs.core.get.call(null,map__8098__$1,new cljs.core.Keyword(null,"dir","dir",1014003711));var search_range = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) - 100),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) + 100)], null);var cur = loc;var line = lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc));while(true){
if((cljs.core.not.call(null,cur)) || (cljs.core.not.call(null,line)) || (!(lt.plugins.paredit.within_range.call(null,search_range,cur))))
{return null;
} else
{var ch = cljs.core.get.call(null,line,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur));var next_loc = lt.plugins.paredit.move_loc.call(null,ed,cur,dir);var next_line = ((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)))?lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)):line);if(cljs.core.truth_((function (){var and__6745__auto__ = ch;if(cljs.core.truth_(and__6745__auto__))
{var and__6745__auto____$1 = cljs.core.re_seq.call(null,regex,ch);if(cljs.core.truth_(and__6745__auto____$1))
{return cljs.core.not.call(null,skip.call(null,ed,cur));
} else
{return and__6745__auto____$1;
}
} else
{return and__6745__auto__;
}
})()))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,cur], null);
} else
{{
var G__8183 = next_loc;
var G__8184 = next_line;
cur = G__8183;
line = G__8184;
continue;
}
}
}
break;
}
});
lt.plugins.paredit.string_BAR_comment_QMARK_ = (function string_BAR_comment_QMARK_(ed,cur,allow_strings_QMARK_){var type = lt.objs.editor.__GT_token_type.call(null,ed,lt.objs.editor.adjust_loc.call(null,cur,1));if(cljs.core.truth_(type))
{if(cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,type,"comment-form")))
{return false;
} else
{if(cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,type,"comment")))
{return true;
} else
{if(cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,type,"string")))
{if(cljs.core.truth_(allow_strings_QMARK_))
{return null;
} else
{return true;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return false;
} else
{return null;
}
}
}
}
} else
{return null;
}
});
lt.plugins.paredit.paired_scan = (function paired_scan(p__8099){var map__8102 = p__8099;var map__8102__$1 = ((cljs.core.seq_QMARK_.call(null,map__8102))?cljs.core.apply.call(null,cljs.core.hash_map,map__8102):map__8102);var opts = map__8102__$1;var only_for_QMARK_ = cljs.core.get.call(null,map__8102__$1,new cljs.core.Keyword(null,"only-for?","only-for?",1260514697));var allow_strings_QMARK_ = cljs.core.get.call(null,map__8102__$1,new cljs.core.Keyword(null,"allow-strings?","allow-strings?",1208165235));var allow_end_QMARK_ = cljs.core.get.call(null,map__8102__$1,new cljs.core.Keyword(null,"allow-end?","allow-end?",3920538170));var negation = cljs.core.get.call(null,map__8102__$1,new cljs.core.Keyword(null,"negation","negation",1935015639));var for$ = cljs.core.get.call(null,map__8102__$1,new cljs.core.Keyword(null,"for","for",1014005819));var loc = cljs.core.get.call(null,map__8102__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__8102__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = cljs.core.get.call(null,map__8102__$1,new cljs.core.Keyword(null,"dir","dir",1014003711));var vec__8103 = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_end,lt.plugins.paredit.form_start], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_start,lt.plugins.paredit.form_end], null));var stack_chars = cljs.core.nth.call(null,vec__8103,0,null);var stack_ends = cljs.core.nth.call(null,vec__8103,1,null);var final_loc = lt.plugins.paredit.end_loc.call(null,ed);var search_range = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) - 100),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) + 100)], null);var cur = loc;var line = lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc));var stack = cljs.core.PersistentVector.EMPTY;while(true){
if((cljs.core.not.call(null,cur)) || (cljs.core.not.call(null,line)) || (!(lt.plugins.paredit.within_range.call(null,search_range,cur))))
{return null;
} else
{var ch = cljs.core.get.call(null,line,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur));var next_loc = lt.plugins.paredit.move_loc.call(null,ed,cur,dir);var next_line = ((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)))?lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)):line);var valid_QMARK_ = cljs.core.not.call(null,lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,cur,allow_strings_QMARK_));var stackable_QMARK_ = cljs.core.not.call(null,lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,cur,null));if(cljs.core.truth_((function (){var and__6745__auto__ = allow_end_QMARK_;if(cljs.core.truth_(and__6745__auto__))
{return (valid_QMARK_) && ((cljs.core._EQ_.call(null,final_loc,cur)) || (cljs.core.not_EQ_.call(null,next_line,line)));
} else
{return and__6745__auto__;
}
})()))
{if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,lt.objs.editor.adjust_loc.call(null,cur,1)], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.Keyword(null,"ch","ch",1013907415),-1], null)], null);
}
} else
{if(cljs.core.truth_((function (){var and__6745__auto__ = ch;if(cljs.core.truth_(and__6745__auto__))
{var and__6745__auto____$1 = cljs.core.re_seq.call(null,for$,ch);if(cljs.core.truth_(and__6745__auto____$1))
{var and__6745__auto____$2 = valid_QMARK_;if(and__6745__auto____$2)
{var and__6745__auto____$3 = cljs.core.not.call(null,cljs.core.seq.call(null,stack));if(and__6745__auto____$3)
{if(cljs.core.truth_(negation))
{return negation.call(null,line,cur);
} else
{return true;
}
} else
{return and__6745__auto____$3;
}
} else
{return and__6745__auto____$2;
}
} else
{return and__6745__auto____$1;
}
} else
{return and__6745__auto__;
}
})()))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,cur], null);
} else
{if(cljs.core.truth_((function (){var and__6745__auto__ = ch;if(cljs.core.truth_(and__6745__auto__))
{var and__6745__auto____$1 = cljs.core.not.call(null,only_for_QMARK_);if(and__6745__auto____$1)
{var and__6745__auto____$2 = stackable_QMARK_;if(and__6745__auto____$2)
{var and__6745__auto____$3 = cljs.core.re_seq.call(null,stack_ends,ch);if(cljs.core.truth_(and__6745__auto____$3))
{return cljs.core.not_EQ_.call(null,ch,lt.plugins.paredit.opposites.call(null,cljs.core.last.call(null,stack)));
} else
{return and__6745__auto____$3;
}
} else
{return and__6745__auto____$2;
}
} else
{return and__6745__auto____$1;
}
} else
{return and__6745__auto__;
}
})()))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{{
var G__8185 = next_loc;
var G__8186 = next_line;
var G__8187 = (cljs.core.truth_((function (){var and__6745__auto__ = ch;if(cljs.core.truth_(and__6745__auto__))
{var and__6745__auto____$1 = stackable_QMARK_;if(and__6745__auto____$1)
{return cljs.core.re_seq.call(null,stack_chars,ch);
} else
{return and__6745__auto____$1;
}
} else
{return and__6745__auto__;
}
})())?cljs.core.conj.call(null,stack,ch):(cljs.core.truth_((function (){var and__6745__auto__ = ch;if(cljs.core.truth_(and__6745__auto__))
{return (stackable_QMARK_) && (cljs.core._EQ_.call(null,ch,lt.plugins.paredit.opposites.call(null,cljs.core.last.call(null,stack))));
} else
{return and__6745__auto__;
}
})())?cljs.core.pop.call(null,stack):((new cljs.core.Keyword(null,"else","else",1017020587))?stack:null)));
cur = G__8185;
line = G__8186;
stack = G__8187;
continue;
}
} else
{return null;
}
}
}
}
}
break;
}
});
lt.plugins.paredit.form_boundary = (function form_boundary(ed,loc,regex){var vec__8106 = lt.plugins.paredit.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"left","left",1017222009),new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"only-for?","only-for?",1260514697),regex,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,loc,new cljs.core.Keyword(null,"left","left",1017222009)),new cljs.core.Keyword(null,"for","for",1014005819),(function (){var or__6757__auto__ = regex;if(cljs.core.truth_(or__6757__auto__))
{return or__6757__auto__;
} else
{return lt.plugins.paredit.form_start;
}
})()], null));var c = cljs.core.nth.call(null,vec__8106,0,null);var start = cljs.core.nth.call(null,vec__8106,1,null);var vec__8107 = ((cljs.core.not.call(null,c))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null], null):lt.plugins.paredit.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"right","right",1122416014),new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,start,new cljs.core.Keyword(null,"right","right",1122416014)),new cljs.core.Keyword(null,"for","for",1014005819),cljs.core.re_pattern.call(null,[cljs.core.str("[\\"),cljs.core.str(lt.plugins.paredit.opposites.call(null,c)),cljs.core.str("]")].join(''))], null)));var c__$1 = cljs.core.nth.call(null,vec__8107,0,null);var end = cljs.core.nth.call(null,vec__8107,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start,end], null);
});
lt.plugins.paredit.escaped_paired_scan = (function escaped_paired_scan(ed,loc,thing,dir){var vec__8109 = lt.plugins.paredit.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"dir","dir",1014003711),dir,new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"allow-strings?","allow-strings?",1208165235),true,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,loc,dir),new cljs.core.Keyword(null,"negation","negation",1935015639),(function (line,loc__$1){return cljs.core.not_EQ_.call(null,cljs.core.get.call(null,line,lt.objs.editor.adjust_loc.call(null,loc__$1,-1)),"\\");
}),new cljs.core.Keyword(null,"for","for",1014005819),cljs.core.re_pattern.call(null,[cljs.core.str("["),cljs.core.str(thing),cljs.core.str("]")].join(''))], null));var c = cljs.core.nth.call(null,vec__8109,0,null);var end = cljs.core.nth.call(null,vec__8109,1,null);if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [end,loc], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [loc,lt.objs.editor.adjust_loc.call(null,end,1)], null);
}
});
lt.plugins.paredit.string_bounds = (function string_bounds(ed,loc,dir){return lt.plugins.paredit.escaped_paired_scan.call(null,ed,loc,"\"",dir);
});
lt.plugins.paredit.token_bounds = (function token_bounds(ed,loc,dir){var vec__8111 = lt.plugins.paredit.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dir","dir",1014003711),dir,new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"allow-end?","allow-end?",3920538170),true,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.objs.editor.adjust_loc.call(null,loc,((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?-1:1)),new cljs.core.Keyword(null,"for","for",1014005819),/[\s\)\}\]\"\(\{\[]/], null));var c = cljs.core.nth.call(null,vec__8111,0,null);var end = cljs.core.nth.call(null,vec__8111,1,null);if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.adjust_loc.call(null,end,1),loc], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [loc,end], null);
}
});
lt.plugins.paredit.first_non_whitespace = (function first_non_whitespace(opts){return lt.plugins.paredit.scan.call(null,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"regex","regex",1122296761),/\S/));
});
lt.plugins.paredit.anchored_move = (function anchored_move(ed,loc,anchor_side,dir){var vec__8114 = lt.plugins.paredit.form_boundary.call(null,ed,loc,null);var start = cljs.core.nth.call(null,vec__8114,0,null);var end = cljs.core.nth.call(null,vec__8114,1,null);var ends = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?lt.plugins.paredit.form_start:lt.plugins.paredit.form_end);var point = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"left","left",1017222009),anchor_side))?start:end);var vec__8115 = lt.plugins.paredit.first_non_whitespace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,point,dir),new cljs.core.Keyword(null,"dir","dir",1014003711),dir], null));var cur = cljs.core.nth.call(null,vec__8115,0,null);var i = cljs.core.nth.call(null,vec__8115,1,null);var next = (cljs.core.truth_(cur)?(cljs.core.truth_(cljs.core.re_seq.call(null,ends,cur))?null:(cljs.core.truth_(lt.plugins.paredit.opposites.call(null,cur))?(function (){var right_QMARK_ = cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014));var bounds = lt.plugins.paredit.form_boundary.call(null,ed,((right_QMARK_)?lt.plugins.paredit.move_loc.call(null,ed,i,dir):i),null);if(right_QMARK_)
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,bounds),lt.objs.editor.adjust_loc.call(null,cljs.core.second.call(null,bounds),1)], null);
} else
{return bounds;
}
})():((cljs.core._EQ_.call(null,"\"",cur))?lt.plugins.paredit.string_bounds.call(null,ed,i,dir):((new cljs.core.Keyword(null,"else","else",1017020587))?lt.plugins.paredit.token_bounds.call(null,ed,i,dir):null)))):null);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"point","point",1120749826),point,new cljs.core.Keyword(null,"boundary","boundary",3193559964),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start,end], null),new cljs.core.Keyword(null,"next","next",1017282149),next], null);
});
lt.plugins.paredit.grow = (function grow(p__8116,dir){var map__8119 = p__8116;var map__8119__$1 = ((cljs.core.seq_QMARK_.call(null,map__8119))?cljs.core.apply.call(null,cljs.core.hash_map,map__8119):map__8119);var orig = map__8119__$1;var loc = cljs.core.get.call(null,map__8119__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__8119__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var map__8120 = lt.plugins.paredit.anchored_move.call(null,ed,loc,dir,dir);var map__8120__$1 = ((cljs.core.seq_QMARK_.call(null,map__8120))?cljs.core.apply.call(null,cljs.core.hash_map,map__8120):map__8120);var boundary = cljs.core.get.call(null,map__8120__$1,new cljs.core.Keyword(null,"boundary","boundary",3193559964));var point = cljs.core.get.call(null,map__8120__$1,new cljs.core.Keyword(null,"point","point",1120749826));var next = cljs.core.get.call(null,map__8120__$1,new cljs.core.Keyword(null,"next","next",1017282149));var format_point = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.second.call(null,boundary):cljs.core.first.call(null,boundary));var neue_point = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.first.call(null,next):cljs.core.second.call(null,next));if(cljs.core.truth_(neue_point))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"move","move",1017261891),new cljs.core.Keyword(null,"from","from",1017056028),point,new cljs.core.Keyword(null,"to","to",1013907949),neue_point], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),loc,new cljs.core.Keyword(null,"to","to",1013907949),loc], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"from","from",1017056028),format_point,new cljs.core.Keyword(null,"to","to",1013907949),neue_point], null));
} else
{return orig;
}
});
lt.plugins.paredit.shrink = (function shrink(p__8121,anchor_side){var map__8125 = p__8121;var map__8125__$1 = ((cljs.core.seq_QMARK_.call(null,map__8125))?cljs.core.apply.call(null,cljs.core.hash_map,map__8125):map__8125);var orig = map__8125__$1;var loc = cljs.core.get.call(null,map__8125__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__8125__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = lt.plugins.paredit.dir_swap.call(null,anchor_side);var map__8126 = lt.plugins.paredit.anchored_move.call(null,ed,loc,anchor_side,dir);var map__8126__$1 = ((cljs.core.seq_QMARK_.call(null,map__8126))?cljs.core.apply.call(null,cljs.core.hash_map,map__8126):map__8126);var anchor_move = map__8126__$1;var boundary = cljs.core.get.call(null,map__8126__$1,new cljs.core.Keyword(null,"boundary","boundary",3193559964));var point = cljs.core.get.call(null,map__8126__$1,new cljs.core.Keyword(null,"point","point",1120749826));var next = cljs.core.get.call(null,map__8126__$1,new cljs.core.Keyword(null,"next","next",1017282149));var format_side = ((cljs.core._EQ_.call(null,anchor_side,new cljs.core.Keyword(null,"right","right",1122416014)))?cljs.core.second.call(null,boundary):cljs.core.first.call(null,boundary));var neue_point = ((cljs.core._EQ_.call(null,anchor_side,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.second.call(null,next):cljs.core.first.call(null,next));var vec__8127 = (cljs.core.truth_(neue_point)?lt.plugins.paredit.first_non_whitespace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,neue_point,dir),new cljs.core.Keyword(null,"dir","dir",1014003711),dir], null)):null);var _ = cljs.core.nth.call(null,vec__8127,0,null);var neue_point__$1 = cljs.core.nth.call(null,vec__8127,1,null);var neue_point__$2 = (cljs.core.truth_((function (){var and__6745__auto__ = neue_point__$1;if(cljs.core.truth_(and__6745__auto__))
{return cljs.core._EQ_.call(null,anchor_side,new cljs.core.Keyword(null,"right","right",1122416014));
} else
{return and__6745__auto__;
}
})())?lt.objs.editor.adjust_loc.call(null,neue_point__$1,1):neue_point__$1);if(cljs.core.truth_(neue_point__$2))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"move","move",1017261891),new cljs.core.Keyword(null,"from","from",1017056028),point,new cljs.core.Keyword(null,"to","to",1013907949),neue_point__$2], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),loc,new cljs.core.Keyword(null,"to","to",1013907949),loc], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"from","from",1017056028),format_side,new cljs.core.Keyword(null,"to","to",1013907949),neue_point__$2], null));
} else
{return orig;
}
});
lt.plugins.paredit.select = (function select(p__8128,type){var map__8131 = p__8128;var map__8131__$1 = ((cljs.core.seq_QMARK_.call(null,map__8131))?cljs.core.apply.call(null,cljs.core.hash_map,map__8131):map__8131);var orig = map__8131__$1;var loc = cljs.core.get.call(null,map__8131__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__8131__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__8132 = lt.plugins.paredit.form_boundary.call(null,ed,loc,(cljs.core.truth_(type)?cljs.core.re_pattern.call(null,[cljs.core.str("[\\"),cljs.core.str(type),cljs.core.str("]")].join('')):null));var start = cljs.core.nth.call(null,vec__8132,0,null);var end = cljs.core.nth.call(null,vec__8132,1,null);if(cljs.core.truth_((function (){var and__6745__auto__ = start;if(cljs.core.truth_(and__6745__auto__))
{return end;
} else
{return and__6745__auto__;
}
})()))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),start,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,end,1)], null));
} else
{return orig;
}
});
lt.plugins.paredit.unwrap = (function unwrap(p__8133,type){var map__8136 = p__8133;var map__8136__$1 = ((cljs.core.seq_QMARK_.call(null,map__8136))?cljs.core.apply.call(null,cljs.core.hash_map,map__8136):map__8136);var orig = map__8136__$1;var loc = cljs.core.get.call(null,map__8136__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__8136__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__8137 = lt.plugins.paredit.form_boundary.call(null,ed,loc,(cljs.core.truth_(type)?cljs.core.re_pattern.call(null,[cljs.core.str("[\\"),cljs.core.str(type),cljs.core.str("]")].join('')):null));var start = cljs.core.nth.call(null,vec__8137,0,null);var end = cljs.core.nth.call(null,vec__8137,1,null);if(cljs.core.truth_((function (){var and__6745__auto__ = start;if(cljs.core.truth_(and__6745__auto__))
{return end;
} else
{return and__6745__auto__;
}
})()))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),end,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,end,1)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),start,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,start,1)], null));
} else
{return orig;
}
});
lt.plugins.paredit.move_up = (function move_up(p__8138,dir){var map__8141 = p__8138;var map__8141__$1 = ((cljs.core.seq_QMARK_.call(null,map__8141))?cljs.core.apply.call(null,cljs.core.hash_map,map__8141):map__8141);var orig = map__8141__$1;var loc = cljs.core.get.call(null,map__8141__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__8141__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__8142 = lt.plugins.paredit.form_boundary.call(null,ed,loc,null);var start = cljs.core.nth.call(null,vec__8142,0,null);var end = cljs.core.nth.call(null,vec__8142,1,null);var dest = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?start:lt.objs.editor.adjust_loc.call(null,end,1));if(cljs.core.truth_((function (){var and__6745__auto__ = start;if(cljs.core.truth_(and__6745__auto__))
{return end;
} else
{return and__6745__auto__;
}
})()))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),dest,new cljs.core.Keyword(null,"to","to",1013907949),dest], null));
} else
{return orig;
}
});
lt.plugins.paredit.in_string_QMARK_ = (function in_string_QMARK_(ed,loc){var and__6745__auto__ = lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,loc,false);if(cljs.core.truth_(and__6745__auto__))
{var and__6745__auto____$1 = lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,lt.objs.editor.adjust_loc.call(null,loc,-1),false);if(cljs.core.truth_(and__6745__auto____$1))
{return cljs.core.not_EQ_.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),0,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),loc);
} else
{return and__6745__auto____$1;
}
} else
{return and__6745__auto__;
}
});
lt.plugins.paredit.move_down = (function move_down(p__8143,dir){var map__8148 = p__8143;var map__8148__$1 = ((cljs.core.seq_QMARK_.call(null,map__8148))?cljs.core.apply.call(null,cljs.core.hash_map,map__8148):map__8148);var orig = map__8148__$1;var loc = cljs.core.get.call(null,map__8148__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__8148__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var backward_QMARK_ = cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009));var vec__8149 = lt.plugins.paredit.form_boundary.call(null,ed,loc,null);var parent_start = cljs.core.nth.call(null,vec__8149,0,null);var parent_end = cljs.core.nth.call(null,vec__8149,1,null);var limit = (cljs.core.truth_((function (){var and__6745__auto__ = parent_start;if(cljs.core.truth_(and__6745__auto__))
{return parent_end;
} else
{return and__6745__auto__;
}
})())?((backward_QMARK_)?parent_start:parent_end):null);var vec__8150 = ((backward_QMARK_)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_end,-1,0], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_start,0,1], null));var ends = cljs.core.nth.call(null,vec__8150,0,null);var adjust_scan = cljs.core.nth.call(null,vec__8150,1,null);var adjust_final = cljs.core.nth.call(null,vec__8150,2,null);var vec__8151 = lt.plugins.paredit.scan.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.objs.editor.adjust_loc.call(null,loc,adjust_scan),new cljs.core.Keyword(null,"dir","dir",1014003711),dir,new cljs.core.Keyword(null,"regex","regex",1122296761),ends,new cljs.core.Keyword(null,"skip","skip",1017436401),lt.plugins.paredit.in_string_QMARK_], null));var ch = cljs.core.nth.call(null,vec__8151,0,null);var cur = cljs.core.nth.call(null,vec__8151,1,null);var in_bounds_QMARK_ = (cljs.core.truth_(limit)?((backward_QMARK_)?lt.plugins.paredit.loc_GT_loc.call(null,cur,limit):lt.plugins.paredit.loc_GT_loc.call(null,limit,cur)):cur);var dest = (cljs.core.truth_(in_bounds_QMARK_)?lt.objs.editor.adjust_loc.call(null,cur,adjust_final):null);if(cljs.core.truth_((function (){var and__6745__auto__ = dest;if(cljs.core.truth_(and__6745__auto__))
{return cljs.core.not.call(null,lt.plugins.paredit.in_string_QMARK_.call(null,ed,dest));
} else
{return and__6745__auto__;
}
})()))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),dest,new cljs.core.Keyword(null,"to","to",1013907949),dest], null));
} else
{return orig;
}
});
lt.plugins.paredit.batched_edits = (function batched_edits(p__8152){var map__8158 = p__8152;var map__8158__$1 = ((cljs.core.seq_QMARK_.call(null,map__8158))?cljs.core.apply.call(null,cljs.core.hash_map,map__8158):map__8158);var ed = cljs.core.get.call(null,map__8158__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var edits = cljs.core.get.call(null,map__8158__$1,new cljs.core.Keyword(null,"edits","edits",1110263579));return lt.objs.editor.operation.call(null,ed,(function (){var seq__8159 = cljs.core.seq.call(null,edits);var chunk__8160 = null;var count__8161 = 0;var i__8162 = 0;while(true){
if((i__8162 < count__8161))
{var e = cljs.core._nth.call(null,chunk__8160,i__8162);lt.plugins.paredit.do_edit.call(null,e,ed);
{
var G__8188 = seq__8159;
var G__8189 = chunk__8160;
var G__8190 = count__8161;
var G__8191 = (i__8162 + 1);
seq__8159 = G__8188;
chunk__8160 = G__8189;
count__8161 = G__8190;
i__8162 = G__8191;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__8159);if(temp__4092__auto__)
{var seq__8159__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8159__$1))
{var c__7499__auto__ = cljs.core.chunk_first.call(null,seq__8159__$1);{
var G__8192 = cljs.core.chunk_rest.call(null,seq__8159__$1);
var G__8193 = c__7499__auto__;
var G__8194 = cljs.core.count.call(null,c__7499__auto__);
var G__8195 = 0;
seq__8159 = G__8192;
chunk__8160 = G__8193;
count__8161 = G__8194;
i__8162 = G__8195;
continue;
}
} else
{var e = cljs.core.first.call(null,seq__8159__$1);lt.plugins.paredit.do_edit.call(null,e,ed);
{
var G__8196 = cljs.core.next.call(null,seq__8159__$1);
var G__8197 = null;
var G__8198 = 0;
var G__8199 = 0;
seq__8159 = G__8196;
chunk__8160 = G__8197;
count__8161 = G__8198;
i__8162 = G__8199;
continue;
}
}
} else
{return null;
}
}
break;
}
}));
});
lt.plugins.paredit.do_edit = (function (){var method_table__7609__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__7610__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__7611__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__7612__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__7613__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("do-edit",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__7613__auto__,method_table__7609__auto__,prefer_table__7610__auto__,method_cache__7611__auto__,cached_hierarchy__7612__auto__));
})();
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"move","move",1017261891),(function (p__8163,ed){var map__8164 = p__8163;var map__8164__$1 = ((cljs.core.seq_QMARK_.call(null,map__8164))?cljs.core.apply.call(null,cljs.core.hash_map,map__8164):map__8164);var to = cljs.core.get.call(null,map__8164__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__8164__$1,new cljs.core.Keyword(null,"from","from",1017056028));var text = lt.objs.editor.range.call(null,ed,from,lt.objs.editor.adjust_loc.call(null,from,1));if(lt.plugins.paredit.loc_GT_loc.call(null,to,from))
{lt.plugins.paredit.do_edit.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"insert","insert",4125079083),new cljs.core.Keyword(null,"from","from",1017056028),to,new cljs.core.Keyword(null,"text","text",1017460895),text], null),ed);
return lt.plugins.paredit.do_edit.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),from,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,from,1)], null),ed);
} else
{lt.plugins.paredit.do_edit.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),from,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,from,1)], null),ed);
return lt.plugins.paredit.do_edit.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"insert","insert",4125079083),new cljs.core.Keyword(null,"from","from",1017056028),to,new cljs.core.Keyword(null,"text","text",1017460895),text], null),ed);
}
}));
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"insert","insert",4125079083),(function (p__8165,ed){var map__8166 = p__8165;var map__8166__$1 = ((cljs.core.seq_QMARK_.call(null,map__8166))?cljs.core.apply.call(null,cljs.core.hash_map,map__8166):map__8166);var text = cljs.core.get.call(null,map__8166__$1,new cljs.core.Keyword(null,"text","text",1017460895));var from = cljs.core.get.call(null,map__8166__$1,new cljs.core.Keyword(null,"from","from",1017056028));return lt.objs.editor.replace.call(null,ed,from,text);
}));
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"delete","delete",3973413149),(function (p__8167,ed){var map__8168 = p__8167;var map__8168__$1 = ((cljs.core.seq_QMARK_.call(null,map__8168))?cljs.core.apply.call(null,cljs.core.hash_map,map__8168):map__8168);var to = cljs.core.get.call(null,map__8168__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__8168__$1,new cljs.core.Keyword(null,"from","from",1017056028));return lt.objs.editor.replace.call(null,ed,from,to,"");
}));
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"cursor","cursor",3959752392),(function (p__8169,ed){var map__8170 = p__8169;var map__8170__$1 = ((cljs.core.seq_QMARK_.call(null,map__8170))?cljs.core.apply.call(null,cljs.core.hash_map,map__8170):map__8170);var to = cljs.core.get.call(null,map__8170__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__8170__$1,new cljs.core.Keyword(null,"from","from",1017056028));if(cljs.core._EQ_.call(null,from,to))
{return lt.objs.editor.move_cursor.call(null,ed,to);
} else
{return lt.objs.editor.set_selection.call(null,ed,from,to);
}
}));
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"format","format",4040092521),(function (p__8171,ed){var map__8172 = p__8171;var map__8172__$1 = ((cljs.core.seq_QMARK_.call(null,map__8172))?cljs.core.apply.call(null,cljs.core.hash_map,map__8172):map__8172);var to = cljs.core.get.call(null,map__8172__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__8172__$1,new cljs.core.Keyword(null,"from","from",1017056028));if(lt.plugins.paredit.loc_GT_loc.call(null,to,from))
{return lt.objs.editor.indent_lines.call(null,ed,from,to,"smart");
} else
{return lt.objs.editor.indent_lines.call(null,ed,to,from,"smart");
}
}));
lt.plugins.paredit.ed__GT_info = (function ed__GT_info(ed){return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.objs.editor.__GT_cursor.call(null,ed),new cljs.core.Keyword(null,"edits","edits",1110263579),cljs.core.PersistentVector.EMPTY], null);
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.grow.right","paredit.grow.right",1170264982),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Grow right",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.grow.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"right","right",1122416014)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.grow.left","paredit.grow.left",1988596849),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Grow left",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.grow.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"left","left",1017222009)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.shrink.right","paredit.shrink.right",2805555276),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Shrink right",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.shrink.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"right","right",1122416014)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.shrink.left","paredit.shrink.left",4396652795),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Shrink left",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.shrink.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"left","left",1017222009)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.select.parent","paredit.select.parent",4454322891),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Select expression",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6757__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6757__auto__)
{return or__6757__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.select.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),type));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.move.up.backward","paredit.move.up.backward",2299354126),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Move up out of the current form to its beginning",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6757__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6757__auto__)
{return or__6757__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.move_up.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"left","left",1017222009)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.move.up.forward","paredit.move.up.forward",2803625566),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Move up out of the current form to its end",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6757__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6757__auto__)
{return or__6757__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.move_up.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"right","right",1122416014)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.move.down.forward","paredit.move.down.forward",4219524837),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Move down into the next form",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6757__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6757__auto__)
{return or__6757__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.move_down.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"right","right",1122416014)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.move.down.backward","paredit.move.down.backward",3242558567),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Move down into the previous form",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6757__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6757__auto__)
{return or__6757__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.move_down.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"left","left",1017222009)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.unwrap.parent","paredit.unwrap.parent",826624900),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Unwrap parent. e.g. (a b c) => a b c",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6757__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6757__auto__)
{return or__6757__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.unwrap.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),type));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.select.clear","paredit.select.clear",1113194800),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Clear selection and return cursor",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.selection.clear","editor.selection.clear",1854878812));
if(cljs.core.truth_(new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))))
{lt.objs.editor.move_cursor.call(null,ed,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
return lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),null], null));
} else
{return null;
}
} else
{return null;
}
})], null));
}

//# sourceMappingURL=paredit_compiled.js.map