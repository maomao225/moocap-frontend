'use strict';

define([
	'text!common/component/confirm/templete/confirm.tpl',
	'bootstrap/modal'
],function(templete){

	var html = '';
	
	var Confirm = function(message,sure,cancel){

		if(html === ''){
			html = $(templete);
			$('body').append(html);
		}
		
		html.find('.modal-body').text(message);
		html.modal();

		html.find('.sure').off().on('click', function(event) {
			event.preventDefault();
			if (sure) {
				sure();
			}
		});
		html.find('.cancel').off().on('click', function(event) {
			event.preventDefault();
			if (cancel) {
				cancel();
			}
		});
	};

	return Confirm;
});