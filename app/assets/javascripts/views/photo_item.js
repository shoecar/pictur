Pictur.Views.PhotoItem = Backbone.View.extend({
  template: JST['photo/item'],
  tagName: 'div',
  className: 'photo-item',

  initialize: function () {
    this.user = this.model.user();
    this.listenTo(this.model, 'sync change', this.render);
  },

  events: {
    'click .photo-thumb': 'createModal'
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model, user: this.user }));
    return this;
  },

  createModal: function (e) {
    e.preventDefault();
    var view = new Pictur.Views.PhotoModal({ model: this.model, collection: this.collection });
    $('body').append(view.render().$el);
  }
});
