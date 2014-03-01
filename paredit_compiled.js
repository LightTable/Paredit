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
lt.plugins.paredit.get_ch = (function get_ch(ed,loc){return cljs.core.get.call(null,lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc)),new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(loc));
});
lt.plugins.paredit.end_loc = (function end_loc(ed){var last_line = lt.objs.editor.last_line.call(null,ed);return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),last_line,new cljs.core.Keyword(null,"ch","ch",1013907415),(function (){var x__7062__auto__ = 0;var y__7063__auto__ = (lt.objs.editor.line_length.call(null,ed,last_line) - 1);return ((x__7062__auto__ > y__7063__auto__) ? x__7062__auto__ : y__7063__auto__);
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
{return cljs.core.assoc.call(null,neue,new cljs.core.Keyword(null,"ch","ch",1013907415),((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"up","up",1013907981)))?(function (){var x__7062__auto__ = (lt.objs.editor.line_length.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(neue)) - 1);var y__7063__auto__ = 0;return ((x__7062__auto__ > y__7063__auto__) ? x__7062__auto__ : y__7063__auto__);
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
lt.plugins.paredit.within_range = (function within_range(p__9127,cur){var vec__9129 = p__9127;var start = cljs.core.nth.call(null,vec__9129,0,null);var end = cljs.core.nth.call(null,vec__9129,1,null);return ((end >= new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur))) && ((new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur) >= start));
});
lt.plugins.paredit.scan = (function scan(p__9130){var map__9132 = p__9130;var map__9132__$1 = ((cljs.core.seq_QMARK_.call(null,map__9132))?cljs.core.apply.call(null,cljs.core.hash_map,map__9132):map__9132);var opts = map__9132__$1;var skip = cljs.core.get.call(null,map__9132__$1,new cljs.core.Keyword(null,"skip","skip",1017436401),((function (map__9132,map__9132__$1,opts){
return (function (ed,loc){return false;
});})(map__9132,map__9132__$1,opts))
);var regex = cljs.core.get.call(null,map__9132__$1,new cljs.core.Keyword(null,"regex","regex",1122296761));var loc = cljs.core.get.call(null,map__9132__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9132__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = cljs.core.get.call(null,map__9132__$1,new cljs.core.Keyword(null,"dir","dir",1014003711));var search_range = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) - 100),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) + 100)], null);var cur = loc;var line = lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc));while(true){
if((cljs.core.not.call(null,cur)) || (cljs.core.not.call(null,line)) || (!(lt.plugins.paredit.within_range.call(null,search_range,cur))))
{return null;
} else
{var ch = cljs.core.get.call(null,line,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur));var next_loc = lt.plugins.paredit.move_loc.call(null,ed,cur,dir);var next_line = ((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)))?lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)):line);if(cljs.core.truth_((function (){var and__6743__auto__ = ch;if(cljs.core.truth_(and__6743__auto__))
{var and__6743__auto____$1 = cljs.core.re_seq.call(null,regex,ch);if(cljs.core.truth_(and__6743__auto____$1))
{return cljs.core.not.call(null,skip.call(null,ed,cur));
} else
{return and__6743__auto____$1;
}
} else
{return and__6743__auto__;
}
})()))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,cur], null);
} else
{{
var G__9223 = next_loc;
var G__9224 = next_line;
cur = G__9223;
line = G__9224;
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
lt.plugins.paredit.comment_QMARK_ = (function comment_QMARK_(ed,cur){var type = lt.objs.editor.__GT_token_type.call(null,ed,lt.objs.editor.adjust_loc.call(null,cur,1));var and__6743__auto__ = type;if(cljs.core.truth_(and__6743__auto__))
{var and__6743__auto____$1 = cljs.core.not.call(null,lt.util.cljs.str_contains_QMARK_.call(null,type,"comment-form"));if(and__6743__auto____$1)
{return lt.util.cljs.str_contains_QMARK_.call(null,type,"comment");
} else
{return and__6743__auto____$1;
}
} else
{return and__6743__auto__;
}
});
lt.plugins.paredit.paired_scan = (function paired_scan(p__9133){var map__9136 = p__9133;var map__9136__$1 = ((cljs.core.seq_QMARK_.call(null,map__9136))?cljs.core.apply.call(null,cljs.core.hash_map,map__9136):map__9136);var opts = map__9136__$1;var only_for_QMARK_ = cljs.core.get.call(null,map__9136__$1,new cljs.core.Keyword(null,"only-for?","only-for?",1260514697));var allow_strings_QMARK_ = cljs.core.get.call(null,map__9136__$1,new cljs.core.Keyword(null,"allow-strings?","allow-strings?",1208165235));var allow_end_QMARK_ = cljs.core.get.call(null,map__9136__$1,new cljs.core.Keyword(null,"allow-end?","allow-end?",3920538170));var negation = cljs.core.get.call(null,map__9136__$1,new cljs.core.Keyword(null,"negation","negation",1935015639));var for$ = cljs.core.get.call(null,map__9136__$1,new cljs.core.Keyword(null,"for","for",1014005819));var loc = cljs.core.get.call(null,map__9136__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9136__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = cljs.core.get.call(null,map__9136__$1,new cljs.core.Keyword(null,"dir","dir",1014003711));var vec__9137 = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_end,lt.plugins.paredit.form_start], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_start,lt.plugins.paredit.form_end], null));var stack_chars = cljs.core.nth.call(null,vec__9137,0,null);var stack_ends = cljs.core.nth.call(null,vec__9137,1,null);var final_loc = lt.plugins.paredit.end_loc.call(null,ed);var search_range = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) - 100),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) + 100)], null);var cur = loc;var line = lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc));var stack = cljs.core.PersistentVector.EMPTY;while(true){
if((cljs.core.not.call(null,cur)) || (cljs.core.not.call(null,line)) || (!(lt.plugins.paredit.within_range.call(null,search_range,cur))))
{return null;
} else
{var ch = cljs.core.get.call(null,line,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur));var next_loc = lt.plugins.paredit.move_loc.call(null,ed,cur,dir);var next_line = ((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)))?lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)):line);var valid_QMARK_ = cljs.core.not.call(null,lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,cur,allow_strings_QMARK_));var stackable_QMARK_ = cljs.core.not.call(null,lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,cur,null));if(cljs.core.truth_((function (){var and__6743__auto__ = allow_end_QMARK_;if(cljs.core.truth_(and__6743__auto__))
{return (valid_QMARK_) && ((cljs.core._EQ_.call(null,final_loc,cur)) || (cljs.core.not_EQ_.call(null,next_line,line)));
} else
{return and__6743__auto__;
}
})()))
{if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,lt.objs.editor.adjust_loc.call(null,cur,1)], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.Keyword(null,"ch","ch",1013907415),-1], null)], null);
}
} else
{if(cljs.core.truth_((function (){var and__6743__auto__ = ch;if(cljs.core.truth_(and__6743__auto__))
{var and__6743__auto____$1 = cljs.core.re_seq.call(null,for$,ch);if(cljs.core.truth_(and__6743__auto____$1))
{var and__6743__auto____$2 = valid_QMARK_;if(and__6743__auto____$2)
{var and__6743__auto____$3 = cljs.core.not.call(null,cljs.core.seq.call(null,stack));if(and__6743__auto____$3)
{if(cljs.core.truth_(negation))
{return negation.call(null,line,cur);
} else
{return true;
}
} else
{return and__6743__auto____$3;
}
} else
{return and__6743__auto____$2;
}
} else
{return and__6743__auto____$1;
}
} else
{return and__6743__auto__;
}
})()))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,cur], null);
} else
{if(cljs.core.truth_((function (){var and__6743__auto__ = ch;if(cljs.core.truth_(and__6743__auto__))
{var and__6743__auto____$1 = cljs.core.not.call(null,only_for_QMARK_);if(and__6743__auto____$1)
{var and__6743__auto____$2 = stackable_QMARK_;if(and__6743__auto____$2)
{var and__6743__auto____$3 = cljs.core.re_seq.call(null,stack_ends,ch);if(cljs.core.truth_(and__6743__auto____$3))
{return cljs.core.not_EQ_.call(null,ch,lt.plugins.paredit.opposites.call(null,cljs.core.last.call(null,stack)));
} else
{return and__6743__auto____$3;
}
} else
{return and__6743__auto____$2;
}
} else
{return and__6743__auto____$1;
}
} else
{return and__6743__auto__;
}
})()))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{{
var G__9225 = next_loc;
var G__9226 = next_line;
var G__9227 = (cljs.core.truth_((function (){var and__6743__auto__ = ch;if(cljs.core.truth_(and__6743__auto__))
{var and__6743__auto____$1 = stackable_QMARK_;if(and__6743__auto____$1)
{return cljs.core.re_seq.call(null,stack_chars,ch);
} else
{return and__6743__auto____$1;
}
} else
{return and__6743__auto__;
}
})())?cljs.core.conj.call(null,stack,ch):(cljs.core.truth_((function (){var and__6743__auto__ = ch;if(cljs.core.truth_(and__6743__auto__))
{return (stackable_QMARK_) && (cljs.core._EQ_.call(null,ch,lt.plugins.paredit.opposites.call(null,cljs.core.last.call(null,stack))));
} else
{return and__6743__auto__;
}
})())?cljs.core.pop.call(null,stack):((new cljs.core.Keyword(null,"else","else",1017020587))?stack:null)));
cur = G__9225;
line = G__9226;
stack = G__9227;
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
lt.plugins.paredit.form_boundary = (function form_boundary(ed,loc,regex){var vec__9140 = lt.plugins.paredit.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"left","left",1017222009),new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"only-for?","only-for?",1260514697),regex,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,loc,new cljs.core.Keyword(null,"left","left",1017222009)),new cljs.core.Keyword(null,"for","for",1014005819),(function (){var or__6755__auto__ = regex;if(cljs.core.truth_(or__6755__auto__))
{return or__6755__auto__;
} else
{return lt.plugins.paredit.form_start;
}
})()], null));var c = cljs.core.nth.call(null,vec__9140,0,null);var start = cljs.core.nth.call(null,vec__9140,1,null);var vec__9141 = ((cljs.core.not.call(null,c))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null], null):lt.plugins.paredit.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"right","right",1122416014),new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,start,new cljs.core.Keyword(null,"right","right",1122416014)),new cljs.core.Keyword(null,"for","for",1014005819),cljs.core.re_pattern.call(null,[cljs.core.str("[\\"),cljs.core.str(lt.plugins.paredit.opposites.call(null,c)),cljs.core.str("]")].join(''))], null)));var c__$1 = cljs.core.nth.call(null,vec__9141,0,null);var end = cljs.core.nth.call(null,vec__9141,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start,end], null);
});
lt.plugins.paredit.escaped_paired_scan = (function escaped_paired_scan(ed,loc,thing,dir){var vec__9143 = lt.plugins.paredit.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"dir","dir",1014003711),dir,new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"allow-strings?","allow-strings?",1208165235),true,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,loc,dir),new cljs.core.Keyword(null,"negation","negation",1935015639),(function (line,loc__$1){return cljs.core.not_EQ_.call(null,cljs.core.get.call(null,line,lt.objs.editor.adjust_loc.call(null,loc__$1,-1)),"\\");
}),new cljs.core.Keyword(null,"for","for",1014005819),cljs.core.re_pattern.call(null,[cljs.core.str("["),cljs.core.str(thing),cljs.core.str("]")].join(''))], null));var c = cljs.core.nth.call(null,vec__9143,0,null);var end = cljs.core.nth.call(null,vec__9143,1,null);if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [end,loc], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [loc,lt.objs.editor.adjust_loc.call(null,end,1)], null);
}
});
lt.plugins.paredit.string_bounds = (function string_bounds(ed,loc,dir){return lt.plugins.paredit.escaped_paired_scan.call(null,ed,loc,"\"",dir);
});
lt.plugins.paredit.token_bounds = (function token_bounds(ed,loc,dir){var vec__9145 = lt.plugins.paredit.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dir","dir",1014003711),dir,new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"allow-end?","allow-end?",3920538170),true,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.objs.editor.adjust_loc.call(null,loc,((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?-1:1)),new cljs.core.Keyword(null,"for","for",1014005819),/[\s\)\}\]\"\(\{\[]/], null));var c = cljs.core.nth.call(null,vec__9145,0,null);var end = cljs.core.nth.call(null,vec__9145,1,null);if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.adjust_loc.call(null,end,1),loc], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [loc,end], null);
}
});
lt.plugins.paredit.first_non_whitespace = (function first_non_whitespace(opts){return lt.plugins.paredit.scan.call(null,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"regex","regex",1122296761),/\S/));
});
lt.plugins.paredit.anchored_move = (function anchored_move(ed,loc,anchor_side,dir){var vec__9148 = lt.plugins.paredit.form_boundary.call(null,ed,loc,null);var start = cljs.core.nth.call(null,vec__9148,0,null);var end = cljs.core.nth.call(null,vec__9148,1,null);var ends = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?lt.plugins.paredit.form_start:lt.plugins.paredit.form_end);var point = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"left","left",1017222009),anchor_side))?start:end);var vec__9149 = lt.plugins.paredit.first_non_whitespace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,point,dir),new cljs.core.Keyword(null,"dir","dir",1014003711),dir], null));var cur = cljs.core.nth.call(null,vec__9149,0,null);var i = cljs.core.nth.call(null,vec__9149,1,null);var next = (cljs.core.truth_(cur)?(cljs.core.truth_(cljs.core.re_seq.call(null,ends,cur))?null:(cljs.core.truth_(lt.plugins.paredit.opposites.call(null,cur))?(function (){var right_QMARK_ = cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014));var bounds = lt.plugins.paredit.form_boundary.call(null,ed,((right_QMARK_)?lt.plugins.paredit.move_loc.call(null,ed,i,dir):i),null);if(right_QMARK_)
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,bounds),lt.objs.editor.adjust_loc.call(null,cljs.core.second.call(null,bounds),1)], null);
} else
{return bounds;
}
})():((cljs.core._EQ_.call(null,"\"",cur))?lt.plugins.paredit.string_bounds.call(null,ed,i,dir):((new cljs.core.Keyword(null,"else","else",1017020587))?lt.plugins.paredit.token_bounds.call(null,ed,i,dir):null)))):null);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"point","point",1120749826),point,new cljs.core.Keyword(null,"boundary","boundary",3193559964),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start,end], null),new cljs.core.Keyword(null,"next","next",1017282149),next], null);
});
lt.plugins.paredit.grow = (function grow(p__9150,dir){var map__9153 = p__9150;var map__9153__$1 = ((cljs.core.seq_QMARK_.call(null,map__9153))?cljs.core.apply.call(null,cljs.core.hash_map,map__9153):map__9153);var orig = map__9153__$1;var loc = cljs.core.get.call(null,map__9153__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9153__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var map__9154 = lt.plugins.paredit.anchored_move.call(null,ed,loc,dir,dir);var map__9154__$1 = ((cljs.core.seq_QMARK_.call(null,map__9154))?cljs.core.apply.call(null,cljs.core.hash_map,map__9154):map__9154);var boundary = cljs.core.get.call(null,map__9154__$1,new cljs.core.Keyword(null,"boundary","boundary",3193559964));var point = cljs.core.get.call(null,map__9154__$1,new cljs.core.Keyword(null,"point","point",1120749826));var next = cljs.core.get.call(null,map__9154__$1,new cljs.core.Keyword(null,"next","next",1017282149));var format_point = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.second.call(null,boundary):cljs.core.first.call(null,boundary));var neue_point = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.first.call(null,next):cljs.core.second.call(null,next));if(cljs.core.truth_(neue_point))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"move","move",1017261891),new cljs.core.Keyword(null,"from","from",1017056028),point,new cljs.core.Keyword(null,"to","to",1013907949),neue_point], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),loc,new cljs.core.Keyword(null,"to","to",1013907949),loc], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"from","from",1017056028),format_point,new cljs.core.Keyword(null,"to","to",1013907949),neue_point], null));
} else
{return orig;
}
});
lt.plugins.paredit.shrink = (function shrink(p__9155,anchor_side){var map__9159 = p__9155;var map__9159__$1 = ((cljs.core.seq_QMARK_.call(null,map__9159))?cljs.core.apply.call(null,cljs.core.hash_map,map__9159):map__9159);var orig = map__9159__$1;var loc = cljs.core.get.call(null,map__9159__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9159__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = lt.plugins.paredit.dir_swap.call(null,anchor_side);var map__9160 = lt.plugins.paredit.anchored_move.call(null,ed,loc,anchor_side,dir);var map__9160__$1 = ((cljs.core.seq_QMARK_.call(null,map__9160))?cljs.core.apply.call(null,cljs.core.hash_map,map__9160):map__9160);var anchor_move = map__9160__$1;var boundary = cljs.core.get.call(null,map__9160__$1,new cljs.core.Keyword(null,"boundary","boundary",3193559964));var point = cljs.core.get.call(null,map__9160__$1,new cljs.core.Keyword(null,"point","point",1120749826));var next = cljs.core.get.call(null,map__9160__$1,new cljs.core.Keyword(null,"next","next",1017282149));var format_side = ((cljs.core._EQ_.call(null,anchor_side,new cljs.core.Keyword(null,"right","right",1122416014)))?cljs.core.second.call(null,boundary):cljs.core.first.call(null,boundary));var neue_point = ((cljs.core._EQ_.call(null,anchor_side,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.second.call(null,next):cljs.core.first.call(null,next));var vec__9161 = (cljs.core.truth_(neue_point)?lt.plugins.paredit.first_non_whitespace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,neue_point,dir),new cljs.core.Keyword(null,"dir","dir",1014003711),dir], null)):null);var _ = cljs.core.nth.call(null,vec__9161,0,null);var neue_point__$1 = cljs.core.nth.call(null,vec__9161,1,null);var neue_point__$2 = (cljs.core.truth_((function (){var and__6743__auto__ = neue_point__$1;if(cljs.core.truth_(and__6743__auto__))
{return cljs.core._EQ_.call(null,anchor_side,new cljs.core.Keyword(null,"right","right",1122416014));
} else
{return and__6743__auto__;
}
})())?lt.objs.editor.adjust_loc.call(null,neue_point__$1,1):neue_point__$1);if(cljs.core.truth_(neue_point__$2))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"move","move",1017261891),new cljs.core.Keyword(null,"from","from",1017056028),point,new cljs.core.Keyword(null,"to","to",1013907949),neue_point__$2], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),loc,new cljs.core.Keyword(null,"to","to",1013907949),loc], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"from","from",1017056028),format_side,new cljs.core.Keyword(null,"to","to",1013907949),neue_point__$2], null));
} else
{return orig;
}
});
lt.plugins.paredit.select = (function select(p__9162,type){var map__9165 = p__9162;var map__9165__$1 = ((cljs.core.seq_QMARK_.call(null,map__9165))?cljs.core.apply.call(null,cljs.core.hash_map,map__9165):map__9165);var orig = map__9165__$1;var loc = cljs.core.get.call(null,map__9165__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9165__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__9166 = lt.plugins.paredit.form_boundary.call(null,ed,loc,(cljs.core.truth_(type)?cljs.core.re_pattern.call(null,[cljs.core.str("[\\"),cljs.core.str(type),cljs.core.str("]")].join('')):null));var start = cljs.core.nth.call(null,vec__9166,0,null);var end = cljs.core.nth.call(null,vec__9166,1,null);if(cljs.core.truth_((function (){var and__6743__auto__ = start;if(cljs.core.truth_(and__6743__auto__))
{return end;
} else
{return and__6743__auto__;
}
})()))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),start,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,end,1)], null));
} else
{return orig;
}
});
lt.plugins.paredit.unwrap = (function unwrap(p__9167,type){var map__9170 = p__9167;var map__9170__$1 = ((cljs.core.seq_QMARK_.call(null,map__9170))?cljs.core.apply.call(null,cljs.core.hash_map,map__9170):map__9170);var orig = map__9170__$1;var loc = cljs.core.get.call(null,map__9170__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9170__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__9171 = lt.plugins.paredit.form_boundary.call(null,ed,loc,(cljs.core.truth_(type)?cljs.core.re_pattern.call(null,[cljs.core.str("[\\"),cljs.core.str(type),cljs.core.str("]")].join('')):null));var start = cljs.core.nth.call(null,vec__9171,0,null);var end = cljs.core.nth.call(null,vec__9171,1,null);if(cljs.core.truth_((function (){var and__6743__auto__ = start;if(cljs.core.truth_(and__6743__auto__))
{return end;
} else
{return and__6743__auto__;
}
})()))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),end,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,end,1)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),start,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,start,1)], null));
} else
{return orig;
}
});
lt.plugins.paredit.move_up = (function move_up(p__9172,dir){var map__9175 = p__9172;var map__9175__$1 = ((cljs.core.seq_QMARK_.call(null,map__9175))?cljs.core.apply.call(null,cljs.core.hash_map,map__9175):map__9175);var orig = map__9175__$1;var loc = cljs.core.get.call(null,map__9175__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9175__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__9176 = lt.plugins.paredit.form_boundary.call(null,ed,loc,null);var start = cljs.core.nth.call(null,vec__9176,0,null);var end = cljs.core.nth.call(null,vec__9176,1,null);var dest = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?start:lt.objs.editor.adjust_loc.call(null,end,1));if(cljs.core.truth_((function (){var and__6743__auto__ = start;if(cljs.core.truth_(and__6743__auto__))
{return end;
} else
{return and__6743__auto__;
}
})()))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),dest,new cljs.core.Keyword(null,"to","to",1013907949),dest], null));
} else
{return orig;
}
});
lt.plugins.paredit.in_string_QMARK_ = (function in_string_QMARK_(ed,loc){var and__6743__auto__ = !((lt.plugins.paredit.get_ch.call(null,ed,loc) == null));if(and__6743__auto__)
{return lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,loc,false);
} else
{return and__6743__auto__;
}
});
lt.plugins.paredit.move_down = (function move_down(p__9177,dir){var map__9182 = p__9177;var map__9182__$1 = ((cljs.core.seq_QMARK_.call(null,map__9182))?cljs.core.apply.call(null,cljs.core.hash_map,map__9182):map__9182);var orig = map__9182__$1;var loc = cljs.core.get.call(null,map__9182__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9182__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var backward_QMARK_ = cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009));var vec__9183 = lt.plugins.paredit.form_boundary.call(null,ed,loc,null);var parent_start = cljs.core.nth.call(null,vec__9183,0,null);var parent_end = cljs.core.nth.call(null,vec__9183,1,null);var limit = (cljs.core.truth_((function (){var and__6743__auto__ = parent_start;if(cljs.core.truth_(and__6743__auto__))
{return parent_end;
} else
{return and__6743__auto__;
}
})())?((backward_QMARK_)?parent_start:parent_end):null);var vec__9184 = ((backward_QMARK_)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_end,-1,0], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_start,0,1], null));var ends = cljs.core.nth.call(null,vec__9184,0,null);var adjust_scan = cljs.core.nth.call(null,vec__9184,1,null);var adjust_final = cljs.core.nth.call(null,vec__9184,2,null);var vec__9185 = lt.plugins.paredit.scan.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.objs.editor.adjust_loc.call(null,loc,adjust_scan),new cljs.core.Keyword(null,"dir","dir",1014003711),dir,new cljs.core.Keyword(null,"regex","regex",1122296761),ends,new cljs.core.Keyword(null,"skip","skip",1017436401),lt.plugins.paredit.in_string_QMARK_], null));var ch = cljs.core.nth.call(null,vec__9185,0,null);var cur = cljs.core.nth.call(null,vec__9185,1,null);var in_bounds_QMARK_ = (cljs.core.truth_(limit)?((backward_QMARK_)?lt.plugins.paredit.loc_GT_loc.call(null,cur,limit):lt.plugins.paredit.loc_GT_loc.call(null,limit,cur)):cur);var dest = (cljs.core.truth_(in_bounds_QMARK_)?lt.objs.editor.adjust_loc.call(null,cur,adjust_final):null);if(cljs.core.truth_((function (){var and__6743__auto__ = dest;if(cljs.core.truth_(and__6743__auto__))
{return cljs.core.not.call(null,lt.plugins.paredit.in_string_QMARK_.call(null,ed,dest));
} else
{return and__6743__auto__;
}
})()))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),dest,new cljs.core.Keyword(null,"to","to",1013907949),dest], null));
} else
{return orig;
}
});
lt.plugins.paredit.at_end_of_line_QMARK_ = (function at_end_of_line_QMARK_(ed,loc){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(loc),lt.objs.editor.line_length.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc)));
});
lt.plugins.paredit.delete$ = (function delete$(p__9186,dir){var map__9192 = p__9186;var map__9192__$1 = ((cljs.core.seq_QMARK_.call(null,map__9192))?cljs.core.apply.call(null,cljs.core.hash_map,map__9192):map__9192);var orig = map__9192__$1;var loc = cljs.core.get.call(null,map__9192__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9192__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));if(cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,ed)))
{var bounds = lt.objs.editor.selection_bounds.call(null,ed);return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),bounds.call(null,new cljs.core.Keyword(null,"from","from",1017056028)),new cljs.core.Keyword(null,"to","to",1013907949),bounds.call(null,new cljs.core.Keyword(null,"to","to",1013907949))], null));
} else
{var backward_QMARK_ = cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009));var forward_QMARK_ = cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014));var a = ((forward_QMARK_)?lt.plugins.paredit.move_loc.call(null,ed,lt.plugins.paredit.move_loc.call(null,ed,loc,new cljs.core.Keyword(null,"left","left",1017222009)),new cljs.core.Keyword(null,"left","left",1017222009)):lt.plugins.paredit.move_loc.call(null,ed,loc,new cljs.core.Keyword(null,"right","right",1122416014)));var b = ((forward_QMARK_)?lt.plugins.paredit.move_loc.call(null,ed,loc,new cljs.core.Keyword(null,"left","left",1017222009)):loc);var c = ((forward_QMARK_)?loc:lt.plugins.paredit.move_loc.call(null,ed,loc,new cljs.core.Keyword(null,"left","left",1017222009)));var d = lt.plugins.paredit.move_loc.call(null,ed,c,dir);var e = lt.plugins.paredit.move_loc.call(null,ed,d,dir);var a_ch = lt.plugins.paredit.get_ch.call(null,ed,a);var b_ch = lt.plugins.paredit.get_ch.call(null,ed,b);var c_ch = lt.plugins.paredit.get_ch.call(null,ed,c);var d_ch = lt.plugins.paredit.get_ch.call(null,ed,d);var adjust = ((function (backward_QMARK_,forward_QMARK_,a,b,c,d,e,a_ch,b_ch,c_ch,d_ch){
return (function (ed__$1,loc__$1,n,alt){if(cljs.core._EQ_.call(null,n,(lt.objs.editor.line_length.call(null,ed__$1,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc__$1)) - loc__$1.call(null,new cljs.core.Keyword(null,"ch","ch",1013907415)))))
{return cljs.core.assoc.call(null,loc__$1,new cljs.core.Keyword(null,"ch","ch",1013907415),(n + new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(loc__$1)));
} else
{return alt;
}
});})(backward_QMARK_,forward_QMARK_,a,b,c,d,e,a_ch,b_ch,c_ch,d_ch))
;var vec__9193 = ((forward_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,adjust.call(null,ed,c,1,d)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,b], null));var del_normal_start = cljs.core.nth.call(null,vec__9193,0,null);var del_normal_end = cljs.core.nth.call(null,vec__9193,1,null);var vec__9194 = ((forward_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [b,adjust.call(null,ed,c,1,d)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [adjust.call(null,ed,b,1,a),c], null));var del_both_start = cljs.core.nth.call(null,vec__9194,0,null);var del_both_end = cljs.core.nth.call(null,vec__9194,1,null);var vec__9195 = ((forward_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,adjust.call(null,ed,c,2,e)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [d,b], null));var del_two_start = cljs.core.nth.call(null,vec__9195,0,null);var del_two_end = cljs.core.nth.call(null,vec__9195,1,null);var vec__9196 = ((forward_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_start,lt.plugins.paredit.form_end], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_end,lt.plugins.paredit.form_start], null));var enter_delims = cljs.core.nth.call(null,vec__9196,0,null);var exit_delims = cljs.core.nth.call(null,vec__9196,1,null);var move_in_loc = ((forward_QMARK_)?d:c);var normal_delete = cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),del_normal_start,new cljs.core.Keyword(null,"to","to",1013907949),del_normal_end], null));var line_break = cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(c),new cljs.core.Keyword(null,"ch","ch",1013907415),(new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(c) + 1)], null),new cljs.core.Keyword(null,"to","to",1013907949),b], null));var move_in = cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),move_in_loc,new cljs.core.Keyword(null,"to","to",1013907949),move_in_loc], null));var delete_both = cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),del_both_start,new cljs.core.Keyword(null,"to","to",1013907949),del_both_end], null));var delete_two = cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),del_two_start,new cljs.core.Keyword(null,"to","to",1013907949),del_two_end], null));if(cljs.core.not.call(null,c))
{return orig;
} else
{if(cljs.core.truth_((function (){var and__6743__auto__ = forward_QMARK_;if(and__6743__auto__)
{var and__6743__auto____$1 = lt.plugins.paredit.at_end_of_line_QMARK_.call(null,ed,c);if(and__6743__auto____$1)
{var and__6743__auto____$2 = lt.plugins.paredit.comment_QMARK_.call(null,ed,c);if(cljs.core.truth_(and__6743__auto____$2))
{return cljs.core.not.call(null,lt.plugins.paredit.comment_QMARK_.call(null,ed,d));
} else
{return and__6743__auto____$2;
}
} else
{return and__6743__auto____$1;
}
} else
{return and__6743__auto__;
}
})()))
{return orig;
} else
{if(cljs.core.not.call(null,c_ch))
{return normal_delete;
} else
{if(cljs.core.truth_((function (){var and__6743__auto__ = backward_QMARK_;if(and__6743__auto__)
{var and__6743__auto____$1 = cljs.core._EQ_.call(null,0,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(loc));if(and__6743__auto____$1)
{var and__6743__auto____$2 = lt.plugins.paredit.comment_QMARK_.call(null,ed,c);if(cljs.core.truth_(and__6743__auto____$2))
{return cljs.core.not.call(null,lt.plugins.paredit.comment_QMARK_.call(null,ed,b));
} else
{return and__6743__auto____$2;
}
} else
{return and__6743__auto____$1;
}
} else
{return and__6743__auto__;
}
})()))
{return orig;
} else
{if((backward_QMARK_) && (cljs.core._EQ_.call(null,0,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(loc))))
{return line_break;
} else
{if((cljs.core._EQ_.call(null,"\"",c_ch)) && (cljs.core.not.call(null,lt.plugins.paredit.in_string_QMARK_.call(null,ed,d))) && (cljs.core.not.call(null,lt.plugins.paredit.in_string_QMARK_.call(null,ed,b))) && (forward_QMARK_))
{return move_in;
} else
{if((cljs.core._EQ_.call(null,"\"",c_ch)) && (cljs.core.not.call(null,lt.plugins.paredit.in_string_QMARK_.call(null,ed,d))) && ((!(cljs.core._EQ_.call(null,"\"",b_ch))) || (cljs.core._EQ_.call(null,"\\",a_ch))))
{return orig;
} else
{if((cljs.core._EQ_.call(null,"\"",c_ch)) && (cljs.core.not.call(null,lt.plugins.paredit.in_string_QMARK_.call(null,ed,b))))
{return move_in;
} else
{if(cljs.core.truth_((function (){var and__6743__auto__ = lt.plugins.paredit.in_string_QMARK_.call(null,ed,c);if(cljs.core.truth_(and__6743__auto__))
{var and__6743__auto____$1 = lt.plugins.paredit.in_string_QMARK_.call(null,ed,d);if(cljs.core.truth_(and__6743__auto____$1))
{return (cljs.core._EQ_.call(null,"\\",b_ch)) && (forward_QMARK_);
} else
{return and__6743__auto____$1;
}
} else
{return and__6743__auto__;
}
})()))
{return delete_both;
} else
{if(cljs.core.truth_((function (){var and__6743__auto__ = lt.plugins.paredit.in_string_QMARK_.call(null,ed,a);if(cljs.core.truth_(and__6743__auto__))
{var and__6743__auto____$1 = lt.plugins.paredit.in_string_QMARK_.call(null,ed,b);if(cljs.core.truth_(and__6743__auto____$1))
{return (cljs.core._EQ_.call(null,"\\",c_ch)) && (backward_QMARK_);
} else
{return and__6743__auto____$1;
}
} else
{return and__6743__auto__;
}
})()))
{return delete_both;
} else
{if(cljs.core.truth_((function (){var and__6743__auto__ = lt.plugins.paredit.in_string_QMARK_.call(null,ed,c);if(cljs.core.truth_(and__6743__auto__))
{return (cljs.core._EQ_.call(null,"\\",d_ch)) && (backward_QMARK_);
} else
{return and__6743__auto__;
}
})()))
{return delete_two;
} else
{if(cljs.core.truth_((function (){var and__6743__auto__ = lt.plugins.paredit.in_string_QMARK_.call(null,ed,d);if(cljs.core.truth_(and__6743__auto__))
{var and__6743__auto____$1 = lt.plugins.paredit.in_string_QMARK_.call(null,ed,e);if(cljs.core.truth_(and__6743__auto____$1))
{return (cljs.core._EQ_.call(null,"\\",c_ch)) && (forward_QMARK_);
} else
{return and__6743__auto____$1;
}
} else
{return and__6743__auto__;
}
})()))
{return delete_two;
} else
{if((cljs.core._EQ_.call(null,"\"",c_ch)) && (cljs.core._EQ_.call(null,"\"",b_ch)) && (cljs.core.not_EQ_.call(null,"\\",a_ch)) && (forward_QMARK_))
{return delete_both;
} else
{if((cljs.core._EQ_.call(null,"\"",c_ch)) && (cljs.core._EQ_.call(null,"\"",b_ch)) && (cljs.core.not_EQ_.call(null,"\\",d_ch)) && (backward_QMARK_))
{return delete_both;
} else
{if(cljs.core.truth_(lt.plugins.paredit.in_string_QMARK_.call(null,ed,c)))
{return normal_delete;
} else
{if(cljs.core.truth_(cljs.core.re_find.call(null,enter_delims,c_ch)))
{return move_in;
} else
{if(cljs.core.truth_((function (){var and__6743__auto__ = cljs.core.re_find.call(null,exit_delims,c_ch);if(cljs.core.truth_(and__6743__auto__))
{return cljs.core._EQ_.call(null,b_ch,lt.plugins.paredit.opposites.call(null,c_ch));
} else
{return and__6743__auto__;
}
})()))
{return delete_both;
} else
{if(cljs.core.truth_((function (){var and__6743__auto__ = cljs.core.re_find.call(null,exit_delims,c_ch);if(cljs.core.truth_(and__6743__auto__))
{return cljs.core.not_EQ_.call(null,b_ch,lt.plugins.paredit.opposites.call(null,c_ch));
} else
{return and__6743__auto__;
}
})()))
{return orig;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return normal_delete;
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
lt.plugins.paredit.seek_top = (function seek_top(ed,loc){var pars = cljs.core.re_pattern.call(null,"\\(|\\{|\\[");var loc__$1 = loc;while(true){
var cur = cljs.core.second.call(null,lt.plugins.paredit.scan.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),loc__$1,new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"left","left",1017222009),new cljs.core.Keyword(null,"regex","regex",1122296761),pars,new cljs.core.Keyword(null,"skip","skip",1017436401),lt.plugins.paredit.in_string_QMARK_], null)));var adj = lt.objs.editor.adjust_loc.call(null,cur,-1);if(((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur) === 0)) || ((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur) == null)))
{return cur;
} else
{{
var G__9228 = adj;
loc__$1 = G__9228;
continue;
}
}
break;
}
});
lt.plugins.paredit.seek_bottom = (function seek_bottom(ed,loc){var adj__GT_top = (function (pos){return lt.objs.editor.adjust_loc.call(null,pos,1);
});var start = lt.plugins.paredit.seek_top.call(null,ed,loc);var end = cljs.core.second.call(null,lt.plugins.paredit.form_boundary.call(null,ed,adj__GT_top.call(null,start),null));return adj__GT_top.call(null,end);
});
lt.plugins.paredit.move_top = (function move_top(p__9197,dir){var map__9200 = p__9197;var map__9200__$1 = ((cljs.core.seq_QMARK_.call(null,map__9200))?cljs.core.apply.call(null,cljs.core.hash_map,map__9200):map__9200);var orig = map__9200__$1;var loc = cljs.core.get.call(null,map__9200__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9200__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__9201 = lt.plugins.paredit.form_boundary.call(null,ed,loc,null);var start = cljs.core.nth.call(null,vec__9201,0,null);var end = cljs.core.nth.call(null,vec__9201,1,null);if(cljs.core.truth_((function (){var and__6743__auto__ = start;if(cljs.core.truth_(and__6743__auto__))
{return end;
} else
{return and__6743__auto__;
}
})()))
{var dest = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014)))?lt.plugins.paredit.seek_bottom.call(null,ed,loc):lt.plugins.paredit.seek_top.call(null,ed,loc));return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),dest,new cljs.core.Keyword(null,"to","to",1013907949),dest], null));
} else
{return orig;
}
});
lt.plugins.paredit.batched_edits = (function batched_edits(p__9202){var map__9208 = p__9202;var map__9208__$1 = ((cljs.core.seq_QMARK_.call(null,map__9208))?cljs.core.apply.call(null,cljs.core.hash_map,map__9208):map__9208);var ed = cljs.core.get.call(null,map__9208__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var edits = cljs.core.get.call(null,map__9208__$1,new cljs.core.Keyword(null,"edits","edits",1110263579));return lt.objs.editor.operation.call(null,ed,(function (){var seq__9209 = cljs.core.seq.call(null,edits);var chunk__9210 = null;var count__9211 = 0;var i__9212 = 0;while(true){
if((i__9212 < count__9211))
{var e = cljs.core._nth.call(null,chunk__9210,i__9212);lt.plugins.paredit.do_edit.call(null,e,ed);
{
var G__9229 = seq__9209;
var G__9230 = chunk__9210;
var G__9231 = count__9211;
var G__9232 = (i__9212 + 1);
seq__9209 = G__9229;
chunk__9210 = G__9230;
count__9211 = G__9231;
i__9212 = G__9232;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__9209);if(temp__4092__auto__)
{var seq__9209__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9209__$1))
{var c__7497__auto__ = cljs.core.chunk_first.call(null,seq__9209__$1);{
var G__9233 = cljs.core.chunk_rest.call(null,seq__9209__$1);
var G__9234 = c__7497__auto__;
var G__9235 = cljs.core.count.call(null,c__7497__auto__);
var G__9236 = 0;
seq__9209 = G__9233;
chunk__9210 = G__9234;
count__9211 = G__9235;
i__9212 = G__9236;
continue;
}
} else
{var e = cljs.core.first.call(null,seq__9209__$1);lt.plugins.paredit.do_edit.call(null,e,ed);
{
var G__9237 = cljs.core.next.call(null,seq__9209__$1);
var G__9238 = null;
var G__9239 = 0;
var G__9240 = 0;
seq__9209 = G__9237;
chunk__9210 = G__9238;
count__9211 = G__9239;
i__9212 = G__9240;
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
lt.plugins.paredit.do_edit = (function (){var method_table__7607__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__7608__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__7609__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__7610__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__7611__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("do-edit",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__7611__auto__,method_table__7607__auto__,prefer_table__7608__auto__,method_cache__7609__auto__,cached_hierarchy__7610__auto__));
})();
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"move","move",1017261891),(function (p__9213,ed){var map__9214 = p__9213;var map__9214__$1 = ((cljs.core.seq_QMARK_.call(null,map__9214))?cljs.core.apply.call(null,cljs.core.hash_map,map__9214):map__9214);var to = cljs.core.get.call(null,map__9214__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__9214__$1,new cljs.core.Keyword(null,"from","from",1017056028));var text = lt.objs.editor.range.call(null,ed,from,lt.objs.editor.adjust_loc.call(null,from,1));if(lt.plugins.paredit.loc_GT_loc.call(null,to,from))
{lt.plugins.paredit.do_edit.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"insert","insert",4125079083),new cljs.core.Keyword(null,"from","from",1017056028),to,new cljs.core.Keyword(null,"text","text",1017460895),text], null),ed);
return lt.plugins.paredit.do_edit.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),from,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,from,1)], null),ed);
} else
{lt.plugins.paredit.do_edit.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),from,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,from,1)], null),ed);
return lt.plugins.paredit.do_edit.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"insert","insert",4125079083),new cljs.core.Keyword(null,"from","from",1017056028),to,new cljs.core.Keyword(null,"text","text",1017460895),text], null),ed);
}
}));
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"insert","insert",4125079083),(function (p__9215,ed){var map__9216 = p__9215;var map__9216__$1 = ((cljs.core.seq_QMARK_.call(null,map__9216))?cljs.core.apply.call(null,cljs.core.hash_map,map__9216):map__9216);var text = cljs.core.get.call(null,map__9216__$1,new cljs.core.Keyword(null,"text","text",1017460895));var from = cljs.core.get.call(null,map__9216__$1,new cljs.core.Keyword(null,"from","from",1017056028));return lt.objs.editor.replace.call(null,ed,from,text);
}));
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"delete","delete",3973413149),(function (p__9217,ed){var map__9218 = p__9217;var map__9218__$1 = ((cljs.core.seq_QMARK_.call(null,map__9218))?cljs.core.apply.call(null,cljs.core.hash_map,map__9218):map__9218);var to = cljs.core.get.call(null,map__9218__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__9218__$1,new cljs.core.Keyword(null,"from","from",1017056028));return lt.objs.editor.replace.call(null,ed,from,to,"");
}));
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"cursor","cursor",3959752392),(function (p__9219,ed){var map__9220 = p__9219;var map__9220__$1 = ((cljs.core.seq_QMARK_.call(null,map__9220))?cljs.core.apply.call(null,cljs.core.hash_map,map__9220):map__9220);var to = cljs.core.get.call(null,map__9220__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__9220__$1,new cljs.core.Keyword(null,"from","from",1017056028));if(cljs.core._EQ_.call(null,from,to))
{return lt.objs.editor.move_cursor.call(null,ed,to);
} else
{return lt.objs.editor.set_selection.call(null,ed,from,to);
}
}));
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"format","format",4040092521),(function (p__9221,ed){var map__9222 = p__9221;var map__9222__$1 = ((cljs.core.seq_QMARK_.call(null,map__9222))?cljs.core.apply.call(null,cljs.core.hash_map,map__9222):map__9222);var to = cljs.core.get.call(null,map__9222__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__9222__$1,new cljs.core.Keyword(null,"from","from",1017056028));if(lt.plugins.paredit.loc_GT_loc.call(null,to,from))
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
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6755__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6755__auto__)
{return or__6755__auto__;
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
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6755__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6755__auto__)
{return or__6755__auto__;
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
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6755__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6755__auto__)
{return or__6755__auto__;
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
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6755__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6755__auto__)
{return or__6755__auto__;
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
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6755__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6755__auto__)
{return or__6755__auto__;
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.move.top.backward","paredit.move.top.backward",3017702856),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Move backward to top level",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6755__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6755__auto__)
{return or__6755__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.move_top.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"left","left",1017222009)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.move.top.forward","paredit.move.top.forward",1025682788),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Move forward to top level",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6755__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6755__auto__)
{return or__6755__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.move_top.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"right","right",1122416014)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.unwrap.parent","paredit.unwrap.parent",826624900),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Unwrap parent. e.g. (a b c) => a b c",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6755__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6755__auto__)
{return or__6755__auto__;
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
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.backspace","paredit.backspace",533108718),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Pair and quote aware backspace",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6755__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6755__auto__)
{return or__6755__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.delete$.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"left","left",1017222009)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.delete","paredit.delete",4714529344),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Pair and quote aware delete",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6755__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6755__auto__)
{return or__6755__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.delete$.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"right","right",1122416014)));
} else
{return null;
}
})], null));
}

//# sourceMappingURL=paredit_compiled.js.map