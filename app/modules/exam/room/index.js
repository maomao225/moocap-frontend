'use strict';

define([
	'text!modules/exam/room/tpl/index.tpl',
	'text!modules/exam/room/tpl/item.tpl',
	'text!modules/exam/room/tpl/new.tpl',
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
				'district_dict': '',
			    'city_dict': '',
			    'province_dict': '',
			    'created': '',
			    'modified': '',
			    'name': '',
			    'address': '',
			    'capacity': 0
			};
		}
	});

	var Collection = ListCollectionBase.extend({
		model: Model,
		url: ajaxurl.examrooms
	});

	var ItemView = ListItemBaseView.extend({
		tpl: itemTpl,
		model: Model,

		delete: function(event){
			var self = this;
			confirm('确认要删除吗？', function(){	
				self.model.destroy({
					url: ajaxurl.examroom + self.model.id + '/'
				}, {wait: true});
			});
		},
	});

	return ListBaseView.extend({

		mainTemplate: _.template(indexTpl),
		newTemplate: _.template(newTpl),

		__events: {
			'click .edit': 'edit',
			'change .location-select': 'changeLocation',
			'submit .search-form': 'search',

			'click .new': 'new',
			'submit .examroom-form' : 'postExamRoomData'
		},
		provinceList: null,

		start: function(){
			var self = this;
			$.ajax({
				url: ajaxurl.locationProvinces + '?limit=10000',
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

			if(this.$('.search-form .district-select').val()){
				this.searchData.district = this.$('.search-form .district-select').find("option:selected").text();
			}else{
				delete(this.searchData.district);
			}
			if(this.$('.search-form .city-select').val()){
				this.searchData.city = this.$('.search-form .city-select').find("option:selected").text();
			}else{
				delete(this.searchData.city);
			}
			if(this.$('.search-form .province-select').val()){
				this.searchData.province = this.$('.search-form .province-select').find("option:selected").text();
			}else{
				delete(this.searchData.province);
			}
			this.searchData.search = this.$('.search-form #keyword').val();
			
			this.currentPage = 1;
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

		examModal: null,
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

			if(mode === 'edit'){
				var model = this.collection.get(id);

				var cityList, districtList;
				$.when(
					$.ajax({
						url: ajaxurl.locationCities,
						type: 'get',
						dataType: 'json',
						data: {
							province: model.get('province_dict').id,
							limit: 10000
						},
						success: function(response){
							if(response && response.error_code !== undefined){
								alert(response.message);
								return;
							}
							cityList = response.results;
						}
					}),
					$.ajax({
						url: ajaxurl.locationDistricts,
						type: 'get',
						dataType: 'json',
						data: {
							city: model.get('city_dict').id,
							limit: 10000
						},
						success: function(response){
							if(response && response.error_code !== undefined){
								alert(response.message);
								return;
							}
							districtList = response.results;
						}
					})
				).then(renderModal);
			}else{
				renderModal();
			}
			

			function renderModal(){
				var html = self.newTemplate({
					id : id,
					type: modeData[mode],				
					mode: mode,
					model: mode == 'edit' ? model : {},
					provinceList: self.provinceList,
					cityList: cityList,
					districtList: districtList
				});

				self.examModal = $(html);
				self.$el.append(self.examModal);
				self.examModal.modal('show');
				self.examModal.on('hidden.bs.modal', function(){
					self.examModal.remove();
				});
			}
			
		},

		postExamRoomData: function(event){
			var target = $(event.target);
			var mode = target.data('mode');

			var data = {
	            'name': this.$('#nameInput').val(),
	            'province': this.$('.examroom-form .province-select').val(),
	            'city': this.$('.examroom-form .city-select').val(),
	            'district': this.$('.examroom-form .district-select').val(),
	            'address': this.$('#addressInput').val(),
	            'capacity': this.$('#capacityInput').val(),
	            'kaodian_name' : this.$('#kaodiannameInput').val()
			};

			if(mode === 'edit'){
				var id = target.data('id');
				var model = this.collection.get(id);
				model.save(data, {
					patch: true,
					url: ajaxurl.examroom + id + '/',
					wait: true
				});
			}else if(mode === 'new'){
				this.collection.create(data, {wait: true});
			}
			this.examModal.modal('hide');

			event.preventDefault();
			return false;
		},

		changeLocation: function(event){
			var target = $(event.target);
			var value = target.val();
			if(value == '')return;

			var parent = target.closest('form');

			var url = {
				city: ajaxurl.locationCities,
				district: ajaxurl.locationDistricts
			}

			//清空当前的所有下一级内容
			var select = target, nextSelect, role;
			while(role = select.data('role')){
				nextSelect = parent.find(role);
				nextSelect.find('optgroup').empty();
				select = nextSelect;
			}

			role = target.data('role');
			var roleTarget = parent.find(role); //指向的目标select

			var roleType = roleTarget.data('type'); //取数据的类型

			var params = {};
			params[target.data('type')] = value;
			$.ajax({
				url: url[roleType],
				type: 'get',
				dataType: 'json',
				data: params,
				success: function(response){
					if(response && response.error_code !== undefined){
						alert(response.message);
						return;
					}

					var cities = response.results;
					var html = '';
					_.each(cities, function(item){
						html += '<option value="'+ item.id +'">' + item.name +'</option>';
					});

					roleTarget.find('optgroup').html(html);
				}
			});
		}
	});
});