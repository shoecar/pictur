Pictur.Views.PhotoItem = Backbone.View.extend({
  template: JST['photo/item'],
  tagName: 'li',
  className: 'photo-item',

  initialize: function (options) {
    this.photo = options.photo;
    this.user = options.user;
    this.listenTo(this.photo, 'sync', this.render);
    if (this.user) {
      this.listenTo(this.user, 'sync', this.render);
    }
  },

  render: function () {
    this.$el.html(this.template({ photo: this.photo, user: this.user }));
    return this;
  }
});
