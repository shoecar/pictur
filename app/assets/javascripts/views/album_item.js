Pictur.Views.AlbumItem = Backbone.View.extend({
  template: JST['album/item'],
  className: 'album-item',

  render: function () {
    this.$el.html(this.template({ album: this.model, photos: this.model.photos() }));
    this.loadCarousel();
    this.applyFilters();
    return this;
  },

  loadCarousel: function () {
    this.$el.find('.slick-carousel').imagesLoaded(function () {
      this.$el.find('.slick-carousel').slick({
        infinite: true,
        variableWidth: true,
        centerMode: true,
        prevArrow: this.$el.find('.album-left-arrow'),
        nextArrow: this.$el.find('.album-right-arrow'),
        focusOnSelect: false
      });
    }.bind(this));
  },

  applyFilters: function () {
    var photos = this.$el.find('img')
    for (var i = 0; i < photos.length; i++) {
      filters = $(photos[i]).data('filters');
      if (filters) {
        window.filterImage(filters, $(photos[i]));
      }
    };
  }
});
