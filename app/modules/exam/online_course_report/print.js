'use strict'

define([
  'text!modules/exam/online_course_report/tpl/print.tpl',
  'text!modules/exam/online_course_report/tpl/print-item.tpl',
  'common/ui/listItemBaseView',
  'common/ui/listBaseView',
  'common/models/itemBaseModel',
  'common/models/listCollectionBase',
  'common/ajaxURI',
  'common/plugin/moment/moment',
  'common/plugin/echarts/echarts',
  'common/plugin/ua/ua'
], function(
  printTpl,
  itemTpl,
  ListItemBaseView,
  ListBaseView,
  ItemBaseModel,
  ListCollectionBase,
  ajaxurl,
  moment,
  echarts
) {

  var ratio = 4

  /**
   * 初始化echarts报表
   * @param  {Number} id 评价单id
   */
  function initCharts(id, $content, num) {
    $.ajax({
      url: ajaxurl.onlineCourseReport + id + '/',
      type: 'get',
      dataType: 'json',
      success: function(res) {
        if (res && res.error_code !== undefined) {
          alert(res.message)
          return
        }

        var data = preProcess(res)

        var $item = $(_.template(itemTpl)(data))
        var chartSJ = $item.find('.chart-sj').get(0)
        var chartTR = $item.find('.chart-tr').get(0)
        var chartJL = $item.find('.chart-jl').get(0)
        var chartXL = $item.find('.chart-xl').get(0)
        var chartJZ = $item.find('.chart-jz').get(0)
        var chartResult = $item.find('.chart-result').get(0)
        var chartExam = $item.find('.chart-exam').get(0)
        var chartHomework = $item.find('.chart-homework').get(0)
        var chartSpeed = $item.find('.chart-speed').get(0)
        var chartEffect = $item.find('.chart-effect').get(0)

        $content.append($item)

        data.habbit.SJ && echarts.init(chartSJ).setOption(handleHabbitData(data.habbit.SJ, '#fda8a6'))
        data.habbit.TR && echarts.init(chartTR).setOption(handleHabbitData(data.habbit.TR, '#fee28e'))
        data.habbit.JL && echarts.init(chartJL).setOption(handleHabbitData(data.habbit.JL, '#ffff8c'))
        data.habbit.XL && echarts.init(chartXL).setOption(handleHabbitData(data.habbit.XL, '#d0ffbb'))
        data.habbit.JZ && echarts.init(chartJZ).setOption(handleHabbitData(data.habbit.JZ, '#aae9ff'))

        data.grade.result && echarts.init(chartResult).setOption(handleGradeData(data.grade.result))
        data.grade.exam && echarts.init(chartExam).setOption(handleGradeData(data.grade.exam))
        data.grade.homework && echarts.init(chartHomework).setOption(handleGradeData(data.grade.homework))

        data.ref.speed && echarts.init(chartSpeed).setOption(handleRefData(data.ref.speed))
        data.ref.effect && echarts.init(chartEffect).setOption(handleRefData(data.ref.effect))

        if (num === 1) {
          renderTop(data, num)
        }
        canvasToImg()

      }
    })
  }

  function renderTop(data, count) {
    var $topDes = $('.top-des')
    var html = '共 ' + count + ' 份'
    if (data) {
      html += ' "学生姓名：' + data.student.name + ', 在线科目：' + data.online_course.name + '"'
    }
    $topDes.html(html)
  }

  /**
   * 预处理数据
   */
  function preProcess(source) {
    var data = source.data
    data.student = source.student
    data.online_course = source.online_course
    data.unique_code = source.unique_code
    data.exam_card_num = source.exam_card_num

    data.habbit.SJ.percent = data.habbit.SJ.percents[data.habbit.SJ.keys.indexOf(data.habbit.SJ.value)]
    data.habbit.TR.percent = data.habbit.TR.percents[data.habbit.TR.keys.indexOf(data.habbit.TR.value)]
    data.habbit.JL.percent = data.habbit.JL.percents[data.habbit.JL.keys.indexOf(data.habbit.JL.value)]
    data.habbit.XL.percent = data.habbit.XL.percents[data.habbit.XL.keys.indexOf(data.habbit.XL.value)]
    data.habbit.JZ.percent = data.habbit.JZ.percents[data.habbit.JZ.keys.indexOf(data.habbit.JZ.value)]

    data.canvas = {
      width: 320 * ratio,
      height: 100 * ratio
    }

    return data
  }

  /**
   * canvas转换为png
   * @description canvas直接打印会模糊
   */
  function canvasToImg() {
    $('canvas').each(function() {
      $(this).closest('td').find('>div').replaceWith('<img src="' + this.toDataURL("image/png") + '" style="width:320px;"/>')
    })
  }

  /**
   * 加载中文字体
   */
  function loadFonts() {
    if (!document.fonts && !FontFace) {
      return false
    }
    var f = new FontFace('SourceHanSansCN', 'url(/fonts/SourceHanSansCN-Normal.otf)', {})
    var fb = new FontFace('SourceHanSansCN', 'url(/fonts/SourceHanSansCN-Bold.otf)', { weight: 'bold' })
    f.load().then(function(loadedFace) {
      document.fonts.add(loadedFace)
      document.body.style.fontFamily = 'SourceHanSansCN'
    })
    fb.load().then(function(loadedFace) {
      document.fonts.add(loadedFace)
      document.body.style.fontFamily = 'SourceHanSansCN'
    })
  }

  /**
   * 原始habbit数据加工函数
   * @description 原始数据转换为echarts的option
   * @param  {Object} source 原始数据
   * @param  {String} color  主色调
   * @return {Object}        option
   */
  function handleHabbitData(source, color) {
    var index = source.keys.indexOf(source.value)
    var data = source.values.map(function(value, key) {
      return key === index ? {
        value: value,
        itemStyle: {
          normal: {
            color: color
          }
        }
      } : value
    })

    var keys = source.keys.map(function(value, key) {
      return key === index ? {
        value: '☑︎' + value,
        textStyle: {
          fontWeight: 'bold'
        }
      } : '☐' + value
    })

    return {
      'animation': false,
      'grid': {
        show: false,
        left: 30 * ratio,
        bottom: 30 * ratio,
        right: 20 * ratio,
        top: 10 * ratio
      },
      'color': ['#d9d9d9'],
      'xAxis': {
        'data': keys,
        'splitLine': {
          'show': false
        },
        'axisTick': {
          'show': false
        },
        'axisLabel': {
          'interval': 0,
          'textStyle': {
            'color': '#000',
            'fontSize': 12 * ratio
          }
        }
      },
      'yAxis': {
        'name': '人数分布',
        'nameLocation': 'middle',
        'nameGap': 5,
        'axisLabel': {
          'show': false
        },
        'splitLine': {
          'show': false
        },
        'axisTick': {
          'show': false
        },
        'nameTextStyle': {
          'fontSize': 12 * ratio
        }
      },
      'series': [{
        'type': 'bar',
        'z': 0,
        'data': data,
        'label': {
          'normal': {
            'show': true,
            'formatter': function(param) {
              return '占' + source['percents'][param['dataIndex']] + '%'
            },
            'position': 'insideBottom',
            'textStyle': {
              'color': '#000',
              'fontSize': 12 * ratio
            }
          }
        }
      }]
    }
  }

  /**
   * 原始grade数据加工函数
   * @description 原始数据转换为echarts的option
   * @param  {Object} source 原始数据
   * @return {Object}        option
   */
  function handleGradeData(source) {
    var index = source.range.indexOf(source.value)
    var data = source.histo.map(function(value, key) {
      return key === index ? {
        value: value,
        itemStyle: {
          normal: {
            color: '#a695ff'
          }
        }
      } : value
    })

    return {
      'animation': false,
      'grid': {
        show: false,
        left: 30 * ratio,
        bottom: 30 * ratio,
        right: 20 * ratio,
        top: 20 * ratio
      },
      'title': {
        'show': true,
        'text': '前' + source.rank + ' 均分' + source.rel_avg,
        'bottom': '14%',
        'left': 'center',
        'textStyle': {
          'fontSize': 12 * ratio,
          'fontWeight': 'bolder',
          'fontFamily': 'SourceHanSansCN'
        }
      },
      'color': ['#d9d9d9'],
      'xAxis': {
        'data': source.range,
        'splitLine': {
          'show': false
        },
        'axisTick': {
          'show': false
        },
        'axisLabel': {
          'show': true,
          'interval': 0,
          'textStyle': {
            'color': '#000',
            'fontSize': 12 * ratio,
            'fontFamily': 'SourceHanSansCN'
          },
          'formatter': function(value, index) {
            var text = ''
            if (index === 0 && source.histo.length && source.range.length > 1) {
              text = '最低分 ' + source.range[0]
            }
            if (index === source.histo.length - 1 && source.histo.length && source.range.length > 1) {
              text = '最高分 ' + source.range[source.range.length - 1]
            }
            return text
          }
        }
      },
      'yAxis': {
        'name': '人数分布',
        'nameLocation': 'middle',
        'nameGap': 5,
        'nameTextStyle': {
          'fontSize': 12 * ratio,
          'fontFamily': 'SourceHanSansCN'
        },
        'axisLabel': {
          'show': false
        },
        'splitLine': {
          'show': false
        },
        'axisTick': {
          'show': false
        }
      },
      'series': [{
        'type': 'bar',
        'z': 0,
        'data': data,
        'label': {
          normal: {
            show: true,
            position: 'top',
            formatter: function(params) {
              return params.dataIndex === index ? '▼' : ''
            },
            textStyle: {
              color: '#333',
              fontSize: 8 * ratio,
              'fontFamily': 'SourceHanSansCN'
            }
          }
        }
      }]
    }
  }

  /**
   * 原始ref数据加工函数
   * @description 原始数据转换为echarts的option
   * @param  {Object} source 原始数据
   * @return {Object}        option
   */
  function handleRefData(source) {
    var index = source.range.indexOf(source.value)
    var data = source.histo.map(function(value, key) {
      return key === index ? {
        value: value,
        itemStyle: {
          normal: {
            color: '#a695ff',
            'fontFamily': 'SourceHanSansCN'
          }
        }
      } : value
    })

    return {
      'animation': false,
      'nameTextStyle': {
        'fontSize': 12 * ratio,
        'fontFamily': 'SourceHanSansCN'
      },
      'grid': {
        show: false,
        left: 30 * ratio,
        bottom: 30 * ratio,
        right: 20 * ratio,
        top: 20 * ratio
      },
      'title': {
        'show': true,
        'text': '前' + source.rank,
        'bottom': '14%',
        'left': 'center',
        'textStyle': {
          'fontSize': 12 * ratio,
          'fontWeight': 'bolder',
          'fontFamily': 'SourceHanSansCN'
        }
      },
      'color': ['#d9d9d9'],
      'xAxis': {
        'data': source.range,
        'splitLine': {
          'show': false
        },
        'axisTick': {
          'show': false
        },
        'axisLabel': {
          'show': true,
          'interval': 0,
          'textStyle': {
            'color': '#000',
            'fontSize': 12 * ratio,
            'fontFamily': 'SourceHanSansCN'
          },
          'formatter': function(value, index) {
            var text = ''
            if (index === 0 && source.histo.length) {
              text = '最低分 ' + source.range[0]
            }
            if (index === source.histo.length - 1 && source.histo.length) {
              text = '最高分 ' + source.range[source.range.length - 1]
            }
            return text
          }
        }
      },
      'yAxis': {
        'name': '人数分布',
        'nameLocation': 'middle',
        'nameGap': 5,
        'axisLabel': {
          'show': false
        },
        'splitLine': {
          'show': false
        },
        'axisTick': {
          'show': false
        }
      },
      'series': [{
        'type': 'bar',
        'z': 0,
        'data': data,
        'label': {
          normal: {
            show: true,
            position: 'top',
            formatter: function(params) {
              return params.dataIndex === index ? '▼' : ''
            },
            textStyle: {
              color: '#333',
              fontSize: 8 * ratio,
              'fontFamily': 'SourceHanSansCN'
            }
          }
        }
      }]
    }
  }

  return Backbone.Model.extend({
    initialize: function() {
      // 从url中获取id
      var id = window.location.href.replace(/.*\//, '')

      id = id.split(',')

      // 取巧办法，不使用backbone，不使用后台基本架构, 特殊布局覆盖整个页面
      $('body').html(_.template(printTpl)()).addClass('print-evaluate')

      var $page = $('.print-evaluate')
      var $content = $page.find('>.content')

      //  主调用
      $.each(id, function(i, v) {
        initCharts(v, $content, id.length)
      })

      // 多个打印对象下渲染top
      if (id.length > 1) {
        renderTop(null, id.length)
      }

      loadFonts()

      // 浏览器提示
      if (!client.browser.chrome || client.browser.chrome < 46) {
        $('.bowser-tip').show()
      }
    }
  })
})
