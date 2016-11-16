'use strict';

define([
	'text!modules/student/list/tpl/index.tpl',
	'text!modules/student/list/tpl/item.tpl',

	'common/ui/listItemBaseView',
	'common/ui/listBaseView',
	'common/models/listCollectionBase',

	'modules/student/studentModel',

	'common/ajaxURI',
	'common/plugin/pagination/jquery.twbsPagination'
],function(
	indexTpl,
	itemTpl,

	ListItemBaseView,
	ListBaseView,
	ListCollectionBase,

	StudentModel,

	ajaxurl
){

	var Collection = ListCollectionBase.extend({
		model: StudentModel,
		url: ajaxurl.students
	});

	var ItemView = ListItemBaseView.extend({
		tpl: itemTpl,
		model: StudentModel
	});

	var limit = 10; //每页显示数量
	var currentPage = 1;


	return ListBaseView.extend({

		mainTemplate: _.template(indexTpl),

		__events: {
			'change .provinceSelect': 'selectProvince',
			'submit .search-form': 'search',

			'click .edit': 'edit',

			'click .detail': 'detail'
		},

		collection: null,

		provinceList: null,

		start: function(){
			var self = this;
			$.ajax({
				url: ajaxurl.locationProvinces + '?limit=100000',
				type: 'get',
				success: function(response){
					if(response && response.error_code !== undefined){
						alert(response.message);
						return;
					}
					self.provinceList = response.results;
					self.render();
					self.getListData();
				},
				error: function(jqXHR){
					alert(jqXHR.responseText);
				}
			});

			this.itemView = ItemView;

			this.collection = new Collection();
			this.listenTo(this.collection, 'add', this.addOne);
			this.listenTo(this.collection, 'reset', this.renderList);
		},

		render: function(){
			var maimHtml = this.mainTemplate({
				provinceList: this.provinceList,
				ajaxurl: ajaxurl
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));
		},

		search: function(e){
			e.preventDefault();

			var val = this.$('.search-form .province-select').val();
			val ? this.searchData.province = this.$('.search-form .province-select').find('option:selected').text() 
				: delete(this.searchData.province);

			val = this.$('.search-form .exam-province-select').val();
			val ? this.searchData.exam_province = this.$('.search-form .exam-province-select').find('option:selected').text() 
				: delete(this.searchData.exam_province);

			val = this.$('.search-form #keywordInput').val();
			val ? this.searchData.search = val : delete(this.searchData.search);

			this.currentPage = 1;
			this.getListData();
		},
		
		edit: function(event){
			var target = $(event.target);
			var tr = target.closest('tr');
			var id = tr.data('id');
			
			$.go('student/edit/'+id);
		},

		detail: function(event){
			var target = $(event.target);
			var tr = target.closest('tr');
			var id = tr.data('id');
			
			$.go('student/detail/'+id);
		},

		selectProvince: function(event){
			var target = $(event.target);
			var value = target.value;
			if(value == '')return;

			$.ajax({
				url: ajaxurl.locationCities + '?limit=100000',
				type: 'get',
				dataType: 'json',
				data:{
					province: value
				},
				success: function(response){
					if(response && response.error_code !== undefined){
						alert(response.message);
						return;
					}

					var cities = response.results;
					var html = '<option value="">--- 选择市 ---</option>';
					_.each(cities, function(item){
						html += '<option value="'+ item.id +'">' + item.name +'</option>';
					});

					$('.citySelect').html(html);
				}
			});
		}
	});
});