describe("Bank", function () {
    var myBank;

    var onSuccess, onFailure, request;

    var TestResponses = {
        search:{
            success:{
                status:200,
                responseText:'{"name":"ABN"}'
            }
        }
    };

    beforeEach(function () {
        jasmine.Ajax.useMock();

        onSuccess = jasmine.createSpy('onSuccess');
        onFailure = jasmine.createSpy('onFailure');


    });

    it("should be able to search a bank", function () {
        Bank.search({name:"abn"}, onSuccess, onFailure, {});

        request = mostRecentAjaxRequest();

        expect(request.url).toEqual("context/search/bank?name=abn");

        expect(request.method).toEqual("GET");

        request.response(TestResponses.search.success);

        expect(onSuccess).toHaveBeenCalled();

    });

    it("should be able to find a bank with its id", function () {
        Bank.find(1, onSuccess, onFailure);

        request = mostRecentAjaxRequest();

        expect(request.url).toEqual("context/bank/1");

        expect(request.method).toEqual("GET");

        request.response(TestResponses.search.success);

        expect(onSuccess).toHaveBeenCalled();

        expect(onFailure).not.toHaveBeenCalled()

    });

    it("should be able to delete a bank with its id", function () {
        myBank = new Bank({id:1, name:"abn"});

        myBank.remove(onSuccess, onFailure);

        request = mostRecentAjaxRequest();

        expect(request.url).toEqual("context/bank/1");

        expect(request.method).toEqual("POST");

        request.response(TestResponses.search.success);

        expect(onSuccess).toHaveBeenCalled();

        expect(onFailure).not.toHaveBeenCalled()

    });

    it("should be able to define prototype functions",function(){
        myBank = new Bank({id:1, name:"abn"});

        myBank.doIt();

        request = mostRecentAjaxRequest();

        expect(request.url).toEqual("context/bank/1");

        expect(request.method).toEqual("POST");

        request.response(TestResponses.search.success);

    });

    it("should be able to define static functions",function(){
        expect(Bank.bulk()).toEqual("context/bank/1");
    });

});