YUI.add("moodle-mod_quiz-autosave",function(n,t){M.mod_quiz=M.mod_quiz||{},M.mod_quiz.autosave={TINYMCE_DETECTION_DELAY:500,TINYMCE_DETECTION_REPEATS:20,WATCH_HIDDEN_DELAY:1e3,FAILURES_BEFORE_NOTIFY:1,FIRST_SUCCESSFUL_SAVE:-1,SELECTORS:{QUIZ_FORM:"#responseform",VALUE_CHANGE_ELEMENTS:'input, textarea, [contenteditable="true"]',CHANGE_ELEMENTS:"input, select",HIDDEN_INPUTS:"input[type=hidden]",CONNECTION_ERROR:"#connection-error",CONNECTION_OK:"#connection-ok"},AUTOSAVE_HANDLER:M.cfg.wwwroot+"/mod/quiz/autosave.ajax.php",delay:12e4,form:null,dirty:!1,delay_timer:null,save_transaction:null,savefailures:0,editor_change_handler:null,hidden_field_values:{},init:function(t){this.form=n.one(this.SELECTORS.QUIZ_FORM),this.form&&(this.delay=1e3*t,this.form.delegate("valuechange",this.value_changed,this.SELECTORS.VALUE_CHANGE_ELEMENTS,this),this.form.delegate("change",this.value_changed,this.SELECTORS.CHANGE_ELEMENTS,this),this.form.on("submit",this.stop_autosaving,this),require(["core_form/events"],function(t){window.addEventListener(t.eventTypes.uploadChanged,this.value_changed.bind(this))}.bind(this)),this.init_tinymce(this.TINYMCE_DETECTION_REPEATS),this.save_hidden_field_values(),this.watch_hidden_fields())},save_hidden_field_values:function(){this.form.all(this.SELECTORS.HIDDEN_INPUTS).each(function(t){var e=t.get("name");e&&(this.hidden_field_values[e]=t.get("value"))},this)},watch_hidden_fields:function(){this.detect_hidden_field_changes(),n.later(this.WATCH_HIDDEN_DELAY,this,this.watch_hidden_fields)},detect_hidden_field_changes:function(){this.form.all(this.SELECTORS.HIDDEN_INPUTS).each(function(t){var e=t.get("name"),i=t.get("value");!e||e in this.hidden_field_values&&i===this.hidden_field_values[e]||(this.hidden_field_values[e]=i,this.value_changed({target:t}))},this)},init_tinymce:function(t){var e;"undefined"==typeof window.tinyMCE?0<t&&n.later(this.TINYMCE_DETECTION_DELAY,this,this.init_tinymce,[t-1]):(this.editor_change_handler=n.bind(this.editor_changed,this),window.tinyMCE.onAddEditor?window.tinyMCE.onAddEditor.add(n.bind(this.init_tinymce_editor,this)):window.tinyMCE.on&&(e=this.start_save_timer_if_necessary.bind(this),window.tinyMCE.on("AddEditor",function(t){t.editor.on("Change Undo Redo keydown",e)}),window.tinyMCE.get().forEach(function(t){t.on("Change Undo Redo keydown",e)})))},init_tinymce_editor:function(t,e){e.onChange.add(this.editor_change_handler),e.onRedo.add(this.editor_change_handler),e.onUndo.add(this.editor_change_handler),e.onKeyDown.add(this.editor_change_handler)},value_changed:function(t){var e=t.target.getAttribute("name");"thispage"===e||"scrollpos"===e||e&&e.match(/_:flagged$/)||(e=e||"#"+t.target.getAttribute("id"),this.start_save_timer_if_necessary())},editor_changed:function(t){this.start_save_timer_if_necessary()},start_save_timer_if_necessary:function(){this.dirty=!0,this.delay_timer||this.save_transaction||this.start_save_timer()},start_save_timer:function(){this.cancel_delay(),this.delay_timer=n.later(this.delay,this,this.save_changes)},cancel_delay:function(){this.delay_timer&&!0!==this.delay_timer&&this.delay_timer.cancel(),this.delay_timer=null},save_changes:function(){var t;this.cancel_delay(),this.dirty=!1,this.is_time_nearly_over()?this.stop_autosaving():("undefined"!=typeof window.tinyMCE&&window.tinyMCE.triggerSave(),(t=this.form.all("input[type=submit], button[type=submit]")).setAttribute("type","button"),this.save_transaction=n.io(this.AUTOSAVE_HANDLER,{method:"POST",form:{id:this.form},on:{success:this.save_done,failure:this.save_failed},context:this}),t.setAttribute("type","submit"))},save_done:function(t,e){var i=JSON.parse(e.responseText);"OK"!==i.status?this.save_failed(t,e):("undefined"!=typeof i.timeleft&&M.mod_quiz.timer.updateEndTime(i.timeleft),this.update_saved_time_display(),this.save_transaction=null,this.dirty&&this.start_save_timer(),0<this.savefailures?(n.one(this.SELECTORS.CONNECTION_ERROR).hide(),n.one(this.SELECTORS.CONNECTION_OK).show(),this.savefailures=this.FIRST_SUCCESSFUL_SAVE):this.savefailures===this.FIRST_SUCCESSFUL_SAVE&&(n.one(this.SELECTORS.CONNECTION_OK).hide(),this.savefailures=0))},save_failed:function(){this.save_transaction=null,this.start_save_timer(),this.savefailures=Math.max(1,this.savefailures+1),this.savefailures===this.FAILURES_BEFORE_NOTIFY&&(n.one(this.SELECTORS.CONNECTION_ERROR).show(),n.one(this.SELECTORS.CONNECTION_OK).hide())},update_saved_time_display:function(){require(["core/user_date","core/notification"],function(t,e){t.get([{timestamp:Math.floor(Date.now()/1e3),format:M.util.get_string("strftimedatetimeshortaccurate","langconfig")}]).then(function(t){var e=n.one("#mod_quiz_navblock .othernav .autosave_info");e.set("text",M.util.get_string("lastautosave","quiz",t[0])),e.show()})["catch"](e.exception)})},is_time_nearly_over:function(){return M.mod_quiz.timer&&M.mod_quiz.timer.endtime&&(new Date).getTime()+2*this.delay>M.mod_quiz.timer.endtime},stop_autosaving:function(){this.cancel_delay(),this.delay_timer=!0,this.save_transaction&&this.save_transaction.abort()}}},"@VERSION@",{requires:["base","node","event","event-valuechange","node-event-delegate","io-form","datatype-date-format"]});