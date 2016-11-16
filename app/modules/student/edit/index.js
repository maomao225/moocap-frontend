'use strict';

define([
	'text!modules/student/edit/edit.tpl',
	'modules/student/studentModel',
	'common/ajaxURI',
	'fileupload',
	'datetimepicker'
],function(
	editTpl,
	studentModel,
	ajaxurl
){
	return Backbone.View.extend({
		model: new studentModel,

		editTemplate: _.template(editTpl),

		events:{
			'change .province-select' : 'provinceChange',
			'change .exam-province-select' : 'provinceChange',

			// 'submit .user-form': 'save',
			//处理证件类型特殊逻辑
			'input .other-type-input': 'setRadioValue'
		},
		provinceList: null,
		schoolList: null,

		cityList: null,
		examCityList: null,

		x: 0,

		id: null,
		initialize: function(id){
			var self = this;
			self.id = id;
			$.when(
				//获取省列表
				$.ajax({
					url: ajaxurl.locationProvinces + '?limit=10000',
					type: 'get',
					success: function(response){
						if(response && response.error_code !== undefined){
							alert(response.message);
							return;
						}
						self.provinceList = response.results;
					},
					error: function(jqXHR){
						alert(jqXHR.responseText);
					}
				}),
				//获取学校列表
				$.ajax({
					url: ajaxurl.schools + '?limit=10000',
					type: 'get',
					success: function(response){
						if(response && response.error_code !== undefined){
							alert(response.message);
							return;
						}
						self.schoolList = response.results;
						
					},
					error: function(jqXHR){
						alert(jqXHR.responseText);
					}
				}),

				self.model.fetch({
					url: ajaxurl.student + id + '/'
				})
			).then(
				function(){
					//获取所在省的城市列表
					return $.ajax({
						url: ajaxurl.locationCities + '?limit=10000',
						type: 'get',
						dataType: 'json',
						data: {
							province: self.model.get('province').id
						},
						success: function(response){
							if(response && response.error_code !== undefined){
								alert(response.message);
								return;
							}
							self.cityList = response.results;
						}
					});
				}
			).then(
				function(){
					//获取考试所在省的城市列表
					return $.ajax({
						url: ajaxurl.locationCities + '?limit=10000',
						type: 'get',
						dataType: 'json',
						data: {
							province: self.model.get('exam_province').id
						},
						success: function(response){
							if(response && response.error_code !== undefined){
								alert(response.message);
								return;
							}
							self.examCityList = response.results;
						}
					});
				}
			).done(function(){
				self.render();
			});
		
		},

		render: function(){
			var self = this;
			var termList = [];
			for(var i=1977; i<(new Date()).getFullYear(); i++){
				termList.push(i);
			}
			var maimHtml = this.editTemplate({
				model: self.model,
				provinceList: self.provinceList,
				cityList: self.cityList,
				examCityList:self.examCityList,
				schoolList: self.schoolList
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));

			$('.date-time-picker').datetimepicker({
				startView: 4,
				minView: 4,
				maxView: 4,
				format: 'yyyy',
				startDate: '1977-01-01 00:00:00',
				endDate: new Date(),
				autoclose: true
			});

			var uploadAvatarBtn = $('.upload-avatar');
			uploadAvatarBtn.fileupload({
				url: ajaxurl.uploadFile,
				formData: {
                    type: "student"
                },
				type: 'post',
				dataType: 'json',
				add: function(e, data){
					if (!(/(\.)(jpeg|jpg|gif|png)$/i).test(data.files[0].name)) {
						alert('文件格式不正确！允许jpeg、jpg、gif、png格式');
						return;
					}
					data.submit();
				},
				submit: function(e, data){
					uploadAvatarBtn.attr('disabled', true);
				},
				done: function(e, data){
					var response = data.jqXHR.responseJSON;
					// var imgUrl = response.image_url;
					//原来取的字段是image_url,现在改取url字段
					var imgUrl = response.url;
					$('img.avatar-img').attr('src', imgUrl);
					$('input#avatarInput').val(imgUrl);
				},

				fail: function(e, data){
					if(e.type === 'fileuploadfail'){
						var response = data.jqXHR;
						//responseText 有可能为空，被判定为fail
						if(response.status === 200 && response.responseText===''){
							uploadAvatarBtn.removeAttr('disabled');
						}else{							
							$.wrapAjaxError(response);
						}
					}
				},

				always: function(e, data){
					uploadAvatarBtn.removeAttr('disabled');
				}
			});

			$('form.user-form').bootstrapValidator({
				framework: 'bootstrap',
		        icon: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
		        	nameInput:{
		        		validators: {
		                    notEmpty: {
		                        message: '姓名不能为空'
		                    },
		                    stringLength: {
		                        min: 2,
		                        max: 30,
		                        message: '长度应在2-20个字符之间'
		                    }
		                }
		        	},
		        	avatarInput:{
		        		validators: {
		                    notEmpty: {
		                        message: '必须要上传一个头像'
		                    }
		                }
		        	},
		        	genderRadio:{
		        		validators:{
		        			notEmpty: {
		                        message: '请选择一个性别'
		                    }
		        		}
		        	},
		        	provinceSelect:{
		        		validators:{
		        			notEmpty: {
		                        message: '请选择所属省份'
		                    }
		        		}
		        	},
		        	citySelect:{
		        		validators:{
		        			notEmpty: {
		                        message: '请选择所属城市'
		                    }
		        		}
		        	},
		        	examProvinceSelect:{
		        		validators:{
		        			notEmpty: {
		                        message: '请选择参加考试的省份'
		                    }
		        		}
		        	},
		        	examCitySelect:{
		        		validators:{
		        			notEmpty: {
		                        message: '请选择参加考试的城市'
		                    }
		        		}
		        	},
		        	examCitySelect:{
		        		validators:{
		        			notEmpty: {
		                        message: '请选择参加考试的城市'
		                    }
		        		}
		        	},
		        	schoolSelect:{
		        		validators:{
		        			notEmpty: {
		                        message: '请选择学校'
		                    }
		        		}
		        	},
		        	gaokaoYearInput:{
		        		validators:{
		        			notEmpty: {
		                        message: '请选择高考年份'
		                    }
		        		}
		        	},

		        	identityTypeRadio: {
	                    validators: {
	                        notEmpty: {
	                            message: '请选择证件类型'
	                        }
	                    }
	                },
	                otherTypeInput: {
	                    validators: {
	                        callback: {
	                            message: '请输入证件号码',
	                            callback: function(value, validator, $field) {
	                                var identityType = $('form.user-form').find('[name="identityTypeRadio"]:checked').val();
	                                return (identityType=='身份证' || identityType=='护照') ? true : (value !== '');
	                            }
	                        }
	                    }
	                },
	                phoneInput:{
		        		validators:{
		        			notEmpty: {
		                        message: '请输入手机号码'
		                    },
		                    regexp: {
		                        regexp: /^1[\d]{10}$/,
		                        message: '请输入手机号码'
		                    }
		        		}
		        	},
		        	identityInput:{
		        		validators:{
		        			notEmpty: {
		                        message: '请输入证件号码'
		                    }
		        		}
		        	},
		        	parentPhoneInput:{
		        		validators:{
		        			notEmpty: {
		                        message: '请输入家长电话'
		                    },
		                    regexp: {
		                        regexp: /^(\d{3,4}-)?\d{6,8}$|^1[0-9]{10}$/,
		                        message: '请输入正确的电话号码，座机或者手机'
		                    }
		        		}
		        	},
		        	emailInput:{
		        		validators:{
		        			notEmpty: {
		                        message: '请输入邮箱地址'
		                    },
		                    emailAddress: {
		                        message: '请输入正确的邮箱地址'
		                    }
		        		}
		        	},
		        },
		        onSuccess: function(e) {
	                e.preventDefault();
	            	self.save(e);
	            }
			})
			.on('change', '[name="identityTypeRadio"]', function(e) {
	            $('form.user-form').bootstrapValidator('revalidateField', 'otherTypeInput');
	        });
		},

		provinceChange: function(event){
			var target = $(event.target);
			var role = target.data('role');
			var roleTarget = $(role);

			if(roleTarget.length === 0){
				return;
			}

			$.ajax({
				url: ajaxurl.locationCities,
				type: 'get',
				dataType: 'json',
				data: {
					province: target.val()
				},
				success: function(response){
					if(response && response.error_code !== undefined){
						alert(response.message);
						return;
					}
					self.provinceList = response.results;
					var html = '';
					_.each(response.results, function(item){
						html += '<option value="' + item.id + '">' + item.name+ '</option>';
					});
					roleTarget.find('optgroup').html(html);
				},
				error: function(jqXHR){
					alert(jqXHR.responseText);
				}
			});
		},

		setRadioValue: function(event){
			var target = $(event.currentTarget),
					radio = target.parents('.form-group').find('.other-type-radio');
			if(!radio.is(':checked')){
				radio.attr('checked', 'checked');
			}
			radio.val(target.val());
		},
		save: function(event){
			event.preventDefault();
			//处理证件类型特殊逻辑
			if(this.$('input[name=identityTypeRadio]:checked').val() == ''){
				var $hint = this.$('.other-type-input + .hint');
				$hint.html('请输入证件类型');
				setTimeout(function(){
					$hint.html('');
				}, 2000);
				return;
			}

			var data = {
				name: this.$('#nameInput').val(),
				gender: this.$('input[name=genderRadio]:checked').val(),
				city: this.$('.city-select').val(),
				exam_city: this.$('.exam-city-select').val(),
				school: this.$('.school-select').val(),
				gaokao_year: this.$('#gaokaoYearInput').val(),
				identity_type: this.$('input[name=identityTypeRadio]:checked').val(),
				identity: this.$('#identityInput').val(),
				phone: this.$('#phoneInput').val(),
				parent_phone: this.$('#parentPhoneInput').val(),
				email: this.$('#emailInput').val(),
				avatar: this.$('input#avatarInput').val()
			};
			this.model.save(data, {
				// patch: true,
				url: ajaxurl.student + this.id + '/',
				success: function(response){
					alert('保存成功！');
				},
				error: function(jqXHR){
					$.wrapAjaxError(jqXHR);
				}
			});
		}
	});
});