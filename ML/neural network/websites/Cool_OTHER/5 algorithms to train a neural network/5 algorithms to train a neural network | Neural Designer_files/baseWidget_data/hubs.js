/*!
 * ASP.NET SignalR JavaScript Library v2.2.2
 * http://signalr.net/
 *
 * Copyright (c) .NET Foundation. All rights reserved.
 * Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
(function ($, window, undefined) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies['chatHub'] = this.createHubProxy('chatHub'); 
        proxies['chatHub'].client = { };
        proxies['chatHub'].server = {
            addActiveOperators: function (operatorId, companyId, token, deviceToken, deviceType, deviceUUID) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["AddActiveOperators"], $.makeArray(arguments)));
             },

            addLogsFromClient: function (profileId, message) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["AddLogsFromClient"], $.makeArray(arguments)));
             },

            addNewOperator: function (userName, companyId, token) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["AddNewOperator"], $.makeArray(arguments)));
             },

            addOperatorNotification: function (receiverId, operatorId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["AddOperatorNotification"], $.makeArray(arguments)));
             },

            addOperatorsToGroup: function (operatorId, companyId, isAvailable, token, deviceToken, deviceType, deviceUUID) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["AddOperatorsToGroup"], $.makeArray(arguments)));
             },

            addProactiveGroup: function (visitorId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["AddProactiveGroup"], $.makeArray(arguments)));
             },

            addToMointorRedis: function (visitorID, profileID, receiveOperatorName, token, companyID) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["AddToMointorRedis"], $.makeArray(arguments)));
             },

            addUsersToRedis: function (visitorId, operatorId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["AddUsersToRedis"], $.makeArray(arguments)));
             },

            addVisitorNotifications: function (visitorId, operatorId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["AddVisitorNotifications"], $.makeArray(arguments)));
             },

            addVisitorToRedis: function (id, widgetId, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["AddVisitorToRedis"], $.makeArray(arguments)));
             },

            banIpAddress: function (ipaddress, profile, company, banReason, token, visitorId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["BanIpAddress"], $.makeArray(arguments)));
             },

            broadcastCannedResponses: function (companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["BroadcastCannedResponses"], $.makeArray(arguments)));
             },

            changeProfileDetails: function (profileId, token, displayName, tagline, timeZone, preferedLanguageID, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["ChangeProfileDetails"], $.makeArray(arguments)));
             },

            changeProfileImage: function (profileId, token, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["ChangeProfileImage"], $.makeArray(arguments)));
             },

            chatClosed: function (visitorID, token, isLogOut, startTime, operatorId, companyId, IsBanned, timeZone) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["ChatClosed"], $.makeArray(arguments)));
             },

            chatLeave: function (visitorID, token, isLogOut, startTime, operatorId, companyId, displayName) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["ChatLeave"], $.makeArray(arguments)));
             },

            chatTransferRequest: function (companyID, operatorID, receiverID, receivername, operatorName, visitorID, visitorName, transferDate, indexOfChatPane, widgetID, token) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["ChatTransferRequest"], $.makeArray(arguments)));
             },

            checkPendingTransfer: function (companyID, requestOperatorID) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["CheckPendingTransfer"], $.makeArray(arguments)));
             },

            checkWebServiceStatus: function () {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["CheckWebServiceStatus"], $.makeArray(arguments)));
             },

            clearRedisOnDelete: function (profileId, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["ClearRedisOnDelete"], $.makeArray(arguments)));
             },

            createProactiveChat: function (iso_code, ip, widgetId, widgetName, pageUrl, countryCode, countryName, browser, os, departments, name, contactId, companyId, dateTime, lat, longi, proactiveId, assignedDepartments, type) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["CreateProactiveChat"], $.makeArray(arguments)));
             },

            createProactiveGroup: function (proactivechatId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["CreateProactiveGroup"], $.makeArray(arguments)));
             },

            expiredClients: function (inactiveUserValue) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["ExpiredClients"], $.makeArray(arguments)));
             },

            getActivityHistory: function (contactId, page, token, visitorId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["GetActivityHistory"], $.makeArray(arguments)));
             },

            getIncomingChatQueue: function (company, operatorId, token) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["GetIncomingChatQueue"], $.makeArray(arguments)));
             },

            getOperatorCount: function (visitorId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["GetOperatorCount"], $.makeArray(arguments)));
             },

            getOperatorStatistics: function (profileId, companyId, token, timeZone) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["GetOperatorStatistics"], $.makeArray(arguments)));
             },

            getOtherActiveChat: function (profileId, companyId, token) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["GetOtherActiveChat"], $.makeArray(arguments)));
             },

            getProactiveChats: function (operatorId, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["GetProactiveChats"], $.makeArray(arguments)));
             },

            getselectedVisitors: function (profileId, companyId, token) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["GetselectedVisitors"], $.makeArray(arguments)));
             },

            initiateChatAgain: function (visitorId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["InitiateChatAgain"], $.makeArray(arguments)));
             },

            inTransfer: function (profileID, companyID) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["InTransfer"], $.makeArray(arguments)));
             },

            inviteOperator: function (visitorId, sendOperatorId, receiveOperatorId, receiveOperatorName, companyID, token, dateTime, timeZone) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["InviteOperator"], $.makeArray(arguments)));
             },

            isTyping: function (name, visitorID, senderType, isTyping, operatorId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["IsTyping"], $.makeArray(arguments)));
             },

            loadActiveOperators: function (companyID, requestOperator, token, area) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["LoadActiveOperators"], $.makeArray(arguments)));
             },

            loadCompanyOperators: function (companyId, profileId, token) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["LoadCompanyOperators"], $.makeArray(arguments)));
             },

            loadDefaultmap: function (connection) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["LoadDefaultmap"], $.makeArray(arguments)));
             },

            loadHistoricaldata: function (companyId, datetime, type) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["LoadHistoricaldata"], $.makeArray(arguments)));
             },

            loadInvitesWhenrefresh: function (operatorID, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["LoadInvitesWhenrefresh"], $.makeArray(arguments)));
             },

            loadrequestWhenRefresh: function (operatorID, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["LoadrequestWhenRefresh"], $.makeArray(arguments)));
             },

            logOutUser: function (token, dateTime) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["LogOutUser"], $.makeArray(arguments)));
             },

            manuallyCalledNofityRadis: function (companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["ManuallyCalledNofityRadis"], $.makeArray(arguments)));
             },

            markAsFileDeletable: function (downloadName) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["MarkAsFileDeletable"], $.makeArray(arguments)));
             },

            monitorChat: function (visitorId, receiveOperatorId, receiveOperatorName, companyID, token, dateTime) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["MonitorChat"], $.makeArray(arguments)));
             },

            pendingTransferSend: function (companyID, operatorID) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["PendingTransferSend"], $.makeArray(arguments)));
             },

            pickVisitorFromTransfer: function (visitorId, profileId, sendOperatorID, companyID, reciveOpeName, token, dateTime, sendOperatorName, timeZone) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["PickVisitorFromTransfer"], $.makeArray(arguments)));
             },

            rateChat: function (visitorID, rate, isFinale, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RateChat"], $.makeArray(arguments)));
             },

            readMoreOperatorChats: function (senderId, reciverId, token, pageCount, isPartial, partialValue) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["ReadMoreOperatorChats"], $.makeArray(arguments)));
             },

            registerForMetricUpdates: function (companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RegisterForMetricUpdates"], $.makeArray(arguments)));
             },

            removeHeadTitle: function (profileId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RemoveHeadTitle"], $.makeArray(arguments)));
             },

            removeInactiveOperators: function (operatorId, companyId, token) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RemoveInactiveOperators"], $.makeArray(arguments)));
             },

            removeInviteChat: function (removedoperatorID, inviteSender, companyId, cancelerName, visitorID, requestType) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RemoveInviteChat"], $.makeArray(arguments)));
             },

            removeInviteChatSender: function (removedoperatorID, inviteSender, companyId, visitorID, requestType) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RemoveInviteChatSender"], $.makeArray(arguments)));
             },

            removeModal: function (operatorId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RemoveModal"], $.makeArray(arguments)));
             },

            removeMonitorChatOperator: function (visitorID, operatorID, companyId, token) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RemoveMonitorChatOperator"], $.makeArray(arguments)));
             },

            removeOperatorNotification: function (receiverId, senderId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RemoveOperatorNotification"], $.makeArray(arguments)));
             },

            removePickedUnsavedProactive: function (profileID, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RemovePickedUnsavedProactive"], $.makeArray(arguments)));
             },

            removeProActive: function (visitor, companyID, profileID, visitorID, proactiveId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RemoveProActive"], $.makeArray(arguments)));
             },

            removeProactiveChatPanel: function (profileId, companyId, widgetId, connectionId, proactiveId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RemoveProactiveChatPanel"], $.makeArray(arguments)));
             },

            removeVisitorNotifications: function (visitorId, operatorId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RemoveVisitorNotifications"], $.makeArray(arguments)));
             },

            requestOldChatHistory: function (visitorID, proactiveId, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RequestOldChatHistory"], $.makeArray(arguments)));
             },

            requeueChat: function (visitorId, operatorId, widgetId, name, startTime, timeZone, countryCode, department, companyId, displayName, isLogOut, Token, dateTime) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RequeueChat"], $.makeArray(arguments)));
             },

            retrieveProactiveChats: function (operatorId, skip, pageSize, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RetrieveProactiveChats"], $.makeArray(arguments)));
             },

            saveContactDetails: function (name, email, contactNo, visitorNote, visitorId, contactId, key, token, companyId, profileId, tags) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SaveContactDetails"], $.makeArray(arguments)));
             },

            saveNotification: function (profileId, token) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SaveNotification"], $.makeArray(arguments)));
             },

            selectOperator: function (senderId, reciverId, operatorName, token, isAvailable) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SelectOperator"], $.makeArray(arguments)));
             },

            selectProactiveChat: function (chat, visitorID, message, timeId, operatorId, token, companyId, dateTime, displayName, isSendVisitor, timeZone) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SelectProactiveChat"], $.makeArray(arguments)));
             },

            selectSimulationVisitor: function (visitorId, profileId, companyId, displayName, dateTime, token, startTime, visitorName) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SelectSimulationVisitor"], $.makeArray(arguments)));
             },

            selectVisitor: function (visitorId, profileId, companyId, displayName, dateTime, token, startTime, visitorName, timeZone) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SelectVisitor"], $.makeArray(arguments)));
             },

            sendImageFromMessengerToOperator: function (visitorId, userConnectionId, message, datetime, timeId, companyId, fileType) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SendImageFromMessengerToOperator"], $.makeArray(arguments)));
             },

            sendInviteRequest: function (visitor, sendOp, receivedOp, senderName, receiverName, companyID, widget, token, visitorName) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SendInviteRequest"], $.makeArray(arguments)));
             },

            sendMessageFromOperator: function (visitorId, message, operatorId, isJoin, isRequeue, isTransfer, token, datetime, TimeId, isLeft) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SendMessageFromOperator"], $.makeArray(arguments)));
             },

            sendMessageFromVisitor: function (visitorId, userConnectionId, message, datetime, timeId, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SendMessageFromVisitor"], $.makeArray(arguments)));
             },

            sendOperatorChat: function (message, senderId, reciverId, companyId, token, startTime, displayName) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SendOperatorChat"], $.makeArray(arguments)));
             },

            sendOperatorNotificationToMobile: function (message, profileId, token, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SendOperatorNotificationToMobile"], $.makeArray(arguments)));
             },

            sendRequest: function (companyId, ip, datetime, widgetID, name, email, department, question, browser, os, isfirst, pageurl, contactId, isMobile, proactiveId, PhoneNumber, messageType, FbSenderId, assignedDepartments) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SendRequest"], $.makeArray(arguments)));
             },

            sendTrnascriptEmail: function (emailList, note, visitor, token, companyId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SendTrnascriptEmail"], $.makeArray(arguments)));
             },

            simulateVisitorRequest: function (companyId, token, startTime) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SimulateVisitorRequest"], $.makeArray(arguments)));
             },

            updateOperatorStatus: function (status, operatorId, companyId, token) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["UpdateOperatorStatus"], $.makeArray(arguments)));
             },

            uploadFileDetail: function (downloadName, fileType, originalName, size, visitor, operatorId, visitorName, token, time, uploderType) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["UploadFileDetail"], $.makeArray(arguments)));
             },

            uploadFileOperatorChat: function (downloadName, receiverId, sender, senderName, token, time, originalName, companyId, fileId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["UploadFileOperatorChat"], $.makeArray(arguments)));
             },

            userLogIn: function (operatorId, companyId, status, name) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["UserLogIn"], $.makeArray(arguments)));
             }
        };

        proxies['commonHub'] = this.createHubProxy('commonHub'); 
        proxies['commonHub'].client = { };
        proxies['commonHub'].server = {
            addToSignalrGroup: function (operatorId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["AddToSignalrGroup"], $.makeArray(arguments)));
             },

            deleteDepartmentsForCompany: function (companyId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["DeleteDepartmentsForCompany"], $.makeArray(arguments)));
             },

            getLogOffTime: function (companyId, profileId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["GetLogOffTime"], $.makeArray(arguments)));
             },

            loadDepartmentsForCompany: function (companyId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["LoadDepartmentsForCompany"], $.makeArray(arguments)));
             },

            loadTagsListForCompany: function (companyId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["LoadTagsListForCompany"], $.makeArray(arguments)));
             },

            logOutUser: function (operatorId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["LogOutUser"], $.makeArray(arguments)));
             },

            notifyLogOffUser: function (companyId, profileId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["NotifyLogOffUser"], $.makeArray(arguments)));
             },

            notifyLogOffUsersForCompany: function (companyId, roleId, token) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["NotifyLogOffUsersForCompany"], $.makeArray(arguments)));
             },

            refershTokenForCompany: function (companyId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["RefershTokenForCompany"], $.makeArray(arguments)));
             },

            refreshAuthrizationToken: function (token, operatorId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["RefreshAuthrizationToken"], $.makeArray(arguments)));
             },

            refreshTokenForOtherOperator: function (operatorId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["RefreshTokenForOtherOperator"], $.makeArray(arguments)));
             },

            registerForPaymentBrodcast: function (companyId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["RegisterForPaymentBrodcast"], $.makeArray(arguments)));
             },

            removeLogOffUser: function (companyId, profileId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["RemoveLogOffUser"], $.makeArray(arguments)));
             },

            sendTrnascriptEmail: function (emailList, visitor, token, companyId, note) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["SendTrnascriptEmail"], $.makeArray(arguments)));
             },

            updateAgentTicketCountInFilteration: function (companyId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["UpdateAgentTicketCountInFilteration"], $.makeArray(arguments)));
             },

            updateDashboardMetrics: function (companyId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["UpdateDashboardMetrics"], $.makeArray(arguments)));
             },

            updateOperatorForCompany: function (companyId) {
                return proxies['commonHub'].invoke.apply(proxies['commonHub'], $.merge(["UpdateOperatorForCompany"], $.makeArray(arguments)));
             }
        };

        proxies['paymentHub'] = this.createHubProxy('paymentHub'); 
        proxies['paymentHub'].client = { };
        proxies['paymentHub'].server = {
            initialCounters: function (companyId) {
                return proxies['paymentHub'].invoke.apply(proxies['paymentHub'], $.merge(["InitialCounters"], $.makeArray(arguments)));
             },

            registerForPaymentBrodcast: function (companyId) {
                return proxies['paymentHub'].invoke.apply(proxies['paymentHub'], $.merge(["registerForPaymentBrodcast"], $.makeArray(arguments)));
             },

            sendCompanyChangePlanNotice: function (company) {
                return proxies['paymentHub'].invoke.apply(proxies['paymentHub'], $.merge(["SendCompanyChangePlanNotice"], $.makeArray(arguments)));
             }
        };

        proxies['tempHub'] = this.createHubProxy('tempHub'); 
        proxies['tempHub'].client = { };
        proxies['tempHub'].server = {
            register: function () {
                return proxies['tempHub'].invoke.apply(proxies['tempHub'], $.merge(["Register"], $.makeArray(arguments)));
             },

            reset: function () {
                return proxies['tempHub'].invoke.apply(proxies['tempHub'], $.merge(["Reset"], $.makeArray(arguments)));
             }
        };

        proxies['ticketHub'] = this.createHubProxy('ticketHub'); 
        proxies['ticketHub'].client = { };
        proxies['ticketHub'].server = {
            addOperatortoActiveGroup: function (companyId, operatorId) {
                return proxies['ticketHub'].invoke.apply(proxies['ticketHub'], $.merge(["AddOperatortoActiveGroup"], $.makeArray(arguments)));
             },

            expiredClients: function (inactiveUserValue) {
                return proxies['ticketHub'].invoke.apply(proxies['ticketHub'], $.merge(["ExpiredClients"], $.makeArray(arguments)));
             },

            forward: function (formdata) {
                return proxies['ticketHub'].invoke.apply(proxies['ticketHub'], $.merge(["Forward"], $.makeArray(arguments)));
             },

            fWBlock: function (companyID) {
                return proxies['ticketHub'].invoke.apply(proxies['ticketHub'], $.merge(["FWBlock"], $.makeArray(arguments)));
             },

            hello: function () {
                return proxies['ticketHub'].invoke.apply(proxies['ticketHub'], $.merge(["Hello"], $.makeArray(arguments)));
             },

            isTicketBlocked: function (companyID, ticketID) {
                return proxies['ticketHub'].invoke.apply(proxies['ticketHub'], $.merge(["IsTicketBlocked"], $.makeArray(arguments)));
             },

            notifyData: function (companyId) {
                return proxies['ticketHub'].invoke.apply(proxies['ticketHub'], $.merge(["NotifyData"], $.makeArray(arguments)));
             },

            notifyToOthers: function (companyID, ticketID, userprofileID) {
                return proxies['ticketHub'].invoke.apply(proxies['ticketHub'], $.merge(["NotifyToOthers"], $.makeArray(arguments)));
             },

            registerForTicketMetricUpdates: function (companyId) {
                return proxies['ticketHub'].invoke.apply(proxies['ticketHub'], $.merge(["RegisterForTicketMetricUpdates"], $.makeArray(arguments)));
             },

            removeLock: function (companyID, userprofileID) {
                return proxies['ticketHub'].invoke.apply(proxies['ticketHub'], $.merge(["RemoveLock"], $.makeArray(arguments)));
             },

            removeOperator: function (companyId, operatorId) {
                return proxies['ticketHub'].invoke.apply(proxies['ticketHub'], $.merge(["RemoveOperator"], $.makeArray(arguments)));
             },

            retrieveOperatorCount: function (companyId) {
                return proxies['ticketHub'].invoke.apply(proxies['ticketHub'], $.merge(["RetrieveOperatorCount"], $.makeArray(arguments)));
             }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));