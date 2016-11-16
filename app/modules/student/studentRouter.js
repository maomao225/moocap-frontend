'use strict';

define(function(){
	var actionFile = 'modules/student/studentAction';

	return {
		routes:{
			'student/student': 'studentIndexAction',
			'student/edit/:id': 'studentEditAction',
			'student/detail/:id': 'studentDetailAction'
		},

		studentIndexAction: function(){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.list);
			});
		},

		studentEditAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.edit, param);
			});
		},

		studentDetailAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.detail, param);
			});
		}
	};
});