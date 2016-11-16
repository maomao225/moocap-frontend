'use strict';

define([
	'modules/student/list/index',
	'modules/student/detail/index',
	'modules/student/edit/index'
], function(
	listIndexAction,
	detailIndexAction,
	editIndexAction
){
	return{
		list: listIndexAction,
		detail: detailIndexAction,
		edit: editIndexAction
	};
});