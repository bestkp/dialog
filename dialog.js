(function ($) {

    function Dialog(options) {
        var deft = {
            width: 400,
            height: 200,
            type: 2,
            title: '我是title你好啊这是我的测试demo 欢迎使用',
            content: '我是content',
            okFunc: function () {

            },
            noFunc: function () {

            }
        };
        this.opts = $.extend(deft, options);
        this.init();
        this.bind();
    }
    Dialog.prototype.init = function () {
        if(this.opts.type === 1) {
            //alert
            this.maskHtml = '<div id="kpMask">'+
                '<div id="dialog">'+
                '<div class="dialog-top">'+
                '<div class="dialog-title">'+this.opts.title+'</div>'+
                '<div class="dialog-close">关闭</div>'+
                '</div>'+
                '<div class="dialog-mid">'+
                '<div class="dialog-content">'+this.opts.content+'</div>'+
                '</div>'+
                '<div class="dialog-foot">'+
                '<a href="javascript:void(0)" class="dialog-ok dialog-btn mr40">确定</a>'+
                '<a href="javascript:void(0)" class="dialog-no dialog-btn">取消</a>'+
                '</div>'+
                '</div>'+
                '</div>';
        } else if(this.opts.type === 2) {
            this.maskHtml = '<div id="kpMask">'+
                '<div id="dialog">'+
                '<div class="dialog-top">'+
                '<div class="dialog-title">'+this.opts.title+'</div>'+
                '<div class="dialog-close">关闭</div>'+
                '</div>'+
                '<div class="dialog-mid">'+
                '<div class="dialog-content">'+this.opts.content+'</div>'+
                '</div>'+
                '<div class="dialog-foot">'+
                '<a href="javascript:void(0)" class="dialog-ok dialog-btn">确定</a>'+
                '</div>'+
                '</div>'+
                '</div>';
        }
        this.renderHtml('init');
    };
    Dialog.prototype.renderHtml = function (tag) {
        var winW = $(window).width(),
            winH = $(window).height();
        if(tag === 'init') {
            if($('#kpMask')) {
                $('#kpMask').remove();
            }
        }
        $('body').append(this.maskHtml);
        this.mask = $('#kpMask');
        this.dialog = this.mask.find('#dialog');
        this.content = this.dialog.find('.dialog-content');
        var scrollTop = $(window).scrollTop();
        this.mask.css({
            width: winW,
            height: winH,
            top: scrollTop
        });
        this.dialog.css({
            width: this.opts.width,
            height: this.opts.height,
            marginLeft: -this.opts.width/2,
            marginTop: -this.opts.height/2
        });
        this.content.css({
            height: this.opts.height - 130
        })
    };
    Dialog.prototype.alert = function () {
        this.mask.show();
    };
    Dialog.prototype.bind = function () {
        var self = this;
        $('.dialog-close').click(function () {
            self.mask.hide();
        });
        $('.dialog-ok').click(function () {
            if($.isFunction(self.opts.okFunc)) {
                self.mask.hide();
                self.opts.okFunc();
            }
        });
        $('.dialog-no').click(function () {
            if($.isFunction(self.opts.noFunc)) {
                self.mask.hide();
                self.opts.noFunc();
            }
        });
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            self.mask.css({'top': scrollTop});
        });
        $(window).resize(function () {
            self.renderHtml()
        })
    };
    $.extend({
        dialog: function (option) {
            return new Dialog(option).alert();
        }
    })

})(jQuery);

