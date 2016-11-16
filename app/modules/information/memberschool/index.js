'use strict';

define([
    'text!modules/information/memberschool/tpl/index.tpl',
    'text!modules/information/memberschool/tpl/item.tpl',
    'text!modules/information/memberschool/tpl/new.tpl',

    'common/ui/listItemBaseView',
    'common/ui/listBaseView',
    'common/models/itemBaseModel',
    'common/models/listCollectionBase',

    'common/ajaxURI',
    'common/util/util',
    'common/plugin/pagination/jquery.twbsPagination',
    'fileupload'
], function(
    indexTpl,
    itemTpl,
    newTpl,
    ListItemBaseView,
    ListBaseView,
    ItemBaseModel,
    ListCollectionBase,
    ajaxurl) {

    var Model = ItemBaseModel.extend({
        defaults: function() {
            return {
                'category': 1,
                'order': 1,
                'name': '',
                'image_url': ''
            };
        }
    });

    var Collection = ListCollectionBase.extend({
        model: Model,
        url: ajaxurl.memberschools
    });

    var ItemView = ListItemBaseView.extend({
        tpl: itemTpl,
        model: Model,

        delete: function(event) {
            var self = this;
            confirm('是否要删除【' + self.model.get('name') + '】（删除后无法恢复）', function() {
                self.model.destroy({
                    url: ajaxurl.memberschool + self.model.id + '/'
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

            'click .new': 'openMemberschoolModal',
            'click .edit': 'openMemberschoolModal',

            'submit .memberschool-form': 'edit'
        },

        collection: null,

        initialize: function() {
            this.itemView = ItemView;

            this.collection = new Collection();
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', this.renderList);

            this.render();
            this.getListData();
        },

        render: function() {
            var maimHtml = this.mainTemplate();
            this.$el.append(maimHtml).appendTo(('.content-wrapper'));
        },


        search: function(e) {
            e.preventDefault();

            var form = $(e.currentTarget);
            this.searchData = $.querystringParse(form.serialize());

            this.currentPage = 1;
            this.getListData();
        },

        memberschoolModal: null,
        openMemberschoolModal: function(event) {
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

            self.memberschoolModal = $(html);
            self.$el.append(self.memberschoolModal);
            //init upload button
            var hint = self.memberschoolModal.find(".hint");
            self.memberschoolModal.find('.fileupload').fileupload({
                url: ajaxurl.schoollogo,
                formData: {
                    type: "logo"
                },
                dataType: 'json',
                add: function(e, data) {
                    var goUpload = true;
                    var uploadFile = data.files[0];
                    //file type validation
                    if (!(/(\.|\/)(jpeg|jpg|gif|png)$/i).test(uploadFile.name)) {
                        hint.text("仅支持图片格式文件，请重新选择");
                        setTimeout(function() {
                            hint.text("");
                        }, 2000);
                        goUpload = false;
                    }
                    if (goUpload == true) {
                        data.submit();
                    }
                },
                done: function(e, data) {
                    if (data.result.success) {
                        $(this).parents(".form-group").find('.modal-img').attr("src", data.result.url);
                        $(this).parents(".form-group").find('input[name="image_url"]').val(data.result.url);
                    } else {
                        hint.html(data.result.msg);
                        setTimeout(function() {
                            hint.html("");
                        }, 2000);
                    }
                },
                fail: function(e, data) {
                    if(e.type === 'fileuploadfail'){
                        var response = data.jqXHR;
                        //responseText 有可能为空，被判定为fail
                        if(response.status === 200 && response.responseText===''){

                        }else if(response.message){
                            hint.html(response.message);
                        }else if(response.status === 413){
                            hint.html("上传图片过大(1M),请处理图片后重新上传");
                        }else {
                            hint.html("上传失败，请稍后重试");
                        }
                        setTimeout(function() {
                            hint.html("");
                        }, 2000);
                    }
                }
            }).prop('disabled', !$.support.fileInput);
            self.memberschoolModal.modal('show');
            self.memberschoolModal.on('hidden.bs.modal', function() {
                self.memberschoolModal.remove();
            });
        },

        //编辑或者新建
        edit: function(event) {
            var self = this;
            var form = $(event.target);
            var mode = form.data('mode');
            var data = $.querystringParse(form.serialize());
            if (data.image_url == '') {
                this.memberschoolModal.find('.hint').html('请选择学校图片');
                setTimeout(function() {
                    self.memberschoolModal.find('.hint').html('');
                }, 3000);
                return false;
            }

            if (mode === 'edit') {
                var id = form.data('id');
                var model = this.collection.get(id);
                model.set('publish_status', false);
                model.save(data, {
                    url: ajaxurl.memberschool + id + '/'
                });
            } else if (mode === 'new') {
                this.collection.create(data, {
                    wait: true
                });
            }
            this.memberschoolModal.modal('hide');

            event.preventDefault();
            return false;
        }
    });
});
