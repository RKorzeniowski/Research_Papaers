var webApiUrl = ProtocolUrl + ChatAPIServiceUrl + "/api/Chat";
var isBannedIP = null;
var dataLayer;
function getParamValue(paramName) {
    var url = window.location.search.substring(1); //get rid of "?" in querystring
    var qArray = url.split('&'); //get key-value pairs
    for (var i = 0; i < qArray.length; i++) {
        var pArr = qArray[i].split('='); //split key and value
        if (pArr[0] == paramName)
            return pArr[1]; //return value
    }
}

//remove visitor Conntact Details
function removeLocalContactDetails(storageName) {
    localStorage.removeItem(storageName);
};

//get visitor Conntact Details
function retreiveLocalContactDetails(storageName) {
    var data = localStorage[storageName];
    return data;
}

//save conntact Details
function saveLocalContactDetails(saveData, storageName) {
    var encrypted = JSON.stringify(saveData);
    localStorage[storageName] = encrypted;
};

function refreshOnClose() {
    if (isMobile) {
        loadMobileWidget("online");
    }
    loadWidgetPanels("startChat", false);

	if (!(setting.StartChatNameRequired ||
		setting.StartChatDepartmentRequired ||
		setting.StartChatEmailRequired|| setting.StartChatPhoneRequired || setting.StartChatQuestionRequired)) {
		var newdate = moment.utc(new Date(), 'YYYY-MM-DD HH:mm:ss');
		var utcTime = newdate.toDate();
		var localTime = formatHHMM(utcTime);
		if (setting.InChatGreeetingMessage && setting.InChatGreeetingMessage != "") {
			$('.messagearea').append('<div class="chat-bubble-left"><span class="username">' + (setting.InChatName && setting.InChatName != "" ? setting.InChatName : 'Customer Support Team') + '</span><br/>' + setting.InChatGreeetingMessage + '<br/> <span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
		}
	}

    var name = "";
    var contactId = "";
    if (retreiveLocalStorageDecrypt("ContactData_" + widgetId)) {
        var contactObj = JSON.parse(retreiveLocalStorageDecrypt("ContactData_" + widgetId));
        name = contactObj["VisitorName"];
        if (name == "Visitor") {
            name = "";
        }
        var email = contactObj["Email"];
        contactId = contactObj["ContactId"];
        $('#txtname').val(name);
        $('#txtemails').val(email);
    }
    TempVisitor = null;

    getBrowserAndOsVersion();
    var momTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    var proactiveId = null;
    var ProactiveIdSaved = retreiveLocalStorageDecrypt("ProactiveId_" + widgetId);
    if (ProactiveIdSaved) {
        proactiveId = ProactiveIdSaved.replace(/\"/g, '');
    } else {
        proactiveId = CreateGuid();
        saveLocalStorage(proactiveId, "ProactiveId_" + widgetId);
    }
    var pageUrl = "";
    if (!isHosted) {
        pageUrl = parentEvent.data;
    }
    else {
        pageUrl = window.location.href;
    }
    chat.server.addVisitorToRedis(proactiveId, widgetId, setting.CompanyID);
	chat.server.createProactiveChat(geoData.iso_code, Ip, widgetId, setting.WidgetName, pageUrl, geoData.CountryCode, geoData.CountryName, browser, (os + osVersion), setting.StartChatDepartmentRequired ? setting.Departments : null, name != "" ? name : "Visitor", contactId, setting.CompanyID, momTime, geoData.Latitude, geoData.Longitude, proactiveId, setting.AssignedDepartments, isHosted ? 3 : 1);
}


// Validate email
function validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(email);
}

function retreiveLocalStorage(storageName) {
    var data = localStorage[storageName];
    return data;
}

//save local storage
function saveLocalStorage(saveData, storageName) {
    var encrypted = JSON.stringify(saveData);
    localStorage[storageName] = encrypted;
};

//remove Local Storage
function removeLocalStorage(storageName) {
    localStorage.removeItem(storageName);
};

//decrypt from local
function retreiveLocalStorageDecrypt(storageName) {
    var data = localStorage.getItem(storageName);
    //var secretObject = data.toString();
    return data;
}

//browser version and OS version
function getBrowserAndOsVersion() {

    var unknown = '-';
    // screen
    var screenSize = '';
    if (screen.width) {
        width = (screen.width) ? screen.width : '';
        height = (screen.height) ? screen.height : '';
        screenSize += '' + width + " x " + height;
    }

    // browser
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    browser = navigator.appName;
    version = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
    }
    else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
        browser = 'Microsoft Edge';
        version = nAgt.substring(verOffset + 5);
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
        browser = 'Chrome';
        version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
        browser = 'Safari';
        version = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
        browser = 'Firefox';
        version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    }
    // Other browsers
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browser = nAgt.substring(nameOffset, verOffset);
        version = nAgt.substring(verOffset + 1);
        if (browser.toLowerCase() == browser.toUpperCase()) {
            browser = navigator.appName;
        }
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    // mobile version
    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // cookie
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
        document.cookie = 'testcookie';
        cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
    }

    // system

    var clientStrings = [
        { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
        { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
        { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
        { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
        { s: 'Windows Vista', r: /Windows NT 6.0/ },
        { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
        { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
        { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
        { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
        { s: 'Windows 98', r: /(Windows 98|Win98)/ },
        { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
        { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
        { s: 'Windows CE', r: /Windows CE/ },
        { s: 'Windows 3.11', r: /Win16/ },
        { s: 'Android', r: /Android/ },
        { s: 'Open BSD', r: /OpenBSD/ },
        { s: 'Sun OS', r: /SunOS/ },
        { s: 'Linux', r: /(Linux|X11)/ },
        { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
        { s: 'Mac OS X', r: /Mac OS X/ },
        { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
        { s: 'QNX', r: /QNX/ },
        { s: 'UNIX', r: /UNIX/ },
        { s: 'BeOS', r: /BeOS/ },
        { s: 'OS/2', r: /OS\/2/ },
        { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
    ];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }



    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
        case 'Linux':
            osVersion = "*";
            break;
    }

    // flash (you'll need to include swfobject)
    /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
    var flashVersion = 'no check';
    if (typeof swfobject != 'undefined') {
        var fv = swfobject.getFlashPlayerVersion();
        if (fv.major > 0) {
            flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
        }
        else {
            flashVersion = unknown;
        }
    }
}

// Send no operator email 
var requestRunning = false;

$(document).on('click', '#btnsendemail', function () {
    if (requestRunning) {
        return;
    }


    var name = $.trim($("#txtNoOpName").val());
    var email = $.trim($("#txtNoOpEmail").val());
    var question = $.trim($("#txtNoOpQuestion").val());
    var isError = false;
    if (name == "") {
        $("#txtNoOpNameError").html(setting.ErrorNameText);
        isError = true;
    }
    else {
        $("#txtNoOpNameError").html("");
    }

    if (email == "" || !validateEmail(email)) {
        $("#txtNoOpEmailError").html(setting.ErrorEmailText);
        isError = true;
    }
    else {
        $("#txtNoOpEmailError").html("");
    }

    if (question == "") {
        $("#txtNoOpQuestionError").html(setting.ErrorQuestionText);
        isError = true;
    }
    else {
        $("#txtNoOpQuestionError").html("");
    }

    if (isError) {
        return;
    }

	$.get(Url + "/App/widget/noOperatorEmail.html", function (data) {
		data = encodeURI(data.replace("USER_NAME", name).replace("USER_EMAIL", email).replace("USER_QUESTION", question));
        $.post(webApiUrl + "/SendNoOperatorEmail?to=" + setting.NoOperatorCentralEmail + "&body=" + data + "&subject=" + setting.NoOperatorEmailSubject + "&from=" + email + "&companyId=" + setting.CompanyID,
            function (data) {
                if (data.IsSuccess) {
                    $("#txtNoOpName").val("");
                    $("#txtNoOpEmail").val("");
                    $("#txtNoOpQuestion").val("");
                    loadWidgetPanels("NooperatorSent", true);
                    requestRunning = false;
                }
                else {
                    requestRunning = false;
                }
			})
			.fail(function (data) {
				alert("error");
			});
    })
    requestRunning = true;
});


$(document).on('click', '#btnSendBannedEmail', function () {
    if (requestRunning) {
        return;
    }
    var name = $.trim($("#txtBannedName").val());
    var email = $.trim($("#txtBannedEmail").val());
    var question = $.trim($("#txtBannedQuestion").val());
    var isError = false;
    if (name == "") {
        $("#bannedNameError").html(setting.ErrorNameText);
        isError = true;
    }
    else {
        $("#bannedNameError").html("");
    }

    if (email == "" || !validateEmail(email)) {
        $("#bannedEmailError").html(setting.ErrorEmailText);
        isError = true;
    }
    else {
        $("#bannedEmailError").html("");
    }

    if (question == "") {
        $("#bannedQuestionError").html(setting.ErrorQuestionText);
        isError = true;
    }
    else {
        $("#bannedQuestionError").html("");
    }

    if (isError) {
        return;
    }

    $.get(Url + "/App/widget/bannedIpEmail.html", function (data) {
		data = encodeURI(data.replace("USER_NAME", name).replace("USER_EMAIL", email).replace("USER_QUESTION", question).replace("IP_ADDRESS", Ip));
        $.post(webApiUrl + "/SendNoOperatorEmail?to=" + setting.BannedIPCentralEmail + "&body=" + data + "&subject=" + setting.BannedIPEmailSubject + "&from=" + email + "&companyId=" + setting.CompanyID,
            function (data) {
                if (data.IsSuccess) {
                    requestRunning = false;
                    $("#txtBannedName").val("");
                    $("#txtBannedEmail").val("");
                    $("#txtBannedQuestion").val("");
                    loadWidgetPanels("BannedIPSent", true);
                }
                else {
                    requestRunning = false;
                }
            });
    })
    requestRunning = true;
});

function setDropdownvalues(element, items) {
    if (items != null && items.length > 0) {
        $(element).append('<option value="0">-Select- </option>');
        $(element).prop("disabled", false);
        for (var i = 0; i < items.length; i++) {
            if (!items[i].IsAvailable) {
                $(element).append("<option disabled value=\"" + items[i].Department.DepartmentId + "\">" + items[i].Department.DepartmentName + " - Offline</option>");
            }
            else {
                $(element).append("<option value=\"" + items[i].Department.DepartmentId + "\">" + items[i].Department.DepartmentName + "</option>");
            }
        }
    } else {
        var newOption = $('<option value="0">--No Departments-- </option>');
        $(element).append(newOption);
        $(element).prop("disabled", true);
    }
}

function spinnerFunction(id) {
    $("#" + id).css("display", "block");
}

function spinnerFunctionUnload(id) {
    $("#" + id).css("display", "none");
}

function counter() {
    var downloadButton = document.getElementById("counter");
    var counter = 10;
    var newElement = document.createElement("p");
    newElement.innerHTML = "10";
    var id;

    downloadButton.parentNode.replaceChild(newElement, downloadButton);

    id = setInterval(function () {
        counter--;
        if (counter < 0) {
            loadWidgetPanels("startChat", true);
            window.clearInterval(id);
        } else {
            newElement.innerHTML = +counter.toString();
        }
    }, 1000);
}

function loadIP(companyID) {


    $.get(webApiUrl + "/GetCallingCode?isoCode=" + geoData.iso_code, function (calldata) {
                
         if (calldata != "" && calldata != null) {
             $('#CallerCode').text("+" + calldata.toString())
             $('#countryFlag').attr('src', Url + "/Content/Flags/" + geoData.iso_code + "_16.png");
         }
    });

    $.get(webApiUrl + "/CheckBanIP?IP=" + Ip + "&companyId=" + companyID, function (results) {
        if (results) {
            isBannedIP = true;
            loadWidgetPanels("BannedIPRequest");
        }
    });
}

function connectingToChat() {

    $('.messagearea').append('<p id="connectingMessage" class="chat-notification-1">' + setting.InChatConnectingMessage + '</p>');
}

function removeConnectingMessage() {
    var element = document.getElementById("connectingMessage");
    $(element).remove();
}

function sendRequest(widgetId) {
    var sending = localStorage.getItem("sendingReq");
    if (sending) {
        return;
    }
    var SignalID = chat.connection.id;
    var visitor = { "ConnectionID": chat.connection.id };
    if (setting.NoOperatorAction == 1) {
        saveLocalStorage(visitor, "ConnectionData_" + widgetId);
    }

    spinnerFunction("searching_spinner_center");
    var loc = "";
    if (!isHosted) {
        loc = parentEvent.data;
    }
    else {
        loc = window.location.href;
    }
    getBrowserAndOsVersion();
    var name = null;
    var Email = null;
    var contactId = null;

    if (retreiveLocalStorageDecrypt("ContactData_" + widgetId)) {
        var contactObj = JSON.parse(retreiveLocalStorageDecrypt("ContactData_" + widgetId));
        name = contactObj["VisitorName"];
        Email = contactObj["Email"];
        contactId = contactObj["ContactId"];
    }
    if ($('#txtname').length) {
        name = $.trim($("#txtname").val());
    }
    if ($('#txtemails').length) {
        Email = $.trim($("#txtemails").val());
    }


    if (setting.StartChatNameRequired) {
        if (name == "") {
            $("#nameError").html(setting.ErrorNameText);
            $("#txtname").addClass("error");
            spinnerFunctionUnload("searching_spinner_center");
            sending = false;
            return;
        }
        else {
            $("#nameError").html("");
            $("#txtname").removeClass("error");
        }
    }

    if (setting.StartChatEmailRequired) {
        if (Email == "" || !validateEmail(Email)) {
            $("#emailError").html(setting.ErrorEmailText);
            $("#txtemails").addClass("error");
            spinnerFunctionUnload("searching_spinner_center");
            sending = false;
            return;
        }
        else {
            $("#emailError").html("");
            $("#txtemails").removeClass("error");
        }
    }

    var Department = $('.departmentcombo').val();
    if (setting.StartChatDepartmentRequired) {
        if (Department == "0") {
            $("#departmentError").html(setting.ErrorDepartmentText);
            $(".departmentcombo").addClass("error");
            spinnerFunctionUnload("searching_spinner_center");
            sending = false;
            return;
        }
        else {
            $("#departmentError").html("");
            $(".departmentcombo").removeClass("error");
        }
    }

    var question = $.trim($('#txtquestion').val());
    if (setting.StartChatQuestionRequired) {
        if (question == "") {
            $("#questionError").html(setting.ErrorQuestionText);
            $("#txtquestion").addClass("error");
            spinnerFunctionUnload("searching_spinner_center");
            sending = false;
            return;
        }
        else {
            $("#questionError").html("");
            $("#txtquestion").removeClass("error");
        }
    }

    var callercode = $.trim(document.getElementById("CallerCode").innerHTML);
    var phoneNumber = $.trim($('#txtphone').val());
    if (setting.StartChatPhoneRequired) {
        if (callercode == "") {
            $("#phoneError").html(setting.ErrorPhoneText);
            $("#CallerCode").addClass("error");
            spinnerFunctionUnload("searching_spinner_center");
            sending = false;
            return;
        } else if (phoneNumber == "") {
            $("#phoneError").html(setting.ErrorPhoneText);
            $("#txtphone").addClass("error");
            spinnerFunctionUnload("searching_spinner_center");
            sending = false;
            return;
        } else {
            phoneNumber = callercode + phoneNumber;
            if (phoneNumber.length >= 10 && phoneNumber.length <= 15) {
                $("#phoneError").html("");
                $("#txtphone").removeClass("error");
            } else {
                $("#phoneError").html(setting.ErrorPhoneText);
                $("#txtphone").addClass("error");
                spinnerFunctionUnload("searching_spinner_center");
                sending = false;
                return;
            }
        }
    }

    var proactiveId = null;
    var ProactiveIdSaved = retreiveLocalStorageDecrypt("ProactiveId_" + widgetId);
    if (ProactiveIdSaved) {
        proactiveId = ProactiveIdSaved.replace(/\"/g, '');
    } else {
        proactiveId = CreateGuid();
        saveLocalStorage(proactiveId, "ProactiveId_" + widgetId);
    }

    var momTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    if (setting.StartChatQuestionRequired) {
        var timeId = CreateGuid();
        var messageObject = {
            "message": question,
            "moment": moment,
            "name": name,
            "momTime": momTime,
            "timeId": timeId
        };
        saveLocalStorage(messageObject, "Message_" + widgetId);
    }

	localStorage.setItem("sendingReq", true);
	chat.server.sendRequest(setting.CompanyID, Ip, momTime, widgetId, name == "" ? "Visitor" : name, Email, Department, question, browser, (os + osVersion), true, loc, contactId, isMobile, proactiveId, phoneNumber, isHosted ? 3 : 1, null, setting.AssignedDepartments);
    $('#txtquestion').val("");
}


function validatePhoneNumber(phone) {
    // var phoneReg = /^\+(?:\d(?:\(\d{3}\)|-\d{3})-\d{3}-(?:\d{2}-\d{2}|\d{4})|\d{11})$/;
    var phoneReg = /^[\s()+-]*([0-9][\s()+-]*){6,19}$/;
    return phoneReg.test(phone);
}

function validateNumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}


function formatHHMM(date) {
    function z(n) { return (n < 10 ? '0' : '') + n; }
    var h = date.getHours();
    return z(h % 12) + ':' + z(date.getMinutes()) + ' ' + (h < 12 ? 'AM' : 'PM');
}

function CreateGuid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

var UrlDivider = function (word) {
    var punctuation = ['!', "'", '"', ',', '.'];
    var words = word.split(' ');

    for (var i in words) {
        if ($.inArray(words[i].charAt(0), punctuation) > -1 && words[i].indexOf('https://') == 1 || words[i].indexOf('http://') == 1 || words[i].indexOf('www.') == 1) {
            words[i] = '<a target="_blank" href="' + words[i].substring(0, words[i].length) + '">' + words[i].substring(0, words[i].length) + '</a>' + words[i].charAt(words[i].length);
        }
        else if ($.inArray(words[i].charAt(words[i].length), punctuation) > -1 && (words[i].indexOf('https://') == 1 || words[i].indexOf('https://') == 0) || (words[i].indexOf('http://') == 1 || words[i].indexOf('http://') == 0)) {
            words[i] = '<a target="_blank" href="' + words[i].substring(0, words[i].length) + '">' + words[i].substring(0, words[i].length) + '</a>' + words[i].charAt(words[i].length);
        }
        else if (words[i].indexOf('https://') == 0 || words[i].indexOf('http://') == 0 || words[i].indexOf('www.') == 0) {
            words[i] = '<a href="' + words[i] + '" target="_blank">' + words[i] + '</a>';
        }
    }
    return words.join(' ');
}

var IsUrl = function (text) {
    if (text.match(/<[^>]*script/i)) {
        return false;
    }

    var urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;


    if (urlRegex.test(text)) {
        return true;
    } else {
        return false;
    }
}

$(function () {
	var widgetId = window.location.search.substr(10, 36);
	var isPrev = getParamValue('isPrev');
	if (dataLayer && isPrev != "true") {
		var trackerID = dataLayer.filter(function (e) { return e.length > 1 && e[0] == "config"; })[1];
		$("body").on("SettingsRecieved", function (ev, settings) {
			$.getJSON("/Widget/GetUserId", { "companyId": settings.CompanyID }, function (data) {
				gtag('config', trackerID, {
					'page_path': '/widgetViewed/' + settings.CompanyID,
					'user_id': data
				});
				gtag('event', 'widget-installed', {
					'event_category': "Widget",
					'event_action': "View",
					'widgetInstalled': 'true'
				});
			});
		});
	}
});