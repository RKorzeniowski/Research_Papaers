//Append Chat Design
function loadsignalr() {
    var webApiUrl = ProtocolUrl + ChatAPIServiceUrl + "/api/Chat";
    var widgetId = getParamValue('widgetId');
    var Url = ProtocolUrl + ControlPanelUrl;
    $.connection.hub.url = Url + "/signalr";
    chat = $.connection.chatHub;
    $.connection.hub.logging = true;
    var TempVisitor;
    var checkState = false;
    var proactiveId = null;
    var ProactiveIdSaved = retreiveLocalStorageDecrypt("ProactiveId_" + widgetId);
    if (ProactiveIdSaved) {
        proactiveId = ProactiveIdSaved.replace(/\"/g, '');
    } else {
        proactiveId = CreateGuid();
        saveLocalStorage(proactiveId, "ProactiveId_" + widgetId);
    }
    $.connection.hub.qs = 'Id=' + proactiveId + '&Type=visitor&WidgetId=' + widgetId + '&CompanyId=' + setting.CompanyID;

    //=======================================client features ==============================================


    chat.client.acknowledgePictureChangeToVisitor = function (data, isGroup) {
        if (!isGroup) {
            if (data != null && data != "") {
                var result = data.slice(1, -1);
                $('.opimg').attr("src", result);
            } else {
                $('.opimg').attr("src", Url + "/Content/custom/images/def-op-f.png");
            }
        }
    };


    chat.client.serviceStatus = function (status) {
        if (!status) {
            alert("Chat Feature temporary Unavailable...Please Contact Service Providers!!!!");
            return;
        } else {
            // chatInitiate();
            $('#iframe').first().focus();
        }
    };
    chat.client.noOperatorDepartment = function (departmentId) {
        $("#departmentcombo option").each(function () {
            if ($(this).val() == departmentId) {
                var text = $(this).text();
                $(this).text(text + " - Offline");
                $(this).attr('disabled', 'disabled');
            }
        });
    }

	chat.client.OkChatClose = function (data, isLogOut, opId, IsBanned, isServed) {
        isBannedIP = IsBanned;
        localStorage.setItem("ChatClose", new Date());
        if (!!data) {
			if (setting.InChatCompanyLogo && setting.InChatCompanyLogo != "") {
				$('.opimg').attr("src", setting.InChatCompanyLogo);
			} else {
				$('.opimg').attr("src", Url + "/Content/custom/images/def-op-f.png");
			}

            $("#thumbsupInchat").addClass("inactive");
            $("#thumbsDownInchat").addClass("inactive");
            $("#chatfileupload").addClass("inactive");

            $("#thumbsupInchat").removeClass("rate-up-selected");
            $("#thumbsDownInchat").removeClass("rate-down-selected");

            TempVisitor = data;

            $(".messagearea").empty().prepend('<div id="typing" class="usertyping"></div>');
            removeLocalStorage("StorageData_" + widgetId);
            removeLocalStorage("ConnectionData_" + widgetId);
            if (isBannedIP) {
                loadWidgetPanels("BannedIPRequest", true);
            }
            else if (isLogOut) {
                loadWidgetPanels("Nooperator", true);
            }
			else {
				if (isServed) {
					loadWidgetPanels("closechat", true);
				}
				else {
					refreshOnClose();
				}
            }
            var contactObj = JSON.parse(retreiveLocalStorageDecrypt("ContactData_" + widgetId));
            if (contactObj.Email != null && contactObj.Email != "") {
                if (setting.ChatClosedDownloadTranscript) {
                    $("#closeTranscript").show();
                }
            } else {
                if (!setting.StartChatEmailRequired) {
                    $("#transcript").hide();
                   
                }
                else {
                    $("#transcript").show();
                }
            }
        }
    };

    chat.client.GetContactDetails = function (data, visitor) {
        if (data) {
            removeLocalStorage("ContactData_" + widgetId);
            saveLocalStorage(data.TempContactDetails, "ContactData_" + widgetId);
            var vname = data.TempContactDetails.VisitorName;
            var vemail = data.TempContactDetails.Email;
            var contactId = data.TempContactDetails.ContactId;
            var requested = data.IsTranscriptRequest;

            if (vemail != null && requested == false) {
                $("#transcript").removeClass("inactive");
                $("#transcript").show();
            } else {
                $("#transcript").hide();
                $("#transcript").addClass("inactive");
            }

            if (contactId != null) {
                saveLocalStorage(data.TempContactDetails, "ContactData_" + widgetId);
            }

           // $(".visitorusername").html(vname);

            //change visitor name on storageData_
            var visitorObject = JSON.parse(retreiveLocalStorageDetails('StorageData_' + widgetId));
            visitorObject.VisitorName = data.TempContactDetails.VisitorName;
            removeLocalStorageDetails('StorageData_' + widgetId);
            saveLocalStorageDetails(visitorObject,'StorageData_' + widgetId);

        }
    }

    //remove visitor  Details
    function removeLocalStorageDetails(storageName) {
        localStorage.removeItem(storageName);
    };

    //get visitor  Details
    function retreiveLocalStorageDetails(storageName) {
        var data = localStorage[storageName];
        return data;
    }

    //save  Details
    function saveLocalStorageDetails(saveData, storageName) {
        var encrypted = JSON.stringify(saveData);
        localStorage[storageName] = encrypted;
    };

    chat.client.GetBannedIP = function (data) {
        if (data) {
            loadWidgetPanels("BannedIPRequest", true);
        }
    }

    chat.client.GetWidgetRequestResponse = function (data) {
        if (data) {
            localStorage.removeItem("sendingReq");
            if ($('.custom-style-container').contents().length == 0) {
                $('.custom-style-container').append('<style>.chat-bubble-right { background-color:' + setting.ColourVisitorChat + ';}.chat-bubble-right::after { border-left-color: ' + setting.ColourVisitorChat + '; border-right-color: ' + setting.ColourVisitorChat + '; }.chat-bubble-left { background-color: ' + setting.ColourOperatorChat + ';}.chat-bubble-left::after { border-left-color: ' + setting.ColourOperatorChat + '; border-right-color:' + setting.ColourOperatorChat + '; }</style>');
            }
            if (setting.StartChatDepartmentRequired) {
                $('.departmentcombo').val("0")
            }
            $('#txtquestion').val("");

            //load chat history icon
            //check if the string not null,not empty, not undefined
            if (data.TempContactDetails.Email) {
                $("#transcript").removeClass("inactive");
                $("#transcript").show();
            } else {
                $("#transcript").hide();
                $("#transcript").addClass("inactive");
            }

            spinnerFunctionUnload("searching_spinner_center");
            if (!retreiveLocalStorage("StorageData_" + widgetId)) {
                var visitorObj = data.TempLocalStorage;
                saveLocalStorage(visitorObj, "StorageData_" + widgetId);
                saveLocalStorage(data.TempContactDetails, "ContactData_" + widgetId);

                var messageObj = retreiveLocalStorage("Message_" + widgetId);
                if (!setting.StartChatNameRequired &&
                    !setting.StartChatDepartmentRequired &&
                    !setting.StartChatEmailRequired &&
                    !setting.StartChatQuestionRequired && !setting.StartChatPhoneRequired &&
                    messageObj && messageObj != null) {
                    var message = JSON.parse(messageObj);

                    $("#sendmsgtext").prop("disabled", false);
					chat.server.sendMessageFromVisitor(visitorObj.VisitorId, "", message.message, message.momTime, message.timeId, setting.CompanyID);
                    removeLocalStorage("Message_" + widgetId);
                }
                else if (setting.StartChatQuestionRequired &&
                    messageObj && messageObj != null) {
                    var message = JSON.parse(messageObj);
                    loadWidgetPanels("inChat", true);
                    var userObj = JSON.parse(retreiveLocalStorageDecrypt("StorageData_" + widgetId));
                    var name = name == null || name == "" ? userObj["VisitorName"] : name;
                    //$('.messagearea').append('<div class="greeting-msg">' + setting.StartChatQuestionText + '</div>');
                    pushChatMessageBeforeSend("", message.message, moment, "Visitor", name, false, "", message.momTime, message.timeId);
					chat.server.sendMessageFromVisitor(visitorObj.VisitorId, "", message.message, message.momTime, message.timeId, setting.CompanyID);
                    removeLocalStorage("Message_" + widgetId);

                }
                else {
                    loadWidgetPanels("inChat", true);

                }
                var messageModel = data.MessageModel;
                connectingToChat();
                if (setting.InChatMessage && setting.InChatMessage != "") {
                    if ((setting.StartChatNameRequired ||
                        setting.StartChatDepartmentRequired ||
                        setting.StartChatEmailRequired || setting.StartChatPhoneRequired) && !setting.StartChatQuestionRequired &&
						messageModel && messageModel != null) {
						var newdate = moment.utc(new Date(), 'YYYY-MM-DD HH:mm:ss');
						var utcTime = newdate.toDate();
						var localTime = formatHHMM(utcTime);
						if (setting.InChatGreeetingMessage && setting.InChatGreeetingMessage != "") {
							$('.messagearea').append('<div class="chat-bubble-left"><span class="username">' + (setting.InChatName && setting.InChatName != "" ? setting.InChatName : 'Customer Support Team') + '</span><br/>' + setting.InChatGreeetingMessage + '<br/> <span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
						}
                    }

                    var nWidgetShowTimer = parseInt(setting.WidgetShowTimer);
                    if (nWidgetShowTimer == '' || nWidgetShowTimer == 'undefined' || nWidgetShowTimer == null || nWidgetShowTimer == '0') {
                        $('.messagearea').append('<div id="inqueue" class="chat-notification-1">' + setting.InChatMessage + '</div>');
                    }
                }
                setTimeout(function () {
                    removeConnectingMessage();
                    if (messageModel) {
                        if (messageModel["IsJoin"] == "false") {
                            $('.messagearea').append('<p class="chat-notification-1">' + messageModel["MessageText"] + '</p>');
                        }
                    }

                    $('.chat-notification-1').css('background-color', setting.ColourVisitorNotificationChat);
                    $('.chat-notification-1').css('color', setting.TextColourVisitorNotificationChat);
                }, 1000);
            }

        } else {
            //user insert fail error need to be here
        }
    }



    chat.client.addChatMessage = function (id, message, time, type, name, isJoined, messageType, timeId) {
        var TimeId = timeId;

        if ($('.custom-style-container').contents().length == 0) {
            $('.custom-style-container').append('<style>.chat-bubble-right { background-color:' + setting.ColourVisitorChat + ';}.chat-bubble-right::after { border-left-color: ' + setting.ColourVisitorChat + '; border-right-color: ' + setting.ColourVisitorChat + '; }.chat-bubble-left { background-color: ' + setting.ColourOperatorChat + ';}.chat-bubble-left::after { border-left-color: ' + setting.ColourOperatorChat + '; border-right-color:' + setting.ColourOperatorChat + '; }</style>');
        }
        $("#" + TimeId + "").hide();

        if (type == "Operator") {
            if (localStorage.getItem('sound_' + setting.CompanyID) != "false" && notifySound != 0) {
                document.getElementById("sound").innerHTML = '<audio autoplay="autoplay"><source src="' + Url + '/Content/Audio/' + notifySound + '.mp3" type="audio/mpeg" /><source src=" ../../Content/Audio/' + notifySound + '.ogg" type="audio/ogg" /> <source src=" ../../Content/Audio/2.wma" type="audio/wma" /></audio>';
            }

            if (messageType == "JoinMessage" || messageType == "RequeueMessage" || messageType == "TransferMessage") {
                if (message != '' && message != null) {
                    $('.messagearea').append('<p class="chat-notification-2">' + message + '</p>');
                }

                $('.chat-notification-2').css('background-color', setting.ColourOperatorNotificationChat);
                $('.chat-notification-2').css('color', setting.TextColourOperatorNotificationChat);
            }
            else {
                var newdate = moment.utc(time, 'YYYY-MM-DD HH:mm:ss');
                var utcTime = newdate.toDate();
                var localTime = formatHHMM(utcTime);

                //var encode = null;
               // if (IsUrl(message)) {
                    var encode = UrlDivider(message);
                //} else {
                //    encode = $('<p></p>').text(message).html();
                //}

                if (type == "Visitor") {
                    //$('.messagearea').append('<p class="visitorchat talk-bubble1 tri-right right-bottom"><span class="username visitorusername">' + name + '</span><br />' + encode + '<br /><span class="chattime">' + localTime + '</span></p><div class="clear-fix"></div>');
                    $('.messagearea').append('<div class="chat-bubble-right"><span class="username visitorusername">You</span><br/>' + encode + '<a href="#"></a> <br/><span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
                    $('.chat-bubble-right').css('background-color', setting.ColourVisitorChat);
                    $('.chat-bubble-right').css('color', setting.TextColourVisitorChat);
                }
                else if (type == "Operator") {
                    if (isCollapsed) {
                        ++messageCounter;
                        if (messageCounter == 1) {
                            $("#inchathead").html(messageCounter + " new message");
                        }
                        else {
                            $("#inchathead").html(messageCounter + " new messages");
                        }
                    }

                    //$('.messagearea').append('<p class="operatorchat talk-bubble2 tri-right left-bottom""><span class="username">' + name + '</span><br />' + encode + '<br /><span class="chattime">' + localTime + '</span></p><div class="clear-fix"></div>');
                    $('.messagearea').append('<div class="chat-bubble-left"><span class="username">' + name + '</span><br/>' + encode + '<br/> <span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
                    $('.chat-bubble-left').css('background-color', setting.ColourOperatorChat);
                    $('.chat-bubble-left').css('color', setting.TextColourOperatorChat);
                }
            }

            getMessages();
        }
    };

	chat.client.backtochat = function (data) {
		var proactiveId = null;
		var ProactiveIdSaved = retreiveLocalStorageDecrypt("ProactiveId_" + widgetId);
		if (ProactiveIdSaved) {
			proactiveId = ProactiveIdSaved.replace(/\"/g, '');
		} else {
			proactiveId = CreateGuid();
			saveLocalStorage(proactiveId, "ProactiveId_" + widgetId);
		}

		if (retreiveLocalStorage("StorageData_" + widgetId)) {
			var userObj = JSON.parse(retreiveLocalStorageDecrypt("StorageData_" + widgetId));
			var visitorID = userObj["VisitorId"];


			//chat.server.requestOldChatHistory(visitorID, proactiveId, setting.CompanyID);

			// Update the name of the chat and rating
			if (data) {
				messageLoop(data.ChatMessages, data.IsPicked);
				if (data.Rating != null) {
					if (data.Rating == "True") {
						$("#thumbsupInchat").addClass("rate-up-selected");
					}
					else {
						$("#thumbsDownInchat").addClass("rate-down-selected");
					}
				}



				if (data.IsPicked) {
					$(".opname").html(data.OperatorName);
					$("#chatfileupload").removeClass("inactive");
					$("#thumbsupInchat").removeClass("inactive");
					$("#thumbsDownInchat").removeClass("inactive");
					if (data.RequestTranscript == false && data.Email != null) {
						$("#transcript").removeClass("inactive");

					} else {
						$("#transcript").hide();
					}
				}
				else {
					$("#thumbsupInchat").addClass("inactive");
					$("#thumbsDownInchat").addClass("inactive");
					$("#chatfileupload").addClass("inactive");
					if (!setting.StartChatQuestionRequired) {
						var newdate = moment.utc(new Date(), 'YYYY-MM-DD HH:mm:ss');
						var utcTime = newdate.toDate();
						var localTime = formatHHMM(utcTime);
						if (setting.InChatGreeetingMessage && setting.InChatGreeetingMessage != "") {
							$('.messagearea').append('<div class="chat-bubble-left"><span class="username">' + (setting.InChatName && setting.InChatName != "" ? setting.InChatName : 'Customer Support Team') + '</span><br/>' + setting.InChatGreeetingMessage + '<br/> <span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
						}
					} else {
						//$('.greeting-msg').text(setting.StartChatQuestionText)
					}

					if (setting.InChatMessage && setting.InChatMessage != "") {
						$('.messagearea').append('<div id="inqueue" class="chat-notification-1">' + setting.InChatMessage + '</div>');
						$('.chat-notification-1').css('background-color', setting.ColourVisitorNotificationChat);
						$('.chat-notification-1').css('color', setting.TextColourVisitorNotificationChat);
					}
				}
			}
			else {
				$(".opname").html(setting.InChatMessage);
			}
		}

	};

    chat.client.removeRequeueChat = function (data) {
        //$('.messagearea').append('<div id="inqueue" class="chat-notification-1">' + setting.InChatMessage + '</div>');
        $('.opimg').attr("src", Url + "/Content/custom/images/def-op-f.png");
    }

    chat.client.tranferCompleted = function (OpeName, image) {
        $(".opname").html(OpeName);
        if (image != null && image != "") {
            $('.opimg').attr("src", image);
        } else {
            $('.opimg').attr("src", Url + "/Content/custom/images/def-op-f.png");
        }
    }

    chat.client.MessageHistory = function (data) {
        messageLoop(data);

    };


    function messageLoop(data, isPicked) {
        if ($('.custom-style-container').contents().length == 0) {
            $('.custom-style-container').append('<style>.chat-bubble-right { background-color:' + setting.ColourVisitorChat + ';}.chat-bubble-right::after { border-left-color: ' + setting.ColourVisitorChat + '; border-right-color: ' + setting.ColourVisitorChat + '; }.chat-bubble-left { background-color: ' + setting.ColourOperatorChat + ';}.chat-bubble-left::after { border-left-color: ' + setting.ColourOperatorChat + '; border-right-color:' + setting.ColourOperatorChat + '; }</style>');
        }

        var opImage = "";
        var opcount = 0;
		$.each(data, function (key, value) {
            if (value.MessageType == "VisitorStatusMessage") {
                return;
            }
            opcount = value.OperatorCount;
            if (value.Type == 'Visitor') {
                if (value.Email != null && value.RequestTranscript == false) {
                    $("#transcript").show();
                    $("#transcript").removeClass("inactive");
                } else {
                    $("#transcript").hide();
                    $("#transcript").addClass("inactive");
                }
            }

            var newdate = moment.utc(value.MessageTime, 'YYYY-MM-DD HH:mm:ss');
            var utcTime = newdate.toDate();
            var localTime = formatHHMM(utcTime);
            // localTime = moment(localTime).format('YYYY-MM-DD hh:mm:ss a');
            if (opImage == "" && value.Type != 'Visitor') {
                if (value.OperatorCount <= 1) {
                    if (value.CurrentOpImage != null) {
                        opImage = value.CurrentOpImage;
                    } else {
                        opImage = Url + "/Content/custom/images/def-op-f.png";
                    }
                }
                else {
                    opImage = Url + "/Content/custom/images/def-op-f.png";
                }
            }



            if (value.MessageType == "JoinMessage" || value.MessageType == "RequeueMessage" || value.MessageType == "TransferMessage") {
                if (value.Type == 'Visitor') {
                    if (value.MessageType == "JoinMessage") { } else {
                        $('.messagearea').append('<p class="chat-notification-1">' + value.Messagetext + '</p>');
                        $('.chat-notification-1').css('background-color', setting.ColourVisitorNotificationChat);
                        $('.chat-notification-1').css('color', setting.TextColourVisitorNotificationChat);
                    }
                } else {
                    $('.messagearea').append('<p class="chat-notification-2">' + value.Messagetext + '</p>');
                    $('.chat-notification-2').css('background-color', setting.ColourOperatorNotificationChat);
                    $('.chat-notification-2').css('color', setting.TextColourOperatorNotificationChat);

                }
            }
            else if (value.Type == "Visitor") {

                //var encode = null;
                //if (IsUrl(value.Messagetext)) {
                   var encode = UrlDivider(value.Messagetext);
                    //encode = '<a href="' + value.Messagetext + '" target="_blank">' + value.Messagetext + '</a>';
                //} else {
                //    encode = $('<p></p>').text(value.Messagetext).html();
                //}

                if (!!value.File) {
                     $('.messagearea').append('<div class="chat-bubble-right"><span class="username visitorusername">You</span><br /><a href=' + webApiUrl + '/DownloadFile?fileID=' + value.File + ' download>' + value.Messagetext + '</a><br/><span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
                }
                else {
                    $('.messagearea').append('<div class="chat-bubble-right"><span class="username visitorusername">You</span><br />' + encode + '<a href="#"></a> <br/><span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
                    $('.chat-bubble-right').css('background-color', setting.ColourVisitorChat);
                    $('.chat-bubble-right').css('color', setting.TextColourVisitorChat);
                }
            }
            else if (value.Type == "Operator") {

                //if (IsUrl(value.Messagetext)) {
                    var encode = UrlDivider(value.Messagetext);
                //} else {
                //    encode = $('<p></p>').text(value.Messagetext).html();
                //}

                if (!!value.File) {
                    $('.messagearea').append('<div class="chat-bubble-left"><span class="username">' + value.Name + '</span><br /><a href=' + webApiUrl + '/DownloadFile?fileID=' + value.File + ' download>' + value.Messagetext + '</a><br/><span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
                    $('.chat-bubble-left').css('background-color', setting.ColourOperatorChat);
                    $('.chat-bubble-left').css('color', setting.TextColourOperatorChat);
                }
                else {
                    $('.messagearea').append('<div class="chat-bubble-left"><span class="username">' + value.Name + '</span><br />' + encode + '<br/> <span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
                    $('.chat-bubble-left').css('background-color', setting.ColourOperatorChat);
                    $('.chat-bubble-left').css('color', setting.TextColourOperatorChat);
                }
            }



            $("#sendmsgtext").val('');
            $("#sendmsgtext").focus();

        });

		if (!isPicked) {
			if (setting.InChatCompanyLogo && setting.InChatCompanyLogo != "") {
				$('.opimg').attr("src", setting.InChatCompanyLogo);
			} else {
				$('.opimg').attr("src", Url + "/Content/custom/images/def-op-f.png");
			}
		}
		else {
			if (opImage == null || opImage == '') {
				opImage = Url + "/Content/custom/images/def-op-f.png";
			}
			$('.opimg').attr("src", opImage);
		}

        getMessages();
    }

    chat.client.sendRefreshRequest = function (data) {
        if (data == true) {
            refreshOnClose();
            $(".opname").html(setting.InChatMessage);
        }
    };


    var timeoutid;
    chat.client.sayWhoIsTyping = function (name, senderType, isTyping) {
        if (name && senderType) {
            if (senderType != "Visitor") {

                if (isTyping) {
                    if (setting.InChatSendText == "" || setting.InChatSendText == null) {
                        $('#typing').html(name + '...');
                    } else {
                        $('#typing').html(name + ' ' + setting.InChatSendText);
                    }
                    $('#typing').removeClass('usertyping-hidden');
                } else {
                    $('#typing').html('&nbsp;');
                    $('#typing').addClass('usertyping-hidden');
                }
            }
        }
    };

    chat.client.UploadedFileDetail = function (fileName, fileID, time, uploderType, visitor, visitorName, downloadName) {
        var element = document.getElementById("upload_" + fileName);
        $(element).remove();

        var newdate = moment.utc(time, 'YYYY-MM-DD HH:mm:ss');
        var utcTime = newdate.toDate();
        var localTime = formatHHMM(utcTime);
        // localTime = moment(localTime).format('YYYY-MM-DD hh:mm:ss a');

        if (uploderType == "Visitor") {
            //$('.messagearea').append('<p class="visitorchat talk-bubble1 tri-right right-bottom"><span class="username visitorusername">' + visitorName + '</span><br /><a href=' + webApiUrl + '/DownloadFile?fileID=' + fileID + ' download>' + fileName + '</a><br /><span class="chattime">' + localTime + '</span></p><div class="clear-fix"></div>');
            $('.messagearea').append('<div class="chat-bubble-right"><span class="username visitorusername">You</span><br /><a href=' + webApiUrl + '/DownloadFile?fileID=' + fileID + ' download>' + fileName + '</a><br/><span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');

            $('.chat-bubble-right').css('background-color', setting.ColourVisitorChat);
            $('.chat-bubble-right').css('color', setting.TextColourVisitorChat);
            $("#sendmsgtext").val('');
            $("#sendmsgtext").focus();
        }
        else {
            // $('.messagearea').append('<p class="operatorchat talk-bubble2 tri-right left-bottom"><span class="username">' + visitorName + '</span><br /><a href=' + webApiUrl + '/DownloadFile?fileID=' + fileID + ' download>' + fileName + '</a><br /><span class="chattime">' + localTime + '</span></p><div class="clear-fix"></div>');
            $('.messagearea').append('<div class="chat-bubble-left"><span class="username">' + visitorName + '</span><br /><a href=' + webApiUrl + '/DownloadFile?fileID=' + fileID + ' download>' + fileName + '</a><br/><span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
            $('.chat-bubble-left').css('background-color', setting.ColourOperatorChat);
            $('.chat-bubble-left').css('color', setting.TextColourOperatorChat);
        }
        getMessages();
        $("#chatfileupload").removeClass("inactive");
    };

    chat.client.loadNoOperator = function () {
        loadWidgetPanels("Nooperator", true);
    }

    chat.client.selectedOperatorDetails = function (name, image, isrequest) {
        var proactiveId = null;
        var ProactiveIdSaved = retreiveLocalStorageDecrypt("ProactiveId_" + widgetId);
        if (ProactiveIdSaved) {
            proactiveId = ProactiveIdSaved.replace(/\"/g, '');
        } else {
            proactiveId = CreateGuid();
            saveLocalStorage(proactiveId, "ProactiveId_" + widgetId);
        }

        if (image != null && image != "") {
            $('.opimg').attr("src", image);
        } else {
            $('.opimg').attr("src", Url + "/Content/custom/images/def-op-f.png");
        }
        $(".opname").html(name);
        $("#chatfileupload").removeClass("inactive");
        $("#thumbsupInchat").removeClass("inactive");
        $("#thumbsDownInchat").removeClass("inactive");

        $("#inqueue").hide();
    }

    chat.client.noOperatorsAvailable = function (expand) {
        loadWidgetPanels("Nooperator", expand);
        spinnerFunctionUnload("searching_spinner_center");
    }

    chat.client.loadProactiveChat = function (details, contact) {
        var visitor = { "VisitorId": details["VisitorId"], WidgetId: details["WidgetId"], VisitorName: details["VisitorName"], StartTime: details["StartTime"], CompanyID: details["CompanyId"], TimeZone: details["timezone"], CountryCode: details["CountryCode"], ContactId: details["ContactId"], Email: details["Email"] };
        saveLocalStorage(visitor, "StorageData_" + widgetId);
        contact.VisitorName = contact.Name;
        saveLocalStorage(contact, "ContactData_" + widgetId);

        spinnerFunctionUnload("searching_spinner_center");
        $("#thumbsupInchat").removeClass("inactive");
        $("#thumbsDownInchat").removeClass("inactive");
        if (contact.Email == null || details.RequestTranscript == true) {
            $("#transcript").hide();
            $("#transcript").addClass("inactive");

        } else {
            $("#transcript").show();
            $("#transcript").removeClass("inactive");
        }
        $("#chatfileupload").removeClass("inactive");
        if (isMobile) {
            loadMobileWidget("expanded");
        }

        var messageObj = retreiveLocalStorage("Message_" + widgetId);
        if (!setting.StartChatNameRequired &&
            !setting.StartChatDepartmentRequired &&
            !setting.StartChatEmailRequired &&
            !setting.StartChatQuestionRequired && !setting.StartChatPhoneRequired &&
            messageObj && messageObj != null) {
            var message = JSON.parse(messageObj);
			chat.server.sendMessageFromVisitor(visitor.VisitorId, "", message.message, message.momTime, message.timeId, setting.CompanyID);
            $("#sendmsgtext").prop("disabled", false);
            removeLocalStorage("Message_" + widgetId);
        }
        else {
            loadWidgetPanels("inChat", true);
        }
        chat.server.addProactiveGroup(details["VisitorId"]);
    }

    chat.client.loadProactiveChatOperator = function (OpeName, operatorImage) {
        spinnerFunctionUnload("searching_spinner_center");
        $(".opname").html(OpeName);
        if (operatorImage != null && operatorImage != "") {
            $('.opimg').attr("src", operatorImage);
        } else {
            $('.opimg').attr("src", Url + "/Content/custom/images/def-op-f.png");
        }
    }


    //all SignalR function
    $.connection.hub.start().done(function () {
        

        //===================Server Functions ====================================================------
        //console.log("came")
        //check Hosted server is running or not------------------------------------------------------------

        //chat.server.checkWebServiceStatus();
        chatInitiate();

        saveLocalStorage(chat.connection.id, "ConnectionData_" + widgetId);

        //send chat reuest   
        $(document).on('click', '.btnsendreq', function () {

            sendRequest(widgetId);
        });

    });


    $.connection.hub.disconnected(function () {
        setTimeout(function () {
			$.connection.hub.start({
			}).done(function () {
				afterreconnect();
			});
        }, 5000);
    });
    //check disconnect


    var istypingtimeout;

    $("#startchatdetails").keypress(function (e) {
        if (e.which == 13) {
            sendRequest(widgetId);
        }
    });
    //chat feature
    $(document).keypress(function (e) {
        if (e.which == 13) {
            sendMessage();
            e.preventDefault();
        }
        else {
            $('#sendmsgtext').is(":focus")
            {
                if (retreiveLocalStorage("StorageData_" + widgetId)) {
                    var userObj = JSON.parse(retreiveLocalStorageDecrypt("StorageData_" + widgetId));
                    var visitorID = userObj["VisitorId"];
                    //var visitorName = userObj["VisitorName"];

                    var contactObj = JSON.parse(retreiveLocalStorageDecrypt("ContactData_" + widgetId));
                    var visitorName = null;
                    if (contactObj != null) {
                        visitorName = contactObj["VisitorName"];
                    } else {
                        visitorName = "Visitor";
                    }


                    if (istypingtimeout) clearTimeout(istypingtimeout)
                    else {
                        if (!!visitorID) {
                            chat.server.isTyping(visitorName, visitorID, "Visitor", true, "");
                        }
                    }
                    istypingtimeout = setTimeout(function () {
                        if (!!visitorID) {
                            chat.server.isTyping(visitorName, visitorID, "Visitor", false, "");
                            istypingtimeout = undefined;
                        }
                    }, 1500)

                }


            }
        }
    });

    //$(document).bind('input propertychange', '#sendmsgtext', function () {
        
    //});

    $(document).bind('input propertychange', '#sendmsgtext', function () {
		if (isMobile) {
			var userObj = JSON.parse(retreiveLocalStorageDecrypt("StorageData_" + widgetId));
			var visitorID = userObj["VisitorId"];

			var contactObj = JSON.parse(retreiveLocalStorageDecrypt("ContactData_" + widgetId));
			var visitorName = null;
			if (contactObj != null) {
				visitorName = contactObj["VisitorName"];
			} else {
				visitorName = "Visitor";
			}

            var message = $.trim($("#sendmsgtext").val());
            if (message != null && message != "") {
                $("#sendMsg").show();
				$("#chatfileupload").hide();
				chat.server.isTyping(visitorName, visitorID, "Visitor", true, "");
				setTimeout(function () {
					if (!!visitorID) {
						chat.server.isTyping(visitorName, visitorID, "Visitor", false, "");
						istypingtimeout = undefined;
					}
				}, 1500)
            }
            else {
                $("#sendMsg").hide();
				$("#chatfileupload").show();
				chat.server.isTyping(visitorName, visitorID, "Visitor", false, "");
            }
        }
    });

    $(document).on('click', '#sendMsg', function () {
        sendMessage();
    });

    function sendMessage() {
        if ($('.custom-style-container').contents().length == 0) {
            $('.custom-style-container').append('<style>.chat-bubble-right { background-color:' + setting.ColourVisitorChat + ';}.chat-bubble-right::after { border-left-color: ' + setting.ColourVisitorChat + '; border-right-color: ' + setting.ColourVisitorChat + '; }.chat-bubble-left { background-color: ' + setting.ColourOperatorChat + ';}.chat-bubble-left::after { border-left-color: ' + setting.ColourOperatorChat + '; border-right-color:' + setting.ColourOperatorChat + '; }</style>');
        }
        if (retreiveLocalStorageDecrypt("ContactData_" + widgetId)) {
            var contactObj = JSON.parse(retreiveLocalStorageDecrypt("ContactData_" + widgetId));
            name = contactObj["VisitorName"];
        }
        var message = $.trim($("#sendmsgtext").val());
        $("#sendmsgtext").val("");
        $("#sendMsg").hide();
        $("#chatfileupload").show();
        var momTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
        var timeId = CreateGuid();

        if (retreiveLocalStorage("StorageData_" + widgetId)) {
            var userObj = JSON.parse(retreiveLocalStorageDecrypt("StorageData_" + widgetId));
            var name = name == null || name == "" ? userObj["VisitorName"] : name;

            var visitorID = userObj["VisitorId"];
            var SignalrID = userObj["SignalId"];

            if (!!visitorID) {
                if (!!message) {
                    pushChatMessageBeforeSend(visitorID, message, moment, "Visitor", name, false, "", momTime, timeId);
					chat.server.sendMessageFromVisitor(visitorID, SignalrID, message, momTime, timeId, setting.CompanyID);
                }
            }
        }
        else if (!setting.StartChatNameRequired &&
            !setting.StartChatDepartmentRequired &&
            !setting.StartChatEmailRequired && !setting.StartChatPhoneRequired &&
            !setting.StartChatQuestionRequired) {
            if (!name || name == null || name == "") {
                name = "Visitor";
            }
            $("#sendmsgtext").prop("disabled", true);
            pushChatMessageBeforeSend("", message, moment, "Visitor", name, false, "", momTime, timeId);
            var messageObject = {
                "message": message,
                "moment": moment,
                "name": name,
                "momTime": momTime,
                "timeId": timeId
            };
            saveLocalStorage(messageObject, "Message_" + widgetId);
            $("#chatfileupload").addClass("inactive");
            sendRequest(widgetId);
        }
    }


    function pushChatMessageBeforeSend(id, message, time, type, name, isJoined, messageType, momTime, timeId) {
        if ($('.custom-style-container').contents().length == 0) {
            $('.custom-style-container').append('<style>.chat-bubble-right { background-color:' + setting.ColourVisitorChat + ';}.chat-bubble-right::after { border-left-color: ' + setting.ColourVisitorChat + '; border-right-color: ' + setting.ColourVisitorChat + '; }.chat-bubble-left { background-color: ' + setting.ColourOperatorChat + ';}.chat-bubble-left::after { border-left-color: ' + setting.ColourOperatorChat + '; border-right-color:' + setting.ColourOperatorChat + '; }</style>');
        }
        if (messageType == "JoinMessage" || messageType == "RequeueMessage" || messageType == "TransferMessage") {
            $('.messagearea').append('<p class="chat-notification-2">' + message + '</p>');
            $('.chat-notification-2').css('background-color', setting.ColourOperatorNotificationChat);
            $('.chat-notification-2').css('color', setting.TextColourOperatorNotificationChat);

        }
        else {
            var newdate = moment.utc(momTime, 'YYYY-MM-DD HH:mm:ss');
            var utcTime = newdate.toDate();
            var localTime = formatHHMM(utcTime);//utcTime.toLocaleTimeString().replace(/(:\d{2}| [AP]M)$/, "");

            var TimeId = timeId;

            //var encode = null;
            //if (IsUrl(message)) {
                var encode = UrlDivider(message);
                //encode = '<a href="' + message + '" target="_blank">' + message + '</a>';
            //} else {
            //    encode = $('<p></p>').text(message).html();
            //}



            if (type == "Visitor") {

                //$('.messagearea').append('<p class="visitorchat talk-bubble1 tri-right right-bottom"><span class="username visitorusername">' + name + '</span><br />' + encode + '<img id="' + TimeId + '" src="' + Url + '/Content/images/NEW IMG/ellipsis.svg"/><br /><span class="chattime">' + localTime + '</p><div class="clear-fix"></div>')//.text(message);
				$('.messagearea').append('<div class="chat-bubble-right"><span class="username visitorusername">You</span><br />' + encode + '<img id="' + TimeId + '" src="' + Url + '/Content/images/NEW IMG/ellipsis.svg"/><br/><span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
                $('.chat-bubble-right').css('background-color', setting.ColourVisitorChat);
                $('.chat-bubble-right').css('color', setting.TextColourVisitorChat);
            }
            else if (type == "Operator") {
                if (isCollapsed) {
                    ++messageCounter;
                    if (messageCounter == 1) {
                        $("#inchathead").html(messageCounter + " new message");
                    }
                    else {
                        $("#inchathead").html(messageCounter + " new messages");
                    }
                }

                //$('.messagearea').append('<p class="operatorchat talk-bubble2 tri-right left-bottom""><span class="username">' + name + '</span><br />' + encode + '<br /><span class="chattime">' + localTime + '</span></p><div class="clear-fix"></div>');
                $('.messagearea').append('<div class="chat-bubble-left"><span class="username">' + name + '</span><br />' + encode + ' <br/><span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
                $('.chat-bubble-left').css('background-color', setting.ColourOperatorChat);
                $('.chat-bubble-left').css('color', setting.TextColourOperatorChat);
            }
        }

        getMessages();

        $("#sendmsgtext").val('');
        // document.getElementById("sendmsgtext").focus();
        $(function () {
            $("#sendmsgtext").focus();
        });
        // $("#sendmsgtext").focus();
    };


    //for plus Rating 
    $(document).on('click', '#thumbsupInchat', function () {
        if (retreiveLocalStorage("StorageData_" + widgetId)) {
            var userObj = JSON.parse(retreiveLocalStorageDecrypt("StorageData_" + widgetId));
            var visitorID = userObj["VisitorId"];
            var SignalrID = userObj["SignalId"];
            var visitorName = userObj["VisitorName"];
            if (!!visitorID) {
                chat.server.rateChat(visitorID, "True", false, setting.CompanyID);
                $("#thumbsupInchat").addClass("rate-up-selected");
                $("#thumbsDownInchat").removeClass("rate-down-selected");
                $(".messagearea").append('<p  class="chat-notification-2">Visitor has given a positive rate</p>');
                $('.chat-notification-2').css('background-color', setting.ColourOperatorNotificationChat);
                $('.chat-notification-2').css('color', setting.TextColourOperatorNotificationChat);

            }
        }
    });

    $(document).on('click', '#thumbsDownInchat', function () {
        if (retreiveLocalStorage("StorageData_" + widgetId)) {
            var userObj = JSON.parse(retreiveLocalStorageDecrypt("StorageData_" + widgetId));
            var visitorID = userObj["VisitorId"];
            if (!!visitorID) {
                chat.server.rateChat(visitorID, "False", false, setting.CompanyID);
                $("#thumbsupInchat").removeClass("rate-up-selected");
                $("#thumbsDownInchat").addClass("rate-down-selected");
                $(".messagearea").append('<p  class="chat-notification-2">Visitor has given a negative rate</p>');
                $('.chat-notification-2').css('background-color', setting.ColourOperatorNotificationChat);
                $('.chat-notification-2').css('color', setting.TextColourOperatorNotificationChat);

            }
        }
    });

    $(document).on('click', '#closeThumbsUp', function () {
        if (!!TempVisitor) {
            chat.server.rateChat(TempVisitor, "True", true, setting.CompanyID);
        }

    });

    $(document).on('click', '#closeThumbsDown', function () {
        if (!!TempVisitor) {
            chat.server.rateChat(TempVisitor, "False", true, setting.CompanyID);
        }

    });

    $(document).on('click', '#transcript', function () {
        sendTranscript(false);
    });

    $(document).on('click', '#closeTranscript', function () {
        $.post(webApiUrl + "/SendVisitorTranscriptonClose?visitorId=" + TempVisitor + "&companyId=" + setting.CompanyID,
            function (data) {
                    $("#closeTranscript").hide();
                    $("#emailSentClose").show();
            });
    });

    function sendTranscript(isClosed) {
        if (isClosed) {
            var value = invokeTranscript(TempVisitor, isClosed);
        }
        if (retreiveLocalStorage("StorageData_" + widgetId)) {
            var userObj = JSON.parse(retreiveLocalStorageDecrypt("StorageData_" + widgetId));
            var visitorID = userObj["VisitorId"];
            $('.messagearea').append('<p id="transEmail" class="chat-notification-1">Request chat transcript....</p>');
            $('.chat-notification-1').css('background-color', setting.ColourVisitorNotificationChat);
            $('.chat-notification-1').css('color', setting.TextColourVisitorNotificationChat);
            invokeTranscript(visitorID, isClosed);
        }
    }

    function invokeTranscript(visitorId, isClosed) {
        $.post(webApiUrl + "/UpdateTranscripRequest?visitorId=" + visitorId + "&isClosed=" + isClosed,
            function (data) {
                if (data.IsSuccess) {
                    $("#transEmail").hide();
                    $("#transcript").addClass("inactive");
                    $('.messagearea').append('<p class="chat-notification-1">Transcript successfully queued.</p>');
                    $('.chat-notification-1').css('background-color', setting.ColourVisitorNotificationChat);
                    $('.chat-notification-1').css('color', setting.TextColourVisitorNotificationChat);
                }
                else {
                    return false;
                }
            });
    }


    //chat Widget Close Panel Load
    $(document).on('click', '#btnclosechat', function () {

        var onclick = confirm('Are you sure you want to close this chat?');
        if (onclick) {
            if (retreiveLocalStorage("StorageData_" + widgetId)) {
                var userObj = JSON.parse(retreiveLocalStorageDecrypt("StorageData_" + widgetId));
                $("#conchat").empty().prepend('<div id="chat-notification-2"></div><div class="messages"><div id="chatmsgs"></div></div>');
                $('.chat-notification-2').css('background-color', setting.ColourOperatorNotificationChat);
                $('.chat-notification-2').css('color', setting.TextColourOperatorNotificationChat);

                chat.server.chatClosed(userObj["VisitorId"]);

            }
        }
    });


    $(document).on('change', "#my_file", function () {
        UploadFile();
    });


    $(document).on('click', '.chaticon3', function () {
        loadWidgetPanels("startChat", true);
        var name = "";
        var email = "";
        var contactId = "";
        if (retreiveLocalStorageDecrypt("ContactData_" + widgetId)) {
            var contactObj = JSON.parse(retreiveLocalStorageDecrypt("ContactData_" + widgetId));
            name = contactObj["VisitorName"];
            if (name == "Visitor") {
                name = "";
            }
            contactId = contactObj["ContactId"];
            email = contactObj["Email"];

            $('#txtname').val(name);
            $('#txtemails').val(email);

        }
        var momTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
        getBrowserAndOsVersion();
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

        if (
            !setting.StartChatNameRequired &&
            !setting.StartChatDepartmentRequired &&
            !setting.StartChatEmailRequired &&
            !setting.StartChatPhoneRequired &&
			!setting.StartChatQuestionRequired) {
			var newdate = moment.utc(new Date(), 'YYYY-MM-DD HH:mm:ss');
			var utcTime = newdate.toDate();
			var localTime = formatHHMM(utcTime);
			if (setting.InChatGreeetingMessage && setting.InChatGreeetingMessage != "") {
				$('.messagearea').append('<div class="chat-bubble-left"><span class="username">' + (setting.InChatName && setting.InChatName != "" ? setting.InChatName : 'Customer Support Team') + '</span><br/>' + setting.InChatGreeetingMessage + '<br/> <span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
			}
        }

        if (!isBannedIP) {
			chat.server.createProactiveChat(geoData.iso_code, Ip, widgetId, setting.WidgetName, pageUrl, geoData.CountryCode, geoData.CountryName, browser, (os + osVersion), setting.StartChatDepartmentRequired ? setting.Departments : null, name != "" ? name : "Visitor", contactId, setting.CompanyID, momTime, geoData.Latitude, geoData.Longitude, proactiveId, setting.AssignedDepartments, isHosted ? 3 : 1);
        }
        $(".opname").html(setting.InChatMessage);
    });
    //========================================================behaviour Methods================================================================


    //file upload Click Event
    $(document).on('click', '#chatfileupload', function () { $("input[id='my_file']").click(); });

    setInterval(hartbeatlistner, 15000);
    //setInterval(apiTest, 10000);
    function apiTest() {

    }
    function hartbeatlistner() {
        var proactiveId = null;
        var ProactiveIdSaved = retreiveLocalStorageDecrypt("ProactiveId_" + widgetId);
        if (ProactiveIdSaved) {
            proactiveId = ProactiveIdSaved.replace(/\"/g, '');
        } else {
            proactiveId = CreateGuid();
            saveLocalStorage(proactiveId, "ProactiveId_" + widgetId);
        }
    }

    function CreateGuid() {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }

    var cancelUploading = false;
    function UploadFile(file) {
        var xhr = new XMLHttpRequest();
        var files = jQuery("#my_file").get(0).files;
        var data = new FormData();
        var fileSend;
        if (files && files.length > 0) {
            if (window.FormData !== undefined) {

                for (i = 0; i < files.length; i++) {
                    fileSend = files[i];
                    size = files[i].size;
                    filetype = files[i].type;
                    originalName = files[i].name;
                }
                var visitorName = "";
                if (retreiveLocalStorage("ContactData_" + widgetId)) {
                    var userObj = JSON.parse(retreiveLocalStorageDecrypt("ContactData_" + widgetId));
                    visitorName = userObj["VisitorName"];
                }

                if (size >= 22000000) {
                    alert("Attachment size exceeds the allowable limit is 20Mb");
                }
                else {
                    // $('.messagearea').append(' <p id="upload_' + originalName + '" class="chat-bubble-right"><span class="username visitorusername">' + visitorName + '</span><br /><img src="' + Url + '/Content/Custom/Images/uploadicon.png" class="uploadicon"><br />' + originalName + '<a id="cancel_"' + originalName + ' onclick="CancelUpload(originalName)" class="closebtn">x</a><br /><img class="progressbar" style="display:block" src="' + Url + '/Content/Custom/Images/Thinstripes.gif" /><br /><span class="chat-time-right">' + new Date().toLocaleTimeString() + '</span></p><div class="clear-fix"></div>');
					$('.messagearea').append('<p id="upload_' + originalName + '" class="chat-bubble-right"><span class="username visitorusername">You</span><br /><img src="' + Url + '/Content/Custom/Images/uploadicon.png" class="uploadicon"><br />' + originalName + '<a id="' + originalName + '" class="closebtn closebtn-out"> X</a><br /><img class="progressbar" style="display:block" src="' + Url + '/Content/Custom/Images/Thinstripes.gif" /><br /><span class="chat-time-right">' + formatHHMM(new Date()) + '</span></p><div class="clear-fix"></div>');
                    $('.chat-bubble-right').css('background-color', setting.ColourVisitorChat);
                    $('.chat-bubble-right').css('color', setting.TextColourVisitorChat);
                    getMessages();

                    xhr.open("POST", webApiUrl + "/UploadFile", true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            // Every thing ok, file uploaded
                            if (xhr.responseText != "") {
                                if (retreiveLocalStorage("StorageData_" + widgetId)) {
                                    var userObj = JSON.parse(retreiveLocalStorageDecrypt("StorageData_" + widgetId));
                                    var visitorID = userObj["VisitorId"];
                                    var visitorName = userObj["VisitorName"];

                                    var momTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
                                    jQuery("#my_file").val('');
                                    if (!cancelUploading) {
                                        chat.server.uploadFileDetail(xhr.responseText, filetype, originalName, size, visitorID, null, visitorName, null, momTime, "Visitor");
                                    } else {
                                        cancelUploading = false;
                                        $("#chatfileupload").prop('disabled', false);
                                        chat.server.markAsFileDeletable(xhr.responseText);
                                    }
                                }
                            }
                        }
                    };
                    data.append("upload_file", fileSend);
                    xhr.send(data);
                    $("#chatfileupload").removeClass("inactive");
                }

            }


        }
    }

    function chatInitiate() {
        getBrowserAndOsVersion();
        chat.server.createProactiveGroup(proactiveId);

        var name = "";
        var contactId = "";
        if (retreiveLocalStorageDecrypt("StorageData_" + widgetId)) {
            var contactObj = JSON.parse(retreiveLocalStorageDecrypt("StorageData_" + widgetId));
            name = contactObj["VisitorName"];
            contactId = contactObj["ContactId"];
        }

        if (retreiveLocalStorage("StorageData_" + widgetId)) {
            var userObj = JSON.parse(retreiveLocalStorageDecrypt("StorageData_" + widgetId));
            var visitor = userObj["VisitorId"];
            var startTime = userObj["StartTime"];
            if (visitor != null) {

                $.get(webApiUrl + "/CheckClosedORMissed?visitorId=" + visitor)
                    .done(
                    
                    function (data) {
                        if (data) {
                            //Delete LocalStorage if chat is more than 5hrs, 
                            var name = null;
                            var email = null;
                            var contactId = null;

                            name = userObj["VisitorName"];
                            if (name == "Visitor") {
                                name = "";
                            }
                            email = userObj["Email"];

                            $(".messagearea").empty().prepend('<div id="typing" class="usertyping"></div>');
                            removeLocalStorage("StorageData_" + widgetId);
                            //loadWidgetPanels("startChat", true);

                            var contactObj = JSON.parse(retreiveLocalStorageDecrypt("ContactData_" + widgetId));
                            if (contactObj) {
                                //After delete LocalStorage and if it has LocalContactDetails (no LocalStorage but have LocalContactDetails)
                                $('#txtname').val(name);
                                $('#txtemails').val(email);
                            }

                            loadWidgetPanels("startChat", true);
                            var pageUrl = "";
                            if (!isHosted) {
                                pageUrl = parentEvent.data;
                            }
                            else {
                                pageUrl = window.location.href;
                            }

                            if (
                                !setting.StartChatNameRequired &&
                                !setting.StartChatDepartmentRequired &&
                                !setting.StartChatEmailRequired &&
                                !setting.StartChatPhoneRequired &&
								!setting.StartChatQuestionRequired) {
								var newdate = moment.utc(new Date(), 'YYYY-MM-DD HH:mm:ss');
								var utcTime = newdate.toDate();
								var localTime = formatHHMM(utcTime);
								if (setting.InChatGreeetingMessage && setting.InChatGreeetingMessage != "") {
									$('.messagearea').append('<div class="chat-bubble-left"><span class="username">' + (setting.InChatName && setting.InChatName != "" ? setting.InChatName : 'Customer Support Team') + '</span><br/>' + setting.InChatGreeetingMessage + '<br/> <span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
								}
                            }
                            var momTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
                            if (!isBannedIP) {
								chat.server.createProactiveChat(geoData.iso_code, Ip, widgetId, setting.WidgetName, pageUrl, geoData.CountryCode, geoData.CountryName, browser, (os + osVersion), setting.StartChatDepartmentRequired ? setting.Departments : null, name != "" ? name : "Visitor", contactId, setting.CompanyID, momTime, geoData.Latitude, geoData.Longitude, proactiveId, setting.AssignedDepartments, isHosted ? 3 : 1);
                            }
                        }
                        else {
                            //it has LocalStorage and LocalContactDetails
                            var visibleDiv = $(".chat-widget-panel:visible");
                            var visibledivid = visibleDiv.attr('id');
                            if (visibledivid != "inchat") {
                                loadWidgetPanels("inChat", true);
                            }
                            chat.server.initiateChatAgain(visitor);
                        }
                    }).fail(function (xhr, status, error) {
                        chatInitiate();
                    });
            }
            SignalID = chat.connection.id;
        } else {
            SignalID = chat.connection.id;


            var momTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');

            var pageUrl = "";
            if (!isHosted) {
                pageUrl = parentEvent.data;
            }
            else {
                pageUrl = window.location.href;
            }

            if (
                !setting.StartChatNameRequired &&
                !setting.StartChatDepartmentRequired &&
                !setting.StartChatEmailRequired &&
                !setting.StartChatPhoneRequired &&
				!setting.StartChatQuestionRequired) {

				var newdate = moment.utc(new Date(), 'YYYY-MM-DD HH:mm:ss');
				var utcTime = newdate.toDate();
				var localTime = formatHHMM(utcTime);
				if (setting.InChatGreeetingMessage && setting.InChatGreeetingMessage != "") {
					$('.messagearea').append('<div class="chat-bubble-left"><span class="username">' + (setting.InChatName && setting.InChatName != "" ? setting.InChatName : 'Customer Support Team') + '</span><br/>' + setting.InChatGreeetingMessage + '<br/> <span class="chat-time-right">' + localTime + '</span> </div><div class="clearfix"></div>');
				}
            }

            if (!isBannedIP) {
				chat.server.createProactiveChat(geoData.iso_code, Ip, widgetId, setting.WidgetName, pageUrl, geoData.CountryCode, geoData.CountryName, browser, (os + osVersion), setting.StartChatDepartmentRequired ? setting.Departments : null, name != "" ? name : "Visitor", contactId, setting.CompanyID, momTime, geoData.Latitude, geoData.Longitude, proactiveId, setting.AssignedDepartments, isHosted ? 3 : 1);
            }

            if (retreiveLocalStorageDecrypt("ContactData_" + widgetId)) {
                //no LocalStorage but have LocalContactDetails
                var contactObj = JSON.parse(retreiveLocalStorageDecrypt("ContactData_" + widgetId));
                var name = contactObj["VisitorName"];
                if (name == "Visitor") {
                    name = "";
                }
                var email = contactObj["Email"];
                $('#txtname').val(name);
                $('#txtemails').val(email);
            }
        }
    }

    window.addEventListener("online", function () {
        $.connection.hub.start({
        }).done(function () {
            afterreconnect();
        });
    });

    $.connection.hub.reconnected(function () {
        afterreconnect();
    });

    function afterreconnect() {

        $(".messagearea").empty().prepend('<div id="typing" class="usertyping"></div>');
        chatInitiate();
    }
    function CancelUpload(file) {
        cancelUploading = true;
        var element = document.getElementById("upload_" + file);
        $(element).remove();
    }


    $(document).on('click', ".closebtn", function (event) {
        $("#my_file").val("");
        CancelUpload(event.target.id);
    });
}
