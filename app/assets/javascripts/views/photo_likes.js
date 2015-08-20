Pictur.Views.PhotoLikes = Backbone.View.extend({
  template: JST['photo/likes'],
  className: 'photo-likes',

  render: function () {
    this.$el.html(this.template({ photos: this.collection, isFirst: true }));
    return this;
  }
});
