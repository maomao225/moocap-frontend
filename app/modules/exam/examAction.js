'use strict';

define([
	'modules/exam/exam/index',
	'modules/exam/room/index',
	'modules/exam/distribution/index',
	'modules/exam/score/index',
	'modules/exam/report_score/index',
	'modules/exam/score_delivery/index',
	'modules/exam/online_course_report/index',
	'modules/exam/online_course_report/print'
], function(
	examIndexAction,
	rootIndexAction,
	distributionIndexAction,
	scoreIndexAction,
	reportScoreIndexAction,
	scoreDeliveryIndexAction,
	onlineCourseReportIndexAction,
	onlineCourseReportPrintAction
){
	return{
		exam: examIndexAction,
		room: rootIndexAction,
		distribution: distributionIndexAction,
		score: scoreIndexAction,
		reportScore: reportScoreIndexAction,
		scoreDelivery: scoreDeliveryIndexAction,
		onlineCourseReport: onlineCourseReportIndexAction,
		onlineCourseReportPrint: onlineCourseReportPrintAction
	};
});