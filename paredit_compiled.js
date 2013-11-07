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

lt.plugins.paredit.opposites = cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([")","(","(",")","{","}","}","{","[","]","]","["], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),13,new cljs.core.Keyword(null,"end-column","end-column",3799845882),24], true));

lt.plugins.paredit.dir_swap = cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"left","left",1017222009),new cljs.core.Keyword(null,"right","right",1122416014),new cljs.core.Keyword(null,"right","right",1122416014),new cljs.core.Keyword(null,"left","left",1017222009)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),16,new cljs.core.Keyword(null,"end-column","end-column",3799845882),28], true));

lt.plugins.paredit.form_start = /[\{\(\[]/;

lt.plugins.paredit.form_end = /[\}\)\]]/;

lt.plugins.paredit.end_loc = (function end_loc(ed){var last_line = lt.objs.editor.last_line.call(null,ed);return cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"line","line",1017226086),last_line,new cljs.core.Keyword(null,"ch","ch",1013907415),(function (){var x__4832__auto__ = 0;var y__4833__auto__ = (lt.objs.editor.line_length.call(null,ed,last_line) - 1);return ((x__4832__auto__ > y__4833__auto__) ? x__4832__auto__ : y__4833__auto__);
})()], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),24,new cljs.core.Keyword(null,"end-column","end-column",3799845882),57], true));
});

lt.plugins.paredit.loc_GT_loc = (function loc_GT_loc(l1,l2){if((new cljs.core.Keyword(null,"line","line",1017226086).call(null,l1) > new cljs.core.Keyword(null,"line","line",1017226086).call(null,l2)))
{return true;
} else
{if((new cljs.core.Keyword(null,"line","line",1017226086).call(null,l2) > new cljs.core.Keyword(null,"line","line",1017226086).call(null,l1)))
{return false;
} else
{if((new cljs.core.Keyword(null,"ch","ch",1013907415).call(null,l1) > new cljs.core.Keyword(null,"ch","ch",1013907415).call(null,l2)))
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
{var neue = cljs.core.update_in.call(null,loc,cljs.core.with_meta(cljs.core.PersistentVector.fromArray([new cljs.core.Keyword(null,"line","line",1017226086)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),35,new cljs.core.Keyword(null,"end-column","end-column",3799845882),37], true)),cljs.core._PLUS_,((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"up","up",1013907981)))?-1:1));if((new cljs.core.Keyword(null,"line","line",1017226086).call(null,neue) < 0))
{return null;
} else
{if((new cljs.core.Keyword(null,"line","line",1017226086).call(null,neue) >= lt.objs.editor.last_line.call(null,ed)))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.assoc.call(null,neue,new cljs.core.Keyword(null,"ch","ch",1013907415),((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"up","up",1013907981)))?(function (){var x__4832__auto__ = (lt.objs.editor.line_length.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).call(null,neue)) - 1);var y__4833__auto__ = 0;return ((x__4832__auto__ > y__4833__auto__) ? x__4832__auto__ : y__4833__auto__);
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
{var len = lt.objs.editor.line_length.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).call(null,loc));var neue = lt.objs.editor.adjust_loc.call(null,loc,((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?-1:1));if((new cljs.core.Keyword(null,"ch","ch",1013907415).call(null,neue) < 0))
{return lt.plugins.paredit.move_loc_line.call(null,ed,loc,new cljs.core.Keyword(null,"up","up",1013907981));
} else
{if((new cljs.core.Keyword(null,"ch","ch",1013907415).call(null,neue) >= len))
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

lt.plugins.paredit.within_range = (function within_range(p__5616,cur){var vec__5618 = p__5616;var start = cljs.core.nth.call(null,vec__5618,0,null);var end = cljs.core.nth.call(null,vec__5618,1,null);var and__3941__auto__ = (end >= new cljs.core.Keyword(null,"line","line",1017226086).call(null,cur));if(and__3941__auto__)
{return (new cljs.core.Keyword(null,"line","line",1017226086).call(null,cur) >= start);
} else
{return and__3941__auto__;
}
});

lt.plugins.paredit.scan = (function scan(p__5619){var map__5621 = p__5619;var map__5621__$1 = ((cljs.core.seq_QMARK_.call(null,map__5621))?cljs.core.apply.call(null,cljs.core.hash_map,map__5621):map__5621);var opts = map__5621__$1;var regex = cljs.core.get.call(null,map__5621__$1,new cljs.core.Keyword(null,"regex","regex",1122296761));var loc = cljs.core.get.call(null,map__5621__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__5621__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = cljs.core.get.call(null,map__5621__$1,new cljs.core.Keyword(null,"dir","dir",1014003711));var search_range = cljs.core.with_meta(cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword(null,"line","line",1017226086).call(null,loc) - 100),(new cljs.core.Keyword(null,"line","line",1017226086).call(null,loc) + 100)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),60,new cljs.core.Keyword(null,"end-column","end-column",3799845882),62], true));var cur = loc;var line = lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).call(null,loc));while(true){
if((function (){var or__3943__auto__ = cljs.core.not.call(null,cur);if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = cljs.core.not.call(null,line);if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{return cljs.core.not.call(null,lt.plugins.paredit.within_range.call(null,search_range,cur));
}
}
})())
{return null;
} else
{var ch = cljs.core.get.call(null,line,new cljs.core.Keyword(null,"ch","ch",1013907415).call(null,cur));var next_loc = lt.plugins.paredit.move_loc.call(null,ed,cur,dir);var next_line = ((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"line","line",1017226086).call(null,cur),new cljs.core.Keyword(null,"line","line",1017226086).call(null,next_loc)))?lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).call(null,next_loc)):line);if(cljs.core.truth_((function (){var and__3941__auto__ = ch;if(cljs.core.truth_(and__3941__auto__))
{return cljs.core.re_seq.call(null,regex,ch);
} else
{return and__3941__auto__;
}
})()))
{return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([ch,cur], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),73,new cljs.core.Keyword(null,"end-column","end-column",3799845882),20], true));
} else
{{
var G__5687 = next_loc;
var G__5688 = next_line;
cur = G__5687;
line = G__5688;
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

lt.plugins.paredit.paired_scan = (function paired_scan(p__5622){var map__5625 = p__5622;var map__5625__$1 = ((cljs.core.seq_QMARK_.call(null,map__5625))?cljs.core.apply.call(null,cljs.core.hash_map,map__5625):map__5625);var opts = map__5625__$1;var only_for_QMARK_ = cljs.core.get.call(null,map__5625__$1,new cljs.core.Keyword(null,"only-for?","only-for?",1260514697));var allow_strings_QMARK_ = cljs.core.get.call(null,map__5625__$1,new cljs.core.Keyword(null,"allow-strings?","allow-strings?",1208165235));var allow_end_QMARK_ = cljs.core.get.call(null,map__5625__$1,new cljs.core.Keyword(null,"allow-end?","allow-end?",3920538170));var negation = cljs.core.get.call(null,map__5625__$1,new cljs.core.Keyword(null,"negation","negation",1935015639));var for$ = cljs.core.get.call(null,map__5625__$1,new cljs.core.Keyword(null,"for","for",1014005819));var loc = cljs.core.get.call(null,map__5625__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__5625__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = cljs.core.get.call(null,map__5625__$1,new cljs.core.Keyword(null,"dir","dir",1014003711));var vec__5626 = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.with_meta(cljs.core.PersistentVector.fromArray([lt.plugins.paredit.form_end,lt.plugins.paredit.form_start], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),88,new cljs.core.Keyword(null,"end-column","end-column",3799845882),56], true)):cljs.core.with_meta(cljs.core.PersistentVector.fromArray([lt.plugins.paredit.form_start,lt.plugins.paredit.form_end], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),89,new cljs.core.Keyword(null,"end-column","end-column",3799845882),56], true)));var stack_chars = cljs.core.nth.call(null,vec__5626,0,null);var stack_ends = cljs.core.nth.call(null,vec__5626,1,null);var final_loc = lt.plugins.paredit.end_loc.call(null,ed);var search_range = cljs.core.with_meta(cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword(null,"line","line",1017226086).call(null,loc) - 100),(new cljs.core.Keyword(null,"line","line",1017226086).call(null,loc) + 100)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),91,new cljs.core.Keyword(null,"end-column","end-column",3799845882),62], true));var cur = loc;var line = lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).call(null,loc));var stack = cljs.core.with_meta(cljs.core.PersistentVector.EMPTY,cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),94,new cljs.core.Keyword(null,"end-column","end-column",3799845882),19], true));while(true){
if((function (){var or__3943__auto__ = cljs.core.not.call(null,cur);if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = cljs.core.not.call(null,line);if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{return cljs.core.not.call(null,lt.plugins.paredit.within_range.call(null,search_range,cur));
}
}
})())
{return null;
} else
{var ch = cljs.core.get.call(null,line,new cljs.core.Keyword(null,"ch","ch",1013907415).call(null,cur));var next_loc = lt.plugins.paredit.move_loc.call(null,ed,cur,dir);var next_line = ((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"line","line",1017226086).call(null,cur),new cljs.core.Keyword(null,"line","line",1017226086).call(null,next_loc)))?lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).call(null,next_loc)):line);var valid_QMARK_ = cljs.core.not.call(null,lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,cur,allow_strings_QMARK_));var stackable_QMARK_ = cljs.core.not.call(null,lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,cur));if(cljs.core.truth_((function (){var and__3941__auto__ = allow_end_QMARK_;if(cljs.core.truth_(and__3941__auto__))
{var and__3941__auto____$1 = valid_QMARK_;if(and__3941__auto____$1)
{var or__3943__auto__ = cljs.core._EQ_.call(null,final_loc,cur);if(or__3943__auto__)
{return or__3943__auto__;
} else
{return cljs.core.not_EQ_.call(null,next_line,line);
}
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})()))
{if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014)))
{return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([ch,lt.objs.editor.adjust_loc.call(null,cur,1)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),112,new cljs.core.Keyword(null,"end-column","end-column",3799845882),76], true));
} else
{return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([ch,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).call(null,cur),new cljs.core.Keyword(null,"ch","ch",1013907415),-1], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),113,new cljs.core.Keyword(null,"end-column","end-column",3799845882),76], true))], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),113,new cljs.core.Keyword(null,"end-column","end-column",3799845882),77], true));
}
} else
{if(cljs.core.truth_((function (){var and__3941__auto__ = ch;if(cljs.core.truth_(and__3941__auto__))
{var and__3941__auto____$1 = cljs.core.re_seq.call(null,for$,ch);if(cljs.core.truth_(and__3941__auto____$1))
{var and__3941__auto____$2 = valid_QMARK_;if(and__3941__auto____$2)
{var and__3941__auto____$3 = cljs.core.not.call(null,cljs.core.seq.call(null,stack));if(and__3941__auto____$3)
{if(cljs.core.truth_(negation))
{return negation.call(null,line,cur);
} else
{return true;
}
} else
{return and__3941__auto____$3;
}
} else
{return and__3941__auto____$2;
}
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})()))
{return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([ch,cur], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),121,new cljs.core.Keyword(null,"end-column","end-column",3799845882),33], true));
} else
{if(cljs.core.truth_((function (){var and__3941__auto__ = ch;if(cljs.core.truth_(and__3941__auto__))
{var and__3941__auto____$1 = cljs.core.not.call(null,only_for_QMARK_);if(and__3941__auto____$1)
{var and__3941__auto____$2 = stackable_QMARK_;if(and__3941__auto____$2)
{var and__3941__auto____$3 = cljs.core.re_seq.call(null,stack_ends,ch);if(cljs.core.truth_(and__3941__auto____$3))
{return cljs.core.not_EQ_.call(null,ch,lt.plugins.paredit.opposites.call(null,cljs.core.last.call(null,stack)));
} else
{return and__3941__auto____$3;
}
} else
{return and__3941__auto____$2;
}
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})()))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{{
var G__5689 = next_loc;
var G__5690 = next_line;
var G__5691 = (cljs.core.truth_((function (){var and__3941__auto__ = ch;if(cljs.core.truth_(and__3941__auto__))
{var and__3941__auto____$1 = stackable_QMARK_;if(and__3941__auto____$1)
{return cljs.core.re_seq.call(null,stack_chars,ch);
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})())?cljs.core.conj.call(null,stack,ch):(cljs.core.truth_((function (){var and__3941__auto__ = ch;if(cljs.core.truth_(and__3941__auto__))
{var and__3941__auto____$1 = stackable_QMARK_;if(and__3941__auto____$1)
{return cljs.core._EQ_.call(null,ch,lt.plugins.paredit.opposites.call(null,cljs.core.last.call(null,stack)));
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})())?cljs.core.pop.call(null,stack):((new cljs.core.Keyword(null,"else","else",1017020587))?stack:null)));
cur = G__5689;
line = G__5690;
stack = G__5691;
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

lt.plugins.paredit.form_boundary = (function form_boundary(ed,loc,regex){var vec__5629 = lt.plugins.paredit.paired_scan.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"left","left",1017222009),new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"only-for?","only-for?",1260514697),regex,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,loc,new cljs.core.Keyword(null,"left","left",1017222009)),new cljs.core.Keyword(null,"for","for",1014005819),(function (){var or__3943__auto__ = regex;if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return lt.plugins.paredit.form_start;
}
})()], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),139,new cljs.core.Keyword(null,"end-column","end-column",3799845882),59], true)));var c = cljs.core.nth.call(null,vec__5629,0,null);var start = cljs.core.nth.call(null,vec__5629,1,null);var vec__5630 = ((cljs.core.not.call(null,c))?cljs.core.with_meta(cljs.core.PersistentVector.fromArray([null,null], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),141,new cljs.core.Keyword(null,"end-column","end-column",3799845882),27], true)):lt.plugins.paredit.paired_scan.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"right","right",1122416014),new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,start,new cljs.core.Keyword(null,"right","right",1122416014)),new cljs.core.Keyword(null,"for","for",1014005819),cljs.core.re_pattern.call(null,[cljs.core.str("[\\"),cljs.core.str(lt.plugins.paredit.opposites.call(null,c)),cljs.core.str("]")].join(''))], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),145,new cljs.core.Keyword(null,"end-column","end-column",3799845882),80], true))));var c__$1 = cljs.core.nth.call(null,vec__5630,0,null);var end = cljs.core.nth.call(null,vec__5630,1,null);return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([start,end], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),146,new cljs.core.Keyword(null,"end-column","end-column",3799845882),15], true));
});

lt.plugins.paredit.escaped_paired_scan = (function escaped_paired_scan(ed,loc,thing,dir){var vec__5632 = lt.plugins.paredit.paired_scan.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"dir","dir",1014003711),dir,new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"allow-strings?","allow-strings?",1208165235),true,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,loc,dir),new cljs.core.Keyword(null,"negation","negation",1935015639),(function (line,loc__$1){return cljs.core.not_EQ_.call(null,cljs.core.get.call(null,line,lt.objs.editor.adjust_loc.call(null,loc__$1,-1)),"\\");
}),new cljs.core.Keyword(null,"for","for",1014005819),cljs.core.re_pattern.call(null,[cljs.core.str("["),cljs.core.str(thing),cljs.core.str("]")].join(''))], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),155,new cljs.core.Keyword(null,"end-column","end-column",3799845882),68], true)));var c = cljs.core.nth.call(null,vec__5632,0,null);var end = cljs.core.nth.call(null,vec__5632,1,null);if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))
{return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([end,loc], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),157,new cljs.core.Keyword(null,"end-column","end-column",3799845882),15], true));
} else
{return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([loc,lt.objs.editor.adjust_loc.call(null,end,1)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),158,new cljs.core.Keyword(null,"end-column","end-column",3799845882),37], true));
}
});

lt.plugins.paredit.string_bounds = (function string_bounds(ed,loc,dir){return lt.plugins.paredit.escaped_paired_scan.call(null,ed,loc,"\"",dir);
});

lt.plugins.paredit.token_bounds = (function token_bounds(ed,loc,dir){var vec__5634 = lt.plugins.paredit.paired_scan.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"dir","dir",1014003711),dir,new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"allow-end?","allow-end?",3920538170),true,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.objs.editor.adjust_loc.call(null,loc,((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?-1:1)),new cljs.core.Keyword(null,"for","for",1014005819),/[\s\)\}\]\"\(\{\[]/], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),168,new cljs.core.Keyword(null,"end-column","end-column",3799845882),57], true)));var c = cljs.core.nth.call(null,vec__5634,0,null);var end = cljs.core.nth.call(null,vec__5634,1,null);if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))
{return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([lt.objs.editor.adjust_loc.call(null,end,1),loc], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),170,new cljs.core.Keyword(null,"end-column","end-column",3799845882),37], true));
} else
{return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([loc,end], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),171,new cljs.core.Keyword(null,"end-column","end-column",3799845882),15], true));
}
});

lt.plugins.paredit.first_non_whitespace = (function first_non_whitespace(opts){return lt.plugins.paredit.scan.call(null,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"regex","regex",1122296761),/\S/));
});

lt.plugins.paredit.anchored_move = (function anchored_move(ed,loc,anchor_side,dir){var vec__5637 = lt.plugins.paredit.form_boundary.call(null,ed,loc);var start = cljs.core.nth.call(null,vec__5637,0,null);var end = cljs.core.nth.call(null,vec__5637,1,null);var ends = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?lt.plugins.paredit.form_start:lt.plugins.paredit.form_end);var point = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"left","left",1017222009),anchor_side))?start:end);var vec__5638 = lt.plugins.paredit.first_non_whitespace.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,point,dir),new cljs.core.Keyword(null,"dir","dir",1014003711),dir], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),186,new cljs.core.Keyword(null,"end-column","end-column",3799845882),48], true)));var cur = cljs.core.nth.call(null,vec__5638,0,null);var i = cljs.core.nth.call(null,vec__5638,1,null);var next = (cljs.core.truth_(cur)?(cljs.core.truth_(cljs.core.re_seq.call(null,ends,cur))?null:(cljs.core.truth_(lt.plugins.paredit.opposites.call(null,cur))?(function (){var right_QMARK_ = cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014));var bounds = lt.plugins.paredit.form_boundary.call(null,ed,((right_QMARK_)?lt.plugins.paredit.move_loc.call(null,ed,i,dir):i));if(right_QMARK_)
{return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([cljs.core.first.call(null,bounds),lt.objs.editor.adjust_loc.call(null,cljs.core.second.call(null,bounds),1)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),196,new cljs.core.Keyword(null,"end-column","end-column",3799845882),90], true));
} else
{return bounds;
}
})():((cljs.core._EQ_.call(null,"\"",cur))?lt.plugins.paredit.string_bounds.call(null,ed,i,dir):((new cljs.core.Keyword(null,"else","else",1017020587))?lt.plugins.paredit.token_bounds.call(null,ed,i,dir):null)))):null);return cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"point","point",1120749826),point,new cljs.core.Keyword(null,"boundary","boundary",3193559964),cljs.core.with_meta(cljs.core.PersistentVector.fromArray([start,end], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),205,new cljs.core.Keyword(null,"end-column","end-column",3799845882),26], true)),new cljs.core.Keyword(null,"next","next",1017282149),next], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),206,new cljs.core.Keyword(null,"end-column","end-column",3799845882),16], true));
});

lt.plugins.paredit.grow = (function grow(p__5639,dir){var map__5642 = p__5639;var map__5642__$1 = ((cljs.core.seq_QMARK_.call(null,map__5642))?cljs.core.apply.call(null,cljs.core.hash_map,map__5642):map__5642);var orig = map__5642__$1;var loc = cljs.core.get.call(null,map__5642__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__5642__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var map__5643 = lt.plugins.paredit.anchored_move.call(null,ed,loc,dir,dir);var map__5643__$1 = ((cljs.core.seq_QMARK_.call(null,map__5643))?cljs.core.apply.call(null,cljs.core.hash_map,map__5643):map__5643);var boundary = cljs.core.get.call(null,map__5643__$1,new cljs.core.Keyword(null,"boundary","boundary",3193559964));var point = cljs.core.get.call(null,map__5643__$1,new cljs.core.Keyword(null,"point","point",1120749826));var next = cljs.core.get.call(null,map__5643__$1,new cljs.core.Keyword(null,"next","next",1017282149));var format_point = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.second.call(null,boundary):cljs.core.first.call(null,boundary));var neue_point = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.first.call(null,next):cljs.core.second.call(null,next));if(cljs.core.truth_(neue_point))
{return cljs.core.update_in.call(null,orig,cljs.core.with_meta(cljs.core.PersistentVector.fromArray([new cljs.core.Keyword(null,"edits","edits",1110263579)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),217,new cljs.core.Keyword(null,"end-column","end-column",3799845882),30], true)),cljs.core.conj,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"move","move",1017261891),new cljs.core.Keyword(null,"from","from",1017056028),point,new cljs.core.Keyword(null,"to","to",1013907949),neue_point], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),220,new cljs.core.Keyword(null,"end-column","end-column",3799845882),33], true)),cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),loc,new cljs.core.Keyword(null,"to","to",1013907949),loc], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),223,new cljs.core.Keyword(null,"end-column","end-column",3799845882),26], true)),cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"from","from",1017056028),format_point,new cljs.core.Keyword(null,"to","to",1013907949),neue_point], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),226,new cljs.core.Keyword(null,"end-column","end-column",3799845882),33], true)));
} else
{return orig;
}
});

lt.plugins.paredit.shrink = (function shrink(p__5644,anchor_side){var map__5648 = p__5644;var map__5648__$1 = ((cljs.core.seq_QMARK_.call(null,map__5648))?cljs.core.apply.call(null,cljs.core.hash_map,map__5648):map__5648);var orig = map__5648__$1;var loc = cljs.core.get.call(null,map__5648__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__5648__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = lt.plugins.paredit.dir_swap.call(null,anchor_side);var map__5649 = lt.plugins.paredit.anchored_move.call(null,ed,loc,anchor_side,dir);var map__5649__$1 = ((cljs.core.seq_QMARK_.call(null,map__5649))?cljs.core.apply.call(null,cljs.core.hash_map,map__5649):map__5649);var anchor_move = map__5649__$1;var boundary = cljs.core.get.call(null,map__5649__$1,new cljs.core.Keyword(null,"boundary","boundary",3193559964));var point = cljs.core.get.call(null,map__5649__$1,new cljs.core.Keyword(null,"point","point",1120749826));var next = cljs.core.get.call(null,map__5649__$1,new cljs.core.Keyword(null,"next","next",1017282149));var format_side = ((cljs.core._EQ_.call(null,anchor_side,new cljs.core.Keyword(null,"right","right",1122416014)))?cljs.core.second.call(null,boundary):cljs.core.first.call(null,boundary));var neue_point = ((cljs.core._EQ_.call(null,anchor_side,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.second.call(null,next):cljs.core.first.call(null,next));var vec__5650 = (cljs.core.truth_(neue_point)?lt.plugins.paredit.first_non_whitespace.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,neue_point,dir),new cljs.core.Keyword(null,"dir","dir",1014003711),dir], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),240,new cljs.core.Keyword(null,"end-column","end-column",3799845882),72], true))):null);var _ = cljs.core.nth.call(null,vec__5650,0,null);var neue_point__$1 = cljs.core.nth.call(null,vec__5650,1,null);var neue_point__$2 = (cljs.core.truth_((function (){var and__3941__auto__ = neue_point__$1;if(cljs.core.truth_(and__3941__auto__))
{return cljs.core._EQ_.call(null,anchor_side,new cljs.core.Keyword(null,"right","right",1122416014));
} else
{return and__3941__auto__;
}
})())?lt.objs.editor.adjust_loc.call(null,neue_point__$1,1):neue_point__$1);if(cljs.core.truth_(neue_point__$2))
{return cljs.core.update_in.call(null,orig,cljs.core.with_meta(cljs.core.PersistentVector.fromArray([new cljs.core.Keyword(null,"edits","edits",1110263579)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),245,new cljs.core.Keyword(null,"end-column","end-column",3799845882),30], true)),cljs.core.conj,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"move","move",1017261891),new cljs.core.Keyword(null,"from","from",1017056028),point,new cljs.core.Keyword(null,"to","to",1013907949),neue_point__$2], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),248,new cljs.core.Keyword(null,"end-column","end-column",3799845882),33], true)),cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),loc,new cljs.core.Keyword(null,"to","to",1013907949),loc], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),251,new cljs.core.Keyword(null,"end-column","end-column",3799845882),26], true)),cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"from","from",1017056028),format_side,new cljs.core.Keyword(null,"to","to",1013907949),neue_point__$2], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),254,new cljs.core.Keyword(null,"end-column","end-column",3799845882),33], true)));
} else
{return orig;
}
});

lt.plugins.paredit.select = (function select(p__5651,type){var map__5654 = p__5651;var map__5654__$1 = ((cljs.core.seq_QMARK_.call(null,map__5654))?cljs.core.apply.call(null,cljs.core.hash_map,map__5654):map__5654);var orig = map__5654__$1;var loc = cljs.core.get.call(null,map__5654__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__5654__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__5655 = lt.plugins.paredit.form_boundary.call(null,ed,loc,(cljs.core.truth_(type)?cljs.core.re_pattern.call(null,[cljs.core.str("[\\"),cljs.core.str(type),cljs.core.str("]")].join('')):null));var start = cljs.core.nth.call(null,vec__5655,0,null);var end = cljs.core.nth.call(null,vec__5655,1,null);if(cljs.core.truth_((function (){var and__3941__auto__ = start;if(cljs.core.truth_(and__3941__auto__))
{return end;
} else
{return and__3941__auto__;
}
})()))
{return cljs.core.update_in.call(null,orig,cljs.core.with_meta(cljs.core.PersistentVector.fromArray([new cljs.core.Keyword(null,"edits","edits",1110263579)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),261,new cljs.core.Keyword(null,"end-column","end-column",3799845882),30], true)),cljs.core.conj,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),start,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,end,1)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),264,new cljs.core.Keyword(null,"end-column","end-column",3799845882),48], true)));
} else
{return orig;
}
});

lt.plugins.paredit.batched_edits = (function batched_edits(p__5656){var map__5662 = p__5656;var map__5662__$1 = ((cljs.core.seq_QMARK_.call(null,map__5662))?cljs.core.apply.call(null,cljs.core.hash_map,map__5662):map__5662);var ed = cljs.core.get.call(null,map__5662__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var edits = cljs.core.get.call(null,map__5662__$1,new cljs.core.Keyword(null,"edits","edits",1110263579));return lt.objs.editor.operation.call(null,ed,(function (){var seq__5663 = cljs.core.seq.call(null,edits);var chunk__5664 = null;var count__5665 = 0;var i__5666 = 0;while(true){
if((i__5666 < count__5665))
{var e = cljs.core._nth.call(null,chunk__5664,i__5666);lt.plugins.paredit.do_edit.call(null,e,ed);
{
var G__5692 = seq__5663;
var G__5693 = chunk__5664;
var G__5694 = count__5665;
var G__5695 = (i__5666 + 1);
seq__5663 = G__5692;
chunk__5664 = G__5693;
count__5665 = G__5694;
i__5666 = G__5695;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__5663);if(temp__4092__auto__)
{var seq__5663__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5663__$1))
{var c__5223__auto__ = cljs.core.chunk_first.call(null,seq__5663__$1);{
var G__5696 = cljs.core.chunk_rest.call(null,seq__5663__$1);
var G__5697 = c__5223__auto__;
var G__5698 = cljs.core.count.call(null,c__5223__auto__);
var G__5699 = 0;
seq__5663 = G__5696;
chunk__5664 = G__5697;
count__5665 = G__5698;
i__5666 = G__5699;
continue;
}
} else
{var e = cljs.core.first.call(null,seq__5663__$1);lt.plugins.paredit.do_edit.call(null,e,ed);
{
var G__5700 = cljs.core.next.call(null,seq__5663__$1);
var G__5701 = null;
var G__5702 = 0;
var G__5703 = 0;
seq__5663 = G__5700;
chunk__5664 = G__5701;
count__5665 = G__5702;
i__5666 = G__5703;
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

lt.plugins.paredit.do_edit = (function (){var method_table__5280__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__5281__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__5282__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__5283__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__5284__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("do-edit",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__5284__auto__,method_table__5280__auto__,prefer_table__5281__auto__,method_cache__5282__auto__,cached_hierarchy__5283__auto__));
})();

cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"move","move",1017261891),(function (p__5667,ed){var map__5668 = p__5667;var map__5668__$1 = ((cljs.core.seq_QMARK_.call(null,map__5668))?cljs.core.apply.call(null,cljs.core.hash_map,map__5668):map__5668);var to = cljs.core.get.call(null,map__5668__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__5668__$1,new cljs.core.Keyword(null,"from","from",1017056028));var text = lt.objs.editor.range.call(null,ed,from,lt.objs.editor.adjust_loc.call(null,from,1));if(cljs.core.truth_(lt.plugins.paredit.loc_GT_loc.call(null,to,from)))
{lt.plugins.paredit.do_edit.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"insert","insert",4125079083),new cljs.core.Keyword(null,"from","from",1017056028),to,new cljs.core.Keyword(null,"text","text",1017460895),text], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),281,new cljs.core.Keyword(null,"end-column","end-column",3799845882),29], true)),ed);
return lt.plugins.paredit.do_edit.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),from,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,from,1)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),285,new cljs.core.Keyword(null,"end-column","end-column",3799845882),49], true)),ed);
} else
{lt.plugins.paredit.do_edit.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),from,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,from,1)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),290,new cljs.core.Keyword(null,"end-column","end-column",3799845882),49], true)),ed);
return lt.plugins.paredit.do_edit.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"insert","insert",4125079083),new cljs.core.Keyword(null,"from","from",1017056028),to,new cljs.core.Keyword(null,"text","text",1017460895),text], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),294,new cljs.core.Keyword(null,"end-column","end-column",3799845882),29], true)),ed);
}
}));

cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"insert","insert",4125079083),(function (p__5669,ed){var map__5670 = p__5669;var map__5670__$1 = ((cljs.core.seq_QMARK_.call(null,map__5670))?cljs.core.apply.call(null,cljs.core.hash_map,map__5670):map__5670);var text = cljs.core.get.call(null,map__5670__$1,new cljs.core.Keyword(null,"text","text",1017460895));var from = cljs.core.get.call(null,map__5670__$1,new cljs.core.Keyword(null,"from","from",1017056028));return lt.objs.editor.replace.call(null,ed,from,text);
}));

cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"delete","delete",3973413149),(function (p__5671,ed){var map__5672 = p__5671;var map__5672__$1 = ((cljs.core.seq_QMARK_.call(null,map__5672))?cljs.core.apply.call(null,cljs.core.hash_map,map__5672):map__5672);var to = cljs.core.get.call(null,map__5672__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__5672__$1,new cljs.core.Keyword(null,"from","from",1017056028));return lt.objs.editor.replace.call(null,ed,from,to,"");
}));

cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"cursor","cursor",3959752392),(function (p__5673,ed){var map__5674 = p__5673;var map__5674__$1 = ((cljs.core.seq_QMARK_.call(null,map__5674))?cljs.core.apply.call(null,cljs.core.hash_map,map__5674):map__5674);var to = cljs.core.get.call(null,map__5674__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__5674__$1,new cljs.core.Keyword(null,"from","from",1017056028));if(cljs.core._EQ_.call(null,from,to))
{return lt.objs.editor.move_cursor.call(null,ed,to);
} else
{return lt.objs.editor.set_selection.call(null,ed,from,to);
}
}));

cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"format","format",4040092521),(function (p__5675,ed){var map__5676 = p__5675;var map__5676__$1 = ((cljs.core.seq_QMARK_.call(null,map__5676))?cljs.core.apply.call(null,cljs.core.hash_map,map__5676):map__5676);var to = cljs.core.get.call(null,map__5676__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__5676__$1,new cljs.core.Keyword(null,"from","from",1017056028));if(cljs.core.truth_(lt.plugins.paredit.loc_GT_loc.call(null,to,from)))
{return lt.objs.editor.indent_lines.call(null,ed,from,to,"smart");
} else
{return lt.objs.editor.indent_lines.call(null,ed,to,from,"smart");
}
}));

lt.plugins.paredit.ed__GT_info = (function ed__GT_info(ed){return cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.objs.editor.__GT_cursor.call(null,ed),new cljs.core.Keyword(null,"edits","edits",1110263579),cljs.core.with_meta(cljs.core.PersistentVector.EMPTY,cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),317,new cljs.core.Keyword(null,"end-column","end-column",3799845882),12], true))], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),317,new cljs.core.Keyword(null,"end-column","end-column",3799845882),13], true));
});

lt.objs.command.command.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.grow.right","paredit.grow.right",1170264982),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Grow right",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.grow.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"right","right",1122416014)));
} else
{return null;
}
})], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),326,new cljs.core.Keyword(null,"end-column","end-column",3799845882),32], true)));

lt.objs.command.command.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.grow.left","paredit.grow.left",1988596849),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Grow left",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.grow.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"left","left",1017222009)));
} else
{return null;
}
})], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),335,new cljs.core.Keyword(null,"end-column","end-column",3799845882),32], true)));

lt.objs.command.command.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.shrink.right","paredit.shrink.right",2805555276),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Shrink right",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.shrink.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"right","right",1122416014)));
} else
{return null;
}
})], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),345,new cljs.core.Keyword(null,"end-column","end-column",3799845882),32], true)));

lt.objs.command.command.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.shrink.left","paredit.shrink.left",4396652795),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Shrink left",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.shrink.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"left","left",1017222009)));
} else
{return null;
}
})], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),354,new cljs.core.Keyword(null,"end-column","end-column",3799845882),32], true)));

lt.objs.command.command.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.select.parent","paredit.select.parent",4454322891),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Select expression",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__3943__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("cljs.user","orig-pos","cljs.user/orig-pos",2657611886).call(null,cljs.core.deref.call(null,ed)));if(or__3943__auto__)
{return or__3943__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword("cljs.user","orig-pos","cljs.user/orig-pos",2657611886),lt.objs.editor.__GT_cursor.call(null,ed)], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),362,new cljs.core.Keyword(null,"end-column","end-column",3799845882),77], true)));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.select.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),type));
} else
{return null;
}
})], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),367,new cljs.core.Keyword(null,"end-column","end-column",3799845882),24], true)));

lt.objs.command.command.call(null,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.select.clear","paredit.select.clear",1113194800),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Clear selection and return cursor",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.selection.clear","editor.selection.clear",1854878812));
if(cljs.core.truth_(new cljs.core.Keyword("cljs.user","orig-pos","cljs.user/orig-pos",2657611886).call(null,cljs.core.deref.call(null,ed))))
{lt.objs.editor.move_cursor.call(null,ed,new cljs.core.Keyword("cljs.user","orig-pos","cljs.user/orig-pos",2657611886).call(null,cljs.core.deref.call(null,ed)));
return lt.object.merge_BANG_.call(null,ed,cljs.core.with_meta(cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword("cljs.user","orig-pos","cljs.user/orig-pos",2657611886),null], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),377,new cljs.core.Keyword(null,"end-column","end-column",3799845882),60], true)));
} else
{return null;
}
} else
{return null;
}
})], true),cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"end-line","end-line",2693041432),379,new cljs.core.Keyword(null,"end-column","end-column",3799845882),24], true)));


//# sourceMappingURL=