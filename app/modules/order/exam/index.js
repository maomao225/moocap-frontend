'use strict';

define([
    'text!modules/order/exam/tpl/index.tpl',
    'text!modules/order/exam/tpl/item.tpl',
    'common/ui/listItemBaseView',
    'common/ui/listBaseView',
    'common/models/itemBaseModel',
    'common/models/listCollectionBase',
    'common/ajaxURI',
    'common/plugin/moment/moment',
    'common/plugin/pagination/jquery.twbsPagination',
    'datetimepicker'
], function(
    indexTpl,
    itemTpl,
    ListItemBaseView,
    ListBaseView,
    ItemBaseModel,
    ListCollectionBase,
    ajaxurl,
    moment
) {

    var Model = ItemBaseModel.extend({
        defaults: function() {
            return {            
                'number': '',
                'cost': '0',
                'status': '',
                'payway': '',
                'cyber_bank': '',
                'serial_number': '',
                'exam_name': '',
                'student_name': '',
                'identity_type': '',
                'identity': '',
                'purchase_time': '',
                'paid': 0
            };
        }
    });

    var Collection = ListCollectionBase.extend({
        model: Model,
        url: ajaxurl.exam_orders
    });

    var ItemView = ListItemBaseView.extend({
        tpl: itemTpl,
        model: Model
    });

    return ListBaseView.extend({

        mainTemplate: _.template(indexTpl),
        __events: {
            'submit .search-form': 'search',
            'click .refund': 'refund'
        },

        status: {
            'purchased': '已支付',
            'refund-applied': '申请退款',
            'refund-allowed': '同意退款',
            'refunded': '已退款'
        },

        start: function() {
            var self = this;

            self.itemView = ItemView;

            self.collection = new Collection();
            self.listenTo(self.collection, 'add', self.addOne);
            self.listenTo(self.collection, 'reset', self.renderList);

            self.extendData = {
                allStatus: self.status
            };

            self.render();
            self.getListData();

            $(".form_datetime").datetimepicker({
                format: 'yyyy-mm-dd',
                minView: 'month',
                autoclose: true
            });
        },

        render: function() {
            var maimHtml = this.mainTemplate({
                ajaxurl: ajaxurl
            });
            this.$el.append(maimHtml).appendTo(('.content-wrapper'));
        },

        search: function(e) {
            e.preventDefault();

            var val = $('.search-form #keywordInput').val();
            val ? this.searchData.search = val : delete(this.searchData.search);

            val = $('.search-form #purchaseTimeStartInput').val();
            if (val) {
                val = new Date(val).toISOString();
                this.searchData.purchase_time_start = val;
            } else {
                delete(this.searchData.purchase_time_start);
            }

            val = $('.search-form #purchaseTimeEndInput').val();
            if (val) {
                val = moment(new Date(val)).add(1, 'days').subtract(1, 'seconds');
                val = val.toISOString();
                this.searchData.purchase_time_end = val;
            } else {
                delete(this.searchData.purchase_time_end);
            }

            val = $('.search-form .status-select').val();
            val ? this.searchData.status = val : delete(this.searchData.status);

            this.currentPage = 1;
            this.getListData();
        },

        refund: function(e) {
            var target = $(e.target);
            var tr = target.closest('tr');
            var id = tr.data('id');
            if (!id) return;

            var model = this.collection.get(id);
            model.save({
                status: 'refund-applied'
            }, {
                url: ajaxurl.auditRefund + id + '/',
                wait: true,
                success: function() {
                    alert('订单编号为' + model.get('number') + '的退款申请已提交给学堂在线，请耐心等待审核');
                    setTimeout(function() {
                        $('.alert-dialog').modal('hide');
                    }, 3000);
                }
            });
        }
    });
});
