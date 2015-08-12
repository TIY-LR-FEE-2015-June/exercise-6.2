var ItemView = Backbone.View.extend({
  tagName: 'li',
  template: AppTemplates.item,
  parent: null,

  initialize: function(options) {
    this.parent = options.parent;
    this.render();
  },

  render: function() {
    var html = this.template(this.model.toJSON());

    this.$el.html(html);
  },
});

var DetailView = Backbone.View.extend({
  template: AppTemplates.detail,

  initialize: function(options) {
    this.render();
  },

  render: function() {
    var data = {};

    if (this.model && this.model.toJSON) {
      data = this.model.toJSON();
    }

    var html = this.template(data);

    this.$el.html(html);
  },
});

var AppView = Backbone.View.extend({
  template: AppTemplates.app,

  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var _this = this;

    var html = this.template(this.collection.toJSON());
    this.$el.html(html);

    this.collection.forEach(function(teacher) {
      var view = new ItemView({
        model: teacher,
        parent: _this,
      });

      _this.$('ul').append(view.el);
    });
  },
});
