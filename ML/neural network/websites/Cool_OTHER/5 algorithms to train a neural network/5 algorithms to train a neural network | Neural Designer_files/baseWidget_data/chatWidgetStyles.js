var Url = ProtocolUrl + ControlPanelUrl;
var parentEvent;
var messageCounter = 0;
var isCollapsed = false;
var widgetId = getParamValue('widgetId');
var isHosted = getParamValue('hosted');
var isPreview = getParamValue('isPrev');
var IsOperatorsAvailable = null;
var isMobile = false;
var isBannedIP = false;
var geoData;
var myVar;

//var Ip;
//v/ar geoData;
function loadWidget() {

    var webApiUrl = ProtocolUrl + ChatAPIServiceUrl + "/api/Chat";
    var isPrev = !isPreview || isPreview == "" ? false : isPreview == "true" ? true : false;
    $.get(webApiUrl + "/GetWidget",
        { 'widgetId': widgetId, "isPrev": isPrev, "Date": new Date() },
        function (data) {
            setting = data.ReturnObj.WidgetModel;
            geoData = data.ReturnObj.GeoData
            $("body").trigger("SettingsRecieved", setting);
            Ip = geoData.IP;
            isBannedIP = data.ReturnObj.IsBannedIp;
            loadIP(setting.CompanyID);
            var pageUrl = "";
            if (!isHosted) {
                pageUrl = parentEvent.data;
            } else {
                pageUrl = window.location.href;
            }
            localStorage.removeItem("sendingReq");


            //$.post(webApiUrl +
            //    "/UpdateWidgetVisit?widgetId=" +
            //    widgetId +
            //    "&pageUrl=" +
            //    pageUrl +
            //    "&companyId=" +
            //    setting.CompanyID,
            //    function(data) {
            //        console.log("updated");
            //    });

            //load sound data and show hide sound sysmbol accordingly
            loadSoundData();

            IsOperatorsAvailable = data.ReturnObj.IsOperatorsAvailable;
            // Load the html only if the widget it active

            var nWidgetShowTimer = setting.WidgetShowTimer == null ? null : parseInt(setting.WidgetShowTimer);

            if (nWidgetShowTimer == '' || nWidgetShowTimer == 'undefined' || nWidgetShowTimer == null) {
                nWidgetShowTimer = '0';
            }

            setTimeout(function () {
                loadWidgetTImeOut();
            },
                nWidgetShowTimer);


            function loadWidgetTImeOut() {

                if (setting.IsActive && !isPageExcluded()) {

                    if (
                        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i
                            .test(navigator.userAgent) ||
                        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
                            .test(navigator.userAgent.substr(0, 4))) {
                        if (!isHosted) {
                            isMobile = true;
                        }
                    }

                    if (isMobile) {
                        // If it is mobile load mobile widget

                        $("#zupportchat").load(Url + "/App/widget/widget-theme-01/mobileWidget.html",
                            function () {
                                loadDefaultImages();
                                applyStyles();
                                setColor();
                                //Check widget company is diffrent
                                if (retreiveLocalStorageDecrypt("ContactData_" + widgetId)) {
                                    var contactObj = JSON.parse(retreiveLocalStorageDecrypt("ContactData_" + widgetId));
                                    CompanyId = contactObj["CompanyId"];
                                    if (CompanyId != setting.CompanyID) {
                                        removeLocalStorage("ContactData_" + widgetId);
                                    }
                                }

                                // Load Text
                                loadText(setting);

                                //Load inner components
                                loadInnerComponents();
                                if (!isBannedIP) {
                                    if (!data.ReturnObj.IsOperatorsAvailable
                                    ) { // If there are no operators load no operator panel
                                        // If the action is not to show the panel

                                        if (setting.NoOperatorAction == 1) {
                                            loadWidgetPanels();
                                            loadMobileWidget();
                                        } else {
                                            loadMobileWidget("offline");
                                            loadWidgetPanels("Nooperator");

                                        }
                                    } else if (retreiveLocalStorage("ConnectionData_" + widgetId) != null &&
                                        retreiveLocalStorage("StorageData_" + widgetId) == null) {
                                        var conObj =
                                            JSON.parse(retreiveLocalStorageDecrypt("ConnectionData_" + widgetId));
                                        var connectionId = conObj;
                                        $.get(webApiUrl +
                                            "/GetVisitorBySignalrId?connectionID=" +
                                            connectionId +
                                            "&companyId=" +
                                            setting.CompanyID,
                                            function (data) {
                                                if (data.IsSuccess == true) {
                                                    saveLocalStorage(data.ReturnObj["TempLocalStorage"],
                                                        "StorageData_" + widgetId);
                                                    saveLocalStorage(data.ReturnObj["TempContactDetails"],
                                                        "ContactData_" + widgetId);
                                                    loadWidgetPanels("inChat", true);
                                                    loadMobileWidget("online");
                                                    chatInitiate();
                                                } else {
                                                    loadWidgetPanels("startChat");
                                                    loadMobileWidget("online");
                                                }
                                            });
                                    } else {

                                        if (retreiveLocalStorage("StorageData_" + widgetId) !=
                                            null) { // If there is value in the local storage load inchat panel
                                            // If there are no operators available show error message + inchat panel

                                            //else load in chat panel
                                            loadWidgetPanels("inChat");
                                            loadMobileWidget("online");
                                        } else { //else load start chat panel
                                            // Hide other panels on load
                                            loadWidgetPanels("startChat");
                                            loadMobileWidget("online");

                                        }
                                    }

                                    // If department is required set department dropdown
                                    if (setting.StartChatDepartmentRequired) {
                                        setDropdownvalues(".departmentcombo", data.ReturnObj.WidgetDepartments);
                                    }


                                    loadsignalr();
                                } else {
                                    loadWidgetPanels("BannedIPRequest");
                                }
                            });
                    } else {
                        // Else browser widget
                        if (!isHosted) {
                            $("#zupportchat").load(Url + "/App/widget/widget-theme-01/widget.html",
                                function () {
                                    if (isPreview == "true") {
                                        loadPreviewWidget();
                                    }
                                    else {
                                        loadHtmlDetails(data);
                                    }

                                })
                        } else {
                            if (setting.HostedPageEnabled) {
                                $("#zupportchat").load(Url + "/App/widget/hosted-page/widget.html",
                                    function () {
                                        loadHtmlDetails(data);

                                    })
                            } else {
                                $("#zupportchat").html("Please activate the hosted page.");
                            }
                        }
                    }
                }



            }
        });

    function loadHtmlDetails(data) {
        loadDefaultImages();

        //Check widget company is diffrent
        if (retreiveLocalStorageDecrypt("ContactData_" + widgetId)) {
            var contactObj = JSON.parse(retreiveLocalStorageDecrypt("ContactData_" + widgetId));
            CompanyId = contactObj["CompanyId"];
            if (CompanyId != setting.CompanyID) {
                removeLocalStorage("ContactData_" + widgetId);
            }
        }
        //Load styles
        applyStyles();

        //Load text
        loadText(setting);

        // Load default images
        //loadDefaultImages();

        // load tab panel
        loadTabs();

        //Load inner components
        loadInnerComponents();
        var nWidgetShowTimer = setting.WidgetShowTimer == null ? null : parseInt(setting.WidgetShowTimer);
        if (!isBannedIP) {

            if (retreiveLocalStorage("ConnectionData_" + widgetId) != null &&
                retreiveLocalStorage("StorageData_" + widgetId) == null) {
                var conObj = JSON.parse(retreiveLocalStorageDecrypt("ConnectionData_" + widgetId));
                var connectionId = conObj;
                $.get(webApiUrl +
                    "/GetVisitorBySignalrId?connectionID=" +
                    connectionId +
                    "&companyId=" +
                    setting.CompanyID,
                    function (data) {
                        if (data.IsSuccess == true) {
                            saveLocalStorage(data.ReturnObj["TempLocalStorage"], "StorageData_" + widgetId);
                            saveLocalStorage(data.ReturnObj["TempContactDetails"], "ContactData_" + widgetId);
                            loadWidgetPanels("inChat", true);
                            chatInitiate();
                        } else {
                            if (!IsOperatorsAvailable) {
                                loadWidgetPanels("Nooperator");
                            } else {
                                var isexpand = false;
                                if (!(nWidgetShowTimer == '' ||
                                    nWidgetShowTimer == 'undefined' ||
                                    nWidgetShowTimer == null)) {
                                    isexpand = true;
                                }
                                loadWidgetPanels("startChat", isexpand);
                            }
                        }
                    });
            } else {

                if (retreiveLocalStorage("StorageData_" + widgetId) != null
                ) { // If there is value in the local storage load inchat panel
                    // If there are no operators available show error message + inchat panel

                    //else load in chat panel
                    loadWidgetPanels("inChat", true);
                } else if (!data.ReturnObj.IsOperatorsAvailable) { // If there are no operators load no operator panel
                    // If the action is not to show the panel
                    if (setting.NoOperatorAction == 1) {
                        loadWidgetPanels();
                    } else {
                        loadWidgetPanels("Nooperator");

                    }
                } else { //else load start chat panel
                    // Hide other panels on load
                    var isexpand = false;
                    if (!(nWidgetShowTimer == '' || nWidgetShowTimer == 'undefined' || nWidgetShowTimer == null)) {
                        isexpand = true;
                    }
                    loadWidgetPanels("startChat", isexpand);
                }
            }
        } else {
            loadWidgetPanels("BannedIPRequest");
        }

        // If department is required set department dropdown
        if (setting.StartChatDepartmentRequired) {
            setDropdownvalues(".departmentcombo", data.ReturnObj.WidgetDepartments);
        }


        //loadIP(setting.CompanyID);

        loadsignalr();
    }
}

$(document).on('click',
    ".chat-button-normal",
    function () {
        loadWidgetOnClick();
    });

$(document).on('click',
    "#volumeBtnUp",
    function () {
        localStorage.setItem('sound_' + setting.CompanyID, false);
        $("#volumeBtnUp").hide();
        $("#volumeBtnOff").show();
    });

$(document).on('click',
    "#volumeBtnOff",
    function () {
        localStorage.setItem('sound_' + setting.CompanyID, true);
        $("#volumeBtnOff").hide();
        $("#volumeBtnUp").show();
    });

$(document).on('click',
    ".chat-img-bubble",
    function () {
        $(".chat-img-bubble").hide();
        $(".chat-button-normal").removeClass("hidden");
        loadWidgetOnClick();
    })

$(document).on('click',
    '.chat-collapse',
    function () {
        var visibleDiv = $(".chat-widget-panel:visible");
        var visibledivid = visibleDiv.attr('id');
        $("div#" + visibledivid + " >.panelCollapse").collapse("toggle");
        $(".chat-header").show();

    })

function loadWidgetOnClick() {
    var hasclass = false;
    var visibleDiv = $(".chat-widget-panel:visible");
    var visibledivid = visibleDiv.attr('id');
    if (visibledivid == "closechat") {
        refreshOnClose();
    } else if (visibledivid == "NooperatorSent") {
        loadWidgetPanels("Nooperator");
    } else {
        if ($("div#" + visibledivid + " > div.popup-box").hasClass("popup-box-on")) {
            hasclass = true;
            localStorage.setItem("ChatClose", new Date());
        }
        $(".popup-box").removeClass("popup-box-on");

        if (hasclass) {
            $("div#" + visibledivid + " > div.popup-box").addClass("popup-box-on");
        }
        $("div#" + visibledivid + " > div.popup-box").toggleClass("popup-box-on");
        //jQuery(this).text('Hi! Chat with us now');
        if ($("div#" + visibledivid + " > div.popup-box").hasClass('popup-box-on')) {

            loadPanelsExpandedTheme(visibledivid);
        } else {
            loadPanelsCollapsedTheme(visibledivid);
        }
    }
}

function loadPanelsExpandedTheme(visibledivid) {
    $(".chat-img-bubble").hide();
    $(".chat-button-normal").removeClass("hidden");

    if (visibledivid == "startchat" &&
        !setting.StartChatNameRequired &&
        !setting.StartChatDepartmentRequired &&
        !setting.StartChatEmailRequired &&
        !setting.StartChatPhoneRequired &&
        !setting.StartChatQuestionRequired) {
        clearTimeout(myVar);
        loadPanels("inChat", true);
    }

    jQuery(this).text('');
    $("div#chat-window").addClass("chat-btn-round");
    $('div#chat-window').prepend('<i class="glyphicon glyphicon-remove"></i>');

    if (setting.PositionStyle == 'topLeft') {
        $("div#" + visibledivid + " > div.popup-box").addClass('popup-box-top-left');
        $("div#" + visibledivid + " > div.popup-box").siblings('.chat-button-normal').addClass('chat-button-top-left');
        $("div#" + visibledivid + " > div.popup-box").siblings('.chat-img-bubble').addClass('chat-img-button-top-left');
    } else if (setting.PositionStyle == 'topRight') {
        $("div#" + visibledivid + " > div.popup-box").addClass('popup-box-top-right');
        $("div#" + visibledivid + " > div.popup-box").siblings('.chat-button-normal').addClass('chat-button-top-right');
        $("div#" + visibledivid + " > div.popup-box").siblings('.chat-img-bubble').addClass('chat-img-button-top-right');
    } else if (setting.PositionStyle == 'bottomRight') {
        $("div#" + visibledivid + " > div.popup-box").addClass('popup-box-bottom-right');
        $("div#" + visibledivid + " > div.popup-box").siblings('.chat-button-normal').addClass('chat-button-bottom-right');
        $("div#" + visibledivid + " > div.popup-box").siblings('.chat-img-bubble').addClass('chat-img-button-bottom-right');
    } else if (setting.PositionStyle == 'bottomLeft') {
        $("div#" + visibledivid + " > div.popup-box").addClass('popup-box-bottom-left');
        $("div#" + visibledivid + " > div.popup-box").siblings('.chat-button-normal').addClass('chat-button-bottom-left');
        $("div#" + visibledivid + " > div.popup-box").siblings('.chat-img-bubble').addClass('chat-img-button-bottom-left');
    }

    if (visibledivid == "closechat") {
        $("div#" + visibledivid + " > div.chat-button-normal").addClass('chat-button-refresh');
    } else if (visibledivid == "Nooperator" || visibledivid == "NooperatorSent") {
        $("div#" + visibledivid + " > div.chat-button-normal").removeClass('chat-button-noop');
        $("div#" + visibledivid + " > div.chat-button-normal").addClass('chat-button-close');
    } else {
        $("div#" + visibledivid + " > div.chat-button-normal").addClass('chat-button-close');
    }
    if (visibledivid == "inchat") {
        var nWidgetShowTimer = setting.WidgetShowTimer == null ? null : parseInt(setting.WidgetShowTimer);

        if (!(nWidgetShowTimer == '' ||
            nWidgetShowTimer == 'undefined' ||
            nWidgetShowTimer == null ||
            nWidgetShowTimer == '0')) {

        }
    }
    //$("div#" + visibledivid + " > div.popup-box").addClass("");
    setTimeout(function () {
        if (!isHosted) {
            setPanelHeight(visibledivid);
        }

    },
        20);
    //load sound data and show hide sound sysmbol accordingly
    loadSoundData();

}

function setPanelHeight(visibledivid) {
    if (visibledivid == "inchat") {
        parent.postMessage('cw height ' + 490, parentEvent.origin);

        parent.postMessage('cw width 325', parentEvent.origin);
    }
    else if ($('#' + visibledivid).is(':visible')) {
        var height = $(".popup-box-on").height() +
            $("div#" + visibledivid + " > div.chat-button-normal").height() +
            30;
        parent.postMessage('cw height ' + height, parentEvent.origin);

        parent.postMessage('cw width 325', parentEvent.origin);
    } else {
        setTimeout(function () {
            setPanelHeight(visibledivid);
        }, 30);
    }


}


//load sound data and m
function loadSoundData() {
    const interval = setInterval(function () {
        if (document.getElementById('volumeBtnUp') == null) {
            console.log("Waiting for sound elemt to load");
        }
        else {
            $.get(webApiUrl + "/GetSound?companyId=" + setting.CompanyID,
                function (soundData) {
                    notifySound = soundData;
                    if (notifySound == 0) {
                        $('#volumeBtnUp').hide();
                        $('#volumeBtnOff').hide();

                    } else {
                        var soundVal = localStorage.getItem('sound_' + setting.CompanyID);
                        if (soundVal == "" || soundVal == null || soundVal == "true") {
                            $('#volumeBtnUp').show();
                            $('#volumeBtnOff').hide();

                        } else {
                            $('#volumeBtnUp').hide();
                            $('#volumeBtnOff').show();
                        }
                    }
                });
            clearInterval(interval);
        }
    }, 500);


}

function loadPanelsCollapsedTheme(visibledivid) {

    //jQuery(this).text('Hi! Chat with us now');
    if (setting.CollapsedTyep != "1" && !isMobile) {
        $(".chat-img-bubble").show();
        $(".chat-button-normal").addClass("hidden");
    }

    $("div#chat-window").removeClass("chat-btn-round");
    $('div#chat-window').prepend('<i class="fa fa-compress"></i>');
    $("div#" + visibledivid + " > div.chat-button-normal").removeClass('chat-button-refresh');
    $("div#" + visibledivid + " > div.chat-button-normal").removeClass('chat-button-close');
    //setTimeout(function () {


    if (!isHosted && setting.CollapsedTyep == "1") {
        var height = $("div#" + visibledivid + " > div.chat-button-normal").height() + 30;
        parent.postMessage('cw height ' + height, parentEvent.origin);
        parent.postMessage('cw width 62', parentEvent.origin);
    } else {
        if (setting.CollapsedTyep == "1") {
            parent.postMessage('cw height ' + setting.ImageHeight, parentEvent.origin);
            parent.postMessage('cw width ' + setting.ImageWidth, parentEvent.origin);
        }
    }


    if (visibledivid == "Nooperator" || visibledivid == "NooperatorSent") {
        $("div#" + visibledivid + " > div.chat-button-normal").addClass('chat-button-noop');
    }

}

function isPageExcluded() {
    if (!isHosted) {
        if (setting.ExclusionPages != null && setting.ExclusionPages.indexOf(parentEvent.data) != -1) {
            if (retreiveLocalStorage("StorageData_" + widgetId) != null ||
                retreiveLocalStorage("ConnectionData_" + widgetId) != null) {
                return false;
            } else {
                return true;
            }
        }

        return false;
    } else {
        return false;
    }
}

function applyStyles() {
    if (setting.AnimationStyle && setting.AnimationStyle != "") {
        $(".chatwindow").addClass(setting.AnimationStyle);
    }

    setColor();

    if (setting.PositionStyle && setting.PositionStyle != "") {
        if (!isHosted) {
            if (isMobile) {
                parent.postMessage("cw mobile " + setting.PositionStyle, parentEvent.origin);
            } else {
                if (setting.CollapsedTyep == "2") {
                    parent.postMessage("cw " + setting.PositionStyle + " tab", parentEvent.origin);
                } else {
                    parent.postMessage("cw " + setting.PositionStyle, parentEvent.origin);
                }
            }
        }

        if (setting.PositionStyle == 'topLeft') {
            $(".chatwindow").addClass('chat-btn-top-left');
        } else if (setting.PositionStyle == 'topRight') {
            $(".chatwindow").addClass('chat-btn-top-right');
        } else if (setting.PositionStyle == 'bottomRight') {
            $(".chatwindow").addClass('chat-btn-bottom-right');
        } else if (setting.PositionStyle == 'bottomLeft') {
            $(".chatwindow").addClass('chat-btn-bottom-left');
        }
    }
    if (!isMobile) {
        if (setting.CollapsedTyep == "1") { // bubble
            $('.chat-img-bubble').hide();
            $('.chat-header').hide();
            $('.chat-button-normal').show();
        } else if (setting.CollapsedTyep == "2") { // tab
            $('.chat-header').show();
            $('.chat-button-normal').hide();
            $('.chat-img-bubble').hide();
            $('.popup-box').addClass('collapse');
            if (!isHosted) {
                parent.postMessage('cw width ' + 325, parentEvent.origin);
            }
        } else if (setting.CollapsedTyep == "3") { // image
            $(".chat-bubble-image").attr("src", setting.ImageUrl);
            $(".chat-bubble-image").height(setting.ImageHeight + "px");
            $(".chat-bubble-image").width(setting.ImageWidth + "px");
            if (!isHosted) {
                parent.postMessage('cw height ' + setting.ImageHeight, parentEvent.origin);
                parent.postMessage('cw width ' + setting.ImageWidth, parentEvent.origin);
            }
            $('.chat-img-bubble').show();
            $('.chat-header').hide();
        }
    }
}

function setColor() {
    if (setting.Colour) {
        $('.header').css('background-color', setting.Colour);
        $('.operatorheader').css('background-color', setting.Colour);
        $('.widgetRequestButton').css('background-color', setting.Colour);
        $('.chat-widget-panel-body').attr('style', 'border-color:' + setting.Colour + ' !important');
        $(".btn-chat").css('background-color', setting.Colour);
        $(".btn-noop").css('background-color', setting.Colour);
        $(".btnnoop").css('background-color', setting.Colour);
        $(".chat-header").css('background-color', setting.Colour);
        // new themes01
        $('.bannedIPhead').css('background-color', setting.Colour);
        $('.popup-box-header').css('background-color', setting.Colour);
        $('.popup-box').attr('style', 'border-color:' + setting.Colour + ' !important');
        $('.popup-box-header-user').css('background-color', setting.Colour);
        $('.chat-button-normal').css('background-color', setting.Colour);
        $(".popup-box-submit").css('background-color', setting.Colour);
        $(".chat-button-normal").hover(function () {
            $(this).css("background-color", "#fff4ee");
            $(this).attr('style', 'border-color:' + setting.Colour + ' !important');
        });
        $(".chat-button-normal").on('mouseleave',
            function () {
                $('.chat-button-normal').css('background-color', setting.Colour);
            })
        if (isHosted) {
            $('body').css('background-color', setting.HostedPageColour);
        }
        //$(".popup-box-submit").hover(function () {
        //    $(this).css("color", setting.Colour + ' !important');
        //    $(this).attr('style', 'border-color:' + setting.Colour + ' !important');
        //});
        //$(".popup-box-submit").on('mouseleave', function () {
        //    $(this).css('background-color', setting.Colour);
        //})

    }
}

function loadText(setting) {
    // Start Chat
    $("#startchatTitle").html(setting.StartChatTitle);
    $("#lblintro").html(setting.StartChatIntroText);
    $("#labelName").html(setting.StartChatNameText);
    $("#labelEmail").html(setting.StartChatEmailText);
    $("#labelDepartment").html(setting.StartChatDepartmentText);
    $("#labelQuestion").html(setting.StartChatQuestionText);
    $("#labelphone").html(setting.StartChatPhoneText);
    //$("#SendRequest").html(setting.StartChatRequestButtonText);
    $("#SendRequest").attr('value', setting.StartChatRequestButtonText);

    // No Operator
    $("#noophead").html(setting.NoOperatorTitle);
    $("#noopheadSuccess").html(setting.NoOperatorTitle);
    $("collapsNooperatorSuccess").html(setting.NoOperatorTitle);

    if (setting.NoOperatorAction == 2) {
        $("#noOpIntro").html(setting.NoOperatorMessage);
    } else if (setting.NoOperatorAction == 3) {
        $("#noOpIntro").html(setting.NoOperatorEmailIntro);
    }

    $("#noopname").html(setting.NoOperatorNameText);
    $("#noopemails").html(setting.NoOperatorEmailText);
    $("#noopquestion").html(setting.NoOperatorQuestionText);
    //$("#btnsendemail").html(setting.NoOperatorSendButtonText);
    $("#btnsendemail").attr('value', setting.NoOperatorSendButtonText);
    $("#lblemailSent").html(setting.NoOperatorEmailSentTest);

    // In Chat
    $("#inchathead").html(setting.InChatTitle);
    $("#sendmsgtext").attr("placeholder", setting.InChatSendMessage);
    // $(".opname").html(setting.InChatMessage);

    // Banned IP
    //$("#bannedReqTitle").html(setting.BannedIPTitle);
    //$("#bannedIPReq").html(setting.BannedIPContactAdmin);
    $("#bannedIPReq").attr('value', setting.BannedIPContactAdmin);

    $(".bannedIPhead").html(setting.BannedIPTitle);
    $("#bannedMessage").html(setting.BannedIPMessage);
    $("#bannedIntro").html(setting.BannedIPEmailIntro);
    $("#bannedname").html(setting.BannedIPNameText);
    $("#bannedemails").html(setting.BannedIPEmailText);
    $("#bannedquestion").html(setting.BannedIPQuestionText);
    //$("#btnSendBannedEmail").html(setting.BannedIPSendButtonText);
    $("#btnSendBannedEmail").attr('value', setting.BannedIPSendButtonText);
    $("#lblbannedemailSent").html(setting.BannedIPEmailSentText);

    // Close chat
    $("#closeTitle").html(setting.ChatClosedTitle);
    $("#closeIntro").html(setting.ChatClosedText);

    //poweredby
    $(".poweredby").html(setting.CompanyName);

    //hosted page
    $("#hostedId").html(setting.HostedPageTitle);
    $("#hostedDesc").html(setting.HostedPageInductionParagraph);
}

function theFunction() {
    window.open(setting.CompanyURL, "_blank")
    //window.location = setting.CompanyURL;
}

function noOpeatorHideWidget() {

    if (setting.NoOperatorAction == 1 && !isHosted) {
        const interval = setInterval(function () {
            if (document.getElementById('inchat') != null) {
                $("#inchat").hide();
                $('#Nooperator').hide();
                console.log('found chat widget , hiding now');
                clearInterval(interval);
            }
            else {
                console.log('waiting for chat elemt to load');
            }
        }, 500);


    }
}

function loadPanels(panel, expand) {

    $(".panelCollapse").collapse("hide");
    switch (panel) {
        case "startChat":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').show();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();
            break;
        case "inChat":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').show();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#message-box').collapse('show');
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();


            break;
        case "Nooperator":
            $('#Nooperator').show();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();
            noOpeatorHideWidget();



            break;
        case "NooperatorSent":
            $('#Nooperator').hide();
            $('#NooperatorSent').show();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();


            break;
        case "closechat":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').show();
            $('#startchat').hide();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();


            break;
        case "chatCloseSuccess":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#chatCloseSuccess').show();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();


            break;
        case "BannedIP":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#BannedIP').show();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIPRequest').hide();
            spinnerFunctionUnload("searching_spinner_center");

            break;
        case "BannedIPSent":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#BannedIPSent').show();
            $('#BannedIP').hide();
            $('#chatCloseSuccess').hide();
            $('#BannedIPRequest').hide();
            spinnerFunctionUnload("searching_spinner_center");

            break;
        case "BannedIPRequest":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#BannedIPRequest').show();
            $('#BannedIP').hide();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            spinnerFunctionUnload("searching_spinner_center");

            break;
        default:
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();


            break;
    }

    var visibledivid = getPanelId(panel);

    if (!isHosted) {
        if (setting.CollapsedTyep != 2) {
            $(".popup-box").removeClass("popup-box-on");

            if (expand) {
                $("div#" + visibledivid + " > div.popup-box").addClass("popup-box-on");
                loadPanelsExpandedTheme(visibledivid);
            } else {
                loadPanelsCollapsedTheme(visibledivid);
            }
        } else {
            $("div#" + visibledivid + " >.panelCollapse").collapse("hide");
            if (expand) {
                $("div#" + visibledivid + " >.panelCollapse").collapse("show");
                $("div#" + visibledivid + " >.panelCollapse").addClass('collapse in');
            } else {
                $(".chat-header").show();
            }
        }

        setTimeout(function () {
            parent.postMessage('cw show', parentEvent.origin);
        },
            250);
    }
}

function getPanelId(panelType) {
    var panelId = "";
    switch (panelType) {
        case "startChat":
            panelId = "startchat";
            break;
        case "inChat":
            panelId = "inchat";
            break;
        case "Nooperator":
            panelId = "Nooperator";
            break;
        case "NooperatorSent":
            panelId = "NooperatorSent";
            break;
        case "closechat":
            panelId = "closechat";
            break;
        case "chatCloseSuccess":
            panelId = "chatCloseSuccess";
            break;
        case "BannedIP":
            panelId = "BannedIP";
            break;
        case "BannedIPSent":
            panelId = "BannedIPSent";
            break;
        case "BannedIPRequest":
            panelId = "BannedIPRequest";
            break;
        default:
            panelId = "";
            break;
    }

    return panelId;
}

function loadInnerComponents() {
    // Start chat
    if (setting.StartChatNameRequired) {
        $("#nameGroup").show();
    } else {
        $("#nameGroup").hide();
    }

    if (setting.StartChatEmailRequired) {
        $("#emailGroup").show();
    } else {
        $("#emailGroup").hide();
    }

    if (setting.StartChatPhoneRequired) {

        $("#phoneGroup").show();
    } else {
        $("#phoneGroup").hide();
    }

    if (setting.StartChatDepartmentRequired) {
        $("#departmentGroup").show();
    } else {
        $("#departmentGroup").hide();
    }

    if (setting.StartChatQuestionRequired) {
        $("#questionGroup").show();
    } else {
        $("#questionGroup").hide();
    }

    // No Operator
    if (setting.NoOperatorAction == 2) {
        $("#noOpEmail").hide();
        $("#noOpImg").show();
    } else if (setting.NoOperatorAction == 3) {
        $("#noOpEmail").show();
        $("#noOpImg").hide();
    }

    $("#closeTranscript").hide();
    if (!setting.StartChatEmailRequired) {
        $("#transcript").hide();
    } else {
        $("#transcript").show();
        if (setting.ChatClosedDownloadTranscript) {
            $("#closeTranscript").show();
        }
    }

    if (setting.ChatClosedRatingRequired) {
        $('#ratings').show();
    } else {
        $('#ratings').hide();
        $('#closeIntro').addClass('close-chat-padding');
    }

    $("#sendMsg").hide();

    if (setting.CollapsedTyep != 2) {
        $(".chat-collapse").hide();
    }
}

function loadTabs() {
    if (setting.CollapsedTyep == "1") { // tab
        $(".chat-img").hide();
    } else if (setting.CollapsedTyep == "2") { // tab & image
        $(".chat-img").show();
        $(".chat-img").attr("src", Url + setting.ImageUrl);
    } else if (setting.CollapsedTyep == "3") { // image
        $(".chat-img").show();
        $(".chat-img").attr("src", Url + setting.ImageUrl);
        $(".chattableraw").hide();
    }
}


$(document).on('click',
    '#refreshafterchats',
    function () {
        loadMobilePanels("startChat", true);
    });

$(document).on('click',
    '#bannedIPReq',
    function () {
        loadWidgetPanels("BannedIP", true);
    });


$(document).on('click',
    '.mobileChatButton',
    function () {
        window.parent.postMessage('setParentBody', parentEvent.origin);
    });

$(document).on('click',
    '.chatButton',
    function () {
        loadMobileWidget("expanded");
    });


$(document).on('click',
    '.widget-close-btn',
    function () {
        if (IsOperatorsAvailable) {
            loadMobileWidget("online");
        } else {
            loadMobileWidget("offline");
        }

    });


$(document).on('click',
    '.mobile-widget-close-btn',
    function () {
        window.parent.postMessage('resetParentBody', parentEvent.origin);
    });


$(document).on('shown.bs.collapse',
    '.panelCollapse',
    function (e) {
        setTimeout(function () {
            if (!isHosted) {
                var visibleDiv = $(".chat-widget-panel:visible");
                var visibledivid = visibleDiv.attr('id');
                var height = $("div#" + visibledivid + " > div.popup-box").height() + 10;
                parent.postMessage('cw height ' + height, parentEvent.origin);
            }
        }, 50);

    });

$(document).on('show.bs.collapse',
    '.panelCollapse',
    function (e) {
        if (!isHosted) {
            parent.postMessage('cw panel expanded', parentEvent.origin);
        }
        $(".chat-header").hide();
    });
$(document).on('hide.bs.collapse',
    '.panelCollapse',
    function (e) {

    });

$(document).on('hidden.bs.collapse',
    '.panelCollapse',
    function (e) {
        if (!isHosted) {
            if (setting.CollapsedTyep == 2) {
                parent.postMessage('cw height ' + 45, parentEvent.origin);
            }
        }
    });

function loadDefaultImages() {

    $('.logoClass').attr("src", Url + "/Content/images/logo.png");
    if (setting.InChatCompanyLogo && setting.InChatCompanyLogo != "") {
        $('.opimg').attr("src", setting.InChatCompanyLogo);
    } else {
        $('.opimg').attr("src", Url + "/Content/custom/images/def-op-f.png");
    }
    $('#spinner').attr("src", Url + "/Content/images/smalllogo.png");
    $("#noOpImg").attr("src", Url + "/Content/custom/images/defaultop.png");
    $(".rightmark").attr("src", Url + "/Content/custom/images/rightmark.png");
    $(".thumpsupicon").attr("src", Url + "/Content/custom/images/thumbsupicon.png");
    $(".thumpsdownicon").attr("src", Url + "/Content/custom/images/thumbsdownicon.png");
    $(".progressring").attr("src", Url + "/Content/custom/images/proring.gif");
    if (setting.ImageId == "23") {
        $(".imgTop").attr("src", setting.CustomImageUrl);
        $(".imgBottom").attr("src", setting.CustomImageUrl);
    } else {
        $(".imgTop").attr("src", Url + setting.ImageUrl);
        $(".imgBottom").attr("src", Url + setting.ImageUrl);
    }
}

function getMessages() {
    var div = $(".messagearea");
    div.scrollTop(div.prop('scrollHeight'));
}

if (window.addEventListener) {
    window.addEventListener('message', handleMessage, false);
} else if (window.attachEvent) { // ie8
    window.attachEvent('onmessage', handleMessage);
}

function handleMessage(e) {
    if (e.data.indexOf("ZupportDesk") == -1) {
        return;
    }
    var url = e.data.substring(12);
    parentEvent = { "data": url, "origin": e.origin };
    loadWidget()

}

function loadMobilePanels(panel, expand) {
    switch (panel) {
        case "startChat":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').show();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();

            break;
        case "inChat":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').show();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#message-box').collapse('show');
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();

            break;
        case "Nooperator":
            $('#Nooperator').show();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();
            noOpeatorHideWidget();

            break;
        case "NooperatorSent":
            $('#Nooperator').hide();
            $('#NooperatorSent').show();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();

            break;
        case "closechat":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').show();
            $('#startchat').hide();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();

            break;
        case "chatCloseSuccess":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#chatCloseSuccess').show();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();
            break;
        case "BannedIP":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#BannedIP').show();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIPRequest').hide();

            break;
        case "BannedIPSent":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#BannedIPSent').show();
            $('#BannedIP').hide();
            $('#chatCloseSuccess').hide();
            $('#BannedIPRequest').hide();

            break;
        case "BannedIPRequest":
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#BannedIPRequest').show();
            $('#BannedIP').hide();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();

            break;
        default:
            $('#Nooperator').hide();
            $('#NooperatorSent').hide();
            $('#inchat').hide();
            $('#closechat').hide();
            $('#startchat').hide();
            $('#chatCloseSuccess').hide();
            $('#BannedIPSent').hide();
            $('#BannedIP').hide();
            $('#BannedIPRequest').hide();

            break;
    }
}

function loadWidgetPanels(panel, expand) {

	if (panel == "startChat" &&
		!setting.StartChatNameRequired &&
		!setting.StartChatDepartmentRequired &&
		!setting.StartChatEmailRequired &&
		!setting.StartChatPhoneRequired &&
		!setting.StartChatQuestionRequired) {
		checkClose = localStorage.getItem("ChatClose");
		if (!isHosted && !isMobile) {
			if (checkClose != null) {
				currentDate = new Date();
				oldDate = new Date(checkClose);
				var hours = Math.abs(currentDate - oldDate) / 36e5;
				if (hours > 24) {
					localStorage.removeItem("ChatClose");
					myVar = setTimeout(function (panel, expand) {
						loadPanels("inChat", true);
					}, 5000);
				}
			}
			else {
				localStorage.removeItem("ChatClose");
				myVar = setTimeout(function (panel, expand) {
					loadPanels("inChat", true);
				}, 5000);
			}
		}
		else {
			panel = "inChat";
			expand = true;
		}


		// panel = "inChat";
		//expand = true;
	}

	if (isMobile) {
		loadMobilePanels(panel, expand);
	} else {
		loadPanels(panel, expand);
	}
}

function loadMobileWidget(item) {
    $("#online").addClass(setting.PositionStyle);
    $("#offline").addClass(setting.PositionStyle);
    switch (item) {
        case "online":
            $("#online").show();
            $("#offline").hide();
            $(".chatwindow").hide();
            parent.postMessage('cw mobileCollapsed', parentEvent.origin);
            $("body").attr("class", "");
            break;
        case "offline":
            $("#offline").show();
            $("#online").hide();
            $(".chatwindow").hide();
            parent.postMessage('cw mobileCollapsed', parentEvent.origin);
            $("body").attr("class", "");
            break;
        case "expanded":
            $(".chatwindow").show();
            $("#online").hide();
            $("#offline").hide();
            var visibleDiv = $(".panel-primary:visible");
            var visibledivid = visibleDiv.attr('id');
            //if (visibledivid == "startchat" && !setting.StartChatNameRequired &&
            //    !setting.StartChatDepartmentRequired &&
            //    !setting.StartChatEmailRequired &&
            //    !setting.StartChatQuestionRequired) {
            //    sendRequest(widgetId);
            //    loadMobilePanels("inChat", true)
            //}
            parent.postMessage('cw mobileExpanded', parentEvent.origin);
            $("body").attr("class", "bodyStyle");
            break;
        default:
            $("#offline").hide();
            $(".chatwindow").hide();
            $("#online").hide();
            break;
    }

    setTimeout(function () {
        parent.postMessage('cw show', parentEvent.origin);
    },
        250);


}

function loadPreviewWidget() {
    applyStyles();
    loadPanels('inChat', true);
    $('.custom-style-container').append('<style>.chat-bubble-right { background-color:' + setting.ColourVisitorChat + ';}.chat-bubble-right::after { border-left-color: ' + setting.ColourVisitorChat + '; border-right-color: ' + setting.ColourVisitorChat + '; }.chat-bubble-left { background-color: ' + setting.ColourOperatorChat + ';}.chat-bubble-left::after { border-left-color: ' + setting.ColourOperatorChat + '; border-right-color:' + setting.ColourOperatorChat + '; }</style>');
    $('.messagearea').append('<p class="chat-notification-1">"Visitor" has joined the chat</p>');
    $('.messagearea').append('<p class="chat-notification-2">"Agent" has joined the chat</p>');
    $('.messagearea').append('<div class="chat-bubble-right"><span class="username visitorusername">John</span><br/>Hi</div><div class="clearfix"></div>');
    $('.messagearea').append('<div class="chat-bubble-left"><span class="username">Sandra</span><br/>Hi<br/></div><div class="clearfix"></div>');
    $('.opimg').attr("src", Url + "/Content/custom/images/def-op-f.png");
    $("#sendmsgtext").attr('disabled', 'disabled');
    $("#transcript").attr('disabled', 'disabled');
    $("#thumbsupInchat").attr('disabled', 'disabled');
    $("#thumbsDownInchat").attr('disabled', 'disabled');
    $(".chat-collapse").hide();
    $('.chat-bubble-left').css('background-color', setting.ColourOperatorChat);
    $('.chat-bubble-left').css('color', setting.TextColourOperatorChat);
}