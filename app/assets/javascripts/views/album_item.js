Pictur.Views.AlbumItem = Backbone.View.extend({
  template: JST['album/item'],
  className: 'album-item',

  render: function () {
    this.$el.html(this.template({ album: this.model, photos: this.model.photos() }));
    this.loadCarousel();
    return this;
  },

  loadCarousel: function () {
    this.$el.find('.slick-carousel').imagesLoaded(function () {
      this.$el.find('.slick-carousel').slick({
        variableWidth: true,
        centerMode: true,
        prevArrow: this.$el.find('.album-left-arrow'),
        nextArrow: this.$el.find('.album-right-arrow'),
        focusOnSelect: false
      });
    }.bind(this));
  }
});
