'use strict';

define([
	'modules/sysadmin/location/index',
	'modules/sysadmin/term/index',
	'modules/sysadmin/user/index',
	'modules/sysadmin/group/index',
], function(
	locationIndexAction,
	termIndexAction,
	userIndexAction,
	groupIndexAction
){
	return{
		locationIndex: locationIndexAction,
		termIndex: termIndexAction,
		userIndex: userIndexAction,
		groupIndex: groupIndexAction,
	};
});