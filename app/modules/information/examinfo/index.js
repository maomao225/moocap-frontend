'use strict';

define([
  'text!modules/information/examinfo/tpl/index.tpl',
  'text!modules/information/examinfo/tpl/new.tpl',
  'common/ajaxURI',
  'common/util/util',
  'common/plugin/editor/jquery.sceditor'
], function (indexTpl,
             newTpl,
             ajaxurl) {

  return Backbone.View.extend({

    mainTemplate: _.template(indexTpl),
    newTemplate: _.template(newTpl),

    events: {
      'click .publish': 'publish',
      'click .edit': 'openExaminfoModal',

      'submit .examinfo-form': 'edit'
    },

    initialize: function () {
      this.render();
      this.getExamInfo();
    },

    render: function () {
      var maimHtml = this.mainTemplate();
      this.$el.append(maimHtml).appendTo(('.content-wrapper'));
    },

    getExamInfo: function () {
      var self = this;
      $.ajax({
        url: ajaxurl.examinfos,
        data: {
          limit: 10,
          offset: 0
        },
        success: function (response) {
          if (response && response.error_code !== undefined) {
            alert(response.message);
            return;
          }
          if (response.results.length > 0) {
            var data = response.results[0];
            self.$el.find(".box .box-body").html(data.content);
            self.$el.find(".btn.publish, .btn.edit").data('id', data.id);
          }
        },
        error: function (jqXHR) {
          alert(jqXHR.responseText);
        }
      });
    },

    examinfoModal: null,
    openExaminfoModal: function (event) {
      var target = $(event.target);
      var self = this;
      var mode = 'edit';
      var id = target.data('id');
      if (!id) {
        mode = 'new';
      }

      var modeData = {
        'edit': '编辑',
        'new': '新建'
      };

      if (mode === 'new') {
        var html = self.newTemplate({
          id: mode == 'edit' ? id : 0,
          type: modeData[mode],
          mode: mode,
          model: mode == 'edit' ? response : {}
        });

        self.examinfoModal = $(html);
        self.$el.append(self.examinfoModal);
        self.examinfoModal.find('.editor').sceditor({emoticonsEnabled: false});
        self.examinfoModal.modal('show');
        self.examinfoModal.on('hidden.bs.modal', function () {
          self.examinfoModal.remove();
        });
      } else {
        $.ajax({
          url: ajaxurl.examinfo + id + '/',
          success: function (response) {
            if (response && response.error_code !== undefined) {
              alert(response.message);
              return;
            }
            var html = self.newTemplate({
              id: mode == 'edit' ? id : 0,
              type: modeData[mode],
              mode: mode,
              model: mode == 'edit' ? response : {}
            });

            self.examinfoModal = $(html);
            self.$el.append(self.examinfoModal);
            self.examinfoModal.find('.editor').sceditor({emoticonsEnabled: false});
            var hint = self.examinfoModal.find(".hint");
            self.examinfoModal.find('.fileupload').fileupload({
              url: ajaxurl.uploadFile,
              formData: {
                type: "attachment"
              },
              dataType: 'json',
              add: function (e, data) {
                var goUpload = true;
                var uploadFile = data.files[0];
                //file type validation
                if (!(/(\.|\/)(docx?|xlsx?|pdf|png|jpe?g)$/i).test(uploadFile.name)) {
                  hint.text("仅支持Word,Excel,PDF及图片类型文件，请重新选择");
                  setTimeout(function () {
                    hint.text("");
                  }, 2000);
                  goUpload = false;
                }
                if (goUpload == true) {
                  data.submit();
                }
              },
              done: function (e, data) {
                if (data.result.success) {
                  var fileUrl = data.result.url;
                  if ((/(\.|\/)(png|jpe?g)$/i).test(fileUrl)) {
                    $(this).parents("form").find('.editor').sceditor('instance').insert('<img class="attach-img" style="max-width: 90%;height: auto;" src="' + fileUrl + '" />');
                  } else {
                    $(this).parents("form").find('.editor').sceditor('instance').insert('<a class="attach-link" href="' + fileUrl + '" target="_blank">附件</a>');
                  }
                } else {
                  hint.html(data.result.msg);
                  setTimeout(function () {
                    hint.html("");
                  }, 2000);
                }
              },
              fail: function (e, data) {
                if (e.type === 'fileuploadfail') {
                  var response = data.jqXHR;
                  //responseText 有可能为空，被判定为fail
                  if (response.status === 200 && response.responseText === '') {

                  } else if (response.message) {
                    hint.html(response.message);
                  } else if (response.status === 413) {
                    hint.html("上传文件过大");
                  } else {
                    hint.html("上传失败，请稍后重试");
                  }
                  setTimeout(function () {
                    hint.html("");
                  }, 2000);
                }
              }
            }).prop('disabled', !$.support.fileInput);
            self.examinfoModal.modal('show');
            self.examinfoModal.on('hidden.bs.modal', function () {
              self.examinfoModal.remove();
            });
          },
          error: function (jqXHR) {
            alert(jqXHR.responseText);
          }
        });
      }
    },

    publish: function (event) {
      var target = $(event.target);
      var id = target.data('id');
      if (!id) return;

      var self = this;
      confirm('是否将考试信息发布到网站？', function () {
        $.ajax({
          url: ajaxurl.examinfo + id + '/',
          data: {'publish_status': true},
          type: 'PATCH',
          success: function (response) {
            if (response && response.error_code !== undefined) {
              alert(response.message);
              return;
            }
            self.getExamInfo();
          },
          error: function (jqXHR) {
            alert(jqXHR.responseText);
          }
        });
      });
    },

    //编辑或者新建
    edit: function (event) {
      var self = this;
      var form = $(event.target);
      var mode = form.data('mode');
      var data = $.querystringParse(form.serialize());
      if (data.content.replace(/<\/?[^>]*>/g, '').replace(/\s/g, '') == '') {
        this.examinfoModal.find('.hint').html('请输入正文内容');
        setTimeout(function () {
          self.examinfoModal.find('.hint').html('');
        }, 3000);
        return false;
      }

      if (mode === 'edit') {
        $.ajax({
          url: ajaxurl.examinfos,
          data: data,
          type: 'POST',
          success: function (response) {
            if (response && response.error_code !== undefined) {
              alert(response.message);
              return;
            }
            self.examinfoModal.modal('hide');
            self.getExamInfo();
          },
          error: function (jqXHR) {
            alert(jqXHR.responseText);
          }
        });
      } else if (mode === 'new') {
        $.ajax({
          url: ajaxurl.examinfos,
          data: data,
          type: 'POST',
          success: function (response) {
            if (response && response.error_code !== undefined) {
              alert(response.message);
              return;
            }
            self.examinfoModal.modal('hide');
            self.getExamInfo();
          },
          error: function (jqXHR) {
            alert(jqXHR.responseText);
          }
        });
      }

      event.preventDefault();
      return false;
    }

  });
});