'use strict';

define([
	'text!modules/user/login/index.tpl',
	'common/models/userModel',

], function(
	loginTpl,
	userModel
){
	return Backbone.View.extend({

		mainTpl: _.template(loginTpl),

		events: {
			'submit form.loginForm': 'submitLogin'
		},

		initialize: function(){
			this.render();
		},

		render: function(){
			var html = this.mainTpl();
			this.$el.append(html);
			$('.content-wrapper').append(this.$el);
		},

		submitLogin: function(event){
			userModel.login({
				'username': this.$el.find('#inputEmail').val(),
				'password': this.$el.find('#inputPassword').val()
			});
			event.preventDefault();
			return false;
		}
	});
});