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
    var steps = [
		{'key': 'eventdefinitionkey', 'label': 'Event Definition Key'},
		{'key': 'idselection', 'label': 'ID Selection'}
	];
    var eventDefinitionKey = '';
    var currentStep = steps[0].key;
	var deFields = [];

    /*
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('requestedInteraction', requestedInteractionHandler);
    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestInteraction');
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

    function onClickedNext () {
		if (currentStep.key === 'idselection') {
			save();
		} else {
			connection.trigger('nextStep');
		}
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
        var message_body = "(광고)가 아닌듯 맘큐(momQ) 알림!!\n\n%%col1%% 님 ♬~♪~\n지난 번에 구매했던 그린핑거 기억나시나요?\n\n구매 시 맘큐가 약속 드렸던,\n맘큐만의 재구매 할인 프로그램 \n♪ REMEMBER 알림입니다!\n\n\" %%col2%% 님의\n[REMEMBER] 할인 쿠폰 지급 완료! \"\n\n▤ 내 쿠폰함 바로가기 \nhttp://bit.ly/2Jwj6xu\n※오늘부터 14일내에 사용 가능합니다.\n\n그린핑거 제품을 다시 구매하신다면 꼭!! 할인 받아 구매하시고, [REMEMBER] 할인 쿠폰 으로 계속 계속 할인 받아 쭈~욱 구매하세요! \n\n다음 리멤버 알림에서\n또! 찾아뵙겠습니다~ ^^*\n\n맘큐만의 REMEMBER 는 계속됩니다.\nI'll be back ***\n\n맘큐(momQ) : http://m.momq.co.kr\n무료수신거부 : 080-884-7933".replace(/\n/g, "\\n").replace(/\r/g, "\\r");
        
        
        console.log(JSON.stringify(payload['arguments'].execute.inArguments));
    
        
        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "contactKey": "{{Contact.Key}}",
            "email": "{{InteractionDefaults.Email}}",
            "sj_agent_id": "{{Event."+entryDefinitionkey+".sj_agent_id}}",
            "sj_agent_cid": "{{Event."+entryDefinitionkey+".sj_agent_cid}}",
            "msg_type": "{{Event."+entryDefinitionkey+".callback}}",
            "mob_no": "{{Event."+entryDefinitionkey+".mob_no}}",
            "callback": "{{Event."+entryDefinitionkey+".callback}}",
            "message_body": message_body,
            "k_template_code": "{{Event."+entryDefinitionkey+".k_template_code}}",
            "sender_key": "{{Event."+entryDefinitionkey+".sender_key}}",
            "campaign_no": "{{Event."+entryDefinitionkey+".campaign_no}}",
            "segment": "{{Event."+entryDefinitionkey+".segment}}",
            "contact_key": "{{Event."+entryDefinitionkey+".contact_key}}",
            "running_datetime": "{{Event."+entryDefinitionkey+".running_datetime}}",
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
        
        payload['metaData'].isConfigured = true;
        
        
        console.log(payload);
        connection.trigger('updateActivity', payload);
    }
    */

    $(window).ready(function () {
        connection.trigger('ready');
        connection.on('requestedTokens', onGetTokens);
        connection.on('requestedEndpoints', onGetEndpoints);
		connection.trigger('requestInteraction');
	});

    function onGetTokens(tokens) {
        console.log("onGetTokens :"+JSON.stringify(tokens));
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log("onGetEndpoints :"+JSON.stringify(endpoints));
    }

	function initialize (data) {
        console.log("initialize :"+JSON.stringify(data));
		if (data) {
			payload = data;
		}
	}

	function onClickedNext () {
        console.log("onClickedNext :"+currentStep.key);
		if (currentStep.key === 'idselection') {
			save();
		} else {
			connection.trigger('nextStep');
		}
	}

	function onClickedBack () {
        console.log("onClickedBack :");
		connection.trigger('prevStep');
	}

	function onGotoStep (step) {
        console.log("onGotoStep :"+JSON.stringify(step));
		showStep(step);
		connection.trigger('ready');
	}

	function showStep (step) {
        console.log("showStep : step :"+ JSON.stringify(step));
		// if (stepIndex && !step) {
		// 	step = steps[stepIndex - 1];
		// }

		currentStep = step;

		$('.step').hide();

		switch (currentStep.key) {
		case 'eventdefinitionkey':
			$('#step1').show();
			$('#step1 input').focus();
			break;
		case 'idselection':
			$('#step2').show();
			$('#step2 input').focus();
			break;
		}
	}

	function requestedInteractionHandler (settings) {
		try {
            console.log("requestedInteractionHandler : settings :"+ JSON.stringify(settings));
			eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
			$('#select-entryevent-defkey').val(eventDefinitionKey);
            
			if (settings.triggers[0].type === 'EmailAudience' &&
					settings.triggers[0].configurationArguments &&
					settings.triggers[0].configurationArguments.eventDataConfig) {

				// This workaround is necessary as Salesforce occasionally returns the eventDataConfig-object as string
				// if (typeof settings.triggers[0].configurationArguments.eventDataConfig === 'stirng' ||
				// 			!settings.triggers[0].configurationArguments.eventDataConfig.objects) {
                //         settings.triggers[0].configurationArguments.eventDataConfig = 
                //         JSON.parse(settings.triggers[0].configurationArguments.eventDataConfig);
				// }

				// settings.triggers[0].configurationArguments.eventDataConfig.objects.forEach((obj) => {
				// 	deFields = deFields.concat(obj.fields.map((fieldName) => {
				// 		return obj.dePrefix + fieldName;
				// 	}));
				// });

				// deFields.forEach((option) => {
				// 	$('#select-id-dropdown').append($('<option>', {
				// 		value: option,
				// 		text: option
				// 	}));
				// });

				$('#select-id').hide();
				$('#select-id-dropdown').show();
			} else {
				$('#select-id-dropdown').hide();
				$('#select-id').show();
			}
		} catch (e) {
			console.error(e);
			$('#select-id-dropdown').hide();
			$('#select-id').show();
		}
	}

	function save () {
		payload['arguments'] = payload['arguments'] || {};
		payload['arguments'].execute = payload['arguments'].execute || {};

		var idField = deFields.length > 0 ? $('#select-id-dropdown').val() : $('#select-id').val();

		payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "contactKey": "{{Contact.Key}}",
            "email": "{{InteractionDefaults.Email}}",
            "sj_agent_id": "{{Event."+entryDefinitionkey+".sj_agent_id}}",
            "sj_agent_cid": "{{Event."+entryDefinitionkey+".sj_agent_cid}}",
            "msg_type": "{{Event."+entryDefinitionkey+".callback}}",
            "mob_no": "{{Event."+entryDefinitionkey+".mob_no}}",
            "callback": "{{Event."+entryDefinitionkey+".callback}}",
            "message_body": message_body,
            "k_template_code": "{{Event."+entryDefinitionkey+".k_template_code}}",
            "sender_key": "{{Event."+entryDefinitionkey+".sender_key}}",
            "campaign_no": "{{Event."+entryDefinitionkey+".campaign_no}}",
            "segment": "{{Event."+entryDefinitionkey+".segment}}",
            "contact_key": "{{Event."+entryDefinitionkey+".contact_key}}",
            "running_datetime": "{{Event."+entryDefinitionkey+".running_datetime}}",
            "rtn_mc_unit": "test"
        }];

		payload['metaData'] = payload['metaData'] || {};
		payload['metaData'].isConfigured = true;

		console.log(JSON.stringify(payload));

		connection.trigger('updateActivity', payload);
	}

	connection.on('initActivity', initialize);
	connection.on('clickedNext', onClickedNext);
	connection.on('clickedBack', onClickedBack);
	connection.on('gotoStep', onGotoStep);
	connection.on('requestedInteraction', requestedInteractionHandler);

    
});
