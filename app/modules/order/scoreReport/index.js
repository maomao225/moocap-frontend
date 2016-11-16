'use strict';

define([
	'text!modules/order/scoreReport/tpl/index.tpl',
	'text!modules/order/scoreReport/tpl/item.tpl',

	'common/ui/listItemBaseView',
	'common/ui/listBaseView',
	'common/models/itemBaseModel',
	'common/models/listCollectionBase',

	'common/ajaxURI',
	'common/plugin/moment/moment',
	'common/plugin/pagination/jquery.twbsPagination',
	'datetimepicker'
],function(
	indexTpl,
	itemTpl,

	ListItemBaseView,
	ListBaseView,
	ItemBaseModel,
	ListCollectionBase,

	ajaxurl,
	moment
){

	var Model = ItemBaseModel.extend({
		defaults: function(){
			return {
	            'number': '',
	            'cost': '0',
	            'payway': '',
	            'cyber_bank': '',
	            'serial_number': '',
	            'deliver_status': '',
	            'exam_name': '',
	            'student_name': '',
	            'identity_type': '',
	            'identity': '',
				'exam_card_num': '',
	            'purchase_time': ''
			};
		}
	});

	var Collection = ListCollectionBase.extend({
		model: Model,
		url: ajaxurl.scoreReportOrders
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

		deliverStatus: {
			'not_deliver':'未配送',
			'delivering':'已配送'
		},

		start: function(){
			var self = this;

			self.itemView = ItemView;

			self.collection = new Collection();
			self.listenTo(self.collection, 'add', self.addOne);
			self.listenTo(self.collection, 'reset', self.renderList);

			self.render();
			self.getListData();

			$(".form_datetime").datetimepicker({
				format: 'yyyy-mm-dd',
				minView: 'month',
				autoclose: true
			});

			this.extendData = {
				allDeliverStatus: this.deliverStatus
			};
		},

		render: function(){
			var maimHtml = this.mainTemplate({
				allDeliverStatus: this.deliverStatus,
				ajaxurl: ajaxurl
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));
		},

		search: function(e){
			e.preventDefault();

			var val = $('.search-form #keywordInput').val();
			val ? this.searchData.search = val : delete(this.searchData.search);

			val= $('.search-form #purchaseTimeStartInput').val();
			val ? this.searchData.purchase_time_start = (new Date(val).toISOString()) : delete(this.searchData.purchase_time_start);

			val = $('.search-form #purchaseTimeEndInput').val();
			val ? this.searchData.purchase_time_end = (moment(new Date(val)).add(1, 'days').subtract(1, 'seconds').toISOString()) : delete(this.searchData.purchase_time_end);

			val = $('.search-form .status-select').val();
			val ? this.searchData.status = val : delete(this.searchData.status);

			this.currentPage = 1;
			this.getListData();
		}
	});
});