define([
	'text!modules/sysadmin/term/tpl/index.tpl',
	'text!modules/sysadmin/term/tpl/item.tpl',
	'text!modules/sysadmin/term/tpl/add.tpl',

	'common/ui/listItemBaseView',
	'common/ui/listBaseView',
	'common/models/itemBaseModel',
	'common/models/listCollectionBase',

	'common/ajaxURI',
	'common/plugin/pagination/jquery.twbsPagination'
], function(
	indexTpl,
	itemTpl,
	addTpl,
	ListItemBaseView,
	ListBaseView,
	ItemBaseModel,
	ListCollectionBase,
	ajaxurl
){

	var Model = ItemBaseModel.extend({
		default:{
			id: '',
			name: ''
		}
	});

	var Collection = ListCollectionBase.extend({
		url: ajaxurl.terms,
		model: Model
	});

	var ItemView = ListItemBaseView.extend({
		tpl: itemTpl,
		model: Model,

		delete: function(event){
			var self = this;
			confirm('确认要删除吗？', function(){	
				self.model.destroy({
					wait: true,
					url: ajaxurl.term + self.model.id + '/'
				});
			});
		},
	});

	return ListBaseView.extend({

		mainTemplate: _.template(indexTpl),
		addTemplate: _.template(addTpl),

		collection: null,

		events: {
			'click .add': 'openTermModal',
			'click .edit': 'edit',
			'click .delete': 'delete',

			'submit #addTermForm' : 'add'
		},

		className: 'sysadminTerm',

		limit: 1000,

		initialize: function(){

			var self = this;

			this.itemView = ItemView;

			this.collection = new Collection();
			this.listenTo(this.collection, 'add', this.addOne);
			this.listenTo(this.collection, 'reset', this.renderList);

			self.render();
			self.getListData();
		},

		render: function(){
			var maimHtml = this.mainTemplate();
			this.$el.append(maimHtml).appendTo(('.content-wrapper'));
		},

		renderList: function(){
			var self = this;
			this.$(".data-list").empty();
			self.collection.each(self.addOne, self);
		},

		addTermModal: null,
		openTermModal: function(){
			if(!this.addTermModal){
				var html = this.addTemplate();
				this.addTermModal = $(html);
				this.$el.append(this.addTermModal);
			}
			
			this.addTermModal.modal('show');
		},

		add:function(event){
			event.preventDefault();
			
			this.collection.create({name: this.$('#termInput').val()}, {wait: true});
			this.addTermModal.modal('hide');
		},

		edit: function(events){
			event.stopPropagation();

			var self = this;

			var target = $(events.target);
			var tr = target.closest('tr');

			var current = tr.find('td span.name');

			current.editable({
				toggle: 'manual',
				validate: function(value){
					if(!/\d{4}-\d{4}第(一|二|三|四|五|六|七|八|九)学期/.test(value)){
						return '格式错误！如：2015-2016第一学期';
					}
				},
				url: function(parms){
					var d = new $.Deferred;

					var model = self.collection.get(parms.pk);
					model.save({name: parms.value}, {
						patch:true, 
						url: ajaxurl.term + parms.pk + '/',
						success: function(modal, response){
							if(response && response['error_code'] !== undefined){
								return d.reject(response.message);
							}
							d.resolve();
						},
						error: function(){
							return d.reject('error');
						} 
					});
					return d.promise();
				}
			});

			current.editable('toggle');
		}
	});
});