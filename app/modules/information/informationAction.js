'use strict';

define([
	'modules/information/announcement/index',
  'modules/information/examinfo/index',
  'modules/information/memberschool/index'
], function(
  announcementIndexAction,
  examIndexAction,
  memberIndexAction
){
	return{
    announcementIndex: announcementIndexAction,
    examIndex: examIndexAction,
    memberIndex: memberIndexAction
	};
});