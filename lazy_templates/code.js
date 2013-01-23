function AddressViewModel(){
    var self = this;

    self.details = ko.observable();


    self.showDetails = function(){
        self.details({name: "joris", address : {street: "loeffenstraat", city:"ooij"}});
    }
}

function ViewModel() {
    var self = this;

    self.a = new AddressViewModel();
}