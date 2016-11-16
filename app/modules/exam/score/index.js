'use strict';

define([
	'text!modules/exam/score/tpl/index.tpl',
	'text!modules/exam/score/tpl/item.tpl',
	'text!modules/exam/score/tpl/new.tpl',
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
			    'term': '',
			    'exam': '',
			    'province': '',
			    'school': '',
			    'student': '',
			    'identity_type': '',
			    'identity': '',
			    'exam_card_num': '',
			    'score': '',
			    'grade': '',
			    'enroll': 0
			};
		}
	});

	var Collection = ListCollectionBase.extend({
		model: Model,
		url: ajaxurl.scores
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
			$.when(
				$.ajax({
					url: ajaxurl.terms,
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

			var selfMenu = this.getSelfMenu();
			var editable = false;
			for(var i=0; i<selfMenu.length; i++){
				if(selfMenu[i].codename === 'exam.score.edit'){
					editable = true;
					break;
				}
			}

			this.extendData = {
				editable: editable
			};
		},

		render: function(){
			var maimHtml = this.mainTemplate({
				termList: this.termList,
				ajaxurl: ajaxurl,
				selfMenu: this.getSelfMenu()
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));
		},

		search: function(e){
			e.preventDefault();

			var val = this.$('.search-form #gradeStartInput').val();
			val ? this.searchData.grade_start = val : delete(this.searchData.grade_start);

			val = this.$('.search-form #gradeEndInput').val();
			val ? this.searchData.grade_end = val : delete(this.searchData.grade_end);

			val = this.$('.search-form .term-select').val();
			val ? this.searchData.term = val : delete(this.searchData.term);

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
				score: $('form.score-form #scoreInput').val()
			};

			var id = target.data('id');
			var model = this.collection.get(id);
			model.save(data, {
				url: ajaxurl.score + id + '/',
				patch: true,
				wait: true
			});

			this.modal.modal('hide');

			event.preventDefault();
		}
	});
});