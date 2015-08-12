Pictur.Views.PhotoShow = Backbone.View.extend({
  template: JST['photo/show'],
  tagName: 'div',
  className: 'photo',

  initialize: function (options) {
    this.photo = options.photo;
    this.user = options.user;
    this.listenTo(this.photo, 'sync', this.render);
    this.listenTo(this.user, 'sync', this.render);
  },

  events: {
    'click .delete-photo': 'destroyPhoto',
    'click .fullscreen': 'closeWindow',
    'click .close-window': 'closeWindow'
  },

  render: function () {
    this.$el.html(this.template({ photo: this.photo, user: this.user }));
    return this;
  },

  destroyPhoto: function () {
    this.photo.destroy();
    Backbone.history.navigate('', { trigger: true });
  },

  closeWindow: function () {
    this.remove();
    $('.fullscreen').css('display', 'none');
  }
});
