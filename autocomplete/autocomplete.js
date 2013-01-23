$.widget('custom.tautocomplete', $.ui.autocomplete, {
    _renderMenu:function (ul, items) {
        var self = this;

        if (this.options.showHeader) {
            table = $('<div class="ui-widget-header" style="width:100%"></div>');
            $.each(this.options.columns, function (index, headerColumn) {
                table.append('<span style="padding:0 4px;float:left;width:' + headerColumn.width + ';">' + headerColumn.header + '</span>');
            });
            table.append('<div style="clear: both;"></div>');
            ul.append(table);
        }
        $.each(items, function (index, row) {
            self._renderItem(ul, row);
        });
    },
    _renderItem:function (ul, item) {
        var t = '',
                result = '';

        $.each(this.options.columns, function (index, column) {
            t += '<span style="padding:0 4px;float:left;width:' + column.width + ';">' + item[column.value ? column.value : index] + '</span>'
        });

        result = $('<li></li>')
                .data('item.autocomplete', item)
                .append('<a class="liAnchor">' + t + '<div style="clear: both;"></div></a>')
                .appendTo(ul);
        return result;
    }
});

//jqAuto -- main binding (should contain additional options to pass to autocomplete)
//jqAutoValue -- where to write the selected value
//jqAutoSourceInputValue -- the property that should be displayed in the input box
ko.bindingHandlers.jqAuto = {
    init:function (element, valueAccessor, allBindingsAccessor) {
        var options = valueAccessor() || {},
                allBindings = allBindingsAccessor(),
                modelValue = allBindings.jqAutoValue,
                inputValueProp = allBindings.jqAutoSourceInputValue;

        options.select = function (event, ui) {
            modelValue(ui.item);
            this.value = ui.item[inputValueProp];
            return false;
        };

        options.showHeader = true;

        //initialize autocomplete
        $(element).tautocomplete(options);
    }
};