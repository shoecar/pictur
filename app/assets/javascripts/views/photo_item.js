Pictur.Views.PhotoItem = Backbone.View.extend({
  template: JST['photo/item'],
  tagName: 'li',
  className: 'photo-item',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model }));
    return this;
  }
});
