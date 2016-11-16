'use strict';

define([
	'common/models/userModel',
	'backbone',
	'text!common/ui/sidebar/tpl/sidebar.tpl',
	'text!common/ui/sidebar/tpl/topUser.tpl',
	'bootstrap/collapse'
],function(
	userModel, 
	Backbone, 
	sidebarTpl,
	userBarTpl
){

	return Backbone.View.extend({

		menuTemplate: _.template(sidebarTpl),
		topTemplate: _.template(userBarTpl),

		events: {
			'click ul.nav>li>a': 'toggleMenu',
			'click ul.nav ul>li': 'go'
		},

		initialize: function(){
			var self = this;
			this._render = function(){
				self.render.call(self);
			}
			userModel.on('change', this._render);
			$('.main-menu').append(this.$el);
		},

		render: function(){
			var menuData = userModel.get('menus');
			if(menuData){
				$('.top-user-bar').append(this.topTemplate({
					id: userModel.get('id'),
					name: userModel.get('name'),
					username: userModel.get('username')
				}));
				this.$el.html(this.menuTemplate({data:menuData}));
			}else{
				this.$el.empty();
				$('.top-user-bar').empty();
			}
		},

		toggleMenu: function(event){
			var target = $(event.target);
			if(target.parent()[0].nodeName === 'A'){
				target = target.parent();
			}

			var parent = target.parent();
			if(parent.hasClass('active')){
				return;
			}

			var next = target.next();
			next.toggle('fast');

			var menus = this.$('.nav>li');
			menus.each(function(){
				var item = $(this);
				if(item.hasClass('active')){
					item.removeClass('active');
					item.find('ul.sub-menu').toggle('fast');
				}
			});

			var parent = target.parent();
			parent.addClass('active');
		},

		go: function(event){
			var target = event.target;
			if(event.target.nodeName !== 'li'){
				target = $(target).closest('li');
			}

			var code = target.data('code');
			var paths = code.split('.');
			var path = '';
			for(var i=0; i<paths.length; i++){
				path += paths[i] + '/';
			}
			path = path.substring(0,path.length-1);
			$.go(path);
		}

	});
});