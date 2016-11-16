'use strict'

define([
  'text!modules/exam/online_course_report/tpl/index.tpl',
  'text!modules/exam/online_course_report/tpl/item.tpl',
  'text!modules/exam/online_course_report/tpl/new.tpl',
  'common/ui/listItemBaseView',
  'common/ui/listBaseView',
  'common/models/itemBaseModel',
  'common/models/listCollectionBase',
  'common/ajaxURI',
  'common/plugin/moment/moment',
  'common/plugin/pagination/jquery.twbsPagination',
  'datetimepicker'
], function(
  indexTpl,
  itemTpl,
  newTpl,
  ListItemBaseView,
  ListBaseView,
  ItemBaseModel,
  ListCollectionBase,
  ajaxurl,
  moment
) {

  var Model = ItemBaseModel.extend({
    defaults: function() {
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
        'related_xuetangx_courses': []
      }
    }
  })

  var Collection = ListCollectionBase.extend({
    model: Model,
    url: ajaxurl.onlineCourseReport
  })

  var ItemView = ListItemBaseView.extend({
    tpl: itemTpl,
    model: Model
  })

  return ListBaseView.extend({

    mainTemplate: _.template(indexTpl),
    newTemplate: _.template(newTpl),

    __events: {
      'submit .search-form': 'search',
      'click .collect' : 'collect'
    },

    termList: null,

    start: function() {
      var self = this

      $.when(
        $.ajax({
          url: ajaxurl.terms,
          type: 'get',
          dataType: 'json'
        }),
        $.ajax({
          url: ajaxurl.xuetangxCourses,
          type: 'get',
          data: { limit: 10000 },
          dataType: 'json'
        })
      ).then(function(res_terms, res_courses) {
        if (res_terms[0] && res_terms[0].error_code !== undefined && res_courses[0] && res_courses[0].error_code !== undefined) {
          alert(res_terms[0].message || res_courses[0].message)
          return
        }
        self.termList = res_terms[0].results
        self.courseList = res_courses[0].results

        self.render()
        self.getListData()
      })

      this.itemView = ItemView

      this.collection = new Collection()
      this.listenTo(this.collection, 'add', this.addOne)
      this.listenTo(this.collection, 'reset', this.renderList)
    },

    render: function() {
      var maimHtml = this.mainTemplate({
        termList: this.termList,
        courseList: this.courseList,
        ajaxurl: ajaxurl
      })
      this.$el.append(maimHtml).appendTo(('.content-wrapper'))
    },

    search: function(e) {
      e.preventDefault()

      var val = this.$('.search-form .term-select').val()
      val ? this.searchData.enroll__exam__term = val : delete(this.searchData.enroll__exam__term)

      var val = this.$('.search-form .course-select').val()
      val ? this.searchData.online_course = val : delete(this.searchData.online_course)

      var val = this.$('.search-form .schoolNameInput').val()
      val ? this.searchData.search = val : delete(this.searchData.search)

      this.currentPage = 1
      this.getListData()
    },

    collect: function(e){
      var arr = []
    	$('[data-print-id]').each(function(){
        arr.push($(this).data('print-id'))
      })
      window.open('/cms/#exam/online_course_report/print/' + arr.join())
    }
  })
})
