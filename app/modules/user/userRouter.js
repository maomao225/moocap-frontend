'use strict';

define([
	'common/models/userModel'
],function(
	userModel
){
	var actionFile = 'modules/user/userAction';

	return {
		routes:{
			'index': 'indexAction',
			'user/login': 'loginAction',
			'user/reset_password': 'resetPasswordAction',
			'user/logout': 'userLogoutAction'
		},

		loginAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.loginIndex, param);
			});
		},

		resetPasswordAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.resetPassword, param);
			});
		},

		indexAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.index, param);
			});
		},

		userLogoutAction: function(){
			userModel.logout();
		}
	};
});