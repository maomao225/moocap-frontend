'use strict';

define([
	'backbone',
	'common/models/userModel',
	'modules/user/userRouter',
	'modules/information/informationRouter',
	'modules/school/schoolRouter',
	'modules/sysadmin/sysadminRouter',
	'modules/course/courseRouter',
	'modules/student/studentRouter',
	'modules/exam/examRouter',
	'modules/order/orderRouter'
], function (
	Backbone,
	userModel,
	userRouter,
	infoRouter,
	schoolRouter,
	sysadminRouter,
	courseRouter,
	studentRouter,
	examRouter,
	orderRouter
) {

	// 是否处于运动状态中
	var isAnimating = false;

	var options = {
			routes: {
				// website index
				// '': 'defaultAction'
				'' : 'indexAction'
			},

			defaultAction: function() {
				console.error('Error URL, Check your routes!');
			},

			currentView: null,

			changePage: function(ViewClass, params) {
				var self = this;
				$.when(
					userModel.currentUser()
				).done(function(){
					if(userModel.get('username')){
						if(Backbone.history.getHash() === 'user/login'){
							$.go('index');
						}else{
							self.showView(ViewClass, params);
						}
					} else {
						if(Backbone.history.getHash() !== 'user/login'){
							$.go('user/login');
						}else{
							self.showView(ViewClass, params);
						}
					}
				}).fail(function(){
					if(Backbone.history.getHash() !== 'user/login'){
						$.go('user/login');
					}else{
						self.showView(ViewClass, params);
					}
				});
			},

			showView: function(ViewClass, params){

				// dirction: forward
				var view;
				var inClassName = 'page-in',
					outClassName = 'page-out';

				var self = this;
				if (this.currentView) {
					isAnimating = true;
					$(this.currentView.el).addClass(outClassName);

					view = new ViewClass(params);
					setTimeout(function() {
						self.currentView.remove();
						self.currentView = view;
						$(self.currentView.el).removeClass(inClassName);
						isAnimating = false;
					}, 1000);

					$(view.el).addClass('page-current');

					// set delay for chrome run css animation
					setTimeout(function() {
						$(view.el).addClass(inClassName).show();
					}, 0);
				}
				else {
					// first time
					view = new ViewClass(params);
					$(view.el).addClass('page-current').show();
					this.currentView = view;
				}
			}
		};

	var defaultActionRouter = {
		routes: {
			'*actions': 'defaultAction'
		}
	};

	// Merge routers. Make sure `defaultActionRouter` as the last parameter
	options = $.extend(true, options,
		userRouter,
    infoRouter,
		schoolRouter,
		sysadminRouter,
		courseRouter,
		studentRouter,
		examRouter,
		orderRouter,
		defaultActionRouter
	);

	// 防止用户在页面切换时点击顶部导航条
	$(document).click(function(event) {
		if (isAnimating) {
			event.preventDefault();
		}
	});

	//console.log(options);
	return Backbone.Router.extend(options);
});
