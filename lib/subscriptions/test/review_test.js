var assert = require("assert");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../membership_application");
var moment = require("moment"); //MomentJS module

describe("The review process test", function(){

    describe("Receiving a valid application", function(){

        //Application decision:
        var decision, validApp;

        //Arrange the data before the test
        //Before state: done => marks it as async test
        before(function(done){

            //Create a valid applicant
            validApp = new MembershipApplication({

                first: "Test",
                last: "User",
                email: this.first + "@" + this.last + ".com",
                age: 30,
                height: 66,
                weight: 180,
                validUntil: moment().add(10, 'days')
            });

            //Process the application and get the result
            var review = new ReviewProcess();
            review.processApplication(validApp, function(err, result){

                decision = result;
                done();
            });
        });

        //Assertion
        it("return success", function(){

            assert(decision.success, decision.message);
        });
    });
});
