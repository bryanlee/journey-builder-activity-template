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
        //var postcardURLValue = $('#postcard-url').val();
        //var postcardTextValue = $('#postcard-text').val();
        
        
        console.log(JSON.stringify(payload['arguments'].execute.inArguments));
        
        
        
        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "contactKey": "{{Contact.Key}}",
            "email": "{{InteractionDefaults.Email}}",
            "sj_agent_id": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.sj_agent_id}}",
            "sj_agent_cid": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.sj_agent_cid}}",
            "msg_type": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.callback}}",
            "mob_no": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.mob_no}}",
            "callback": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.callback}}",
            "message_body": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.message_body}}",
            "k_template_code": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.k_template_code}}",
            "sender_key": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.sender_key}}",
            "campaign_no": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.campaign_no}}",
            "segment": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.segment}}",
            "contact_key": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.contact_key}}",
            "running_datetime": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.running_datetime}}",
            "rtn_mc_unit": "{{Event.15223b12-80be-4b18-a107-7be21e4b01ea.rtn_mc_unit}}"
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
