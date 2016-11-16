'use strict';

define([
	'text!modules/user/resetPassword/index.tpl',
	'common/ajaxURI'
], function(
	loginTpl,
	ajaxurl
){
	return Backbone.View.extend({

		mainTpl: _.template(loginTpl),

		events: {
			'submit form.reset-password-form': 'submitForm'
		},

		initialize: function(){
			this.render();
		},

		render: function(){
			var html = this.mainTpl();
			this.$el.append(html);
			$('.content-wrapper').append(this.$el);
		},

		submitForm: function(event){
			event.preventDefault();

			var password = $('#password').val();
			var newPassword = $('#newPassword').val();
			var repeatNewPassword = $('#repeatNewPassword').val();

			if(newPassword !== repeatNewPassword){
				alert('新密码与确认密码不同，请修改！');
				return;
			}

			if(newPassword === password){
				alert('新密码与原密码相同，请修改！');
				return;
			}

			$.ajax({
				url: ajaxurl.passwordReset,
				type: 'post',
				data: {
					'new_password' : newPassword,
					'password' : password
				},
				success: function(response){
					alert('密码修改成功！');
					$.go('index');
				},
				error: function(error){
					$.wrapAjaxError(error);
				}
			});
		}
	});
});