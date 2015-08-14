Pictur.Views.PhotoItem = Backbone.View.extend({
  template: JST['photo/item'],
  tagName: 'div',
  className: 'photo-item',

  initialize: function () {
    this.user = this.model.user();
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .photo-thumb': 'popPhoto'
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model, user: this.user }));
    return this;
  },

  popPhoto: function (e) {
    e.preventDefault();
    var view = new Pictur.Views.PhotoShow({ model: this.model, collection: this.collection });
    $('.pop-content').html(view.render().$el);
  }
});
