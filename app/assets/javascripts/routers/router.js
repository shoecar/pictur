Pictur.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$root = options.$root;
    this.photos = options.photos;

    $('.close-window').click(this._closeWindow);
    $('.fullscreen').click(this._closeWindow);
  },

  routes: {
    '': 'photoIndex',
    'user/:id': 'userShow'
  },

  mainNav: function () {
    var view = new Pictur.Views.MainNav();
    $('.main-nav').append(view.render().$el);
  },

  photoIndex: function () {
    var photos = new Pictur.Collections.Photos();
    photos.fetch();
    var view = new Pictur.Views.PhotoIndex({ photos: photos });
    this._swapView(view);
  },

  userShow: function (id) {
    var user = new Pictur.Models.User({ id: id });
    user.fetch();
    var view = new Pictur.Views.UserShow({ model: user });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._closeWindow();
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$root.html(view.render().$el);
  },

  _closeWindow: function () {
    $('.navbar').fadeIn('fast');
    $('.fullscreen').fadeOut('fast');
    $('.pop-window').slideUp('fast');
  }
});
