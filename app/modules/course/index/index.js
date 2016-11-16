'use strict';

define([
	'text!modules/course/index/tpl/index.tpl',
	'text!modules/course/index/tpl/item.tpl',
	'text!modules/course/index/tpl/new.tpl',
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
	            'school': '',
	            'term': '',
	            'name': '',
	            'teacher': '',
	            'ID_number': '',
	            'phone': '',
	            'email': '',
	            'enrollment': '', //班级规模
	            'authentication_status': 0, //教师认证状态
			};
		}
	});

	var Collection = ListCollectionBase.extend({
		model: Model,
		url: ajaxurl.courses
	});

	var ItemView = ListItemBaseView.extend({
		tpl: itemTpl,
		model: Model,

		delete: function(event){
			var self = this;
			confirm('确认要删除吗？', function(){	
				self.model.destroy({
					url: ajaxurl.course + self.model.id + '/'
				}, {wait: true});
			});
		},
	});

	//认证状态
	var authenticationStatus = [
		'未培训未认证', '已培训未认证', '初级认证', '中级认证', '高级认证'
	];

	//科目列表
	var courseArray = [
		'概率论与数理统计（先修课）',
		'大学物理（先修课）-力学',
		'普通生物学（先修课）-细胞和分子',
		'大学化学（先修课）',
		'线性代数（先修课）',
		'微积分（先修课）'
	];

	return ListBaseView.extend({

		mainTemplate: _.template(indexTpl),
		newTemplate: _.template(newTpl),

		__events: {
			'click .edit': 'edit',
			'click .delete': 'delete',
			'submit .search-form': 'search',
			'click .new': 'new',
			'submit .course-form' : 'postUserData'
		},

		termList: null,

		start: function(){
			var self = this;
			$.ajax({
				url: ajaxurl.terms + '?limit=50',
				type: 'get',
				success: function(response){
					if(response && response.error_code !== undefined){
						alert(response.message);
						return;
					}
					self.termList = response.results;
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
				termList: this.termList,
				ajaxurl: ajaxurl
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));
		},

		search: function(e){
			e.preventDefault();

			var val = this.$('.search-form .term-select').val();
			val ? this.searchData.term = val : delete(this.searchData.term);

			val = this.$('#keywordInput').val();
			val ? this.searchData.search = val : delete(this.searchData.search);

			this.currentPage = 1;
			this.getListData();
		},

		new: function(event){
			this.openCourseModal();
		},

		edit: function(event){
			var target = $(event.target);
			var tr = target.closest('tr');
			var id = tr.data('id');
			
			this.openCourseModal(id);
		},

		courseModal: null,
		openCourseModal: function(id){
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

			var model, schools;
			model = this.collection.get(id);
			$.ajax({
				url: ajaxurl.schools + '?limit=100000',
				type: 'get',
				dataType: 'json',
				success: function(response){
					if(response && response.error_code !== undefined){
						alert(response.message);
						return;
					}
					schools = response.results;
					renderModal();
				}
			});

			function renderModal(){
				var html = self.newTemplate({
					id : id,
					type: modeData[mode],				
					mode: mode,
					model: mode == 'edit' ? model : {},
					termList: self.termList,
					schools: schools,
					authenticationStatus: authenticationStatus,
					courses: courseArray
				});

				self.courseModal = $(html);
				self.$el.append(self.courseModal);
				self.courseModal.modal('show');
				self.courseModal.on('hidden.bs.modal', function(){
					self.courseModal.remove();
				});
			}
		},

		postUserData: function(event){
			event.preventDefault();

			var target = $(event.target);
			var mode = target.data('mode');

			var data = {
				ID_number: this.$('#IDNumberInput').val(),
				email: this.$('#emailInput').val(),
				enrollment: this.$('#enrollmentInput').val(),
				authentication_status: this.$('input[name=isAuthenticationInput]:checked').val(),
				name: this.$('#nameInput').val(),
				phone: this.$('#phoneInput').val(),
				school: this.$('#schoolInput').val(),
				teacher: this.$('#teacherInput').val(),
				term: this.$('.course-form .term-select').val()
			};

			if(mode === 'edit'){
				var id = target.data('id');
				var model = this.collection.get(id);
				model.save(data, {
					patch: true,
					wait: true,
					url: ajaxurl.course + id + '/',
				});
			}else if(mode === 'new'){
				this.collection.create(data, {wait: true});
			}
			this.courseModal.modal('hide');
		}
	});
});