'use strict';

define([
	'text!modules/school/index/tpl/index.tpl',
	'text!modules/school/index/tpl/item.tpl',
	'text!modules/school/index/tpl/new.tpl',
	'common/ui/listItemBaseView',
	'common/ui/listBaseView',
	'common/models/itemBaseModel',
	'common/models/listCollectionBase',
	'common/ajaxURI',
	'common/plugin/pagination/jquery.twbsPagination',
	'fileupload'
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
	            'category': 0,
	            'name': '',
	            'address': '',
	            'contact': '',
	            'position': '',
	            'phone': '',
	            'email': ''
			};
		}
	});

	var Collection = ListCollectionBase.extend({
		model: Model,
		url: ajaxurl.schools
	});

	var ItemView = ListItemBaseView.extend({
		tpl: itemTpl,
		model: Model,

		delete: function(event){
			var self = this;
			confirm('是否要删除【' + self.model.get('name') + '】？（删除后无法恢复）', function(){
				self.model.destroy({
					wait: true,
					url: ajaxurl.school + self.model.id + '/'
				});
			});
		}
	});

	return ListBaseView.extend({

		mainTemplate: _.template(indexTpl),
		newTemplate: _.template(newTpl),

		__events: {
			'click .edit': 'edit',
			'change .province-select': 'selectProvince',
			'submit .search-form': 'search',
			'click .new': 'new',
			'submit .user-form' : 'postUserData'
		},

		provinceList: null,

		start: function(){
			var self = this;
			$.ajax({
				url: ajaxurl.locationProvinces + '?limit=10000',
				type: 'get',
				success: function(response){
					self.provinceList = response.results;
					self.render();
					self.getListData();
				},
				error: function(jqXHR){
					$.wrapAjaxError(jqXHR);
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

			var val = this.$('input[name=schollTypeRadio]:checked').val();
			val ? this.searchData.category = val : delete(this.searchData.category);

			val = this.$('.province-select').find("option:selected").text();
			val ? this.searchData.province = val : delete(this.searchData.province);

			val = this.$('.city-select').find("option:selected").text();
			val ? this.searchData.city = val : delete(this.searchData.city);

			val = this.$('.schoolNameInput').val();
			val ? this.searchData.search = val : delete(this.searchData.search);
			
			this.currentPage = 0;
			this.getListData();
		},

		new: function(event){
			this.openSchoolModal();
		},

		edit: function(event){
			var target = $(event.target);
			var tr = target.closest('tr');
			var id = tr.data('id');
			
			this.openSchoolModal(id);
		},

		schoolModal: null,
		openSchoolModal: function(id){
			id = id || 0;
			var self = this;
			var mode = 'new';
			if(id){
				mode = 'edit';
			}

			var modeData = {
				edit: '编辑',
				new: '新建'
			}

			var model, province, cities;
			if(mode === 'edit'){
				model = this.collection.get(id);
				province = model.get('province').id;
				$.ajax({
					url: ajaxurl.locationCities,
					type: 'get',
					dataType: 'json',
					data:{
						province: province
					},
					success: function(response){
						if(response && response.error_code !== undefined){
							alert(response.message);
							return;
						}
						cities = response.results;
						renderModal();
					}
				});

			}else{
				renderModal();
			}

			function renderModal(){
				var html = self.newTemplate({
					id : id,
					type: modeData[mode],				
					mode: mode,
					model: mode == 'edit' ? model : {},
					provinces: self.provinceList,
					cities: cities
				});

				self.schoolModal = $(html);
				self.$el.append(self.schoolModal);
				self.schoolModal.modal('show');
				self.schoolModal.on('hidden.bs.modal', function(){
					self.schoolModal.remove();
				});
			}
		},

		postUserData: function(event){
			event.preventDefault();

			var target = $(event.target);
			var mode = target.data('mode');

			var data = {
				category: this.$('input[name=category]:checked').val(),
				name: this.$('.user-form #nameInput').val(),
				email: this.$('#emailInput').val(),
				phone: this.$('#phoneInput').val(),
				contact : this.$('#contactInput').val(),
				position : this.$('#positionInput').val(),
				city: this.$('.user-form .city-select').val(),
				address: this.$('#addressInput').val()
			};

			if(mode === 'edit'){
				var id = target.data('id');
				var model = this.collection.get(id);
				model.save(data, {
					patch: true,
					wait: true,
					url: ajaxurl.school + id + '/'
				});
			}else if(mode === 'new'){
				this.collection.create(data, {
					wait: true
				});
			}
			this.schoolModal.modal('hide');
		},

		selectProvince: function(event){
			var target = $(event.target);
			var value = target.val();
			if(value === '')return;

			$.ajax({
				url: ajaxurl.locationCities + '?limit=10000',
				type: 'get',
				dataType: 'json',
				data:{
					province: value
				},
				success: function(response){

					var cities = response.results;
					var html = '<option value=""></option>';
					_.each(cities, function(item){
						html += '<option value="'+ item.id +'">' + item.name +'</option>';
					});

					$('.city-select').html(html);
				},
				error: function(error){
					$.wrapAjaxError(error);
				}
			});
		}

	});
});