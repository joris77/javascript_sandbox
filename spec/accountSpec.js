describe("Account", function() {
    var myAccount;

    var onSuccess, onFailure, request;

    var TestResponses = {
        search: {
            success: {
                status: 200,
                responseText: '{"name":"me"}'
            }
        }
    };

    beforeEach(function() {
        jasmine.Ajax.useMock();

        onSuccess = jasmine.createSpy('onSuccess');
        onFailure = jasmine.createSpy('onFailure');

        //myAccount = pr.Account({});


    });

    it("should be able to search an account", function() {
        Account.search({name : "me"},onSuccess,onFailure,{});

        request = mostRecentAjaxRequest();

        expect(request.url).toEqual("context/search/account?name=me");

        request.response(TestResponses.search.success);

        expect(onSuccess).toHaveBeenCalled();

    });
});