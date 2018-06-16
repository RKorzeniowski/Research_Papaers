/* qTip2 v2.2.0 viewport | qtip2.com | Licensed MIT, GPL | Mon Dec 16 2013 04:37:24 */

!function(a,b,c){!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):jQuery&&!jQuery.fn.qtip&&a(jQuery)}(function(d){"use strict";function e(a,b,c,e){this.id=c,this.target=a,this.tooltip=A,this.elements={target:a},this._id=N+"-"+c,this.timers={img:{}},this.options=b,this.plugins={},this.cache={event:{},target:d(),disabled:z,attr:e,onTooltip:z,lastClass:""},this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=z}function f(a){return a===A||"object"!==d.type(a)}function g(a){return!(d.isFunction(a)||a&&a.attr||a.length||"object"===d.type(a)&&(a.jquery||a.then))}function h(a){var b,c,e,h;return f(a)?z:(f(a.metadata)&&(a.metadata={type:a.metadata}),"content"in a&&(b=a.content,f(b)||b.jquery||b.done?b=a.content={text:c=g(b)?z:b}:c=b.text,"ajax"in b&&(e=b.ajax,h=e&&e.once!==z,delete b.ajax,b.text=function(a,b){var f=c||d(this).attr(b.options.content.attr)||"Loading...",g=d.ajax(d.extend({},e,{context:b})).then(e.success,A,e.error).then(function(a){return a&&h&&b.set("content.text",a),a},function(a,c,d){b.destroyed||0===a.status||b.set("content.text",c+": "+d)});return h?f:(b.set("content.text",f),g)}),"title"in b&&(f(b.title)||(b.button=b.title.button,b.title=b.title.text),g(b.title||z)&&(b.title=z))),"position"in a&&f(a.position)&&(a.position={my:a.position,at:a.position}),"show"in a&&f(a.show)&&(a.show=a.show.jquery?{target:a.show}:a.show===y?{ready:y}:{event:a.show}),"hide"in a&&f(a.hide)&&(a.hide=a.hide.jquery?{target:a.hide}:{event:a.hide}),"style"in a&&f(a.style)&&(a.style={classes:a.style}),d.each(M,function(){this.sanitize&&this.sanitize(a)}),a)}function i(a,b){for(var c,d=0,e=a,f=b.split(".");e=e[f[d++]];)d<f.length&&(c=e);return[c||a,f.pop()]}function j(a,b){var c,d,e;for(c in this.checks)for(d in this.checks[c])(e=new RegExp(d,"i").exec(a))&&(b.push(e),("builtin"===c||this.plugins[c])&&this.checks[c][d].apply(this.plugins[c]||this,b))}function k(a){return Q.concat("").join(a?"-"+a+" ":" ")}function l(c){return c&&{type:c.type,pageX:c.pageX,pageY:c.pageY,target:c.target,relatedTarget:c.relatedTarget,scrollX:c.scrollX||a.pageXOffset||b.body.scrollLeft||b.documentElement.scrollLeft,scrollY:c.scrollY||a.pageYOffset||b.body.scrollTop||b.documentElement.scrollTop}||{}}function m(a,b){return b>0?setTimeout(d.proxy(a,this),b):(a.call(this),void 0)}function n(a){return this.tooltip.hasClass(X)?z:(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this.timers.show=m.call(this,function(){this.toggle(y,a)},this.options.show.delay),void 0)}function o(a){if(this.tooltip.hasClass(X))return z;var b=d(a.relatedTarget),c=b.closest(R)[0]===this.tooltip[0],e=b[0]===this.options.show.target[0];if(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this!==b[0]&&"mouse"===this.options.position.target&&c||this.options.hide.fixed&&/mouse(out|leave|move)/.test(a.type)&&(c||e))try{a.preventDefault(),a.stopImmediatePropagation()}catch(f){}else this.timers.hide=m.call(this,function(){this.toggle(z,a)},this.options.hide.delay,this)}function p(a){return this.tooltip.hasClass(X)||!this.options.hide.inactive?z:(clearTimeout(this.timers.inactive),this.timers.inactive=m.call(this,function(){this.hide(a)},this.options.hide.inactive),void 0)}function q(a){this.rendered&&this.tooltip[0].offsetWidth>0&&this.reposition(a)}function r(a,c,e){d(b.body).delegate(a,(c.split?c:c.join(cb+" "))+cb,function(){var a=t.api[d.attr(this,P)];a&&!a.disabled&&e.apply(a,arguments)})}function s(a,c,f){var g,i,j,k,l,m=d(b.body),n=a[0]===b?m:a,o=a.metadata?a.metadata(f.metadata):A,p="html5"===f.metadata.type&&o?o[f.metadata.name]:A,q=a.data(f.metadata.name||"qtipopts");try{q="string"==typeof q?d.parseJSON(q):q}catch(r){}if(k=d.extend(y,{},t.defaults,f,"object"==typeof q?h(q):A,h(p||o)),i=k.position,k.id=c,"boolean"==typeof k.content.text){if(j=a.attr(k.content.attr),k.content.attr===z||!j)return z;k.content.text=j}if(i.container.length||(i.container=m),i.target===z&&(i.target=n),k.show.target===z&&(k.show.target=n),k.show.solo===y&&(k.show.solo=i.container.closest("body")),k.hide.target===z&&(k.hide.target=n),k.position.viewport===y&&(k.position.viewport=i.container),i.container=i.container.eq(0),i.at=new v(i.at,y),i.my=new v(i.my),a.data(N))if(k.overwrite)a.qtip("destroy",!0);else if(k.overwrite===z)return z;return a.attr(O,c),k.suppress&&(l=a.attr("title"))&&a.removeAttr("title").attr(Z,l).attr("title",""),g=new e(a,k,c,!!j),a.data(N,g),a.one("remove.qtip-"+c+" removeqtip.qtip-"+c,function(){var a;(a=d(this).data(N))&&a.destroy(!0)}),g}var t,u,v,w,x,y=!0,z=!1,A=null,B="x",C="y",D="width",E="height",F="top",G="left",H="bottom",I="right",J="center",K="flipinvert",L="shift",M={},N="qtip",O="data-hasqtip",P="data-qtip-id",Q=["ui-widget","ui-tooltip"],R="."+N,S="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),T=N+"-fixed",U=N+"-default",V=N+"-focus",W=N+"-hover",X=N+"-disabled",Y="_replacedByqTip",Z="oldtitle",$={ie:function(){for(var a=3,c=b.createElement("div");(c.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->")&&c.getElementsByTagName("i")[0];);return a>4?a:0/0}(),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||z};u=e.prototype,u._when=function(a){return d.when.apply(d,a)},u.render=function(a){if(this.rendered||this.destroyed)return this;var b,c=this,e=this.options,f=this.cache,g=this.elements,h=e.content.text,i=e.content.title,j=e.content.button,k=e.position,l=("."+this._id+" ",[]);return d.attr(this.target[0],"aria-describedby",this._id),this.tooltip=g.tooltip=b=d("<div/>",{id:this._id,"class":[N,U,e.style.classes,N+"-pos-"+e.position.my.abbrev()].join(" "),width:e.style.width||"",height:e.style.height||"",tracking:"mouse"===k.target&&k.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":z,"aria-describedby":this._id+"-content","aria-hidden":y}).toggleClass(X,this.disabled).attr(P,this.id).data(N,this).appendTo(k.container).append(g.content=d("<div />",{"class":N+"-content",id:this._id+"-content","aria-atomic":y})),this.rendered=-1,this.positioning=y,i&&(this._createTitle(),d.isFunction(i)||l.push(this._updateTitle(i,z))),j&&this._createButton(),d.isFunction(h)||l.push(this._updateContent(h,z)),this.rendered=y,this._setWidget(),d.each(M,function(a){var b;"render"===this.initialize&&(b=this(c))&&(c.plugins[a]=b)}),this._unassignEvents(),this._assignEvents(),this._when(l).then(function(){c._trigger("render"),c.positioning=z,c.hiddenDuringWait||!e.show.ready&&!a||c.toggle(y,f.event,z),c.hiddenDuringWait=z}),t.api[this.id]=this,this},u.destroy=function(a){function b(){if(!this.destroyed){this.destroyed=y;var a=this.target,b=a.attr(Z);this.rendered&&this.tooltip.stop(1,0).find("*").remove().end().remove(),d.each(this.plugins,function(){this.destroy&&this.destroy()}),clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this._unassignEvents(),a.removeData(N).removeAttr(P).removeAttr(O).removeAttr("aria-describedby"),this.options.suppress&&b&&a.attr("title",b).removeAttr(Z),this._unbind(a),this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=A,delete t.api[this.id]}}return this.destroyed?this.target:(a===y&&"hide"!==this.triggering||!this.rendered?b.call(this):(this.tooltip.one("tooltiphidden",d.proxy(b,this)),!this.triggering&&this.hide()),this.target)},w=u.checks={builtin:{"^id$":function(a,b,c,e){var f=c===y?t.nextid:c,g=N+"-"+f;f!==z&&f.length>0&&!d("#"+g).length?(this._id=g,this.rendered&&(this.tooltip[0].id=this._id,this.elements.content[0].id=this._id+"-content",this.elements.title[0].id=this._id+"-title")):a[b]=e},"^prerender":function(a,b,c){c&&!this.rendered&&this.render(this.options.show.ready)},"^content.text$":function(a,b,c){this._updateContent(c)},"^content.attr$":function(a,b,c,d){this.options.content.text===this.target.attr(d)&&this._updateContent(this.target.attr(c))},"^content.title$":function(a,b,c){return c?(c&&!this.elements.title&&this._createTitle(),this._updateTitle(c),void 0):this._removeTitle()},"^content.button$":function(a,b,c){this._updateButton(c)},"^content.title.(text|button)$":function(a,b,c){this.set("content."+b,c)},"^position.(my|at)$":function(a,b,c){"string"==typeof c&&(a[b]=new v(c,"at"===b))},"^position.container$":function(a,b,c){this.rendered&&this.tooltip.appendTo(c)},"^show.ready$":function(a,b,c){c&&(!this.rendered&&this.render(y)||this.toggle(y))},"^style.classes$":function(a,b,c,d){this.rendered&&this.tooltip.removeClass(d).addClass(c)},"^style.(width|height)":function(a,b,c){this.rendered&&this.tooltip.css(b,c)},"^style.widget|content.title":function(){this.rendered&&this._setWidget()},"^style.def":function(a,b,c){this.rendered&&this.tooltip.toggleClass(U,!!c)},"^events.(render|show|move|hide|focus|blur)$":function(a,b,c){this.rendered&&this.tooltip[(d.isFunction(c)?"":"un")+"bind"]("tooltip"+b,c)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){if(this.rendered){var a=this.options.position;this.tooltip.attr("tracking","mouse"===a.target&&a.adjust.mouse),this._unassignEvents(),this._assignEvents()}}}},u.get=function(a){if(this.destroyed)return this;var b=i(this.options,a.toLowerCase()),c=b[0][b[1]];return c.precedance?c.string():c};var _=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,ab=/^prerender|show\.ready/i;u.set=function(a,b){if(this.destroyed)return this;{var c,e=this.rendered,f=z,g=this.options;this.checks}return"string"==typeof a?(c=a,a={},a[c]=b):a=d.extend({},a),d.each(a,function(b,c){if(e&&ab.test(b))return delete a[b],void 0;var h,j=i(g,b.toLowerCase());h=j[0][j[1]],j[0][j[1]]=c&&c.nodeType?d(c):c,f=_.test(b)||f,a[b]=[j[0],j[1],c,h]}),h(g),this.positioning=y,d.each(a,d.proxy(j,this)),this.positioning=z,this.rendered&&this.tooltip[0].offsetWidth>0&&f&&this.reposition("mouse"===g.position.target?A:this.cache.event),this},u._update=function(a,b){var c=this,e=this.cache;return this.rendered&&a?(d.isFunction(a)&&(a=a.call(this.elements.target,e.event,this)||""),d.isFunction(a.then)?(e.waiting=y,a.then(function(a){return e.waiting=z,c._update(a,b)},A,function(a){return c._update(a,b)})):a===z||!a&&""!==a?z:(a.jquery&&a.length>0?b.empty().append(a.css({display:"block",visibility:"visible"})):b.html(a),this._waitForContent(b).then(function(a){a.images&&a.images.length&&c.rendered&&c.tooltip[0].offsetWidth>0&&c.reposition(e.event,!a.length)}))):z},u._waitForContent=function(a){var b=this.cache;return b.waiting=y,(d.fn.imagesLoaded?a.imagesLoaded():d.Deferred().resolve([])).done(function(){b.waiting=z}).promise()},u._updateContent=function(a,b){this._update(a,this.elements.content,b)},u._updateTitle=function(a,b){this._update(a,this.elements.title,b)===z&&this._removeTitle(z)},u._createTitle=function(){var a=this.elements,b=this._id+"-title";a.titlebar&&this._removeTitle(),a.titlebar=d("<div />",{"class":N+"-titlebar "+(this.options.style.widget?k("header"):"")}).append(a.title=d("<div />",{id:b,"class":N+"-title","aria-atomic":y})).insertBefore(a.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(a){d(this).toggleClass("ui-state-active ui-state-focus","down"===a.type.substr(-4))}).delegate(".qtip-close","mouseover mouseout",function(a){d(this).toggleClass("ui-state-hover","mouseover"===a.type)}),this.options.content.button&&this._createButton()},u._removeTitle=function(a){var b=this.elements;b.title&&(b.titlebar.remove(),b.titlebar=b.title=b.button=A,a!==z&&this.reposition())},u.reposition=function(c,e){if(!this.rendered||this.positioning||this.destroyed)return this;this.positioning=y;var f,g,h=this.cache,i=this.tooltip,j=this.options.position,k=j.target,l=j.my,m=j.at,n=j.viewport,o=j.container,p=j.adjust,q=p.method.split(" "),r=i.outerWidth(z),s=i.outerHeight(z),t=0,u=0,v=i.css("position"),w={left:0,top:0},x=i[0].offsetWidth>0,A=c&&"scroll"===c.type,B=d(a),C=o[0].ownerDocument,D=this.mouse;if(d.isArray(k)&&2===k.length)m={x:G,y:F},w={left:k[0],top:k[1]};else if("mouse"===k)m={x:G,y:F},!D||!D.pageX||!p.mouse&&c&&c.pageX?c&&c.pageX||((!p.mouse||this.options.show.distance)&&h.origin&&h.origin.pageX?c=h.origin:(!c||c&&("resize"===c.type||"scroll"===c.type))&&(c=h.event)):c=D,"static"!==v&&(w=o.offset()),C.body.offsetWidth!==(a.innerWidth||C.documentElement.clientWidth)&&(g=d(b.body).offset()),w={left:c.pageX-w.left+(g&&g.left||0),top:c.pageY-w.top+(g&&g.top||0)},p.mouse&&A&&D&&(w.left-=(D.scrollX||0)-B.scrollLeft(),w.top-=(D.scrollY||0)-B.scrollTop());else{if("event"===k?c&&c.target&&"scroll"!==c.type&&"resize"!==c.type?h.target=d(c.target):c.target||(h.target=this.elements.target):"event"!==k&&(h.target=d(k.jquery?k:this.elements.target)),k=h.target,k=d(k).eq(0),0===k.length)return this;k[0]===b||k[0]===a?(t=$.iOS?a.innerWidth:k.width(),u=$.iOS?a.innerHeight:k.height(),k[0]===a&&(w={top:(n||k).scrollTop(),left:(n||k).scrollLeft()})):M.imagemap&&k.is("area")?f=M.imagemap(this,k,m,M.viewport?q:z):M.svg&&k&&k[0].ownerSVGElement?f=M.svg(this,k,m,M.viewport?q:z):(t=k.outerWidth(z),u=k.outerHeight(z),w=k.offset()),f&&(t=f.width,u=f.height,g=f.offset,w=f.position),w=this.reposition.offset(k,w,o),($.iOS>3.1&&$.iOS<4.1||$.iOS>=4.3&&$.iOS<4.33||!$.iOS&&"fixed"===v)&&(w.left-=B.scrollLeft(),w.top-=B.scrollTop()),(!f||f&&f.adjustable!==z)&&(w.left+=m.x===I?t:m.x===J?t/2:0,w.top+=m.y===H?u:m.y===J?u/2:0)}return w.left+=p.x+(l.x===I?-r:l.x===J?-r/2:0),w.top+=p.y+(l.y===H?-s:l.y===J?-s/2:0),M.viewport?(w.adjusted=M.viewport(this,w,j,t,u,r,s),g&&w.adjusted.left&&(w.left+=g.left),g&&w.adjusted.top&&(w.top+=g.top)):w.adjusted={left:0,top:0},this._trigger("move",[w,n.elem||n],c)?(delete w.adjusted,e===z||!x||isNaN(w.left)||isNaN(w.top)||"mouse"===k||!d.isFunction(j.effect)?i.css(w):d.isFunction(j.effect)&&(j.effect.call(i,this,d.extend({},w)),i.queue(function(a){d(this).css({opacity:"",height:""}),$.ie&&this.style.removeAttribute("filter"),a()})),this.positioning=z,this):this},u.reposition.offset=function(a,c,e){function f(a,b){c.left+=b*a.scrollLeft(),c.top+=b*a.scrollTop()}if(!e[0])return c;var g,h,i,j,k=d(a[0].ownerDocument),l=!!$.ie&&"CSS1Compat"!==b.compatMode,m=e[0];do"static"!==(h=d.css(m,"position"))&&("fixed"===h?(i=m.getBoundingClientRect(),f(k,-1)):(i=d(m).position(),i.left+=parseFloat(d.css(m,"borderLeftWidth"))||0,i.top+=parseFloat(d.css(m,"borderTopWidth"))||0),c.left-=i.left+(parseFloat(d.css(m,"marginLeft"))||0),c.top-=i.top+(parseFloat(d.css(m,"marginTop"))||0),g||"hidden"===(j=d.css(m,"overflow"))||"visible"===j||(g=d(m)));while(m=m.offsetParent);return g&&(g[0]!==k[0]||l)&&f(g,1),c};var bb=(v=u.reposition.Corner=function(a,b){a=(""+a).replace(/([A-Z])/," $1").replace(/middle/gi,J).toLowerCase(),this.x=(a.match(/left|right/i)||a.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(a.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase(),this.forceY=!!b;var c=a.charAt(0);this.precedance="t"===c||"b"===c?C:B}).prototype;bb.invert=function(a,b){this[a]=this[a]===G?I:this[a]===I?G:b||this[a]},bb.string=function(){var a=this.x,b=this.y;return a===b?a:this.precedance===C||this.forceY&&"center"!==b?b+" "+a:a+" "+b},bb.abbrev=function(){var a=this.string().split(" ");return a[0].charAt(0)+(a[1]&&a[1].charAt(0)||"")},bb.clone=function(){return new v(this.string(),this.forceY)},u.toggle=function(a,c){var e=this.cache,f=this.options,g=this.tooltip;if(c){if(/over|enter/.test(c.type)&&/out|leave/.test(e.event.type)&&f.show.target.add(c.target).length===f.show.target.length&&g.has(c.relatedTarget).length)return this;e.event=l(c)}if(this.waiting&&!a&&(this.hiddenDuringWait=y),!this.rendered)return a?this.render(1):this;if(this.destroyed||this.disabled)return this;var h,i,j,k=a?"show":"hide",m=this.options[k],n=(this.options[a?"hide":"show"],this.options.position),o=this.options.content,p=this.tooltip.css("width"),q=this.tooltip.is(":visible"),r=a||1===m.target.length,s=!c||m.target.length<2||e.target[0]===c.target;return(typeof a).search("boolean|number")&&(a=!q),h=!g.is(":animated")&&q===a&&s,i=h?A:!!this._trigger(k,[90]),this.destroyed?this:(i!==z&&a&&this.focus(c),!i||h?this:(d.attr(g[0],"aria-hidden",!a),a?(e.origin=l(this.mouse),d.isFunction(o.text)&&this._updateContent(o.text,z),d.isFunction(o.title)&&this._updateTitle(o.title,z),!x&&"mouse"===n.target&&n.adjust.mouse&&(d(b).bind("mousemove."+N,this._storeMouse),x=y),p||g.css("width",g.outerWidth(z)),this.reposition(c,arguments[2]),p||g.css("width",""),m.solo&&("string"==typeof m.solo?d(m.solo):d(R,m.solo)).not(g).not(m.target).qtip("hide",d.Event("tooltipsolo"))):(clearTimeout(this.timers.show),delete e.origin,x&&!d(R+'[tracking="true"]:visible',m.solo).not(g).length&&(d(b).unbind("mousemove."+N),x=z),this.blur(c)),j=d.proxy(function(){a?($.ie&&g[0].style.removeAttribute("filter"),g.css("overflow",""),"string"==typeof m.autofocus&&d(this.options.show.autofocus,g).focus(),this.options.show.target.trigger("qtip-"+this.id+"-inactive")):g.css({display:"",visibility:"",opacity:"",left:"",top:""}),this._trigger(a?"visible":"hidden")},this),m.effect===z||r===z?(g[k](),j()):d.isFunction(m.effect)?(g.stop(1,1),m.effect.call(g,this),g.queue("fx",function(a){j(),a()})):g.fadeTo(90,a?1:0,j),a&&m.target.trigger("qtip-"+this.id+"-inactive"),this))},u.show=function(a){return this.toggle(y,a)},u.hide=function(a){return this.toggle(z,a)},u.focus=function(a){if(!this.rendered||this.destroyed)return this;var b=d(R),c=this.tooltip,e=parseInt(c[0].style.zIndex,10),f=t.zindex+b.length;return c.hasClass(V)||this._trigger("focus",[f],a)&&(e!==f&&(b.each(function(){this.style.zIndex>e&&(this.style.zIndex=this.style.zIndex-1)}),b.filter("."+V).qtip("blur",a)),c.addClass(V)[0].style.zIndex=f),this},u.blur=function(a){return!this.rendered||this.destroyed?this:(this.tooltip.removeClass(V),this._trigger("blur",[this.tooltip.css("zIndex")],a),this)},u.disable=function(a){return this.destroyed?this:("toggle"===a?a=!(this.rendered?this.tooltip.hasClass(X):this.disabled):"boolean"!=typeof a&&(a=y),this.rendered&&this.tooltip.toggleClass(X,a).attr("aria-disabled",a),this.disabled=!!a,this)},u.enable=function(){return this.disable(z)},u._createButton=function(){var a=this,b=this.elements,c=b.tooltip,e=this.options.content.button,f="string"==typeof e,g=f?e:"Close tooltip";b.button&&b.button.remove(),b.button=e.jquery?e:d("<a />",{"class":"qtip-close "+(this.options.style.widget?"":N+"-icon"),title:g,"aria-label":g}).prepend(d("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"})),b.button.appendTo(b.titlebar||c).attr("role","button").click(function(b){return c.hasClass(X)||a.hide(b),z})},u._updateButton=function(a){if(!this.rendered)return z;var b=this.elements.button;a?this._createButton():b.remove()},u._setWidget=function(){var a=this.options.style.widget,b=this.elements,c=b.tooltip,d=c.hasClass(X);c.removeClass(X),X=a?"ui-state-disabled":"qtip-disabled",c.toggleClass(X,d),c.toggleClass("ui-helper-reset "+k(),a).toggleClass(U,this.options.style.def&&!a),b.content&&b.content.toggleClass(k("content"),a),b.titlebar&&b.titlebar.toggleClass(k("header"),a),b.button&&b.button.toggleClass(N+"-icon",!a)},u._storeMouse=function(a){(this.mouse=l(a)).type="mousemove"},u._bind=function(a,b,c,e,f){var g="."+this._id+(e?"-"+e:"");b.length&&d(a).bind((b.split?b:b.join(g+" "))+g,d.proxy(c,f||this))},u._unbind=function(a,b){d(a).unbind("."+this._id+(b?"-"+b:""))};var cb="."+N;d(function(){r(R,["mouseenter","mouseleave"],function(a){var b="mouseenter"===a.type,c=d(a.currentTarget),e=d(a.relatedTarget||a.target),f=this.options;b?(this.focus(a),c.hasClass(T)&&!c.hasClass(X)&&clearTimeout(this.timers.hide)):"mouse"===f.position.target&&f.hide.event&&f.show.target&&!e.closest(f.show.target[0]).length&&this.hide(a),c.toggleClass(W,b)}),r("["+P+"]",S,p)}),u._trigger=function(a,b,c){var e=d.Event("tooltip"+a);return e.originalEvent=c&&d.extend({},c)||this.cache.event||A,this.triggering=a,this.tooltip.trigger(e,[this].concat(b||[])),this.triggering=z,!e.isDefaultPrevented()},u._bindEvents=function(a,b,c,e,f,g){if(e.add(c).length===e.length){var h=[];b=d.map(b,function(b){var c=d.inArray(b,a);return c>-1?(h.push(a.splice(c,1)[0]),void 0):b}),h.length&&this._bind(c,h,function(a){var b=this.rendered?this.tooltip[0].offsetWidth>0:!1;(b?g:f).call(this,a)})}this._bind(c,a,f),this._bind(e,b,g)},u._assignInitialEvents=function(a){function b(a){return this.disabled||this.destroyed?z:(this.cache.event=l(a),this.cache.target=a?d(a.target):[c],clearTimeout(this.timers.show),this.timers.show=m.call(this,function(){this.render("object"==typeof a||e.show.ready)},e.show.delay),void 0)}var e=this.options,f=e.show.target,g=e.hide.target,h=e.show.event?d.trim(""+e.show.event).split(" "):[],i=e.hide.event?d.trim(""+e.hide.event).split(" "):[];/mouse(over|enter)/i.test(e.show.event)&&!/mouse(out|leave)/i.test(e.hide.event)&&i.push("mouseleave"),this._bind(f,"mousemove",function(a){this._storeMouse(a),this.cache.onTarget=y}),this._bindEvents(h,i,f,g,b,function(){clearTimeout(this.timers.show)}),(e.show.ready||e.prerender)&&b.call(this,a)},u._assignEvents=function(){var c=this,e=this.options,f=e.position,g=this.tooltip,h=e.show.target,i=e.hide.target,j=f.container,k=f.viewport,l=d(b),m=(d(b.body),d(a)),r=e.show.event?d.trim(""+e.show.event).split(" "):[],s=e.hide.event?d.trim(""+e.hide.event).split(" "):[];d.each(e.events,function(a,b){c._bind(g,"toggle"===a?["tooltipshow","tooltiphide"]:["tooltip"+a],b,null,g)}),/mouse(out|leave)/i.test(e.hide.event)&&"window"===e.hide.leave&&this._bind(l,["mouseout","blur"],function(a){/select|option/.test(a.target.nodeName)||a.relatedTarget||this.hide(a)}),e.hide.fixed?i=i.add(g.addClass(T)):/mouse(over|enter)/i.test(e.show.event)&&this._bind(i,"mouseleave",function(){clearTimeout(this.timers.show)}),(""+e.hide.event).indexOf("unfocus")>-1&&this._bind(j.closest("html"),["mousedown","touchstart"],function(a){var b=d(a.target),c=this.rendered&&!this.tooltip.hasClass(X)&&this.tooltip[0].offsetWidth>0,e=b.parents(R).filter(this.tooltip[0]).length>0;b[0]===this.target[0]||b[0]===this.tooltip[0]||e||this.target.has(b[0]).length||!c||this.hide(a)}),"number"==typeof e.hide.inactive&&(this._bind(h,"qtip-"+this.id+"-inactive",p),this._bind(i.add(g),t.inactiveEvents,p,"-inactive")),this._bindEvents(r,s,h,i,n,o),this._bind(h.add(g),"mousemove",function(a){if("number"==typeof e.hide.distance){var b=this.cache.origin||{},c=this.options.hide.distance,d=Math.abs;(d(a.pageX-b.pageX)>=c||d(a.pageY-b.pageY)>=c)&&this.hide(a)}this._storeMouse(a)}),"mouse"===f.target&&f.adjust.mouse&&(e.hide.event&&this._bind(h,["mouseenter","mouseleave"],function(a){this.cache.onTarget="mouseenter"===a.type}),this._bind(l,"mousemove",function(a){this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(X)&&this.tooltip[0].offsetWidth>0&&this.reposition(a)})),(f.adjust.resize||k.length)&&this._bind(d.event.special.resize?k:m,"resize",q),f.adjust.scroll&&this._bind(m.add(f.container),"scroll",q)},u._unassignEvents=function(){var c=[this.options.show.target[0],this.options.hide.target[0],this.rendered&&this.tooltip[0],this.options.position.container[0],this.options.position.viewport[0],this.options.position.container.closest("html")[0],a,b];this._unbind(d([]).pushStack(d.grep(c,function(a){return"object"==typeof a})))},t=d.fn.qtip=function(a,b,e){var f=(""+a).toLowerCase(),g=A,i=d.makeArray(arguments).slice(1),j=i[i.length-1],k=this[0]?d.data(this[0],N):A;return!arguments.length&&k||"api"===f?k:"string"==typeof a?(this.each(function(){var a=d.data(this,N);if(!a)return y;if(j&&j.timeStamp&&(a.cache.event=j),!b||"option"!==f&&"options"!==f)a[f]&&a[f].apply(a,i);else{if(e===c&&!d.isPlainObject(b))return g=a.get(b),z;a.set(b,e)}}),g!==A?g:this):"object"!=typeof a&&arguments.length?void 0:(k=h(d.extend(y,{},a)),this.each(function(a){var b,c;return c=d.isArray(k.id)?k.id[a]:k.id,c=!c||c===z||c.length<1||t.api[c]?t.nextid++:c,b=s(d(this),c,k),b===z?y:(t.api[c]=b,d.each(M,function(){"initialize"===this.initialize&&this(b)}),b._assignInitialEvents(j),void 0)}))},d.qtip=e,t.api={},d.each({attr:function(a,b){if(this.length){var c=this[0],e="title",f=d.data(c,"qtip");if(a===e&&f&&"object"==typeof f&&f.options.suppress)return arguments.length<2?d.attr(c,Z):(f&&f.options.content.attr===e&&f.cache.attr&&f.set("content.text",b),this.attr(Z,b))}return d.fn["attr"+Y].apply(this,arguments)},clone:function(a){var b=(d([]),d.fn["clone"+Y].apply(this,arguments));return a||b.filter("["+Z+"]").attr("title",function(){return d.attr(this,Z)}).removeAttr(Z),b}},function(a,b){if(!b||d.fn[a+Y])return y;var c=d.fn[a+Y]=d.fn[a];d.fn[a]=function(){return b.apply(this,arguments)||c.apply(this,arguments)}}),d.ui||(d["cleanData"+Y]=d.cleanData,d.cleanData=function(a){for(var b,c=0;(b=d(a[c])).length;c++)if(b.attr(O))try{b.triggerHandler("removeqtip")}catch(e){}d["cleanData"+Y].apply(this,arguments)}),t.version="2.2.0",t.nextid=0,t.inactiveEvents=S,t.zindex=15e3,t.defaults={prerender:z,id:z,overwrite:y,suppress:y,content:{text:y,attr:"title",title:z,button:z},position:{my:"top left",at:"bottom right",target:z,container:z,viewport:z,adjust:{x:0,y:0,mouse:y,scroll:y,resize:y,method:"flipinvert flipinvert"},effect:function(a,b){d(this).animate(b,{duration:200,queue:z})}},show:{target:z,event:"mouseenter",effect:y,delay:90,solo:z,ready:z,autofocus:z},hide:{target:z,event:"mouseleave",effect:y,delay:0,fixed:z,inactive:z,leave:"window",distance:z},style:{classes:"",widget:z,width:z,height:z,def:y},events:{render:A,move:A,show:A,hide:A,toggle:A,visible:A,hidden:A,focus:A,blur:A}},M.viewport=function(c,d,e,f,g,h,i){function j(a,b,c,e,f,g,h,i,j){var k=d[f],m=v[a],t=w[a],u=c===L,x=m===f?j:m===g?-j:-j/2,y=t===f?i:t===g?-i:-i/2,z=r[f]+s[f]-(o?0:n[f]),A=z-k,B=k+j-(h===D?p:q)-z,C=x-(v.precedance===a||m===v[b]?y:0)-(t===J?i/2:0);return u?(C=(m===f?1:-1)*x,d[f]+=A>0?A:B>0?-B:0,d[f]=Math.max(-n[f]+s[f],k-C,Math.min(Math.max(-n[f]+s[f]+(h===D?p:q),k+C),d[f],"center"===m?k-x:1e9))):(e*=c===K?2:0,A>0&&(m!==f||B>0)?(d[f]-=C+e,l.invert(a,f)):B>0&&(m!==g||A>0)&&(d[f]-=(m===J?-C:C)+e,l.invert(a,g)),d[f]<r&&-d[f]>B&&(d[f]=k,l=v.clone())),d[f]-k}var k,l,m,n,o,p,q,r,s,t=e.target,u=c.elements.tooltip,v=e.my,w=e.at,x=e.adjust,y=x.method.split(" "),A=y[0],M=y[1]||y[0],O=e.viewport,P=e.container,Q=c.cache,R={left:0,top:0};return O.jquery&&t[0]!==a&&t[0]!==b.body&&"none"!==x.method?(n=P.offset()||R,o="static"===P.css("position"),k="fixed"===u.css("position"),p=O[0]===a?O.width():O.outerWidth(z),q=O[0]===a?O.height():O.outerHeight(z),r={left:k?0:O.scrollLeft(),top:k?0:O.scrollTop()},s=O.offset()||R,("shift"!==A||"shift"!==M)&&(l=v.clone()),R={left:"none"!==A?j(B,C,A,x.x,G,I,D,f,h):0,top:"none"!==M?j(C,B,M,x.y,F,H,E,g,i):0},l&&Q.lastClass!==(m=N+"-pos-"+l.abbrev())&&u.removeClass(c.cache.lastClass).addClass(c.cache.lastClass=m),R):R}})}(window,document);
//# sourceMappingURL=http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0//var/www/qtip2/build/tmp/tmp-94043255ps0/jquery.qtip.min.map