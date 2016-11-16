'use strict';

define(function(){
	var actionFile = 'modules/course/courseAction';

	return {
		routes:{
			'course/course': 'courseIndexAction'
		},

		courseIndexAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.index, param);
			});
		}
	};
});