Pictur.Views.PhotoLikeItem = Backbone.View.extend({
  template: JST['photo/like_item'],
  className: 'item',

  render: function () {
    this.$el.html(this.template({ photo: this.model }));
    return this;
  }
});
