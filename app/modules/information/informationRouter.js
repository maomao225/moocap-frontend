'use strict';

define(function(){
	var actionFile = 'modules/information/informationAction';

	return {
		routes:{
			'information/announcement': 'infoAnnouncementAction',
			'information/examinfo': 'infoExamAction',
			'information/memberschool': 'infoMemberAction'
		},

		infoAnnouncementAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.announcementIndex, param);
			});
		},

		infoExamAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.examIndex, param);
			});
		},

		infoMemberAction: function(param){
			var self = this;
			require([actionFile], function (action) {
				self.changePage(action.memberIndex, param);
			});
		}
	};
});