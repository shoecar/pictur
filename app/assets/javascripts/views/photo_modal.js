Pictur.Views.PhotoModal = Backbone.CompositeView.extend({
  template: JST['photo/modal'],
  tagName: 'div',
  className: 'photo-modal',

  initialize: function (options) {
    this.photo = new Pictur.Models.Photo({ id: this.model.id });
    this.photo.fetch();
    this.listenTo(this.photo, 'sync', this.render);
    $(document).on('keyup', this.trackEsc.bind(this));
  },

  events: {
    'click .close-window, .fullscreen, .close-window-user': 'closeWindow',
    'click .delete-photo': 'destroyPhoto',
    'click .change-title': 'changeTitle',
    'keypress .photo-title input': 'trackEnter',
    'blur .photo-title': 'updateTitle',
    'click .change-description': 'changeDescription',
    'blur .photo-description': 'updateDescription'
  },

  render: function () {
    user = this.photo.user();
    this.addCommentView();
    this.$el.html(this.template({ photo: this.model, user: user }));
    $('.navbar').fadeOut();
    $('.pop-window').imagesLoaded(function () {
      $('.pop-window').css('display', 'block').css('top', $(window).scrollTop() + 'px');
    });
    this.attachSubviews();

    return this;
  },

  addCommentView: function () {
    var subView = new Pictur.Views.CommentIndex({ collection: this.photo.comments() });
    this.addSubview('.photo-comments', subView);
  },

  destroyPhoto: function (e) {
    e.preventDefault();
    this.model.destroy();
    this.closeWindow();
  },

  changeTitle: function (e) {
    if (CURRENTUSER.id === this.model.get('user_id')) {
      var text = this.model.escape('title');
      $('.photo-modal .photo-title').html('<input type="text" value="' + text + '">');
      $('.photo-modal .photo-title').find('input').putCursorAtEnd();
    }
  },

  updateTitle: function (e) {
    this.model.set({ title: e.target.value });
    this.model.save();
    $('.photo-modal .photo-title').html(e.target.value);
  },

  changeDescription: function (e) {
    if (CURRENTUSER.id === this.model.get('user_id')) {
      var text = this.model.escape('description');
      $('.photo-modal .photo-description').html('<textarea rows="4">' + text + '</textarea>');
      $('.photo-modal .photo-description').find('textarea').putCursorAtEnd();
    }
  },

  updateDescription: function (e) {
    this.model.set({ description: e.target.value });
    this.model.save();
    $('.photo-modal .photo-description').html(e.target.value);
  },

  trackEnter: function (e) {
    if (e.keyCode === 13) {
      e.currentTarget.blur();
    }
  },

  trackEsc: function (e) {
    if (e.keyCode === 27) {
      this.closeWindow();
    }
  },

  closeWindow: function () {
    $('.navbar').fadeIn('fast');
    this.remove();
  }
});
