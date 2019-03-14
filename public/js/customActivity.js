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
		{'key': 'step1', 'label': 'Event Definition Key'},
		{'key': 'step2', 'label': 'Content Builder'}
	];
    var eventDefinitionKey = '';
    var accessToeken = '';
    var currentStep = steps[0].key;
	var deFields = [];

    $(window).ready(function () {
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        connection.trigger('requestInteraction');
    });

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('gotoStep', onGotoStep);
    connection.on('clickedNext', onClickedNext);
	connection.on('clickedBack', onClickedBack);
	connection.on('requestedInteraction', requestedInteractionHandler);
    
    function onGetTokens(tokens) {
        console.log("onGetTokens :"+JSON.stringify(tokens));
        authTokens = tokens;
        accessToeken = tokens.fuel2token;
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

    function onGotoStep (step) {
        console.log("onGotoStep :"+JSON.stringify(step));
		showStep(step);
		connection.trigger('ready');
	}

	function onClickedNext () {
        console.log("onClickedNext :"+currentStep.key);
		if (currentStep.key === 'step2') {
            console.log("call save() ");
			save();
		} else {
            console.log("call nextStep");
			connection.trigger('nextStep');
		}
	}

	function onClickedBack () {
        console.log("onClickedBack :");
		connection.trigger('prevStep');
	}

	function showStep (step) {
        console.log("showStep : step :"+ JSON.stringify(step));
		// if (stepIndex && !step) {
		// 	step = steps[stepIndex - 1];
		// }

		currentStep = step;

		$('.step').hide();
        console.log("currentStep.key :"+currentStep.key);
		switch (currentStep.key) {
        case 'step1':
            console.log("currentStep.key : eventdefinitionkey");
			$('#step1').show();
			$('#step1 input').focus();
			break;
        case 'step2':
            console.log("currentStep.key : idselection");
			$('#step2').show();
			$('#step2 input').focus();
			break;
		}
	}

	function requestedInteractionHandler (settings) {
		try {
            console.log("call requestedInteractionHandler");
            // console.log("requestedInteractionHandler : settings :"+ JSON.stringify(settings));
            var jbName = settings.name;
            var jbVersion = settings.version;
            eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
            $('#jb-name').val(jbName);
            $('#jb-version').val(jbVersion);
            $('#select-entryevent-defkey').val(eventDefinitionKey);

            console.log("inArguments token :"+payload['arguments'].execute.inArguments[0].tokens.fuel2token);    
            console.log("inArguments sj_agent_id :"+payload['arguments'].execute.inArguments[0].sj_agent_id);
            $('#content-id').val(payload['arguments'].execute.inArguments[0].sj_agent_id);
            $('#content-body').val(payload['arguments'].execute.inArguments[0].tokens.fuel2token);
            
            //MC Rest ContentBuilder record
            var client = new HttpClient();
            accessToeken = '7GsK1ZUF0Z2w25rJ5CZeaqkA';
            client.get('https://mcc8r6n8gy525r7zcyfjgb5g7hvq.rest.marketingcloudapis.com//asset/v1/content/assets/4309', function(response) {
                // do something with response
                console.log("contentResponse :"+JSON.stringify(response));
            });
            
		} catch (e) {
			console.error(e);
			
		}
	}

	function save () {
        
        //TODO get  content bilder message body by id rest api?
        // var message_body = $('#content-body').val();
        // console.log("message_body :"+message_body);

		payload['arguments'] = payload['arguments'] || {};
        payload['arguments'].execute = payload['arguments'].execute || {};
        
		payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "contactKey": "{{Contact.Key}}",
            "email": "{{InteractionDefaults.Email}}",
            "sj_agent_id": "{{Event."+eventDefinitionKey+".sj_agent_id}}",
            "sj_agent_cid": "{{Event."+eventDefinitionKey+".sj_agent_cid}}",
            "msg_type": "{{Event."+eventDefinitionKey+".callback}}",
            "mob_no": "{{Event."+eventDefinitionKey+".mob_no}}",
            "callback": "{{Event."+eventDefinitionKey+".callback}}",
            "message_body": message_body,
            "k_template_code": "{{Event."+eventDefinitionKey+".k_template_code}}",
            "sender_key": "{{Event."+eventDefinitionKey+".sender_key}}",
            "campaign_no": "{{Event."+eventDefinitionKey+".campaign_no}}",
            "segment": "{{Event."+eventDefinitionKey+".segment}}",
            "contact_key": "{{Event."+eventDefinitionKey+".contact_key}}",
            "running_datetime": "{{Event."+eventDefinitionKey+".running_datetime}}",
            "rtn_mc_unit": "test"
        }];

		payload['metaData'] = payload['metaData'] || {};
		payload['metaData'].isConfigured = true;

		console.log(JSON.stringify(payload));

		connection.trigger('updateActivity', payload);
    }
    
    
    var HttpClient = function() {
        this.get = function(aUrl, aCallback) {
            var anHttpRequest = new XMLHttpRequest();
            anHttpRequest.setRequestHeader("Authorization","Bearer "+token);
            console.log('request url :'+ aUrl);
            console.log('getResponseHeader :'+ JSON.stringify(anHttpRequest.getResponseHeader));
            anHttpRequest.onreadystatechange = function() { 
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                    aCallback(anHttpRequest.responseText);
            }
    
            anHttpRequest.open( "GET", aUrl, true );            
            anHttpRequest.send( null );
        }
    }
});
