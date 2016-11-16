'use strict';

define([
	'text!modules/exam/score_delivery/tpl/index.tpl',
	'text!modules/exam/score_delivery/tpl/item.tpl',
	'text!modules/exam/score_delivery/tpl/new.tpl',
	'common/ui/listItemBaseView',
	'common/ui/listBaseView',
	'common/models/itemBaseModel',
	'common/models/listCollectionBase',
	'common/ajaxURI',
	'common/plugin/pagination/jquery.twbsPagination'
],function(
	indexTpl,
	itemTpl,
	newTpl,
	ListItemBaseView,
	ListBaseView,
	ItemBaseModel,
	ListCollectionBase,
	ajaxurl
){

	var Model = ItemBaseModel.extend({
		defaults: function(){
			return {
	            'number': '',
	            'school_name': '',
	            'exam_card_num': '',
	            'bill_to_name': null,
	            'bill_to_phonenumber': null,
	            'address': '',
	            'bill_to_postalcode': null,
	            'deliver_status': '',
	            'logistics_company': null,
	            'tracking_number': null,
	            'purchase_time': ''
			};
		}
	});

	var Collection = ListCollectionBase.extend({
		model: Model,
		url: ajaxurl.scoreReportDeliveries
	});

	var ItemView = ListItemBaseView.extend({
		tpl: itemTpl,
		model: Model
	});

	return ListBaseView.extend({

		mainTemplate: _.template(indexTpl),
		newTemplate: _.template(newTpl),

		__events: {
			'click .edit': 'edit',
			'submit .search-form': 'search',

			'submit .score-form' : 'postData'
		},

		termList: null,

		start: function(){
			var self = this;

			self.itemView = ItemView;

			self.collection = new Collection();
			self.listenTo(self.collection, 'add', self.addOne);
			self.listenTo(self.collection, 'reset', self.renderList);
			self.render();
			self.getListData();
		},

		render: function(){
			var maimHtml = this.mainTemplate({
				ajaxurl: ajaxurl
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));
		},

		search: function(e){
			e.preventDefault();

			var val = this.$('.search-form input[name=deliverRadio]:checked').val();
			val ? this.searchData.deliver_status = val : delete(this.searchData.deliver_status);

			val = this.$('.search-form #keywordInput').val();
			val ? this.searchData.search = val : delete(this.searchData.search);

			this.currentPage = 1;
			this.getListData();
		},

		edit: function(event){
			var target = $(event.target);
			var tr = target.closest('tr');
			var id = tr.data('id');
			
			this.openModal(id);
		},

		modal: null,
		openModal: function(id){
			id = id || 0;
			var self = this;

			var model;
			model = self.collection.get(id);
	
			var html = self.newTemplate({
				id : id,
				model: model
			});

			self.modal = $(html);
			self.$el.append(self.modal);
			self.modal.modal('show');
			self.modal.on('hidden.bs.modal', function(){
				self.modal.remove();
			});
		},

		postData: function(event){
			var self = this;
			var target = $(event.target);
			var data = {
				logistics_company: $('form.score-form #logisticsCompanyInput').val(),
				tracking_number: $('form.score-form #trackingNumberInput').val()
			};

			var id = target.data('id');
			var model = this.collection.get(id);
			model.save(data, {
				url: ajaxurl.scoreReportDelivery + id + '/',
				patch: true, 
				success: function(){
					self.renderList();
				}
			});

			this.modal.modal('hide');

			event.preventDefault();
			return false;
		}
	});
});