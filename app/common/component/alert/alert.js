'use strict';

define([
	'text!common/component/alert/templete/alert.tpl',
	'bootstrap/modal'
],function(templete){

	var html = '';
	
	var Alert = function(message){

		if(html === ''){
			html = $(templete);
			$('body').append(html);
		}
		
		html.find('.modal-body').text(message);
		html.modal();
	};

	return Alert;
});