//var assert = require("assert");
var _ = require("underscore")._; //Underscore module
var moment = require("moment"); //MomentJS module

var MembershipApplication = function(args){

    args || (args = {}); //If args is not defined set it to an object

    //Assertion
    //assert.ok(args.first && args.last, "The applicant has to have a first/last name!");

    _.extend(this, args);

    //Validate and parse validUntill and if not exist make it 10 days:
    this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, "days");

    //Test date
    this.expired = function(){

        var now = moment();
        //console.log(`${this.validUntil} vs ${now}`);
        return this.validUntil.isBefore(now);
    };

    //User data:
    //this.first = args.first;
    //this.last = args.last

    //Test first/last name
    this.isValidName = function(){

        return this.first &&
            this.last &&
            isNaN(this.first) &&
            isNaN(this.last) &&
            this.first.length > 2 &&
            this.last.length > 2 &&
            this.first.length < 20 &&
            this.last.length < 20;
    };

    //Test age
    this.ageIsValid = function(){

        return this.age && 
            this.age > 18 &&
            this.age< 45; 
    };

    //Test weight
    this.weightIsValid = function(){
        
        return this.weight && 
            this.weight > 100 &&
            this.weight < 300; 
    };

    //Test email
    this.emailIsValid = function(){
        
        return this.email && 
            this.email.length > 3 &&
            this.email.indexOf('.') > -1 &&
            this.email.indexOf('@') > -1;
    };

    //Test height
    this.heightIsValid = function(){
        
        return this.height &&
            this.height > 60 &&
            this.height < 75;
    };

    //Test is user data valid
    this.isValid = function(){
        
        return this.ageIsValid() && 
            this.emailIsValid() && 
            this.heightIsValid() && 
            this.weightIsValid() &&
            this.isValidName() &&
            !this.expired();
    };

    //Validation message
    this.validationMessage = function(){
       
        if(this.isValid()){

            return "Application is valid";
        }
        else{

            if(!this.emailIsValid()){

                return "Invalid email address";
            }
            else if(!this.ageIsValid()){

                return "Invalid age";
            }
            else if(!this.heightIsValid()){

                return "Invalid height";
            }
            else if(!this.weightIsValid()){

                return "Invalid weight";
            }
            else if(!this.isValidName()){

                return "Invalid name";
            }
            else if(this.expired()){

                return "Application has expired";
            }
            else{

                return "Invalid user data ???";
            }
        }
    };
};

//Export the module
module.exports = MembershipApplication;
