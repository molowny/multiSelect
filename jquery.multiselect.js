(function ($) {
    $.fn.multiSelect = function (options) {
        var opts = $.extend({
            //service: 'autocomplete.php',

            //allowDuplicate: false,
            
            // css classes
            wrapperClass   : 'ms-wrapper',
            containerClass : 'ms-container', // ul class
            nodeClass      : 'ms-container-node', // li class
            removeClass    : 'ms-remove',
            loadingClass   : 'ms-loading'
        }, options);

        function initMultiSelect() {
            
        }

        $(this).each(initMultiSelect);
    };
})(jQuery);