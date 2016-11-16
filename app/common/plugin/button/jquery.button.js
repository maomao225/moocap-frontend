/*
 * jQuery Button
 *
 * topcg@163.com
 * Deqiang.Yin
 */
(function ($, window, document, undefined) {

    'use strict';

    var old = $.fn.button;

    // PROTOTYPE AND CONSTRUCTOR

    var Button = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.twbsPagination.defaults, options);

        return this;
    };

    Button.prototype = {

        constructor: Button,

        destroy: function () {
            return this;
        },

        loadingTpl: '<div class="button-loading"><div class="loader">Loading...</div></div>',

        loading: function(){
            this.$element.attr('disabled', true);
            this.$element.prepend(this.loadingTpl);
        },

        resetLoading: function(){
            this.$element.removeAttr('disabled');
            var loadingElement = this.$element.find('.button-loading');
            loadingElement.remove();
        }

    };

    // PLUGIN DEFINITION

    $.fn.button = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var methodReturn;

        var $this = $(this);
        var data = $this.data('button');
        var options = typeof option === 'object' && option;

        if (!data) $this.data('button', (data = new Button(this, options) ));
        if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);

        return ( methodReturn === undefined ) ? $this : methodReturn;
    };

    $.fn.button.defaults = {
    };

    $.fn.button.Constructor = Button;

    $.fn.button.noConflict = function () {
        $.fn.button = old;
        return this;
    };

})(window.jQuery, window, document);
