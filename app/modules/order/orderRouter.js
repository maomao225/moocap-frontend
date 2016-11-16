'use strict';

define(function(){
	var actionFile = 'modules/order/orderAction';

	return {
		routes:{
			'order/exam': 'examOrdersAction',
			'order/score_report': 'scoreReportAction'
		},

		examOrdersAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.exam, param);
			});
		},

		scoreReportAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.scoreReport, param);
			});
		}
	};
});