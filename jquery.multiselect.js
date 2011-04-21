(function ($) {
    $.fn.multiSelect = function (options) {
        var opts = $.extend({
            debug: true,
            // css classes
            wrapperClass   : 'ms-wrapper',
            containerClass : 'ms-container', // ul class
            nodeClass      : 'ms-container-node', // li class
            removeClass    : 'ms-remove',
            loadingClass   : 'ms-loading'
        }, options);

        function log() {
            if(opts.debug && this.console) console.log(Array.prototype.slice.call(arguments));
        }

        function initMultiSelect() {
            var $$ = $(this),
            $container = $('<ul />', {
                'class': opts.containerClass
            }),

            $textInput = $('<input />', {
                name   : $$.attr('name') + '-ms-input',
                type   : 'text',
                'class': 'ms-input'
            }),

            $loading = $('<span />', {
                'class': opts.loadingClass
            });
            
            var values = [];

            function uncheckNode($node) {
                var $option = $node.parent().prev('select').find('option[value="'+$node.data('value')+'"]');

                values.push({id: $node.data('value'), value: $option.html()});

                $option.removeAttr('selected');

                $node.remove();
            }

            function createNodeValue(value, label) {
                var $node = $('<li />', {
                    'class': opts.nodeClass
                }).data('value', value);

                $node.append('<span>'+label+'</span><a href="#" class="'+opts.removeClass+'">remove</a>');

                $node.find('.'+opts.removeClass).click(function (e) {
                    e.preventDefault();

                    uncheckNode($(this).parent());
                });

                return $node;
            }
       
            function loadValues($multi) {
                var $container = $multi.next('.'+opts.containerClass);

                $multi.find('option:selected').each(function () {
                    $container.append(createNodeValue($(this).attr('value'), $(this).html()));
                });
                
                $multi.find('option').not(':selected').each(function () {
                    values.push({id: $(this).attr('value'), value: $(this).html()});
                });
            }

            $container.insertAfter($$/*.hide()*/.wrap($('<div />', {
                'class': opts.wrapperClass
            }))).parent().append($textInput).append($loading);

            loadValues($$);

            $textInput.keypress(function (event) {
                switch(event.keyCode) {
                    // return key
                    case 13:
                        event.preventDefault();
                        break;
                }
            }).autocomplete({
                source: values,
                select: function(event, ui) {

                    log( ui.item ?
					"Selected: " + ui.item.value + " aka " + ui.item.id :
					"Nothing selected, input was " + this.value );
                                    
                    var selected = $.grep(values, function (e, i) {
                        return e.id == ui.item.id;
                    });

                    values = $.grep(values, function (e, i) {
                        return e.id != ui.item.id;
                    });

                    $(this).autocomplete('option', 'source', values);

                    $$.find('option[value="'+selected.id+'"]').attr('selected', 'selected');

                    /*if (pos != -1) {
                        var node = values[pos];
                        $container.append(createNodeValue(node.value, node.label));

                        labels = $.grep(labels, function (e, i) {
                            return i !== pos;
                        });

                        values = $.grep(values, function (e, i) {
                            return i !== pos;
                        });

                        $(this).autocomplete('option', 'source', labels);

                        $$.find('option[value="'+node.value+'"]').attr('selected', 'selected');
                    }*/
                }
            });
        }

        $(this).each(initMultiSelect);
    };
})(jQuery);
