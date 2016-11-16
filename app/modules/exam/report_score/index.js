'use strict';

define([
	'text!modules/exam/report_score/tpl/index.tpl',
	'text!modules/exam/report_score/tpl/item.tpl',
	'common/ui/listItemBaseView',
	'common/ui/listBaseView',
	'common/models/itemBaseModel',
	'common/models/listCollectionBase',
	'common/ajaxURI',
	'common/plugin/pagination/jquery.twbsPagination'
],function(
	indexTpl,
	itemTpl,
	ListItemBaseView,
	ListBaseView,
	ItemBaseModel,
	ListCollectionBase,
	ajaxurl
){

	var Model = ItemBaseModel.extend({
		defaults: function(){
			return {
			    'term': '',
			    'exam': '',
			    'school': '',
			    'student': '',
			    'identity_type': '',
			    'identity': '',
			    'exam_card_num': '',
			    'score': '',
			    'grade': ''
			};
		}
	});

	var Collection = ListCollectionBase.extend({
		model: Model,
		url: ajaxurl.upscores
	});

	var ItemView = ListItemBaseView.extend({
		tpl: itemTpl,
		model: Model
	});

	return ListBaseView.extend({

		mainTemplate: _.template(indexTpl),

		__events: {
			'click .edit': 'edit',
			'submit .search-form': 'search'
		},

		termList: null,

		start: function(){
			var self = this;
			$.when(
				$.ajax({
					url: ajaxurl.terms + '?limit=1000',
					type: 'get',
					success: function(response){
						if(response && response.error_code !== undefined){
							alert(response.message);
							return;
						}
						self.termList = response.results;
					},
					error: function(jqXHR){
						alert(jqXHR.responseText);
					}
				})
			).done(function(){
				self.render();
				self.getListData();
			});

			this.itemView = ItemView;

			this.collection = new Collection();
			this.listenTo(this.collection, 'add', this.addOne);
			this.listenTo(this.collection, 'reset', this.renderList);
		},

		render: function(){
			var maimHtml = this.mainTemplate({
				termList: this.termList,
				ajaxurl: ajaxurl
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));
		},

		search: function(e){
			e.preventDefault();

			var val = this.$('.search-form .term-select').val();
			val ? this.searchData.term = val : delete(this.searchData.term);

			val = this.$('.search-form #keywordInput').val();
			val ? this.searchData.search = val : delete(this.searchData.search);

			this.currentPage = 1;
			this.getListData();
		}
	});
});