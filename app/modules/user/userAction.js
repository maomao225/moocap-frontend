'use strict';

define([
	'modules/user/index/Index',
	'modules/user/login/index',
	'modules/user/resetPassword/index'
], function(
	indexAction,
	loginIndexAction,
	resetPasswordAction
){
	return{
		loginIndex: loginIndexAction,
		resetPassword: resetPasswordAction,
		index: indexAction
	};
});