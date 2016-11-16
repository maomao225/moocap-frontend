'use strict';

define([
	'modules/order/exam/index',
	'modules/order/scoreReport/index'
], function(
	examIndexAction,
	scoreReportIndexAction
){
	return{
		exam: examIndexAction,
		scoreReport: scoreReportIndexAction
	};
});