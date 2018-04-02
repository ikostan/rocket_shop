var Emitter = require("events").EventEmitter;
var util = require("util");

var ReviewProcess = function(args){

    var callback; 

    //make sure the application is valid
    this.ensureAppValid = function(app){

        if(app.isValid()){
            //valid applicant
            this.emit("valid", app);
        }
        else{
            //invalid applicant
            this.emit("invalid", app.validationMessage());
        }
    };

    //find the next mission
    this.findNextMission = function(app){

        //TODO: find the next mission => STUB
        app.mission = {

            commander: null,
            pilot: null,
            MAVPilot: null,
            passengers: []
        };

        this.emit("mission-selected", app);
    };

    //make sure role selected is available
    this.roleIsAvailable = function(app){

        //TODO: make sure role selected is available => STUB
        this.emit("role-available", app);
    };

    //make sure height/weight/age is right for role
    this.ensureRoleCompatible = function(app){

        //TODO: make sure height/weight/age is right for role => STUB
        this.emit("role-compatible", app);
    };

    //accept the applicant with a message
    this.acceptApplication = function(app){

        callback(null, {

            success: true,
            message: "Welcome to the Mars Project"
        });
    };

    //deny the applicant with the message
    this.denyApplication = function(message){

        callback(null, {

            success: false,
            message: message
        });    
    };

    //Process the application
    this.processApplication = function(app, next){

        callback = next;  
        this.emit("application-received", app);
    };

    //Event path => valid application
    this.on("application-received", this.ensureAppValid);
    this.on("validated", this.findNextMission);
    this.on("mission-selected", this.roleIsAvailable);
    this.on("role-available", this.ensureRoleCompatible);
    this.on("role-compatible", this.acceptApplication);

    //Invalid application path
    this.on("invalid", this.denyApplication);
};

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;

