//var script = document.getElementById('zupScript');

var zupportDeskUrl = "https://cp.zupportdesk.com";
var widgetId = "8e8ccd94-5a30-432b-80bd-baff705a3440";
var isPrev = "";


//-- add viewport meta tag
var meta = document.createElement('meta');
meta.name = 'viewport';
meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
window.document.head.appendChild(meta);
//-- / add viewport meta tag
if (document.querySelector("meta[name=viewport]")) {
}
else {

}


if (window.addEventListener) {
    window.addEventListener('message', handleMessage, false);
} else if (window.attachEvent) { // ie8
    window.attachEvent('onmessage', handleMessage);
}
Url = zupportDeskUrl;

var element = document.getElementById('zupScript');
if (!element) {
    var scripts = document.getElementsByTagName("script");
    if (scripts)
        for (var a = 0; a < scripts.length; a++) {
            var i = scripts[a];
            if (element) continue;;
            if (!i.attributes["src"]) continue;
            if (i.attributes["src"].value.indexOf("App/widget/ChatWidget.js?widgetId=") === -1) continue;
            element = i;
            break;
        }
}

var linkN = document.createElement('link');
var widgetContainer = document.createElement('div')
var iframeN = document.createElement('iframe');

linkN.rel = "stylesheet";
linkN.type = "text/css";
linkN.href = Url + '/App/widget/position.css';

widgetContainer.id = "zd-chat-container";

iframeN.src = Url + '/App/widget/baseWidget.html?widgetId=' + widgetId + '&isPrev=' + isPrev;
iframeN.frameBorder = "0";
iframeN.style = "background-color:transparent;";
iframeN.id = "chatFrame";
iframeN.classList.add('hide');
iframeN.onload = function () {
    onloadChat();
}
var body = document.getElementsByTagName('body')[0];
body.appendChild(linkN)
body.appendChild(widgetContainer)
var zdcontainer = document.getElementById('zd-chat-container');
//body.appendChild(iframeN)
zdcontainer.appendChild(iframeN)


function onloadChat() {
    var wn = document.getElementById('chatFrame').contentWindow;
    wn.postMessage("ZupportDesk." + window.location.href, Url);

};

function handleMessage(e) {
    if (e.data === 'setParentBody') {
        var mainPage = document.getElementsByTagName("body");
        if (mainPage && mainPage.length > 0)
            mainPage[0].style.overflow = 'hidden';
        mainPage[0].style.position = 'fixed';
        mainPage[0].style.width = '100%';
        mainPage[0].style.height = '100%';
        mainPage[0].style.top = '0px';
        mainPage[0].style.bottom = '0px';
        mainPage[0].style.left = '0px';
        mainPage[0].style.right = '0px';
        return;
    }

    if (e.data === 'resetParentBody') {
        var mainPage = document.getElementsByTagName("body");
        if (mainPage && mainPage.length > 0)
            mainPage[0].style.overflow = '';
        mainPage[0].style.position = '';
        mainPage[0].style.width = '';
        mainPage[0].style.height = '';
        mainPage[0].style.top = '';
        mainPage[0].style.bottom = '';
        mainPage[0].style.left = '';
        mainPage[0].style.right = '';
        return;
    }


    var body = document.getElementsByTagName('body')[0];
    if (e.data.indexOf('cw') >= 0) {
        var frame = document.getElementById('chatFrame');

        if (e.data.indexOf('cw height') >= 0) {

            var height = e.data.replace("cw height ", "");
            if (height < 62) {
                frame.style.height = '62px';
            } else {
                frame.style.height = (height) + 'px';
            }
        }
        else if (e.data.indexOf('cw width') >= 0) {
            var width = e.data.replace("cw width ", "");
            if (width < 63) {
                frame.style.width = '62px';
            } else {
                frame.style.width = (width) + 'px';
            }
        }
        else if (e.data == 'cw panel expanded') {
            frame.style.height = "805px";
        }
        else if (e.data == 'cw topLeft') {
            frame.classList.add("topLeft");
        }
        else if (e.data == 'cw topRight') {
            frame.classList.add("topRight");
        }
        else if (e.data == 'cw bottomRight') {
            frame.classList.add("bottomRight");
        }
        else if (e.data == 'cw bottomLeft') {
            frame.classList.add("bottomLeft");
        }
        else if (e.data == 'cw topLeft tab') {
            frame.classList.add("tab-topLeft");
        }
        else if (e.data == 'cw topRight tab') {
            frame.classList.add("tab-topRight");
        }
        else if (e.data == 'cw bottomRight tab') {
            frame.classList.add("tab-bottomRight");
        }
        else if (e.data == 'cw bottomLeft tab') {
            frame.classList.add("tab-bottomLeft");
        }
        else if (e.data == 'cw mobile topLeft') {
            frame.classList.add("mobile-topLeft");
        }
        else if (e.data == 'cw mobile topRight') {
            frame.classList.add("mobile-topRight");
        }
        else if (e.data == 'cw mobile bottomRight') {
            frame.classList.add("mobile-bottomRight");
        }
        else if (e.data == 'cw mobile bottomLeft') {
            frame.classList.add("mobile-bottomLeft");
        }
        else if (e.data == "cw mobileCollapsed") {
            frame.classList.remove("mobile-widget");
            body.classList.remove("mobile-body");
            frame.style.height = '120px'
            frame.style.width = '100px';
        }
        else if (e.data == 'cw mobileExpanded') {
            frame.classList.add("mobile-widget");
            body.classList.add("mobile-body");
        }
        else if (e.data = "cw show") {
            frame.classList.add("show");
            frame.classList.remove("hide");
        }
    }
}

function getParamValue(paramName, scripts) {

    // Get an array of key=value strings of params
    var pa = scripts.src.split("?").pop().split("&");

    // Split each key=value into array, the construct js object

    for (var j = 0; j < pa.length; j++) {
        var kv = pa[j].split("=");
        if (kv[0] == paramName)
            return kv[1];
    }
}

function getDay() {
    var d = new Date();
    var n = d.getDate();
    return n;
}
