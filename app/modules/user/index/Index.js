'use strict';

define([
	'text!modules/user/index/index.tpl',
	'common/models/userModel'
],function(
	indexTpl,
	userModel
){

	return Backbone.View.extend({

		mainTemplate: _.template(indexTpl),

		initialize: function(){
			this.render();
		},

		render: function(){

			var data = _.extend({}, userModel.attributes);
			data.role = '';

			var userRole = userModel.get('groups');

			for(var i=0; i<userRole.length; i++){
				if(userRole[i]){
					data.role += userRole[i].name;
				}
			}

			this.$el.append(this.mainTemplate(data)).appendTo(('.content-wrapper'));
		}
	});
});