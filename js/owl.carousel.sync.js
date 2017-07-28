/**
 * OwlCarousel
 *
 * @author Babichev Maxim
 * @year 2017
 * @company bavix
 * @since 2.0.0
 */
;(function ($, window, document, undefined) {

    'use strict';

    var thumbs = function (scope) {
        this.owl = scope;
        this.owl._options = $.extend(thumbs.Defaults, this.owl.options);

        /**
         * All event handlers.
         * @protected
         * @type {Object}
         */
        this._handlers = {

            'initialized.owl.carousel': $.proxy(function (e) {
                if (e.namespace && this.owl.settings.thumbs) {
                    this.owl.$element.trigger('init.owl.thumbs');
                }
            }, this),

            'init.owl.thumbs': $.proxy(function (e) {

                var _default = {
                    items: 4,
                    slideBy: 4,
                    nav: true,
                    dots: false,
                    smartSpeed: 200,
                    slideSpeed: 500,
                    responsiveRefreshRate: 100
                };

                var settings = this.owl.settings.thumbs;
                var $elements = this.owl.$element;

                $elements.each(function (ind, el) {

                    var $el = $(el);

                    var id = $el.attr('id');
                    var changed = false;

                    if (id === undefined) {
                        throw new Error('Attribute `id` not found');
                    }

                    // default value
                    if (typeof settings === "object") {
                        settings = $.extend(_default, settings);
                    }
                    else {
                        settings = _default;
                    }

                    var $thumbs = $('[data-owl-sync="' + id + '"]');

                    // init
                    $thumbs.owlCarousel(settings);

                    $el.on('changed.owl.carousel', function (el) {

                        var count = el.item.count - 1;
                        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

                        current = current < 0 ? count : current;
                        current = current > count ? 0 : current;

                        var countItems = $thumbs.find('.owl-item.active').length - 1;
                        var start = $thumbs.find('.owl-item.active').first().index();
                        var end = $thumbs.find('.owl-item.active').last().index();

                        if (current !== 0 && current < start) {
                            $thumbs.data('owl.carousel').to(current - countItems, 100, true);
                        } else if (current > end) {
                            // 0 3 4 3
                            $thumbs.data('owl.carousel').to(current, 100, true);
                        }

                    });

                    $thumbs.on('changed.owl.carousel', function (el) {
                        $el.data('owl.carousel').to(el.item.index, 100, true);
                    });

                    $thumbs.on('click', '.owl-item', function (e) {
                        e.preventDefault();
                        $el.data('owl.carousel').to($(this).index(), 300, true);
                    });

                });

            }, this)

        };

        // register the event handlers
        this.owl.$element.on(this._handlers);

    };

    thumbs.Defaults = {
        thumbs: false
    };

    //destroy:
    thumbs.prototype.destroy = function () {
        //events here
    };

    $.fn.owlCarousel.Constructor.Plugins['Thumbs'] = thumbs;

})(window.Zepto || window.jQuery, window, document);
