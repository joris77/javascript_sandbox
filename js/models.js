var pr = {
    copy:function (source, target) {
        for (obj in source) {
            target[obj] = source[obj];
        }
    },
    Model:function (classProperties, prototypeProperties) {

        var modelUrl = classProperties.context + "/" + classProperties.modelName;


        var that = function (prototype) {

            pr.copy(prototypeProperties, prototype);

            prototype.remove = function remove(successCallback, errorCallback) {
                that.ajaxCall(that.modelInstanceUrl(prototype.id), '' +
                        'POST', successCallback, errorCallback);
            };

            return prototype;
        };

        pr.copy(classProperties, that);

        that.search = function (data, successCallback, errorCallback, options) {
            $.ajax({
                type:'GET',
                url:classProperties.context + "/search/" + classProperties.modelName,
                dataType:'json',
                data:data,
                success:successCallback,
                error:errorCallback
            });
        };

        that.find = function (id, successCallback, errorCallback) {
            that.ajaxCall(that.modelInstanceUrl(id), 'GET', successCallback, errorCallback);
        };

        that.ajaxCall = function (url, type, successCallback, errorCallback) {
            $.ajax({
                type:type,
                url:url,
                dataType:'json',
                success:successCallback,
                error:errorCallback
            });
        };

        that.modelInstanceUrl = function (id) {
            return modelUrl + "/" + id;
        };

        return that;
    }

};

var Bank = pr.Model(
        {
            context:"context",
            modelName:"bank",
            bulk:function () {
                return this.modelInstanceUrl(1);
            }
        }, {
            doIt:function () {
                this.remove();
                return "doit";
            }
        });

var Account = pr.Model({context:"context", modelName:"account"}, {});