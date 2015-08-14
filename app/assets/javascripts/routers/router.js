Pictur.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$root = options.$root;
    this.photos = options.photos;
    this.users = options.users;

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
    this.photos.fetch();
    var view = new Pictur.Views.PhotoIndex({ photos: this.photos });
    this._swapView(view);
  },

  userShow: function (id) {
    var user = this.users.getOrFetch(id);
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
