define([
	'text!modules/sysadmin/group/tpl/index.tpl',
	'text!modules/sysadmin/group/tpl/item.tpl',
	'text!modules/sysadmin/group/tpl/new.tpl',

	'common/ui/listItemBaseView',
	'common/ui/listBaseView',
	'common/models/itemBaseModel',
	'common/models/listCollectionBase',

	'common/ajaxURI',
	'common/plugin/pagination/jquery.twbsPagination'
], function(
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
				name: '',
				menus: '',
				school_permissions: ''
			};
		}
	});

	var Collection = ListCollectionBase.extend({
		model: Model,
		url: ajaxurl.groups
	});

	var ItemView = ListItemBaseView.extend({
		tpl: itemTpl,
		model: Model,

		delete: function(event){
			var self = this;
			confirm('确认要删除吗？', function(){	
				self.model.destroy({
					url: ajaxurl.group + self.model.id + '/'
				}, {wait: true});
			});
		},
	});

	return ListBaseView.extend({

		mainTemplate: _.template(indexTpl),
		newTemplate: _.template(newTpl),

		__events: {
			'click .new' : 'openGroupModal',
			'click .edit' : 'openGroupModal',
			'submit .search-form' : 'search',
			'submit .group-form' : 'edit',
			'click .user-group-table input[type=checkbox]': 'groupCheckboxClick'
		},

		className: 'sysadminGroup',

		start: function(){
			var self = this;
			
			self.itemView = ItemView;

			self.collection = new Collection();
			self.listenTo(this.collection, 'add', this.addOne);
			self.listenTo(this.collection, 'reset', this.renderList);

			this.searchData = {};
			this.searchData = {};
			self.render();
			self.getListData();
		},

		render: function(){
			var maimHtml = this.mainTemplate({
				ajaxurl: ajaxurl
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));
		},

		search: function(event){
			event.preventDefault();

			var val = $('#keywordInput').val();
			val ? this.searchData.search  = val : delete(this.searchData.search);

			this.currentPage = 0;
			this.getListData();
		},

		groupModal: null,
		openGroupModal: function(event){
			target = $(event.target);
			var mode = 'edit';
			if(target.hasClass('new')){
				mode = 'new';
			}

			var modeData = {
				edit: '编辑',
				new: '新建'
			}

			var tr, id, name, school;
			if(mode === 'edit'){
				tr = target.closest('tr');
				id = tr.data('id');
				name = this.collection.get(id).get('name');
				school = this.collection.get(id).get('school_permissions');
			}

			var self = this;
			$.ajax({
				url: ajaxurl.menus,
				type: 'get',
				dataType: 'json',
				success: function(response){
					if(response&& response['error_code'] !== undefined){
						alert(response.message);
						return;
					}

					function compare(current, all){
						_.each(current, function(item, index){
							_.each(all, function(item1, index1){
								if(item.codename === item1.codename){ 
									item1.checked = true;
									compare(item.menu, item1.menu);
								}	
							})
						})
					}

					//数组权限进行判断
					var currentMenus;
					if(mode === 'edit'){
						var currentMenus = self.collection.get(id).get('menus');
						compare(currentMenus, response.menus);
					}

					var html = self.newTemplate({
						id : mode == 'edit' ? id : 0,
						name: mode == 'edit' ? name : '',
						type: modeData[mode],
						menus: response.menus,
						schools: response['school_permissions'],
						mode: mode,
						school: mode == 'edit' ? school : ''  //选中的
					});

					self.groupModal = $(html);
					self.$el.append(self.groupModal);
					self.groupModal.modal('show');
					self.groupModal.on('hidden.bs.modal', function(){
						self.groupModal.remove();
					});
				},
				error: function(jqXHR){
					alert(jqXHR.responseText);
				}
			});
		},

		//编辑或者新建
		edit: function(event){
			event.preventDefault();

			var target = $(event.target);
			var mode = target.data('mode');

			var data = {};
			data.name = this.$('#groupNameInput').val();
			data.codenames = [];
			data.school_permission_codename = this.$('#school_permission_codename').val();

			if(!data.school_permission_codename){
				alert('请选择学校权限！');
				return;
			}

			$('.codename').each(function(){
				 if(this.checked){
				 	data.codenames.push($(this).val());
				 }
			});
			data.codenames = data.codenames.join(',');

			if(mode === 'edit'){
				var id = target.data('id');
				var model = this.collection.get(id);
				data.id = id;
				model.save(data, {
					patch: true,
					url: ajaxurl.group + id + '/',
				});
			}else if(mode === 'new'){
				this.collection.create(data, {wait: true});
			}
			this.groupModal.modal('hide');
		},

		groupCheckboxClick: function(event){
			var target = $(event.target);
			if(target[0].checked){ //checked 向上找，所有的父级都选中
				var codeName = target.val();
				//将codeName拆分
				var array = codeName.split('.');
				if(array.length < 3) {
					return;
				}
				//获取上一级的checkbox
				var parentCodeName = '';
				for(var i=0; i<array.length-1; i++){
					parentCodeName += array[i];
					var parent = $('input.codename[value="'+ parentCodeName +'"]');
					if(parent.length){
						parent[0].checked = 'checked';
					}
					parentCodeName += '.';
				}
			}else{ //向下找，所有的子级都取消
				var currentLi = target.parent();
				currentLi.find('li input[type=checkbox]').each(function(){
					this.checked = false;
				});
			}
			
		}
	});
});