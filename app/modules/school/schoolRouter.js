'use strict';

define(function(){
	var actionFile = 'modules/school/schoolAction';

	return {
		routes:{
			'school/school': 'schoolIndexAction'
		},

		schoolIndexAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.index, param);
			});
		}
	};
});