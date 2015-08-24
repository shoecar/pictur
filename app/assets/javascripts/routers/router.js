Pictur.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$root = options.$root;
    this.photos = options.photos;
  },

  routes: {
    '': 'photoIndex',
    'user/:id/:target': 'userShow',
    'photo/filter/:id': 'photoFilter',
    'photo/:id': 'photoShow',
    'album/new': 'albumNew',
    'album/edit/:id': 'albumEdit'
  },

  photoIndex: function () {
    var photos = new Pictur.Collections.Photos();
    photos.fetch();
    var view = new Pictur.Views.PhotoIndex({ collection: photos, userId: 0 });
    this._swapView(view);
  },

  userShow: function (id, target) {
    var user = new Pictur.Models.User({ id: id });
    user.fetch();
    var view = new Pictur.Views.UserShow({ model: user, target: target });
    this._swapView(view);
  },

  photoFilter: function (id) {
    var photo = new Pictur.Models.Photo({ id: id });
    photo.fetch();
    var view = new Pictur.Views.PhotoFilter({ model: photo });
    this._swapView(view);
  },

  photoShow: function (id) {
    var photo = new Pictur.Models.Photo({ id: id });
    photo.fetch();
    var view = new Pictur.Views.PhotoShow({ model: photo });
    this._swapView(view);
  },

  albumNew: function () {
    bootbox.prompt("Give your album a name", function(result) {
      if (result === null || result === '') {
        return;
      } else {
        var album = new Pictur.Models.Album({ user_id: CURRENTUSER.id, name: result });
        album.save();
        var view = new Pictur.Views.AlbumBuild({ model: album });
        this._swapView(view);
      }
    }.bind(this));
  },

  albumEdit: function (id) {
    var album = new Pictur.Models.Album({ id: id });
    album.fetch();
    var view = new Pictur.Views.AlbumBuild({ model: album });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$root.html(view.render().$el);
    $.scrollTo(0, 500);
  }
});
