'use strict';

define(function(){
	var actionFile = 'modules/exam/examAction';

	return {
		routes:{
			'exam/exam': 'examIndexAction',
			'exam/room': 'examRoomAction',
			'exam/allocation': 'examAllocationAction',
			'exam/score': 'examScoreAction',
			'exam/report_score': 'reportScoreAction',
			'exam/score_delivery': 'scoreDeliveryAction',
			'exam/online_course_report': 'onlineCourseReportAction',
			'exam/online_course_report/print/:id': 'onlineCourseReportPrintAction'
		},

		examIndexAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.exam, param);
			});
		},

		examRoomAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.room, param);
			});
		},

		examAllocationAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.distribution, param);
			});
		},

		examScoreAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.score, param);
			});
		},

		reportScoreAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.reportScore, param);
			});
		},

		scoreDeliveryAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.scoreDelivery, param);
			});
		},

		onlineCourseReportAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.onlineCourseReport, param);
			});
		},

		onlineCourseReportPrintAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.onlineCourseReportPrint, param);
			})
		}
	};
});