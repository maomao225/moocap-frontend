define([
	'text!modules/sysadmin/location/tpl/index.tpl',
	'text!modules/sysadmin/location/tpl/items.tpl',
	'text!modules/sysadmin/location/tpl/item.tpl',
	'text!modules/sysadmin/location/tpl/add.tpl',
	'common/ajaxURI',
	'xeditable',
	'common/util/util'
], function(
	indexTpl,
	itemsTpl,
	itemTpl,
	addTpl,
	ajaxurl
){
	function replaceFirstUper(str){
		str = str.toLowerCase();
		return str.replace(/\b(\w)|\s(\w)/g, function(m){
			return m.toUpperCase();
		});
	}

	return Backbone.View.extend({

		mainTemplate: _.template(indexTpl),
		itemsTemplate: _.template(itemsTpl),
		itemTemplate: _.template(itemTpl),
		addTemplate: _.template(addTpl),

		limit: 10000,

		searchData: null,

		events: {
			'click li.list-group-item' : 'openNext',
			'click li.list-group-item .edit': 'edit',
			'click li.list-group-item .delete': 'delete',

			'click .add' : 'openAddModal',
			'click .createLocation' : 'add',


			'click .download-template-btn': 'downloadTemplate',
			'click .export-all-data-btn': 'exportAllData',
			'click .export-data-btn': 'exportData',
			'change .import-data-btn input.fileupload[type=file]': 'importData'
		},

		url:{
			'province' : {
				url:ajaxurl.locationProvinces,
				role: ['city', 'district']
			},
			'city': {
				url:ajaxurl.locationCities,
				role: ['district']
			},
			'district': {
				url: ajaxurl.locationDistricts,
				role: []
			}
		},

		className: 'sysadminLocation',

		initialize: function(){

			this.render();
		},

		render: function(){
			var maimHtml = this.mainTemplate({
				ajaxurl: ajaxurl
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));

			this.getData('province');
		},

		getData: function(type, requestParams){
			var self = this;
			var params = {
				limit: self.limit
			};
			if(requestParams){
				params[requestParams.type] = requestParams.value;
			}
			$.ajax({
				url: this.url[type].url,
				type: 'get',
				dataType: 'json',
				data:params,
				success: function(response){
					var role = self.url[type].role;
					for(var i=0; i<role.length; i++){
						self.$('.' + role[i] + '-list .box-body').html('');
					}

					var parentNode  = '';
					if(requestParams){
						parentNode = requestParams.type;
					}

					var html = self.itemsTemplate({
						dataList: response.results, 
						role: role[0]||'',
						type: type,
						url: ajaxurl['location'+ replaceFirstUper(type)],
						parent: parentNode
					});
					self.$('.' + type + '-list .box-body').html(html);

					$('#province-list span, #city-list span, #district-list span').editable({
						toggle: 'manual',
						ajaxOptions: {
							type: 'put',
							dataType: 'json'
						},
						params: function(params) {
						//originally params contain pk, name and value
							params.name = params.value;
							if(requestParams && requestParams.type){
								params[requestParams.type] = requestParams.value;
							}
							delete(params.value);
							delete(params.pk);
							return params;
						},
						success: function(response, newValue){
							// return newValue;
						},

						error: function(response){
							try{
								if(response && response.responseText!==''){
									response = response.responseText;
									response = JSON.parse(response);
								}else{
									return '发生未知错误！';
								}
							}catch(e){
								return '发生未知错误！';
							}
							if(response && response['error_code'] !== undefined){
								return response.message;
							}
						},

						display: function(value, response){
							if(response && response.name){
					        	$(this).html(response.name);
							}
						}
				    });
				},

				error: function(jqXHR){
					$.wrapAjaxError(jqXHR);
				}
			});
		},

		openNext: function(event){
			var target = $(event.target);
			var li = target.closest('li');
			var ul = target.closest('ul');

			if(li.hasClass('active')){
				return;
			}
			var parent = target.closest('.box');

			parent.find('li').removeClass('active');
			li.addClass('active');

			parent.data('value', li.data('id'));
			parent.data('label', li.find('span').text());

			var role = ul.data('role')
			if(!role) return;

			var type = ul.data('type');
			var options = {};
			options.type = type;
			options.value = li.data('id');
			this.getData(role, options);
		},

		addTermModal: null,
		openAddModal: function(e){
			var target = $(e.target);
			var parent = target.closest('.box');

			if(parent.find('ul').length == 0){
				return;
			}

			if(this.addTermModal){
				this.addTermModal.remove();
			}

			var box = parent;
			var parentsData = [];
			var dataParent;
			while(dataParent = box.find('ul').data('parent')){
				
				box = this.$('#' + dataParent + '-list').closest('.box');
				parentsData.unshift({
					type: box.find('ul').data('type'),
					value:box.data('value'),
					name: box.data('name'),
					label:box.data('label')
				});
			}

			var html = this.addTemplate({
				name: parent.data('name'),
				type: parent.find('ul').data('type'),
				parentsData: parentsData
			});
			this.addTermModal = $(html);
			this.$el.append(this.addTermModal);
			this.addTermModal.modal('show');
		},

		add: function(event){
			event.preventDefault();
			var self = this;
			var input = this.$('#locationInput');
			var type = input.data('type');

			var postData = {};
			this.$('.hiddenLocationInput').each(function(){
				postData[$(this).attr('name')] = $(this).val();
			});

			postData['name'] = input.val();

			this.addTermModal.modal('hide');


			$.ajax({
				type: 'post',
				url: this.url[type].url,
				data:postData,
				dataType: 'json',
				success: function(response){
					if(response && response['error_code'] !== undefined){
						alert(response.message);
					}

					var ul = self.$('#' + type + '-list').find('ul');
					//取得一个子元素，然后clone
					var li = $(self.itemTemplate());
					li.appendTo(ul);
					li.attr('data-id', response.id);
					var span = li.find('span');
					span.text(response.name);
					span.attr('data-pk', response.id);
					span.attr('data-url', '/api/cms/location/'+type+'/'+ response.id + '/');
					span.attr('id', type+ '_' + response.id);
				},

				error: function(error){
					$.wrapAjaxError(error);
				}
			});
		},



		edit: function(event){
			event.preventDefault();
			event.stopPropagation();

			var target = $(event.target);
			var li = target.closest('li');
			var id = li.data('id');

			var current = li.find('span');
			current.editable('toggle');
		},

		delete: function(event){
			event.preventDefault();
			event.stopPropagation();

			var target = $(event.target);
			var li = target.closest('li');

			confirm("确认要删除？", function(){
				$.ajax({
					url: li.find('span').data('url'),
					type: 'delete',
					dataType: 'json',
					success: function(response){
						li.remove();
					},

					error: function(error){
						$.wrapAjaxError(error);
					}
				});
			});
		},

		initFileUpload: false,
		importData: function(event){
			var target = $(event.target);
			if(!this.initFileUpload){
				var button = target.closest('button');
				target.fileupload({
					url: button.data('url'),
					type: 'post',
					dataType: 'json',
					add: function(e, data){
						if (!(/(\.)(xls|xlsx)$/i).test(data.files[0].name)) {
							alert('文件格式不正确！');
							return;
						}
						data.submit();
					},
					submit: function(e, data){
						button.button('loading');
						target.attr('disabled', true);
					},
					done: function(e, data){
						alert('信息导入成功！');
						setTimeout(function() {
                            window.location.reload();
                        }, 1000);
					},

					fail: function(e, data){
						if(e.type === 'fileuploadfail'){
							var response = data.jqXHR;
							//responseText 有可能为空，被判定为fail
							if(response.status === 200 && response.responseText===''){
								alert('信息导入成功！');
								setTimeout(function() {
		                            window.location.reload();
		                        }, 1000);
							}else{							
								$.wrapAjaxError(response);
							}
						}
					},

					always: function(e, data){
						target.removeAttr('disabled');
						button.button('resetLoading');
						target.val('');
					}
				});
				target.fileupload('add', {
			        files: target[0].files
			    });
				this.initFileUpload = true;
			}
		},

		exportAllData: function(event){
			var target = $(event.target);
			var url = target.data('url');

			$.download({
				url: url, 
				data:{}
			});
		},

		exportData: function(event){
			var target = $(event.target);
			var url = target.data('url');

			var box = target.closest('.box');
			var ul = box.find('.list-group');

			var parent = ul.data('parent');
			if(!parent) return;

			var parentNode = this.$('ul.list-group[data-type='+ parent +']');

			var li = parentNode.find('li.active');
			if(!li.length) return;

			var value = li.data('id');

			var data = {};
			data[parent] = value;

			$.download({
				url: url, 
				data:data
			});
		},

		downloadTemplate: function(event){
			var target = $(event.target);
			var url = target.data('url');

			$.download({
				url: url, 
				data:{empty: true}
			});
		},
	});
});