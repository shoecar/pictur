Pictur.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$root = options.$root;
    this.photos = options.photos;
  },

  routes: {
    '': 'photoIndex',
    'user/:id': 'userShow'
  },

  photoIndex: function () {
    var photos = new Pictur.Collections.Photos();
    photos.fetch();
    var view = new Pictur.Views.PhotoIndex({ collection: photos });
    this._swapView(view);
  },

  userShow: function (id) {
    var user = new Pictur.Models.User({ id: id });
    user.fetch();
    var view = new Pictur.Views.UserShow({ model: user });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$root.html(view.render().$el);
  }
});
