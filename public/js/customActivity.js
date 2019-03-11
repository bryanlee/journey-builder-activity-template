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
            "sj_agent_id": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.sj_agent_id}}",
            "sj_agent_cid": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.sj_agent_cid}}",
            "msg_type": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.callback}}",
            "mob_no": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.mob_no}}",
            "callback": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.callback}}",
            "message_body": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.message_body}}",
            "k_template_code": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.k_template_code}}",
            "sender_key": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.sender_key}}",
            "campaign_no": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.campaign_no}}",
            "segment": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.segment}}",
            "contact_key": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.contact_key}}",
            "running_datetime": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.running_datetime}}",
            "rtn_mc_unit": "{{Interaction.DEAudience-1f4362fd-e59a-b35b-bed7-0249da48a10d.rtn_mc_unit}}"
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
