Pictur.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$root = options.$root;
    this.photos = options.photos;
  },

  routes: {
    '': 'photoIndex',
    'user/:id': 'userShow',
    'album/new': 'albumNew',
    'album/edit/:id': 'albumEdit'
  },

  photoIndex: function () {
    var photos = new Pictur.Collections.Photos();
    var view = new Pictur.Views.PhotoIndex({ collection: photos, userId: 0 });
    photos.fetch();
    this._swapView(view);
  },

  userShow: function (id) {
    var user = new Pictur.Models.User({ id: id });
    user.fetch();
    var view = new Pictur.Views.UserShow({ model: user });
    this._swapView(view);
  },

  albumNew: function () {
    var album = new Pictur.Models.Album();
    var view = new Pictur.Views.AlbumBuild({ model: album });
    this._swapView(view);
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
  },

  _loadMasonry: function () {
    var $grid = $('#masonry-container').imagesLoaded(function () {
      $grid.prepend($('<div class="photo-sizer"></div>'));
      $grid.masonry({
        itemSelector: '.photo-item',
        percentPosition: true,
        columnWidth: '.photo-sizer'
      });
    });
  },
});
