Pictur.Views.PhotoIndex = Backbone.CompositeView.extend({
  template: JST['photo/index'],
  className: 'photo-index',

  initialize: function () {
    this.listenTo(this.collection, 'sync remove', this.render);
    this.listenTo(this.collection, 'add', this.addPhotoItem);
    this.collection.each(this.addPhotoItem.bind(this));
  },

  addPhotoItem: function (photo) {
    var subView = new Pictur.Views.PhotoItem({ model: photo });
    this.addSubview('.photos', subView);
  },

  render: function () {
    this.$el.html(this.template({ photos: this.collection }));
    this.attachSubviews();
    return this;
  }
});
