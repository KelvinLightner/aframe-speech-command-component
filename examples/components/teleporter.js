var meetingSN = "";
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

        // rest = "https://app.liveh2h.com/tutormeetweb/rest/v1/meetings/instant"
        var rest = "https://sandbox.liveh2h.com/tutormeetweb/rest/v1/meetings/createInstantMeeting"
        // name = "Christian Acuna"
        var email = "cacuna0828@gmail.com"
        var appId = "49D8EC1C-9823-47B6-86F0-CBA29E996C2D"
        // emailList = ["alex.m.4155@gmail.com"]
        var obj = {"email":email, "applicationId": appId};
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
                //  meetingurl = response.data.meetingURL;
                 console.log(response.data, response.data.meetingSn);
                 meetingSN = response.data.meetingSn;
                //  window.location = response.data.meetingURL
                 window.open(response.data.meetingURL,"_blank");
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
      console.log('HHHIIIIIIIIIIIII');
      var rest = "https://sandbox.liveh2h.com/tutormeetweb/rest/v1/meetings/addInvitee"
      // name = "Christian Acuna"
      var emailList = ["alex.m.4155@gmail.com"];
      var inviter = "Christian Acuna";
      // var meetingSN = "NDd2aWoyQ3dxenhFRkVuMURTNHVuUT09";
      console.log(meetingSN);

      var obj = {"emailList": emailList, "meetingSn": meetingSN, "inviterName": inviter };
      var objstr = JSON.stringify(obj);
      var meetingurl = "";
      jQuery.ajax( {
          url: rest,
          type: 'POST',
          data: objstr,
          beforeSend : function( xhr ) {
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.setRequestHeader("apiToken", "xPJHr4/DnYSvhTSEYN6HcyGULB7R");
          },
          success: function( response ) {
              //  meetingurl = response.data.meetingURL;
               console.log(response.data);
              //  window.location = response.data.meetingURL
              //  window.open(response.data.meetingURL,"_blank");
          }
        })
      }

});
