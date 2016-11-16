define([
	'common/models/userModel',
	'fileupload'
],function(userModel){

	return Backbone.View.extend({

		collection: null,

		currentPage: 1,
		limit: 10,

		searchData: {},

		itemView: null,

		extendData: {}, //扩展数据，用来渲染的

		events: null,
		
		baseEvents:{
			'click .download-template-btn': 'downloadTemplate',
			'click .export-data-btn': 'exportData',
			'change .import-ata-data-btn input.fileupload[type=file]': 'importATAData',
			'change .import-data-btn input.fileupload[type=file]': 'importData'
		},

		code: (function(){
			var hash = window.location.hash;
			if(hash.indexOf('#') === 0){
				hash = hash.substr(1, hash.length-1);
			}
			hash = hash.replace('/', '.');
			return hash;
		})(),

		getSelfMenu: function(){
			var menus = userModel.get('menus');
			if(!menus) return;

			function findMenu(menus, code){
				var result;
				for(var i=0; i<menus.length; i++){
					if(menus[i].codename === code){
						result = menus[i].menu;
					}else{
						result = findMenu(menus[i].menu, code);
					}
					if(result){
						break;
					}
				}
				return result;
			}

			return findMenu(menus, this.code);
		},

		initialize: function(){
			this.events = _.extend(this.baseEvents, this.__events);
			this.searchData = {};
			this.searchData = {};
			this.delegateEvents();
			this.start();
		},

		start: function(){
		},

		getListData: function(){
			var self = this;

			var pageData = {
				limit: self.limit,
				offset: (self.currentPage-1) * self.limit
			};

			var data = _.extend({}, self.searchData, pageData||{});

			this.collection.fetch({data: data, reset: true, success: function(){
				self.renderPagination.call(self);
			}});
		},

		renderPagination: function(){
			var self = this;

			self.$('.list-count').text(self.collection.count);
			self.$('.list-limit').text(self.limit);
			var pagination = self.$('.pagination');
			if(pagination.data('twbsPagination')){
				pagination.twbsPagination('destroy');
			}
			var page = self.currentPage < 1 ? 1 : self.currentPage;
			var total = Math.ceil((self.collection.count || 0) / self.limit);
			total =  total < page ? page : total;
			pagination.twbsPagination({
				initiateStartPageClick: false,
				startPage: page,
		        totalPages: total,
		        visiblePages: 5,
		        onPageClick: function (event, page) {
		            self.currentPage = page;
		            self.getListData();
		        }
		    });
		},

		//添加一个
		addOne: function(model) {
	      var view = new this.itemView({
	      	model: model
	      });

	      view.extendData = this.extendData;
	      this.$(".data-list").append(view.render().el);
	    },

		//渲染数据列表
		renderList: function(){
			var self = this;
			this.$(".data-list").empty();
			self.collection.each(self.addOne, self);
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
						button.attr('disabled', true);
						button.button('loading');
						target.attr('disable', true);
					},
					done: function(e, data){
						alert('信息导入成功！');
						setTimeout(function(){
							window.location.reload();
						}, 1000);
					},

					fail: function(e, data){
						if(e.type === 'fileuploadfail'){
							var response = data.jqXHR;
							//responseText 有可能为空，被判定为fail
							if(response.status === 200 && response.responseText===''){
								alert('信息导入成功！');
								setTimeout(function(){
									window.location.reload();
								}, 1000);
							}else{							
								$.wrapAjaxError(response);
							}
						}
					},

					always: function(e, data){
						button.removeAttr('disabled');
						button.button('resetLoading');
						target.removeAttr('disabled');
						target.val('');
					}
				});
				target.fileupload('add', {
			        files: target[0].files
			    });
				this.initFileUpload = true;
			}
		},
		initATAFileUpload: false,
		importATAData: function(event){
			var target = $(event.target);
			if(!this.initATAFileUpload){
				var button = target.closest('button');
				target.fileupload({
					url: button.data('url'),
					type: 'post',
					dataType: 'json',
					add: function(e, data){
						if (!(/(\.)(zip|rar)$/i).test(data.files[0].name)) {
							alert('文件格式不正确！');
							return;
						}
						data.submit();
					},
					submit: function(e, data){
						button.attr('disabled', true);
						button.button('loading');
						target.attr('disable', true);
					},
					done: function(e, data){
						var response = data.jqXHR;
						var realFailFiles = JSON.parse(response.responseText).errorfile_list;
						var filesMsg = '' ;
						_.each(realFailFiles,function (val,index) {
							filesMsg += val +  '、';
						})
						alert('导入文件成功，失败文件为: ' + filesMsg);
						setTimeout(function(){
							window.location.reload();
						}, 1000);
					},

					fail: function(e, data){
						if(e.type === 'fileuploadfail'){
							var response = data.jqXHR;
							//responseText 有可能为空，被判定为fail
							if(response.status === 200 && response.responseText===''){
								var response = data.jqXHR;
								var realFailFiles = response.errorfile_list;
								var filesMsg = '' ;
								_.each(realFailFiles,function (val,index) {
									filesMsg += val +  '、';
								})
								alert('导入文件成功，失败文件为: ' + filesMsg);
								setTimeout(function(){
									window.location.reload();
								}, 1000);
							}else{
								$.wrapAjaxError(response);
							}
						}
					},

					always: function(e, data){
						button.removeAttr('disabled');
						button.button('resetLoading');
						target.removeAttr('disabled');
						target.val('');
					}
				});
				target.fileupload('add', {
			        files: target[0].files
			    });
				this.initATAFileUpload = true;
			}
		},
		exportData: function(event){
			var target = $(event.target);
			var url = target.data('url');

			$.download({
				url: url, 
				data:this.searchData||{}
			});
		},

		downloadTemplate: function(){
			var target = $(event.target);
			var url = target.data('url');

			$.download({
				url: url, 
				data:{empty: true}
			});
		},

		//override
		remove: function(){
			var self = this;
			if(self.initFileUpload){
				self.$('.import-data-btn input.fileupload[type=file]').fileupload('destroy');
			}

			if(self.collection){
				var model;
				while(self.collection.length){
					model = self.collection.shift();
					model.off();
					model.stopListening();
					model.clear();
					model = null;
				}
				self.collection.off();
				self.collection.stopListening();
			}
			self._removeElement();
		    self.stopListening();
		    return self;
		}
	});
});