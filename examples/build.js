(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        var appId = "50DBB49B-8CEE-4052-A150-542D886B2323"
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
      var appId = "50DBB49B-8CEE-4052-A150-542D886B2323"
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

},{}],2:[function(require,module,exports){
require('../index.js');
require('./components/teleporter.js');

},{"../index.js":3,"./components/teleporter.js":1}],3:[function(require,module,exports){
/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerSystem('speech-command', {
    init: function () {
        //console.log("in speech-command system init");
        this.entities = [];
        //window.addEventListener('loaded', this.onSceneLoaded.bind(this));
    },
    registerMe: function (comp) {
        this.entities.push(comp);
        //console.log("in register, comp: "+comp.data.command);
    },
    unregisterMe: function (comp) {
        var index = this.entities.indexOf(comp);
        this.entities.splice(index, 1);
    },
    onSceneLoaded: function(evt) {
        //console.log("in speech-command system onSceneLoaded listener");
    },
    play: function() {
        //console.log("in system play, entities: "+this.entities);
    }
});
AFRAME.registerComponent('speech-command', {
    multiple: true,
    schema: {
        command: { type: 'string' },
        type: { type: 'string' },
        targetElement: { type: 'selector' },
        targetComponent: { type: 'string' },
        function: { type: 'string' },
        attribute: { type: 'string' },
        value: { type: 'string' },
        keyCode: { type: 'string' }
    },
    init: function () {
        this.system.registerMe(this);
        if (!this.data.targetElement) {
            this.data.targetElement = this.el;
        }
        if (this.data.keyCode) {
            window.addEventListener('keyup', this.onKeyup.bind(this));
        }
    },
    remove: function () {
        this.system.unregisterMe(this);
    },
    play: function() {
        //console.log("in speech-command play, command: "+this.data.command+", type: "+this.data.type);
    },
    executeCommand: function () {
        //console.log("in executeCommand for: "+this.data.targetElement);
        var targetElement = this.data.targetElement;
        if (this.data.type == 'attribute') {
            //console.log("about to change attribute "+this.data.attribute+" to: "+this.data.value);
            targetElement.setAttribute(this.data.attribute, this.data.value);
        } else if (this.data.type == 'function') {
            //console("targetElement: "+targetElement+", components"+targetElement.components);
            var targetComponent = targetElement.components[this.data.targetComponent];
            targetComponent[this.data.function]();
        }
    },
    onKeyup: function (evt) {
        if (evt.keyCode == this.data.keyCode) {
            //console.log("in speech command keyup for: "+this.data.command);
            this.executeCommand();
        }
    }
});
AFRAME.registerComponent('annyang-speech-recognition', {
    init: function () {
        //console.log("in annyang-speech-recognition init");
    },
    play: function() {
        if (annyang) {
            //console.log("annyang: "+annyang);
            //console.log("annyang.addCommands: "+annyang.addCommands);
            var speechCommandSystem = document.querySelector('a-scene').systems['speech-command'];
            var commands = {};
            var commandsMap = {};
            for (var i = 0; i < speechCommandSystem.entities.length; i++) {
                var speechCommand = speechCommandSystem.entities[i];
                commandsMap[speechCommand.data.command] = speechCommand;
                // note: function empty here because real work is done in the resultMatch callback below
                commands[speechCommand.data.command] = function() { };
            }
            annyang.addCommands(commands);

            annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
                //console.log("commandText: "+commandText); // sample output: 'hello (there)'
                var speechCommand = commandsMap[commandText];
                speechCommand.executeCommand();
            });

            // Start listening. You can call this here, or attach this call to an event, button, etc.
            annyang.start();
        }
    }

});


},{}]},{},[2]);
