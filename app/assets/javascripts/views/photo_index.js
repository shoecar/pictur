Pictur.Views.PhotoIndex = Backbone.CompositeView.extend({
  template: JST['photo/index'],
  className: 'photo-index',

  initialize: function (options) {
    this.listenTo(this.collection, 'add remove', this.render);
    this.listenTo(this.collection, 'add', this.addPhotoItem);
    this.listenTo(this.collection, 'remove', this.removePhotoItem);
    this.collection.each(this.addPhotoItem.bind(this));
  },


  addPhotoItem: function (photo) {
    var subView = new Pictur.Views.PhotoItem({ model: photo, collection: this.collection });
    this.addSubview('#masonry-container', subView);
  },

  removePhotoItem: function (photo) {
    this.removeModelSubview('#masonry-container', photo);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    this.loadMasonry();
    return this;
  },

  loadMasonry: function () {
    var $grid = $('#masonry-container').imagesLoaded(function () {
      $('#masonry-container').prepend($('<div class="photo-sizer"></div>'));
      $grid.masonry({
        itemSelector: '.photo-item',
        percentPosition: true,
        columnWidth: '.photo-sizer'
      });
    });
  }
});
