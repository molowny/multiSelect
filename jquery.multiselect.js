(function ($) {
    $.fn.multiSelect = function (options) {
        var opts = $.extend({
            debug: false,
            
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
                $textInput.autocomplete('option', 'source', values);

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

            $container.insertAfter($$.hide().wrap($('<div />', {
                'class': opts.wrapperClass
            }))).parent().append($textInput).append($loading);

            loadValues($$);

            $textInput.keypress(function (event) {
                switch(event.keyCode) {
                    // return key
                    case 13:
                        //event.preventDefault();
                        break;
                }
            }).autocomplete({
                source: values,
                
                select: function(e, ui) {
                    values = $.grep(values, function (el, i) {
                        return el.id != ui.item.id;
                    });

                    $container.append(createNodeValue(ui.item.id, ui.item.value));
                    $$.find('option[value="'+ui.item.id+'"]').attr('selected', 'selected');

                    $(this).val('').autocomplete('option', 'source', values);
                    
                    e.preventDefault();
                }
            }).focus(function () {
                if ($(this).val() == '') {
                    //$(this).autocomplete('search', '');
                }
            });
        }

        return $(this).each(initMultiSelect);
    };
})(jQuery);
