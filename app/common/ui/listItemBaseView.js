define([
  'common/plugin/moment/moment'
], function (moment) {
  return Backbone.View.extend({
    tpl: '',
    tagName: 'tr',
    template: '',

    events: {
      "click .edit": "edit",
      "click .delete": "delete"
    },

    extendData: null,

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);

      this.template = _.template(this.tpl);
      this.$el.attr('data-id', this.model.id);
    },
    render: function () {
      var extendData = this.extendData || {};
      extendData = _.extend(extendData, this.model.toJSON(), {moment: moment});
      this.$el.html(this.template(extendData));
      this.$el.toggleClass('done', this.model.get('done'));
      return this;
    },
    edit: function () {
    }
  });
});
