YUI.add("moodle-core_availability-form",function(d,i){M.core_availability=M.core_availability||{},M.core_availability.form={plugins:{},field:null,mainDiv:null,rootList:null,idCounter:0,restrictByGroup:null,init:function(i){var t,e,a,l,n;for(t in i)e=i[t],(a=M[e[0]].form).init.apply(a,e);if(this.field=d.one("#id_availabilityconditionsjson"),this.field.setAttribute("aria-hidden","true"),this.mainDiv=d.Node.create('<div class="availability-field fcontainer"></div>'),this.field.insert(this.mainDiv,"after"),n=null,""!==(l=this.field.get("value")))try{n=d.JSON.parse(l)}catch(o){this.field.set("value","")}this.rootList=new M.core_availability.List(n,!0),this.mainDiv.appendChild(this.rootList.node),this.update(),this.rootList.renumber(),this.mainDiv.setAttribute("aria-live","polite"),this.field.ancestor("form").on("submit",function(){this.mainDiv.all("input,textarea,select").set("disabled",!0)},this),this.restrictByGroup=d.one("#restrictbygroup"),this.restrictByGroup&&(this.restrictByGroup.on("click",this.addRestrictByGroup,this),l=d.one("#id_groupmode"),n=d.one("#id_groupingid"),l&&l.on("change",this.updateRestrictByGroup,this),n&&n.on("change",this.updateRestrictByGroup,this),this.updateRestrictByGroup()),this.parent=d.one("#fitem_id_availabilityconditionsjson"),this.parent.removeClass("d-none"),document.getElementById("availabilityconditions-loading").remove()},update:function(){var i=this.rootList.getValue(),t=[];this.rootList.fillErrors(t),0!==t.length&&(i.errors=t),this.field.set("value",d.JSON.stringify(i)),this.updateRestrictByGroup()},updateRestrictByGroup:function(){var i,t,e,a;this.restrictByGroup&&("&"===this.rootList.getValue().op&&!(this.rootList.hasItemOfType("group")||this.rootList.hasItemOfType("grouping"))&&(i=d.one("#id_groupmode"),t=d.one("#id_groupingid"),e=1===Number(this.restrictByGroup.getData("groupavailability")),a=1===Number(this.restrictByGroup.getData("groupingavailability")),i&&0!==Number(i.get("value"))&&e||t&&0!==Number(t.get("value"))&&a)?this.restrictByGroup.set("disabled",!1):this.restrictByGroup.set("disabled",!0))},addRestrictByGroup:function(i){var t,e,a,l;i.preventDefault(),i=d.one("#id_groupmode"),t=d.one("#id_groupingid"),e=1===Number(this.restrictByGroup.getData("groupavailability")),a=1===Number(this.restrictByGroup.getData("groupingavailability")),t&&0!==Number(t.get("value"))&&a?l=new M.core_availability.Item({type:"grouping",id:Number(t.get("value"))},!0):i&&e&&(l=new M.core_availability.Item({type:"group"},!0)),null!==l&&(this.rootList.addChild(l),this.update(),this.rootList.renumber(),this.rootList.updateHtml())}},M.core_availability.plugin={allowAdd:!1,init:function(i,t,e,a){i=i.replace(/^availability_/,"");this.allowAdd=t,(M.core_availability.form.plugins[i]=this).initInner.apply(this,e),this.displayMode=a},initInner:function(){},getNode:function(){throw"getNode not implemented"},fillValue:function(){throw"fillValue not implemented"},fillErrors:function(){},focusAfterAdd:function(i){i.one("input:not([disabled]),select:not([disabled])").focus()}},M.core_availability.List=function(i,t,e){var a,l,n;if(this.children=[],t!==undefined&&(this.root=t),this.node=d.Node.create('<div class="availability-list"><h3 class="accesshide"></h3><div class="availability-inner"><div class="availability-header mb-1"><span>'+M.util.get_string("listheader_sign_before","availability")+'</span> <label><span class="accesshide">'+M.util.get_string("label_sign","availability")+' </span><select class="availability-neg custom-select mx-1" title="'+M.util.get_string("label_sign","availability")+'"><option value="">'+M.util.get_string("listheader_sign_pos","availability")+'</option><option value="!">'+M.util.get_string("listheader_sign_neg","availability")+'</option></select></label> <span class="availability-single">'+M.util.get_string("listheader_single","availability")+'</span><span class="availability-multi">'+M.util.get_string("listheader_multi_before","availability")+' <label><span class="accesshide">'+M.util.get_string("label_multi","availability")+' </span><select class="availability-op custom-select mx-1" title="'+M.util.get_string("label_multi","availability")+'"><option value="&">'+M.util.get_string("listheader_multi_and","availability")+'</option><option value="|">'+M.util.get_string("listheader_multi_or","availability")+"</option></select></label> "+M.util.get_string("listheader_multi_after","availability")+'</span></div><div class="availability-children"></div><div class="availability-none"><span class="px-3">'+M.util.get_string("none","moodle")+'</span></div><div class="clearfix mt-1"></div><div class="availability-button"></div></div><div class="clearfix"></div></div>'),t||this.node.addClass("availability-childlist d-sm-flex align-items-center"),this.inner=this.node.one("> .availability-inner"),a=!0,t?(i&&i.show!==undefined&&(a=i.show),this.eyeIcon=new M.core_availability.EyeIcon(!1,a),this.node.one(".availability-header").get("firstChild").insert(this.eyeIcon.span,"before"),this.node.one(".availability-header").get("firstChild").insert(this.eyeIcon.disabledSpan,"before"),this.on("availability:privateRuleSet",function(i){i.target.getDOMNode().dataset["private"]=!0,this.updatePrivateStatus()}),this.on("availability:privateRuleUnset",function(i){delete i.target.getDOMNode().dataset["private"],this.updatePrivateStatus()})):e&&(i&&i.showc!==undefined&&(a=i.showc),this.eyeIcon=new M.core_availability.EyeIcon(!1,a),this.inner.insert(this.eyeIcon.span,"before"),this.inner.insert(this.eyeIcon.disabledSpan,"before")),t||(e=new M.core_availability.DeleteIcon(this),(a=this.node.one(".availability-none")).appendChild(document.createTextNode(" ")),a.appendChild(e.span),a.appendChild(d.Node.create('<span class="mt-1 badge bg-warning text-dark">'+M.util.get_string("invalid","availability")+"</span>"))),(t=d.Node.create('<button type="button" class="btn btn-secondary mt-1">'+M.util.get_string("addrestriction","availability")+"</button>")).on("click",function(){this.clickAdd()},
this),this.node.one("div.availability-button").appendChild(t),i){switch(i.op){case"&":case"|":this.node.one(".availability-neg").set("value","");break;case"!&":case"!|":this.node.one(".availability-neg").set("value","!")}switch(i.op){case"&":case"!&":this.node.one(".availability-op").set("value","&");break;case"|":case"!|":this.node.one(".availability-op").set("value","|")}for(l=0;l<i.c.length;l++)n=i.c[l],this.root&&i&&i.showc!==undefined&&(n.showc=i.showc[l]),n=n.type!==undefined?new M.core_availability.Item(n,this.root):new M.core_availability.List(n,!1,this.root),this.addChild(n)}this.node.one(".availability-neg").on("change",function(){M.util.js_pending("availability-neg-change"),M.core_availability.form.update(),this.updateHtml(),M.util.js_complete("availability-neg-change")},this),this.node.one(".availability-op").on("change",function(){M.util.js_pending("availability-op-change"),M.core_availability.form.update(),this.updateHtml(),M.util.js_complete("availability-op-change")},this),this.updateHtml()},d.augment(M.core_availability.List,d.EventTarget,!0,null,{emitFacade:!0}),M.core_availability.List.prototype.addChild=function(i){0<this.children.length&&this.inner.one(".availability-children").appendChild(d.Node.create('<div class="availability-connector"><span class="label"></span></div>')),this.children.push(i),i.addTarget(this),this.inner.one(".availability-children").appendChild(i.node)},M.core_availability.List.prototype.focusAfterAdd=function(){this.inner.one("button").focus()},M.core_availability.List.prototype.isIndividualShowIcons=function(){var i,t;if(this.root)return i="!"===this.node.one(".availability-neg").get("value"),t="|"===this.node.one(".availability-op").get("value"),!i&&!t||i&&t;throw"Can only call this on root list"},M.core_availability.List.prototype.renumber=function(i){var t,e={count:this.children.length},a=i===undefined?e.number="":(e.number=i+":",i+"."),e=M.util.get_string("setheading","availability",e);for(this.node.one("> h3").set("innerHTML",e),this.node.one("> h3").getDOMNode().dataset.restrictionOrder=i||"root",t=0;t<this.children.length;t++)this.children[t].renumber(a+(t+1))},M.core_availability.List.prototype.updateHtml=function(){var i,t,e,a;if(0<this.children.length?(this.inner.one("> .availability-children").removeAttribute("aria-hidden"),this.inner.one("> .availability-none").setAttribute("aria-hidden","true"),this.inner.one("> .availability-header").removeAttribute("aria-hidden"),1<this.children.length?(this.inner.one(".availability-single").setAttribute("aria-hidden","true"),this.inner.one(".availability-multi").removeAttribute("aria-hidden")):(this.inner.one(".availability-single").removeAttribute("aria-hidden"),this.inner.one(".availability-multi").setAttribute("aria-hidden","true"))):(this.inner.one("> .availability-children").setAttribute("aria-hidden","true"),this.inner.one("> .availability-none").removeAttribute("aria-hidden"),this.inner.one("> .availability-header").setAttribute("aria-hidden","true")),this.root){for(i=this.isIndividualShowIcons(),t=0;t<this.children.length;t++)e=this.children[t],i?(e.eyeIcon.span.removeAttribute("aria-hidden"),e.eyeIcon.disabledSpan.removeAttribute("aria-hidden")):(e.eyeIcon.span.setAttribute("aria-hidden","true"),e.eyeIcon.disabledSpan.setAttribute("aria-hidden","true"));i?(this.eyeIcon.span.setAttribute("aria-hidden","true"),this.eyeIcon.disabledSpan.setAttribute("aria-hidden","true")):(this.eyeIcon.span.removeAttribute("aria-hidden"),this.eyeIcon.disabledSpan.removeAttribute("aria-hidden")),this.updatePrivateStatus()}a="&"===this.inner.one(".availability-op").get("value")?M.util.get_string("and","availability"):M.util.get_string("or","availability"),this.inner.all("> .availability-children > .availability-connector span.label").each(function(i){i.set("innerHTML",a)})},M.core_availability.List.prototype.deleteDescendant=function(i){for(var t,e,a=0;a<this.children.length;a++){if((t=this.children[a])===i)return this.children.splice(a,1),e=t.node,0<this.children.length&&(e.previous(".availability-connector")?e.previous(".availability-connector"):e.next(".availability-connector")).remove(),this.inner.one("> .availability-children").removeChild(e),M.core_availability.form.update(),this.updateHtml(),this.inner.one("> .availability-button").one("button").focus(),!0;if(t instanceof M.core_availability.List&&t.deleteDescendant(i))return!0}return!1},M.core_availability.List.prototype.clickAdd=function(){var i,t,e,a,l,n=d.Node.create('<div><ul class="list-unstyled container-fluid"></ul><div class="availability-buttons mdl-align"><button type="button" class="btn btn-secondary">'+M.util.get_string("cancel","moodle")+"</button></div></div>"),o=n.one("button"),s={dialog:null},r=n.one("ul");for(l in M.core_availability.form.plugins)M.core_availability.form.plugins[l].allowAdd&&(i=d.Node.create('<li class="clearfix row"></li>'),(e=d.Node.create('<div class="col-6"><button type="button" class="btn btn-secondary w-100"id="'+(t="availability_addrestriction_"+l)+'">'+M.util.get_string("title","availability_"+l)+"</button></div>")).on("click",this.getAddHandler(l,s),this),i.appendChild(e),a=d.Node.create('<div class="col-6"><label for="'+t+'">'+M.util.get_string("description","availability_"+l)+"</label></div>"),i.appendChild(a),r.appendChild(i));i=d.Node.create('<li class="clearfix row"></li>'),(e=d.Node.create('<div class="col-6"><button type="button" class="btn btn-secondary w-100"id="'+(t="availability_addrestriction_list_")+'">'+M.util.get_string("condition_group","availability")+"</button></div>")).on("click",this.getAddHandler(null,s),this),i.appendChild(e),a=d.Node.create('<div class="col-6"><label for="'+t+'">'+M.util.get_string("condition_group_info","availability")+"</label></div>"),i.appendChild(a),r.appendChild(i),n={headerContent:M.util.get_string("addrestriction","availability"),bodyContent:n,additionalBaseClass:"availability-dialogue",draggable:!0,modal:!0,closeButton:!1,width:"450px"},
s.dialog=new M.core.dialogue(n),s.dialog.show(),o.on("click",function(){s.dialog.destroy(),this.inner.one("> .availability-button").one("button").focus()},this)},M.core_availability.List.prototype.getAddHandler=function(t,e){return function(){var i=!0;t&&M.core_availability.form.plugins[t].displayMode&&(i=!1),i=t?new M.core_availability.Item({type:t,creating:!0,showc:i},this.root):new M.core_availability.List({c:[],showc:i},!1,this.root),this.addChild(i),M.core_availability.form.update(),M.core_availability.form.rootList.renumber(),this.updateHtml(),e.dialog.destroy(),i.focusAfterAdd()}},M.core_availability.List.prototype.getValue=function(){var i,t,e={};for(e.op=this.node.one(".availability-neg").get("value")+this.node.one(".availability-op").get("value"),e.c=[],i=0;i<this.children.length;i++)e.c.push(this.children[i].getValue());if(this.root)if(this.isIndividualShowIcons())for(e.showc=[],i=0;i<this.children.length;i++)t=this.children[i].eyeIcon,e.showc.push(!t.isHidden()&&!t.isDisabled());else e.show=!this.eyeIcon.isHidden()&&!this.eyeIcon.isDisabled();return e},M.core_availability.List.prototype.fillErrors=function(i){0!==this.children.length||this.root||i.push("availability:error_list_nochildren");for(var t=0;t<this.children.length;t++)this.children[t].fillErrors(i)},M.core_availability.List.prototype.hasItemOfType=function(i){for(var t,e=0;e<this.children.length;e++)if((t=this.children[e])instanceof M.core_availability.List){if(t.hasItemOfType(i))return!0}else if(t.pluginType===i)return!0;return!1},M.core_availability.List.prototype.getEyeIcons=function(){var i,t,e=[];for(e.push(this.eyeIcon),i=0;i<this.children.length;i++)null!==(t=this.children[i]).eyeIcon&&e.push(t.eyeIcon),t instanceof M.core_availability.List&&e.concat(t.getEyeIcons());return e},M.core_availability.List.prototype.updatePrivateStatus=function(){var i,t,e,a;if(!this.root)throw new Error("Can only call this on root list");for(i=!this.node.all("[data-private]").isEmpty(),e=0,a=(t=this.getEyeIcons()).length;e<a;e++)i?t[e].setDisabled():t[e].setEnabled()},M.core_availability.List.prototype.eyeIcon=null,M.core_availability.List.prototype.root=!1,M.core_availability.List.prototype.children=null,M.core_availability.List.prototype.node=null,M.core_availability.List.prototype.inner=null,M.core_availability.Item=function(i,t){this.pluginType=i.type,M.core_availability.form.plugins[i.type]===undefined?(this.plugin=null,this.pluginNode=d.Node.create('<div class="availability-warning">'+M.util.get_string("missingplugin","availability")+"</div>")):(this.plugin=M.core_availability.form.plugins[i.type],this.pluginNode=this.plugin.getNode(i),this.pluginNode.addClass("availability_"+i.type)),d.augment(this.pluginNode,d.EventTarget,!0,null,{emitFacade:!0}),this.pluginNode.addTarget(this),this.node=d.Node.create('<div class="availability-item d-sm-flex align-items-center"><h3 class="accesshide"></h3></div>'),t&&(t=!0,i.showc!==undefined&&(t=i.showc),this.eyeIcon=new M.core_availability.EyeIcon(!0,t),this.node.appendChild(this.eyeIcon.span),this.node.appendChild(this.eyeIcon.disabledSpan)),this.pluginNode.addClass("availability-plugincontrols"),this.node.appendChild(this.pluginNode),i=new M.core_availability.DeleteIcon(this),this.node.appendChild(i.span),this.node.appendChild(document.createTextNode(" ")),this.node.appendChild(d.Node.create('<span class="badge bg-warning text-dark"/>'))},d.augment(M.core_availability.Item,d.EventTarget,!0,null,{emitFacade:!0}),M.core_availability.Item.prototype.getValue=function(){var i={type:this.pluginType};return this.plugin&&this.plugin.fillValue(i,this.pluginNode),i},M.core_availability.Item.prototype.fillErrors=function(i){var t,e,a,l=i.length;this.plugin?this.plugin.fillErrors(i,this.pluginNode):i.push("core_availability:item_unknowntype"),t=this.node.one("> .bg-warning"),i.length===l||t.get("firstChild")?i.length===l&&t.get("firstChild")&&t.get("firstChild").remove():(l="",e=(i=i[i.length-1].split(":"))[0],a="[["+(i=i[1])+","+e+"]]",(l=M.util.get_string(i,e))===a&&(l=M.util.get_string("invalid","availability")),t.appendChild(document.createTextNode(l)))},M.core_availability.Item.prototype.renumber=function(i){var t={number:i};this.plugin?t.type=M.util.get_string("title","availability_"+this.pluginType):t.type="["+this.pluginType+"]",t.number=i+":",t=M.util.get_string("itemheading","availability",t),this.node.one("> h3").set("innerHTML",t),this.node.one("> h3").getDOMNode().dataset.restrictionOrder=i||"root"},M.core_availability.Item.prototype.focusAfterAdd=function(){this.plugin.focusAfterAdd(this.pluginNode)},M.core_availability.Item.prototype.pluginType=null,M.core_availability.Item.prototype.plugin=null,M.core_availability.Item.prototype.eyeIcon=null,M.core_availability.Item.prototype.node=null,M.core_availability.Item.prototype.pluginNode=null,M.core_availability.EyeIcon=function(i,t){var e,a,l,n;this.individual=i,this.span=d.Node.create('<a class="availability-eye col-form-label" href="#" role="button">'),e=d.Node.create("<img />"),this.span.appendChild(e),a=i?"_individual":"_all",l=function(){var i=M.util.get_string("hidden"+a,"availability");e.set("src",M.util.image_url("i/show","core")),e.set("alt",i),this.span.set("title",i+" • "+M.util.get_string("show_verb","availability"))},n=function(){var i=M.util.get_string("shown"+a,"availability");e.set("src",M.util.image_url("i/hide","core")),e.set("alt",i),this.span.set("title",i+" • "+M.util.get_string("hide_verb","availability"))},(t?n:l).call(this),this.span.on("click",i=function(i){i.preventDefault(),(this.isHidden()?n:l).call(this),M.core_availability.form.update()},this),this.span.on("key",i,"up:32",this),this.span.on("key",function(i){i.preventDefault()},"down:32",this),this.disabledSpan=d.Node.create('<span class="availability-eye-disabled col-form-label" href="#">'),t=d.Node.create("<img />"),i=M.util.get_string("hidden"+a,"availability"),t.set("src",M.util.image_url("i/show","core")),t.set("alt",i),this.disabledSpan.set("title",
i+" • "+M.util.get_string("disabled_verb","availability")),this.disabledSpan.appendChild(t),this.disabledSpan.hide()},M.core_availability.EyeIcon.prototype.individual=!1,M.core_availability.EyeIcon.prototype.span=null,M.core_availability.EyeIcon.prototype.disabledSpan=null,M.core_availability.EyeIcon.prototype.isHidden=function(){var i=this.individual?"_individual":"_all",i=M.util.get_string("hidden"+i,"availability");return this.span.one("img").get("alt")===i},M.core_availability.EyeIcon.prototype.isDisabled=function(){return this.span.hasAttribute("hidden")},M.core_availability.EyeIcon.prototype.setDisabled=function(){this.isDisabled()||(this.span.hide(),this.disabledSpan.show())},M.core_availability.EyeIcon.prototype.setEnabled=function(){this.isDisabled()&&(this.span.show(),this.disabledSpan.hide())},M.core_availability.DeleteIcon=function(t){var i;this.span=d.Node.create('<a class="d-inline-block col-form-label availability-delete px-3" href="#" title="'+M.util.get_string("delete","moodle")+'" role="button">'),i=d.Node.create('<img src="'+M.util.image_url("t/delete","core")+'" alt="'+M.util.get_string("delete","moodle")+'" />'),this.span.appendChild(i),this.span.on("click",i=function(i){i.preventDefault(),M.core_availability.form.rootList.deleteDescendant(t),M.core_availability.form.rootList.renumber()},this),this.span.on("key",i,"up:32",this),this.span.on("key",function(i){i.preventDefault()},"down:32",this)},M.core_availability.DeleteIcon.prototype.span=null},"@VERSION@",{requires:["base","node","event","event-delegate","panel","moodle-core-notification-dialogue","json"]});