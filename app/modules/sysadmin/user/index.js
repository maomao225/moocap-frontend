define([
	'text!modules/sysadmin/user/tpl/index.tpl',
	'text!modules/sysadmin/user/tpl/item.tpl',
	'text!modules/sysadmin/user/tpl/new.tpl',

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
	            'username': '',
	            'name': '',
	            'email': '',
	            'phone': '',
	            'groups': [],
	            'menus': [],
	            'is_active': false
			};
		}
	});

	var Collection = ListCollectionBase.extend({
		model: Model,
		url: ajaxurl.users
	});

	var ItemView = ListItemBaseView.extend({
		tpl: itemTpl,
		model: Model,

		delete: function(event){
			var self = this;
			confirm('确认要删除吗？', function(){	
				self.model.destroy({
					url: ajaxurl.user + self.model.id + '/'
				}, {wait: true});
			});
		},
	});

	return ListBaseView.extend({

		mainTemplate: _.template(indexTpl),
		newTemplate: _.template(newTpl),

		collection: null,

		__events: {
			'click .new' : 'openUserModal',
			'click .edit' : 'openUserModal',
			'submit .search-form' : 'search',
			'submit .group-form' : 'edit',
			'click .reset-password': 'resetPassword'
		},

		className: 'sysadminUser',

		groups: null,

		start: function(){
			var self = this;
			this.searchData = {};
			this.searchData = {};
			$.ajax({
				url: ajaxurl.groups,
				data: {limit: 1000},
				type: 'get',
				dataType: 'json',
				success: function(response){
					if(response && response['error_code'] !== undefined){
						alert(response.message);
					}

					self.groups = response.results;
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
				ajaxurl: ajaxurl
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));
		},

		search: function(event){
			event.preventDefault();

			var val = this.$('.search-form #isActiveSelect').val();
			val ? this.searchData.is_active = val : delete(this.searchData.is_active);

			val = this.$('.search-form #keyword').val();
			val ? this.searchData.search = val : delete(this.searchData.search);

			this.currentPage = 1;
			this.getListData();
		},

		userModal: null,
		openUserModal: function(event){
			target = $(event.target);
			var self = this;
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
				model = this.collection.get(id);
			}

			function compare(current, all){
				_.each(current, function(item, index){
					_.each(all, function(item1, index1){
						if(item.codename === item1.codename){ 
							if(!item.menu || item.menu.length === 0){
								item1.checked = true;
							}else{
								compare(item.menu, item1.menu);
							}
						}	
					})
				})
			}

			//重置
			_.each(this.groups, function(item){
				item.checked = false;
				if(mode === 'edit'){
					_.each(model.get('groups'), function(item1){
						if(item1.id === item.id){
							item.checked = true;
						}
					});
				}
			});

			var html = self.newTemplate({
				id : mode == 'edit' ? id : 0,
				type: modeData[mode],				
				mode: mode,
				model: mode == 'edit' ? model : {},
				groups: this.groups
			});

			self.userModal = $(html);
			self.$el.append(self.userModal);
			self.userModal.modal('show');
			self.userModal.on('hidden.bs.modal', function(){
				self.userModal.remove();
			});
		},

		//编辑或者新建
		edit: function(event){
			var target = $(event.target);
			var mode = target.data('mode');
			var self = this;

			var data = {
				name: this.$('#nameInput').val(),
				email: this.$('#emailInput').val(),
				phone: this.$('#phoneInput').val(),
				username : this.$('#usernameInput').val(),
				is_active: this.$('input[name=isActive]:checked').val(),
			};

			data.group_ids = [];
			$('.group-radio').each(function(){
				 if(this.checked){
				 	data.group_ids.push($(this).val());
				 }
			});
			data.group_ids = data.group_ids.join(',');
			if (data.group_ids.length <= 0) {
				this.userModal.find('.hint').html('请至少选择一个角色');
				setTimeout(function() {
					self.userModal.find('.hint').html('');
				}, 3000);
				return false;
			}

			if(mode === 'edit'){
				var id = target.data('id');
				var model = this.collection.get(id);
				model.save(data, {
					url: ajaxurl.user + id + '/',
					wait: true
				});
			}else if(mode === 'new'){
				data.password = this.$('#password').val();
				this.collection.create(data, {wait: true});
			}
			this.userModal.modal('hide');

			event.preventDefault();
			return false;
		},

		resetPassword: function(event){
			var target = $(event.target);
			var form = target.closest('form');
			var id = form.data('id');
			var self = this;
			$.ajax({
				url: ajaxurl.passwordSet,
				type: 'post',
				// dataType: 'json',
				data:{
					user_id: id,
					new_password: '000000'
				},
				success: function(response){
					if(response && response.error_code !== undefined){
						alert(response.message);
						return;
					}
					self.userModal.modal('hide');
					alert('密码重置完毕！');
				},

				error: function(jqXHR){
					alert(jqXHR.responseText);
				}
			});
		}

	});
});