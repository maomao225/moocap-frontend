'use strict';

define([
  'common/models/itemBaseModel'
], function (ItemBaseModel) {
  return ItemBaseModel.extend({
    defaults: function () {
      return {
        'city': '',
        'province': '',
        'exam_city': '',
        'exam_province': '',
        'gender': '',
        'school': '',
        'date_joined': '',
        'name': '',
        'avatar': '',
        'gaokao_year': '',
        'identity_type': '',
        'identity': '',
        'phone': '',
        'parent_phone': '',
        'email': '',
        'user': 0
      };
    }
  });
});