var assert = require("assert");
var MembershipApplication = require("../membership_application");
var moment = require("moment"); //MomentJS module

//Test a feature:
describe("Test a new user application requirements:", function(){

    //POSITIVE Test scenario
    describe("Using valid user data: email, first, last, height, age, weight", function(){

        //Application state:
        var validApp;

        //Before state:
        before(function(){

            //Arrange the data before the test
            validApp = new MembershipApplication({

                first: "Test",
                last: "User",
                email: this.first + "@" + this.last + ".com",
                age: 30,
                height: 66,
                weight: 180,
                validUntil: moment().add(10, 'days')
            });
        });

        //Test the application
        it("all application data is valid, all validators are true", function(){

            assert(validApp.isValid(), "Application is not valid");
        });

        //Test email
        it("reports a valid email => 4 or mor chars and has a '@' and '.'", function(){
            
            assert(validApp.emailIsValid(),"Email is not valid" );
        });

        //Test height
        it("reports a valid height => between 60 and 75", function(){
            
            assert(validApp.heightIsValid(), "Height is not valid");
        });

        //Test age
        it("reports a valid age => between 18 and 45", function(){
            
            assert(validApp.ageIsValid(), "Age is not valid");
        });

        //Test weight
        it("reports a valid weight => between 100 and 300", function(){
            
            assert(validApp.weightIsValid(), "Weight is not valid");
        });

        //Test first/last name
        it("reports a valid name => not a number, first + last, between 2 and 20 chars", function(){
            
            assert(validApp.isValidName(), "applicant name is not valid");
        });

        it("the validUntil date is still valid => today + 10 days", function(){

            //Test dates
            assert(!validApp.expired(), "the date is still considered as invalid");
        });
    });

    //NEGATIVE Test scenario
    describe("Using invalid user data: email", function(){

        //Test email
        it("reports an invalid email => less than 4 chars", function(){
            
            //Arrange invalid data
            var app = new MembershipApplication({email: "a@a"});

            assert(!app.emailIsValid(),"Email is still considered as valid" );
        });

        it("reports an invalid email => has no '@'", function(){
            
            //Arrange invalid data
            var app = new MembershipApplication({email: "test.com"});

            assert(!app.emailIsValid(),"Email is still considered as valid" );
        });

        it("reports an invalid email => has no '.'", function(){
            
            //Arrange invalid data
            var app = new MembershipApplication({email: "test@com"});

            assert(!app.emailIsValid(),"Email is still considered as valid" );
        });

        it("it past the validUntil date => today - 1 day", function(){

            //Arrange data
            //Use Date.parse in order to avoid Non RFC2822/ISO date formats issue.
            var app = new MembershipApplication({validUntil: moment().add(-1, "days")}); 

            //Test dates
            assert(app.expired(), "the date is still considered as valid");
        });

        //Test height => has no value
        it("reports an invalid height => has no value", function(){
            
            //Arrange
            var app = new MembershipApplication();

            //Validate
            assert(!app.heightIsValid(), "Height is still valid");
        });

        //Test isValid => has no values
        it("reports an invalid application => has no values at all", function(){
            
            //Arrange
            var app = new MembershipApplication();

            //Validate
            assert(!app.isValid(), "Application is still valid");
        });
    });
});
