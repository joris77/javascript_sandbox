function ViewModel() {
    var self = this;

    self.addError = function () {
        self.errors.push("error1");
    }

    self.removeError = function () {
        self.errors.pop();
    }

    self.errors = ko.observableArray();
}

ko.bindingHandlers.errors = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = valueAccessor() || {},
                allBindings = allBindingsAccessor();



    },
    update: function (element, valueAccessor) {
        var errors = ko.utils.unwrapObservable(valueAccessor());
        if (errors.length > 0) {
            $(element).parent().addClass("has-errors");
            $('<div class="error-message" style="left: 175.18181824684143px;">' +
                    '<div class="pointer"></div>' +
                    '<div class="body">' +
                    '<span class="input-name">Amount</span>' +
                    '<span class="message">Please fill in this field.</span>' +
                    '<span class="info">' + errors[0] + '</span>' +
                    '</div>' +
                    '</div>').insertAfter(element);
        } else {
            $(element).parent().removeClass("has-errors");
            $(element).parent().children(".error-message").remove();
        }

    }
};

