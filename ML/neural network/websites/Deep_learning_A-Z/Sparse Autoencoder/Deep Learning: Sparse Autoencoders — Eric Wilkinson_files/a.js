YUI.add("squarespace-dynamic-data",function(a){a.namespace("Squarespace");a.Squarespace.DynamicData=function(b){function g(a){return a.replace(/\//g,"")}function k(b,f){var h=f&&a.one(e.search+'[href\x3d"'+f+'"]')||b&&b.currentTarget||null,i=f||h&&h.getAttribute("href"),j;b&&b.preventDefault();c&&(window.location.hash=i);h&&!n&&g(i)!=d.getAttribute(e.activeWrapper)||h&&n&&!d.one("["+e.activeWrapper+"\x3d"+g(i)+"]")?(SQS.Lifecycle.destroy(),d.setAttribute(e.activeWrapper,g(i)),a.all("."+e.active).removeClass(e.active),
h.addClass(e.active),d.removeClass(e.ready),d.addClass(e.loading),f||m(),"function"===typeof l&&l(),n&&(j=a.Node.create("\x3cdiv\x3e\x3c/div\x3e"),j.addClass(e.appendWrapper),j.setAttribute(e.activeWrapper,g(i)),j.appendTo(d)),h=j?j:d,h.load(i,o,function(){var b=p;SQS.Lifecycle.init();Squarespace.initializeCommerce(a);d.all("img[data-src]").each(function(a){a.ancestor(".sqs-layout")||ImageLoader.load(a)});d.all("script").each(function(b){var c=document.createElement("script");c.type="text/javascript";
b.getAttribute("src")?c.src=b.getAttribute("src"):c.innerHTML=b.get("innerHTML");a.one("head").append(c)});"function"===typeof b&&b();d.removeClass(e.loading);d.addClass(e.ready)})):(d.setAttribute(e.activeWrapper,g(i)),f||m())}function m(){var b;if(q){var c=a.UA.gecko?"html":"body";b=d.getXY();b=b[1];b=new a.Anim({node:a.one(document.scrollingElement||c),to:{scroll:[0,b]},duration:0.2,easing:"easeBoth"});b.run()}}var d=b&&b.wrapper||"body",l=b&&b.preCallback||null,p=b&&b.postCallback||null,c=b&&
b.useHashes||!1,f=b&&b.autoOpenHash||!1,o=b&&b.injectEl||null,h=b&&b.minimumResolution||null,q=b&&b.scrollToWrapperPreLoad||!1,n=b&&b.appendData||null,e={search:b&&b.target||".sqs-dynamic-data",active:"sqs-dynamic-data-active",loading:"sqs-dynamic-data-loading",ready:"sqs-dynamic-data-ready",activeWrapper:"data-dynamic-data-link",appendWrapper:"sqs-dynamic-data-wrapper"};this.simulateHash=function(a){a&&(a=a.replace("#",""),k(null,a))};if(!h||window.innerWidth>=h)if(d=a.one(d))a.on("click",k,e.search),
b=window.location.hash,f&&b&&(b=b.replace("#",""),b=b.endsWith("/")?b:b+"/",k(null,b))}},"1.0",{requires:["node","node-load","squarespace-social-buttons"]});
Y.use("node","squarespace-dynamic-data","history-hash",function(a){function b(){var b;if(window.location.hash&&"#"!=window.location.hash){var c=window.location.hash.split("#")[1],c="/"==c.charAt(0)?c:"/"+c,c="/"==c.charAt(c.length-1)?c:c+"/";b=a.one('#projectPages .project[data-url\x3d"'+c+'"]')}b?b.hasAttribute("data-type-protected")||!b.hasClass("page-project")&&!b.hasClass("gallery-project")?window.location.replace(c):(b.hasClass("page-project")&&!b.hasClass("sqs-dynamic-data-ready")&&l["#"+c].simulateHash(c),
a.one("#page").addClass("page-open"),g(),a.all(".active-project").each(function(a){a.removeClass("active-project")}),b.addClass("active-project"),a.one('#projectThumbs a.project[href\x3d"'+c+'"]').addClass("active-project"),b.next(".project")?a.one("#projectNav .next-project").removeClass("disabled"):a.one("#projectNav .next-project").addClass("disabled"),b.previous(".project")?a.one("#projectNav .prev-project").removeClass("disabled"):a.one("#projectNav .prev-project").addClass("disabled"),d(function(){a.all("#projectPages .active-project img.loading").each(function(a){ImageLoader.load(a,
{load:!0})});a.all("#projectPages .active-project .sqs-video-wrapper").each(function(a){a.videoloader.load()})})):(a.one("#page").removeClass("page-open"),g(),a.all(".active-project").removeClass("active-project"))}function g(){var b=a.one("#projectPages .active-project");b&&b.one(".video-block, .code-block, .embed-block, .audio-block")&&(a.fire("audioPlayer:stopAll",{container:b}),b.empty(!0).removeClass("sqs-dynamic-data-ready").removeAttribute("data-dynamic-data-link"));b&&b.one(".sqs-video-wrapper")&&
b.all(".sqs-video-wrapper").each(function(a){a.videoloader.reload()})}function k(){var b=a.all("#projectThumbs img[data-src]"),c=function(){b.each(function(b){b.inRegion(a.one(a.config.win).get("region"))&&ImageLoader.load(b,{load:!0})})};c();a.on("scroll",c,a.config.win);a.one("window").on("resize",function(){c()});var f=a.later(100,this,function(){b.some(function(a){if(a.hasClass("loading"))return!0;if(!a.getAttribute("src"))return ImageLoader.load(a,{load:!0}),!0})||f.cancel()},null,!0)}function m(){a.all("#projectThumbs a.project").each(a.bind(function(b){var c=
b.getAttribute("href");if(a.one('#projectPages [data-url\x3d"'+c+'"]').hasClass("page-project"))l["#"+c]=new a.Squarespace.DynamicData({wrapper:'#projectPages [data-url\x3d"'+c+'"]',target:'a.project[href\x3d"'+c+'"]',injectEl:"section \x3e *",autoOpenHash:!0,useHashes:!0,scrollToWrapperPreLoad:!0});else b.on("click",function(a){a.halt();window.location.hash="#"+b.getAttribute("href")})},this))}function d(b){var c=a.UA.gecko||10<=a.UA.ie?"html":"body",d=a.one("#page").getXY()[1];(new a.Anim({node:a.one(document.scrollingElement||
c),to:{scroll:[0,d]},duration:0.2,easing:a.Easing.easeBoth})).run().on("end",function(){a.one(c).get("scrollTop")!=d&&a.one(c).set("scrollTop",d);b&&b()})}a.on("domready",function(){function g(){var b;a.one("#sidebar")&&(b=a.one("#sidebar").getComputedStyle("height"));b&&a.one("#page").setStyle("minHeight",b)}if(navigator.userAgent.match(/iPhone/i)&&a.one("body.mobile-style-available")){var c=a.one('meta[name\x3d"viewport"]');c.setAttribute("content","width\x3ddevice-width, initial-scale\x3d1, minimum-scale\x3d1, maximum-scale\x3d1");
a.one("body").on("touchstart",function(a){1<a.touches.length&&c.setAttribute("content","width\x3ddevice-width, initial-scale\x3d1")})}f=a.one("body");parseInt(f.getComputedStyle("width"),10);a.one("body").hasClass("layout-style-center")&&a.all("#topNav .subnav").each(function(a){a.setStyle("marginLeft",-(parseInt(a.getComputedStyle("width"),10)/2)+"px")});a.one(".page-image .wrapper")&&(f=function(){a.one(".page-image .wrapper").setStyles({marginTop:-1*parseInt(a.one(".page-image .wrapper").getComputedStyle("height"),
10)/2+"px",opacity:1})},f(),a.one("window").on("resize",f));a.one("#mobileMenuLink a").on("click",function(){var b=parseInt(a.one("#mobileNav .wrapper").get("offsetHeight"),10);a.one("#mobileNav").hasClass("menu-open")?(new a.Anim({node:a.one("#mobileNav"),to:{height:0},duration:0.5,easing:"easeBoth"})).run():(new a.Anim({node:a.one("#mobileNav"),to:{height:b},duration:0.5,easing:"easeBoth"})).run();a.one("#mobileNav").toggleClass("menu-open");a.one("#mobileNav").hasClass("menu-open")&&0==a.one("#mobileNav").get("offsetHeight")&&
(new a.Anim({node:a.one("#mobileNav"),to:{height:b},duration:0.5,easing:"easeBoth"})).run()});a.one("#page").setStyle("opacity",1);a.one(".collection-type-template-page #projectPages, .collection-type-index #projectPages")&&(k(),m(),b(),a.on("hashchange",b),a.one("#projectNav").delegate("click",function(b){var c=a.one("#projectPages .active-project").previous(".project");c?(d(),window.location.hash=c.getAttribute("data-url")):b.currentTarget.addClass("disabled")},".prev-project"),a.one("#projectNav").delegate("click",
function(b){var c=a.one("#projectPages .active-project").next(".project");c?(d(),window.location.hash=c.getAttribute("data-url")):b.currentTarget.addClass("disabled")},".next-project"));var f;g();a.later(1E3,this,g);if(a.Squarespace.Management)a.Squarespace.Management.on("tweak",function(a){"blogSidebarWidth"==a.getName()&&g()})});var l={}});