'use strict';

define([
	'text!modules/student/detail/detail.tpl',
	'modules/student/studentModel',
	'common/ajaxURI'
],function(
	detailTpl,
	studentModel,
	ajaxurl
){
	return Backbone.View.extend({
		model: new studentModel,

		detailTemplate: _.template(detailTpl),

		events:{
			'click .back': 'back',
			'click .edit': 'edit'
		},
		id: null,

		initialize: function(id){
			var self = this;
			self.id = id;
			self.model.fetch({
				url: ajaxurl.student + id + '/',
				success: function(){
					self.render();
				}
			});
		},

		render: function(){
			var maimHtml = this.detailTemplate({
				model: this.model
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));
		},

		back: function(){
			$.go('student/student');
		},

		edit: function(){
			$.go('student/edit/' + this.id);
		},
	});
})