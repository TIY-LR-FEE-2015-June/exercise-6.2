var teachers = new Backbone.Collection([
  {
    id: 1,
    name: 'Ryan',
  },
  {
    id: 2,
    name: 'Daniel',
  },
]);

var Router = Backbone.Router.extend({
  initialize: function() {
    this.collection = teachers;

    this.mainView = new AppView({
      collection: this.collection,
    });

    $('#target').html(this.mainView.el);
  },

  routes: {
    '': 'index',
    ':id': 'show',
  },

  index: function() {
    $('.content').html('<h2>Pick a Teacher</h2>');
  },

  show: function(id) {
    var model = this.collection.get(id);

    var view = new DetailView({
      model: model,
    });

    $('.content').html(view.el);
  },
});

new Router();

Backbone.history.start();
