Pictur.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$root = options.$root;
    this.photos = new Pictur.Collections.Photos();
    this.users = new Pictur.Collections.Users();
    this.mainNav();
    this.backRoute = "#";

    $('.close-window').click(this._closeWindow);
    $('.fullscreen').click(this._closeWindow);
  },

  routes: {
    '': 'photoIndex',
    'photo/new': 'photoNew',
    'photo/:id': 'photoShow',
    'user/:id': 'userShow',
    'photo/:id/edit': 'photoEdit'
  },

  mainNav: function () {
    var view = new Pictur.Views.MainNav();
    $('.main-nav').append(view.render().$el);
  },

  photoIndex: function () {
    this.photos.fetch();
    var view = new Pictur.Views.PhotoIndex({ photos: this.photos, users: this.users });
    this._swapView(view);
  },

  photoShow: function (id) {
    var photo = this.photos.getOrFetch(id);
    var user = this.users.getOrFetch(photo.get('user_id'));
    var view = new Pictur.Views.PhotoShow({ photo: photo, user: user });
    this._newWindow(view);
  },

  photoNew: function () {
    var photo = new Pictur.Models.Photo();
    var view = new Pictur.Views.PhotoForm({ model: photo, collection: this.photos });
    this._newWindow(view);
  },

  photoEdit: function (id) {
    var photo = this.photos.getOrFetch(id);
    var view = new Pictur.Views.PhotoForm({ model: photo, collection: this.photos });
    this._newWindow(view);
  },

  userShow: function (id) {
    var user = this.users.getOrFetch(id);
    var photos = user.photos();
    var view = new Pictur.Views.UserShow({ model: user, collection: photos });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentWindow && this._closeWindow();
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$root.html(view.render().$el);
    this.backRoute = '#' + Backbone.history.getFragment();
    console.log(this.backRoute);
  },

  _newWindow: function (view) {
    if (this._currentWindow) {
      this._currentWindow.remove();
    } else {
      $('.fullscreen').css('display', 'block');
      $('.window').css('display', 'block');
    }
      this._currentWindow = view;
      $('.content').html(view.render().$el);
  },

  _closeWindow: function () {
    this._currentWindow && this._currentWindow.remove()
    this._currentWindow = null;
    $('.fullscreen').css('display', 'none');
    $('.window').css('display', 'none');
    Backbone.history.navigate(this.backRoute, { trigger: true });
  }
});
