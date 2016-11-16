'use strict';

define(['jquery', 'backbone', 'common/ajaxURI', 'common/util/util'], function($, Backbone, url) {

    var Model = Backbone.Model.extend({

    	LoginEvent: 'loginEvent',
    	LogoutEvent: 'logoutEvent',

        initialize: function() {

        },

        //数据
        defaults: {
            'id': 0,
        	'username' : '',
            'email' : '',
        	'phone': '',
        	'groups': null,
            'menus':null
        },

        validate: function(attributes) {
            
            return true;
        },

        login: function(formData){
        	var self = this;

            $.ajax({
                url: url.userLoginURL,
                type: 'post',
                data: formData,
                success: function(response){
                    self.set(response);
                    $.go('index');
                }, error: function(error){
                    $.wrapAjaxError(error);
                }
            });
        },

        logout: function(){
            var self = this;
        	$.ajax({
        		url: url.userLogout,
                type: 'post',
        		success: function(response){
                    self.set(self.defaults);
        			console.log(arguments);
                    $.go('user/login');
        			self.trigger(self.logoutEvent);
        		}, 
                error: function(error){
                    $.wrapAjaxError(error);
                }
        	});
        },

        currentUser: function(){
            var self = this;
        	//判断是否过期？
            return $.ajax({
                url: url.currentUser,
                type: 'get',
                dataType: 'json',
                success: function(response){
                    self.set(response);
                }, error: function(error){
                    if(Backbone.history.getHash() !== 'user/login'){
                        $.wrapAjaxError(error);
                    }
                }
            });
        }

    });

	
	//用户数据单例
	window._xt_.userModel = window._xt_.userModel || null;

    if(!window._xt_.userModel){
    	window._xt_.userModel = new Model();
    }

    return window._xt_.userModel;
});