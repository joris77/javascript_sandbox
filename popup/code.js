function confirmation(name, action, yes, no) {
    return {
        name: name,
        action: action,
        yes: yes,
        no: no,
        isInitialized: function () {
            return name !== undefined;
        }
    }
}

ko.bindingHandlers.confirmation = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = valueAccessor() || {},
                allBindings = allBindingsAccessor();

        $(element).dialog({autoOpen: false});

        $(element).find("#yes").click(function () {
            $(element).dialog("close");
        });

        $(element).find("#yes").click(function () {
            $(element).dialog("close");
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value.isInitialized()) {
            $(element).dialog("open");
        }
    }
};

function ViewModel() {
    var self = this;

    self.confirmation = ko.observable(confirmation());

    self.reject = function () {
        self.confirmation(confirmation("Credit advice", "Reject", function () {
                    console.log("Doing yes");
                },
                function () {
                    console.log("Doing no");
                }));
    };

    self.del = function () {
        self.confirmation(confirmation("Credit advice", "Delete", function () {
                    console.log("Doing yes");
                },
                function () {
                    console.log("Doing no");
                }));
    };
}

