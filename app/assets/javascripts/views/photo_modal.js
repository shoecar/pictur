Pictur.Views.PhotoModal = Backbone.View.extend({
  template: JST['photo/modal'],
  tagName: 'div',
  className: 'photo-modal',

  initialize: function (options) {
    this.user = this.model.user();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.user, 'sync', this.render);
    $(document).on('keyup', this.trackEsc.bind(this));
  },

  events: {
    'click .close-window, .fullscreen': 'closeWindow',
    'click .delete-photo': 'destroyPhoto',
    'click .change-title': 'changeTitle',
    'keypress .photo-title input': 'trackEnter',
    'blur .photo-title': 'updateTitle',
    'click .change-description': 'changeDescription',
    'blur .photo-description': 'updateDescription'
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model, user: this.user }));
    $('.navbar').fadeOut();
    $('.pop-window').imagesLoaded(function () {
      $('.pop-window').css('display', 'block').css('top', $(window).scrollTop() + 'px');
    });

    return this;
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
