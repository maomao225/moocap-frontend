'use strict';

define([
	'backbone',
	'common/router',
	'text!common/plugin/loading/template/loading.tpl',
	'common/component/alert/alert',
	'common/component/confirm/confirm',
	'common/ui/sidebar/sidebar',
	'bootstrap/tooltip',
	'common/util/util'
],function (
	Backbone,
	Router,
	loadingTpl,
	alert,
	confirm,
	Sidebar
){
	require([
		'common/plugin/button/jquery.button',
		'bootstrapValidator',
		'bootstrap/popover'
	]);

	//调节页面高度
	var height = $(window).height() - $('.main-header').get(0).offsetHeight;
	$('aside.main-sidebar').css('min-height', height);
	$('.main-content').css('min-height', height - $('.main-footer').get(0).offsetHeight);

    //loading
    var ajaxLoadin = $(_.template(loadingTpl)()).appendTo('body'); 
    ajaxLoadin.hide(); 
	$(document).ajaxStart(function () { 
		ajaxLoadin.show(); 
	}).ajaxStop(function () { 
		ajaxLoadin.hide(); 
	});

	//csrf 验证
	var csrftoken = $.getCookie('csrftoken');
	function csrfSafeMethod(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", $.getCookie('csrftoken'));
	        }
	    }
	});

	//左侧菜单
	new Sidebar();

	window.alert = alert;
	window.confirm = confirm;
	
    return {
	    initialize: function() {
			window.Router = new Router();
			Backbone.history.start();
		}
    };
});

