'use strict';

define(function(){
	var actionFile = 'modules/sysadmin/sysadminAction';

	return {
		routes:{
			'sysadmin/location': 'sysadminLocationAction',
			'sysadmin/term': 'sysadminTermAction',
			'sysadmin/user': 'sysadminUserAction',
			'sysadmin/group': 'sysadminGroupAction'
		},

		sysadminLocationAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.locationIndex, param);
			});
		},

		sysadminTermAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.termIndex, param);
			});
		},

		sysadminUserAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.userIndex, param);
			});
		},

		sysadminGroupAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.groupIndex, param);
			});
		},
	};
});