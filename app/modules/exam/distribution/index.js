'use strict';

define([
	'text!modules/exam/distribution/tpl/index.tpl',
	'text!modules/exam/distribution/tpl/item.tpl',
	'text!modules/exam/distribution/tpl/new.tpl',
	'common/ui/listItemBaseView',
	'common/ui/listBaseView',
	'common/models/itemBaseModel',
	'common/models/listCollectionBase',
	'common/ajaxURI',
	'common/plugin/moment/moment',
	'common/plugin/pagination/jquery.twbsPagination'
],function(
	indexTpl,
	itemTpl,
	newTpl,
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
			    'term': '',
			    'examroom_name': '',
			    'exam': '',
			    'province': '',
			    'city': '',
			    'school': '',
			    'student': '',
			    'identity_type': '',
			    'identity': '',
			    'created': '',
			    'modified': '',
			    'place': '',
			    'exam_card_num': '',
			    'examroom': 0,
			    'enroll': 0
			};
		}
	});

	var Collection = ListCollectionBase.extend({
		model: Model,
		url: ajaxurl.allocations,

		parse: function(response) {
		 	if(response){
		 		this.count = response.count;
		    	return response.results || [];
		 	}

		    return [];
		}
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

			'click .new': 'new',

			'submit .distribution-form' : 'postData',
			'change .location-select': 'changeLocation',
		},

		termList: null,
		provinceList: null,

		start: function(){
			var self = this;
			$.when(
				$.ajax({
					url: ajaxurl.terms + '?limit=100000',
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
				}),
				$.ajax({
					url: ajaxurl.locationProvinces + '?limit=100000',
					type: 'get',
					success: function(response){
						if(response && response.error_code !== undefined){
							alert(response.message);
							return;
						}
						self.provinceList = response.results;

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
				provinceList: this.provinceList,
				ajaxurl: ajaxurl
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));
		},

		search: function(e){
			e.preventDefault();

			var val;

			if(this.$('.search-form .province-select').val()){
				this.searchData.province = this.$('.search-form .province-select').find('option:selected').text();
			}else{
				delete(this.searchData.province);
			}

			if(this.$('.search-form .city-select').val()){
				this.searchData.city = this.$('.search-form .city-select').find('option:selected').text();
			}else{
				delete(this.searchData.city);
			}

			val = this.$('.search-form .term-select').val();
			val ? this.searchData.term = val : delete(this.searchData.term);

			val = this.$('.search-form #keywordInput').val();
			val ? this.searchData.search =  val : delete(this.searchData.search);

			this.currentPage = 1;
			this.getListData();
		},

		new: function(event){
			this.openModal();
		},

		edit: function(event){
			var target = $(event.target);
			var tr = target.closest('tr');
			var id = tr.data('id');

			this.openModal(id);
		},

		courseModal: null,
		openModal: function(id){
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

			var model, examrooms;
			model = this.collection.get(id);
			$.when(
				$.ajax({
					url: ajaxurl.examrooms + '?limit=100000',
					type: 'get',
					dataType: 'json',
					success: function(response){
						if(response && response.error_code !== undefined){
							alert(response.message);
							return;
						}
						examrooms = response.results;
					}
				})
			).then(function(){
				var html = self.newTemplate({
					id : id,
					model: model,
					examroomList: examrooms
				});

				self.courseModal = $(html);
				self.$el.append(self.courseModal);
				self.courseModal.modal('show');
				self.courseModal.on('hidden.bs.modal', function(){
					self.courseModal.remove();
				});
			},function(xhr){
						$.wrapAjaxError(xhr);
          });
		},

		postData: function(event){
			var self = this;
			var target = $(event.target);

			var examroomId = $('form.distribution-form .examroom-select').val();
			if(!examroomId){
				alert('请选择考场名称！');
			}

			var data = {
				examroom: examroomId,
				place: $('form.distribution-form #placeInput').val()
			};

			var id = target.data('id');
			var model = this.collection.get(id);
			model.save(data, {
				url: ajaxurl.allocation + id + '/',
				patch: true,
				wait: true
			});

			this.courseModal.modal('hide');

			event.preventDefault();
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