'use strict';

define([
	'text!modules/exam/exam/tpl/index.tpl',
	'text!modules/exam/exam/tpl/item.tpl',
	'text!modules/exam/exam/tpl/new.tpl',
	'common/ui/listItemBaseView',
	'common/ui/listBaseView',
	'common/models/itemBaseModel',
	'common/models/listCollectionBase',
	'common/ajaxURI',
	'common/plugin/moment/moment',
	'common/plugin/pagination/jquery.twbsPagination',
	'datetimepicker'
],function(
	indexTpl,
	itemTpl,
	newTpl,
	ListItemBaseView,
	ListBaseView,
	ItemBaseModel,
	ListCollectionBase,
	ajaxurl,
	moment
){

	var Model = ItemBaseModel.extend({
		defaults: function(){
			return {
				'term_name': '',
        'name': '',
        'enroll_start': '',
        'enroll_end': '',
        'makeup_enroll_start': '',
        'makeup_enroll_end': '',
        'apply_refund_start': '',
        'apply_refund_end': '',
        'print_card_start': '',
        'print_card_end': '',
        'exam_start': '',
        'exam_end': '',
        'score_start': '',
        'score_end': '',
        'enter_fee': '',
        'makeup_enter_fee': '',
        'related_xuetangx_courses': [],
        'makeup_enroll_status': 0,
        'apply_refund_status': 0, 
        'apply_paper_status': 0
			};
		}
	});

	var Collection = ListCollectionBase.extend({
		model: Model,
		url: ajaxurl.exams
	});

	var ItemView = ListItemBaseView.extend({
		tpl: itemTpl,
		model: Model,

		delete: function(event){
			var self = this;
			confirm('确认要删除吗？', function(){	
				self.model.destroy({
					wait: true,
					url: ajaxurl.exam + self.model.id + '/'
				});
			});
		},
	});

	return ListBaseView.extend({

		mainTemplate: _.template(indexTpl),
		newTemplate: _.template(newTpl),

		__events: {
			'click .edit': 'edit',
			'change .provinceSelect': 'selectProvince',
			'submit .search-form': 'search',

			'click .new': 'new',
			'submit .exam-form' : 'postExamData',

			'click .add-course-id': 'addCourseIdInput',
			'click .remove-course-id': 'removeCourseIdInput'
		},

		termList: null,

		start: function(){
			var self = this;
			$.ajax({
				url: ajaxurl.terms,
				type: 'get',
				success: function(response){
					if(response && response.error_code !== undefined){
						alert(response.message);
						return;
					}
					self.termList = response.results;
					self.render();
					self.getListData();
				},
				error: function(jqXHR){
					alert(jqXHR.responseText);
				}
			});

			this.itemView = ItemView;

			this.collection = new Collection();
			this.listenTo(this.collection, 'add', this.addOne);
			this.listenTo(this.collection, 'reset', this.renderList);
		},

		render: function(){
			var maimHtml = this.mainTemplate({
				termList: this.termList,
				ajaxurl: ajaxurl
			});
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));
		},

		search: function(e){
			e.preventDefault();
			
			var val = this.$('.search-form .term-select').val();
			val ? this.searchData.term = val : delete(this.searchData.term);

			var val = this.$('.search-form .schoolNameInput').val();
			val ? this.searchData.search = val : delete(this.searchData.search);
			
			this.currentPage = 1;
			this.getListData();
		},

		new: function(event){
			this.openSchoolModal();
		},

		edit: function(event){
			var target = $(event.target);
			var tr = target.closest('tr');
			var id = tr.data('id');
			
			this.openSchoolModal(id);
		},

		examModal: null,
		openSchoolModal: function(id){
			id = id || 0;
			var self = this;
			var mode = 'new';
			if(id){
				mode = 'edit';
			}

			var modeData = {
				edit: '编辑',
				new: '新建'
			}

			var model = this.collection.get(id);

			var html = self.newTemplate({
				id : id,
				type: modeData[mode],				
				mode: mode,
				model: mode == 'edit' ? model : {},
				moment: moment,
				termList: self.termList
			});

			self.examModal = $(html);
			self.$el.append(self.examModal);
			self.examModal.modal('show');
			self.examModal.on('hidden.bs.modal', function(){
				$('.form_date').datetimepicker('remove');
				self.examModal.remove();
			});
			self.examModal.find('.form_date_start').datetimepicker({
				format: 'yyyy-mm-dd',
				minView: 'month',
				autoclose: true
			}).on('changeDate', function(e){
				var origDate = e.date,
						localTime = origDate.getTime(),
						offsetTime = origDate.getTimezoneOffset() * 60 * 1000,
						utcTime = localTime + offsetTime,
						utcDate = new Date(utcTime);
				var $parent = $(this).parents('.form-group');
				$parent.find('.form_date_end').datetimepicker('setStartDate', utcDate);
				$parent.next('.form-group').find('.form_date').datetimepicker('setStartDate', utcDate);
			});
			self.examModal.find('.form_date_end').datetimepicker({
				format: 'yyyy-mm-dd',
				minView: 'month',
				autoclose: true
			}).on('changeDate', function(e){
				var origDate = e.date,
						localTime = origDate.getTime(),
						offsetTime = origDate.getTimezoneOffset() * 60 * 1000,
						utcTime = localTime + offsetTime,
						utcDate = new Date(utcTime);
				var $parent = $(this).parents('.form-group');
				$parent.find('.form_date_start').datetimepicker('setEndDate', utcDate);
				$parent.next('.form-group').find('.form_date').datetimepicker('setStartDate', utcDate);
			});
			self.examModal.find('.form_datetime_start').datetimepicker({
				format: 'yyyy-mm-dd hh:ii:ss',
				minuteStep: 10,
				autoclose: true
			}).on('changeDate', function(e){
				var origDate = e.date,
						localTime = origDate.getTime(),
						offsetTime = origDate.getTimezoneOffset() * 60 * 1000,
						utcTime = localTime + offsetTime,
						utcDate = new Date(utcTime);
				var $parent = $(this).parents('.form-group');
				$parent.find('.form_datetime_end').datetimepicker('setStartDate', utcDate);
				$parent.next('.form-group').find('.form_date').datetimepicker('setStartDate', utcDate);
			});
			self.examModal.find('.form_datetime_end').datetimepicker({
				format: 'yyyy-mm-dd hh:ii:ss',
				minuteStep: 10,
				autoclose: true
			}).on('changeDate', function(e){
				var origDate = e.date,
						localTime = origDate.getTime(),
						offsetTime = origDate.getTimezoneOffset() * 60 * 1000,
						utcTime = localTime + offsetTime,
						utcDate = new Date(utcTime);
				var $parent = $(this).parents('.form-group');
				$parent.find('.form_datetime_start').datetimepicker('setEndDate', utcDate);
				$parent.next('.form-group').find('.form_date').datetimepicker('setStartDate', utcDate);
			});
			self.examModal.find('.form_date').datetimepicker('update');
		},

		postExamData: function(event){
			event.preventDefault();
			var target = $(event.target);
			var mode = target.data('mode');

			var data = {
				'term': this.$('.exam-form .term-select').val(),
	            'name': this.$('#nameInput').val(),
	            'enroll_start': this.$('#enrollStartInput').val(),
	            'enroll_end': this.$('#enrollEndInput').val(),
	            
	            
	            'print_card_start': this.$('#printCardStartInput').val(),
	            'print_card_end': this.$('#printCardEndInput').val(),
	            'exam_start': this.$('#examStartInput').val(),
	            'exam_end': this.$('#examEndInput').val(),
	            'score_start': this.$('#scoreStartInput').val(),
	            'score_end': this.$('#scoreEndInput').val(),
	            'enroll_fee': this.$('#enrollFeeInput').val(),
	            'makeup_enroll_fee': this.$('#makeupEnrollFeeInput').val(),
	            'apply_paper_fee': this.$('#applyPaperFeeInput').val(),
	            'related_xuetangx_courses': [],
	            'apply_paper_status': this.$('#apply_paper_status').get(0).checked ? 0 : 1
			};
			var makeupEnrollStatus = this.$('#makeup_enroll_status').get(0).checked ? 0 : 1;
			data.makeup_enroll_status = makeupEnrollStatus;
			if(makeupEnrollStatus === 0){
				data = $.extend(data, {
					'makeup_enroll_start': $.trim(this.$('#makeupEnrollStartInput').val()),
	            	'makeup_enroll_end': $.trim(this.$('#makeupEnrollEndInput').val())
				});
			}

			var applyRefundSatus = this.$('#apply_refund_status').get(0).checked ? 0 : 1;
			data.apply_refund_status = applyRefundSatus;
			if(applyRefundSatus === 0){
				data = $.extend(data, {
					'apply_refund_start': $.trim(this.$('#applyRefundStartInput').val()),
	            	'apply_refund_end': $.trim(this.$('#applyRefundEndInput').val())
				});
			}

			$('input.related-course').each(function(){
				var val = $(this).val();
				if(val){
					data['related_xuetangx_courses'].push(val);
				}
			});

			if(mode === 'edit'){
				var id = target.data('id');
				var model = this.collection.get(id);
				model.save(data, {
					patch: true,
					url: ajaxurl.exam + id + '/',
					wait: true
				});
			}else if(mode === 'new'){
				this.collection.create(data, {wait: true});
			}
			this.examModal.modal('hide');
		},

		selectProvince: function(event){
			var target = $(event.target);
			var value = target.value;
			if(value == '')return;

			$.ajax({
				url: ajaxurl.locationCities,
				type: 'get',
				dataType: 'json',
				data:{
					province: value
				},
				success: function(response){
					if(response && response.error_code !== undefined){
						alert(response.message);
						return;
					}

					var cities = response.results;
					var html = '<option value="">--- 选择市 ---</option>';
					_.each(cities, function(item){
						html += '<option value="'+ item.id +'">' + item.name +'</option>';
					});

					$('.citySelect').html(html);
				}
			});
		},

		addCourseIdInput: function(event){
			var inputTpl = 
			'<div class="input-group">'
				+ '<input type="text" class="form-control related-course">'
			    + '<span class="input-group-btn">'
			    +    '<button class="btn btn-default remove-course-id" type="button">'
				+		'<span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>移除'
			    +    '</button>'
			    + '</span>'
		    +'</div>';

		    var container = $(event.target).closest('.form-group').find('>.col-sm-9');
		    container.append(inputTpl);
			
		},

		removeCourseIdInput: function(event){
			$(event.target).closest('.input-group').remove();
		}
	});
});