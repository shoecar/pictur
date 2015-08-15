Pictur.Views.PhotoShow = Backbone.View.extend({
  template: JST['photo/show'],
  tagName: 'div',
  className: 'photo',

  initialize: function (options) {
    this.user = this.model.user();
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.user, 'sync', this.render);
  },

  events: {
    'click .delete-photo': 'destroyPhoto',
    'click .change-title': 'changeTitle',
    'keypress .photo-title input': 'ifEnter',
    'blur .photo-title': 'updateTitle',
    'click .change-description': 'changeDescription',
    'blur .photo-description': 'updateDescription'
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model, user: this.user }));
    $('.navbar').fadeOut('fast');
    $('.fullscreen').fadeIn('fast');
    $('.pop-window').imagesLoaded(function () {
      $('.pop-window').slideDown().css('top', $(window).scrollTop() + 'px');
    });
    return this;
  },

  destroyPhoto: function (e) {
    this.model.destroy();
    this.closeWindow();
  },

  changeTitle: function (e) {
    if (CURRENTUSER.id === this.model.get('user_id')) {
      var text = this.model.escape('title');
      $('.photo .photo-title').html('<input type="text" value="' + text + '">');
      $('.photo .photo-title').find('input').putCursorAtEnd();
    }
  },

  updateTitle: function (e) {
    this.model.set({ title: e.target.value });
    this.model.save();
  },

  changeDescription: function (e) {
    if (CURRENTUSER.id === this.model.get('user_id')) {
      var text = this.model.escape('description');
      $('.photo .photo-description').html('<textarea rows="4">' + text + '</textarea>');
      $('.photo .photo-description').find('textarea').putCursorAtEnd();
    }
  },

  updateDescription: function (e) {
    this.model.set({ description: e.target.value });
    this.model.save();
  },

  ifEnter: function (e) {
    if (e.keyCode === 13) {
      e.currentTarget.blur();
    }
  },

  closeWindow: function () {
    $('.navbar').fadeIn('fast');
    $('.fullscreen').fadeOut('fast');
    $('.pop-window').slideUp('fast');
    this.remove();
  }
});
