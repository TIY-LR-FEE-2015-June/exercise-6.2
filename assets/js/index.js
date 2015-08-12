var Model = Backbone.Model.extend({
  idAttribute: '_id',
});

var Collection = Backbone.Collection.extend({
  model: Model,
  url: 'http://tiny-lr.herokuapp.com/collections/teachers',
});

var Router = Backbone.Router.extend({
  initialize: function() {
    this.collection = new Collection();
    this.collection.fetch();

    this.repopulateMain();
  },

  routes: {
    '': 'index',
    ':id': 'show',
  },

  index: function() {
    $('.content').html('<h2>Pick a Teacher</h2>');
  },

  show: function(id) {
    var _this = this;
    var buildShow = function() {
      if (_this.currentDetail) {
        _this.currentDetail.remove();
      }

      var model = _this.collection.get(id);

      _this.currentDetail = new DetailView({
        model: model,
      });

      $('.content').html(_this.currentDetail.el);
    };

    buildShow();
    this.listenTo(this.collection, 'sync', buildShow);
  },

  repopulateMain: function() {
    this.mainView = new AppView({
      collection: this.collection,
    });

    $('#target').html(this.mainView.el);
  },
});

new Router();

Backbone.history.start();
