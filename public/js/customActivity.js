require.config({
    paths: {
        "jquery": 'jquery.min'
    }
});

define([
    'postmonger',"jquery"
], function (
    Postmonger,$
) {
    //'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    var eventDefinitionKey = '';

    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('requestedInteraction', requestedInteractionHandler);
    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function requestedInteractionHandler (settings) {
		try {
            eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
        } catch (e) {
			console.error(e);
		}
    }

    function save() {
        var entryDefinitionkey = "DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9";
        var message_body = "(광고)가 아닌듯 맘큐(momQ) 알림!!\n\n%%col1%% 님 ♬~♪~\n지난 번에 구매했던 그린핑거 기억나시나요?\n\n구매 시 맘큐가 약속 드렸던,\n맘큐만의 재구매 할인 프로그램 \n♪ REMEMBER 알림입니다!\n\n\" %%col2%% 님의\n[REMEMBER] 할인 쿠폰 지급 완료! \"\n\n▤ 내 쿠폰함 바로가기 \nhttp://bit.ly/2Jwj6xu\n※오늘부터 14일내에 사용 가능합니다.\n\n그린핑거 제품을 다시 구매하신다면 꼭!! 할인 받아 구매하시고, [REMEMBER] 할인 쿠폰 으로 계속 계속 할인 받아 쭈~욱 구매하세요! \n\n다음 리멤버 알림에서\n또! 찾아뵙겠습니다~ ^^*\n\n맘큐만의 REMEMBER 는 계속됩니다.\nI'll be back ***\n\n맘큐(momQ) : http://m.momq.co.kr\n무료수신거부 : 080-884-7933".replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r");
        
        
        console.log(JSON.stringify(payload['arguments'].execute.inArguments));
    
        
        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "contactKey": "{{Contact.Key}}",
            "email": "{{InteractionDefaults.Email}}",
            // "sj_agent_id": "{{Event.DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9.sj_agent_id}}",
            "sj_agent_id": "{{Event."+entryDefinitionkey+".sj_agent_id}}",
            "sj_agent_cid": "{{Event.DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9.sj_agent_cid}}",
            "msg_type": "{{Event.DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9.callback}}",
            "mob_no": "{{Event.DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9.mob_no}}",
            "callback": "{{Event.DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9.callback}}",
            // "message_body": "{{Event.DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9.message_body}}",
            "message_body": message_body,
            "k_template_code": "{{Event.DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9.k_template_code}}",
            "sender_key": "{{Event.DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9.sender_key}}",
            "campaign_no": "{{Event.DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9.campaign_no}}",
            "segment": "{{Event.DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9.segment}}",
            "contact_key": "{{Event.DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9.contact_key}}",
            "running_datetime": "{{Event.DEAudience-8ed7573a-3ce5-c9f6-50e0-75cf778db7f9.running_datetime}}",
            "rtn_mc_unit": "test"
        }];

        console.log('inArguments : '+payload['arguments'].execute.inArguments);
        /*
        payload['arguments'].execute.inArguments.push({"tokens": authTokens});
        payload['arguments'].execute.inArguments.push({"contactFirstName": "{{Contact.Default.FirstName}}"});
        payload['arguments'].execute.inArguments.push({"contactLastName": "{{Contact.Default.LastName}}"});

        payload['arguments'].execute.inArguments = [{
            "emailAddress": "{{Contact.Default.Email}}",
            "phoneNumber": "{{Contact.Default.PhoneNumber}}",
            "IsTest": "{{Context.IsTest}}",
            "version": "{{Context.VersionNumber}}",
            "tokens": authTokens
        }];
        */
        payload['metaData'].isConfigured = true;
        
        
        console.log(payload);
        connection.trigger('updateActivity', payload);
    }

    
});
