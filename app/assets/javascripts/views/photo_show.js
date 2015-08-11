Pictur.Views.PhotoShow = Backbone.View.extend({
  template: JST['photo/show'],
  className: 'photo',

  initialize: function (options) {
    this.listenTo(this.photo, 'sync', this.render);
    this.listenTo(this.user, 'sync', this.render);
    this.photo = options.photo;
    this.user = options.user
  },

  events: {
    'click .delete-photo': 'destroyPhoto'
  },

  render: function () {
    this.$el.html(this.template({ photo: this.photo, user: this.user }));
    return this;
  },

  destroyPhoto: function () {
    this.model.destroy();
    Backbone.history.navigate('', { trigger: true });
  }
});
