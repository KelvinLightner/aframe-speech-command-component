var accountSid = 'AC0639d6030e48d80dc09e9eddf6016622';
var authToken = 'e38657d5b3e2c0c29afdceb12fe75a73';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

AFRAME.registerSystem('teleporter', {
    init: function () {
        console.log("in teleporter system init");
    },
    onSceneLoaded: function(evt) {
        console.log("in voice-command system onSceneLoaded listener");
    },
});
AFRAME.registerComponent('teleporter', {

    schema: {
    },
    init: function () {
        console.log("in teleporter init");
    },
    showRaycaster: function() {
        console.log("working!!!!!!!!!!");
        rest = "https://app.liveh2h.com/tutormeetweb/rest/v1/meetings/instant"
        name = "Christian Acuna"
        email = "cacuna0828@gmail.com"
        var obj = {"name":name, "email":email};
        var objstr = JSON.stringify(obj);
        var meetingurl = "";
        jQuery.ajax( {
            url: rest,
            type: 'POST',
            data: objstr,
            beforeSend : function( xhr ) {
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function( response ) {
                 meetingurl = response.data.meetingURL;
                 console.log(response.data);
                //  window.location = response.data.meetingURL
                 window.open(response.data.meetingURL,"_blank");
                 client.messages.create({
                     to: "+1706-256-8014",
                     from: "+15017250604",
                     body: "This is the ship that made the Kessel Run in fourteen parsecs?",
                 }, function(err, message) {
                     console.log(message.sid);
                 });
            },
            error: function( response ) {
                 if(document.getElementById( 'widgetFailureMessageEng' )){
                 		document.getElementById( 'widgetFailureMessageEng' ).innerHTML ="You are missing a required field";
                 }
            }
        } );

        return false;

    },
    invite: function() {
      console.log('invite!!!!!!!!!!!');
    }
});
