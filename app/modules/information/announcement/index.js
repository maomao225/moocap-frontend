'use strict';

define([
  'text!modules/information/announcement/tpl/index.tpl',
  'text!modules/information/announcement/tpl/item.tpl',
  'text!modules/information/announcement/tpl/new.tpl',
  'common/ui/listItemBaseView',
  'common/ui/listBaseView',
  'common/models/itemBaseModel',
  'common/models/listCollectionBase',
  'common/ajaxURI',
  'common/plugin/moment/moment',
  'common/util/util',
  'common/plugin/pagination/jquery.twbsPagination',
  'common/plugin/editor/jquery.sceditor'
], function (indexTpl,
             itemTpl,
             newTpl,
             ListItemBaseView,
             ListBaseView,
             ItemBaseModel,
             ListCollectionBase,
             ajaxurl,
             moment) {

  var Model = ItemBaseModel.extend({
    defaults: function () {
      return {
        'category': 0,
        'edit_title': '',
        'edit_content': ''
      };
    }
  });

  var Collection = ListCollectionBase.extend({
    model: Model,
    url: ajaxurl.announcements
  });

  var ItemView = ListItemBaseView.extend({
    tpl: itemTpl,
    model: Model,
    delete: function (event) {
      var self = this;
      confirm('是否要删除【' + (self.model.get('category') == 1 ? "通知" : "公告") + ' ' + self.model.get('edit_title') + '】（删除后无法恢复）', function () {
        self.model.destroy({
          url: ajaxurl.announcement + self.model.id + '/'
        }, {
          wait: true
        });
      });
    },
  });

  return ListBaseView.extend({

    mainTemplate: _.template(indexTpl),
    newTemplate: _.template(newTpl),

    events: {
      'submit .search-form': 'search',

      'click .new': 'openAnnouncementModal',
      'click .edit': 'openAnnouncementModal',
      'click .publish': 'publish',

      'submit .announcement-form': 'edit'
    },

    collection: null,

    initialize: function () {
      var self = this;
      self.itemView = ItemView;

      self.collection = new Collection();
      self.listenTo(self.collection, 'add', self.addOne);
      self.listenTo(self.collection, 'reset', self.renderList);

      self.render();
      self.getListData();

      this.extendData.moment = moment;
    },

    render: function () {
      var maimHtml = this.mainTemplate();
      this.$el.append(maimHtml).appendTo(('.content-wrapper'));
    },

    search: function (e) {
      e.preventDefault();

      var form = $(e.currentTarget);
      this.searchData = $.querystringParse(form.serialize());

      this.currentPage = 1;
      this.getListData();
    },

    announcementModal: null,
    openAnnouncementModal: function (event) {
      var target = $(event.target);
      var self = this;
      var mode = 'edit';
      if (target.hasClass('new')) {
        mode = 'new';
      }

      var modeData = {
        'edit': '编辑',
        'new': '新建'
      };

      var tr, id;
      if (mode === 'edit') {
        tr = target.closest('tr');
        id = tr.data('id');
        var model = this.collection.get(id);
      }

      var html = self.newTemplate({
        id: mode == 'edit' ? id : 0,
        type: modeData[mode],
        mode: mode,
        model: mode == 'edit' ? model : {}
      });

      self.announcementModal = $(html);
      self.$el.append(self.announcementModal);
      self.announcementModal.find('.editor').sceditor({emoticonsEnabled: false});
      var hint = self.announcementModal.find(".hint");
      self.announcementModal.find('.fileupload').fileupload({
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
      self.announcementModal.modal('show');
      self.announcementModal.on('hidden.bs.modal', function () {
        self.announcementModal.remove();
      });
    },

    //编辑或者新建
    edit: function (event) {
      var self = this;
      var form = $(event.target);
      var mode = form.data('mode');
      var data = $.querystringParse(form.serialize());
      if (data.edit_content.replace(/<\/?[^>]*>/g, '').replace(/\s/g, '') == '') {
        this.announcementModal.find('.hint').html('请输入正文内容');
        setTimeout(function () {
          self.announcementModal.find('.hint').html('');
        }, 3000);
        return false;
      }

      if (mode === 'edit') {
        var id = form.data('id');
        var model = this.collection.get(id);
        model.set('publish_status', false);
        model.save(data, {
          url: ajaxurl.announcement + id + '/'
        });
      } else if (mode === 'new') {
        this.collection.create(data, {
          wait: true
        });
      }
      this.announcementModal.modal('hide');

      event.preventDefault();
      return false;
    },

    publish: function (event) {
      var target = $(event.target);
      var currentRow = target.closest('tr');
      var id = currentRow.data('id');
      if (!id) return;

      var self = this;
      var model = self.collection.get(id);
      confirm('是否将【' + (model.get('category') == 1 ? "通知" : "公告") + ' ' + model.get('edit_title') + '】发布到网站？', function () {
        if (!model) return;
        model.save({
          'publish_status': true
        }, {
          patch: true,
          wait: true,
          url: ajaxurl.announcement + id + '/'
        });
      });
    }

  });
});
