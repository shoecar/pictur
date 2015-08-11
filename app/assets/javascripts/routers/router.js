Pictur.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$root = options.$root;
    this.photos = new Pictur.Collections.Photos();
    this.users = new Pictur.Collections.Users();
  },

  routes: {
    '': 'photoIndex',
    'photo/new': 'photoNew',
    'photo/:id': 'photoShow',
    'user/:id': 'userShow',
    'photo/:id/edit': 'photoEdit'
  },

  photoIndex: function () {
    this.photos.fetch();
    var view = new Pictur.Views.PhotoIndex({ collection: this.photos });
    this._swapView(view);
  },

  photoShow: function (id) {
    var photo = this.photos.getOrFetch(id);
    var user = this.users.getOrFetch(photo.get('user_id'));
    var view = new Pictur.Views.PhotoShow({ photo: photo, user: user });
    this._swapView(view);
  },

  photoNew: function () {
    var photo = new Pictur.Models.Photo();
    var view = new Pictur.Views.PhotoForm({ model: photo, collection: this.photos });
    this._swapView(view);
  },

  photoEdit: function (id) {
    var photo = this.photos.getOrFetch(id);
    var view = new Pictur.Views.PhotoForm({ model: photo, collection: this.photos });
    this._swapView(view);
  },

  userShow: function (id) {
    var user = this.users.getOrFetch(id);
    var photos = user.photos();
    var view = new Pictur.Views.UserShow({ model: user, collection: photos });
    this._swapView(view);
  },

  _swapView = function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$root.html(view.render().$el);
  }
});
