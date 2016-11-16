'use strict';

define([
	'jquery'
], function(
	$
) {
	$.extend($, {

		isAndroid: function(){
			var u = navigator.userAgent.toLowerCase();
			return u.indexOf('android') > -1 || u.indexOf('linux') > -1; //android终端或者uc浏览器
		},

		isIOS: function(){
			var u = navigator.userAgent;
			return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		},

		/**
		 * Deserialize a query string to an object.
		 *
		 * @param {String} str query string
		 * @param {String} [sep] separator
		 * @param {String} [eq] assignment
		 *
		 * @return {JSON}
		 *
		 * @example:
		 *
		 * querystring.parse('foo=bar&baz=qux')
		 * // returns
		 * { foo: 'bar', baz: 'qux' }
		 *
		 * querystring.parse('foo=bar&baz=qux&baz=quux&corge')
		 * // returns
		 * { foo: 'bar', baz: ['qux', 'quux'], corge: '' }
		 */
		querystringParse: function(str, sep, eq) {
			sep = sep || '&';
			eq = eq || '=';

			var _GET = {};

			if (str) {
				str = str.replace(/\+/g," ");
				str.split(sep).forEach(function(item) {
					var tmp = item.split(eq),
						key = tmp[0],
						value = decodeURIComponent(tmp[1] || '');

					if (_GET[key]) {
						if ($.isArray(_GET[key])) {
							_GET[key].push(value);
						} else {
							_GET[key] = [_GET[key], value];
						}
					}
					else {
						_GET[key] = value;
					}
				});
			}

			return _GET;
		},

		/**
		 * goto action
		 *
		 * @param {String} action 跳转的地址
		 * @param {JSON} param url参数
		 * @param {JSON} options 跳转控制参数{trigger: true, replace: false}
		 *   If you wish to also call the route function, 
		 *   set the trigger option to true. 
		 *   To update the URL without creating an entry in the browser's history, 
		 *   set the replace option to true
		 */
		go: function(action, param, options) {
			options = $.extend({trigger: true, replace: false}, options);
		    if (!$.startsWith(action, '#')) {
                action = '#' + action;
            }

            if(!$.isEmptyObject(param)){
                if (!$.endsWith(action, '/')) {
                    action += '/';
                }
            }
            var url = action + $.param(param || '');
		    if (window.Router) {
				window.Router.navigate(url, options);
		    } else {
				// 容错处理
				location.href = url;
			}
		},

		/**
		 * Determines whether a string begins with the characters of another string,
		 * returning true or false as appropriate.
		 * @param {String} string
		 * @param {String} suffix The characters to be searched for at the start of this string.
		 *
		 * @return {Boolean}
		 */
		startsWith: function (string, suffix){
			return string.indexOf(suffix) === 0;
		},

		/**
		 * Determines whether a string ends with the characters of another string,
		 * returning true or false as appropriate.
		 * @param {String} string
		 * @param {String} suffix The characters to be searched for at the end of this string.
		 *
		 * @return {Boolean}
		 */
		endsWith: function(string, suffix) {
			return string.indexOf(suffix, string.length - suffix.length) !== -1;
		},

		isArray: function (obj) {  
			return Object.prototype.toString.call(obj) === '[object Array]';   
		},

		getCookie: function (name) {
		    var cookieValue = null;
		    if (document.cookie && document.cookie != '') {
		        var cookies = document.cookie.split(';');
		        for (var i = 0; i < cookies.length; i++) {
		            var cookie = jQuery.trim(cookies[i]);
		            // Does this cookie string begin with the name we want?
		            if (cookie.substring(0, name.length + 1) == (name + '=')) {
		                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                break;
		            }
		        }
		    }
		    return cookieValue;
		},

		wrapAjaxError: function(error){
			var response = error.responseText;
			try{
				response = JSON.parse(response);
				if(response && response.error_code !== undefined){
					alert(response.message);
				}else{
					alert(response);
				}
			}catch(e){
				alert(response);
			}
		},

		download: function(options){
			options = _.extend({
				url: '',
				data: {},
				type: 'get'
			}, options);

			var iframe = $('#downloadIframe');
			if(!iframe.length){
				iframe = $('<iframe id="downloadIframe">');
				iframe.css({
					border: 'none',
					height: 0,
					position: 'absolute',
					overflow: 'hidden'
				})
				$('body').append(iframe);
			}

			if(options.type === 'get'){
				var params = '';
				for(var i in options.data){
					params += i + '=' + options.data[i] + '&';
				}

				if(params){
					params = params.substring(0, params.length-1);
					options.url += '?'+ params;
				}

				iframe.attr('src', options.url);
			}
		}
	});
});