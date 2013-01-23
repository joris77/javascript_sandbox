describe("Autocomplete", function () {

    var element, bank, menu, searchTerm
            bankObject = {id:1, code:"abn", displayName:"Abn Amro"},
            dataFunction = function (request, response) {
                searchTerm = request.term;
                response([bankObject]);
            }, bankColumns = [
                {header:'Id', width:'100px', value:'id'},
                {header:'Code', width:'100px', value:'code'},
                {header:'Name', width:'100px', value:'displayName'}
            ], valueAccessor = function () {
                return { autoFocus:true, columns:bankColumns, source:dataFunction }
            }, allBindings = function () {
                return  {jqAutoValue:bank, jqAutoSourceInputValue:'code'};
            };

    beforeEach(function () {
        element = $('<input id="auto">');
        bank = ko.observable();

        ko.bindingHandlers.jqAuto.init(element, valueAccessor, allBindings);
    });

    afterEach(function () {
        $(element).remove();
    });

    function typeValue() {
        element.val("a");
        element.trigger('input');
    }

    it("should autocomplete with the data from a model", function () {

        runs(function () {
            typeValue();
            menu = $('.ui-menu');
        });

        waitsFor(function () {
            return $(menu).children('li').length == 1;
        }, "The menu should have list values", 750);

        runs(function(){
            expect(searchTerm).toBe('a');
        })
    });

    it("should update an observable after selecting a value", function () {

        runs(function () {
            typeValue();
            menu = $('.ui-menu');
        });

        waitsFor(function () {
            return $(menu).children('li').length == 1;
        }, "The menu should have list values", 750);


        runs(function () {
            $(menu).find('.ui-menu-item').click();
        });

        waitsFor(function () {
            return $(element).val() === 'abn';
        }, "The value in the input should be as typed", 750);

        runs(function(){
            expect(bank()).toEqual(bankObject);
        });

    });

    it("should render a custom table javascript objects", function () {
        runs(function () {
            typeValue();
            menu = $('.ui-menu');
        });

        waitsFor(function () {
            return $(menu).children('li').length == 1;
        }, "The menu should have list values", 750);

        runs(function(){
            var spans = $(menu).find('li.ui-menu-item > a > span');
            expect(spans.first().text()).toEqual("1");
            expect($(spans[1]).text()).toEqual("abn");
            expect(spans.last().text()).toEqual("Abn Amro");

        });
    });


});