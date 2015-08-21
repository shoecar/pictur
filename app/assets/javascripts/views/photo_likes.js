Pictur.Views.PhotoLikes = Backbone.View.extend({
  template: JST['photo/likes'],
  className: 'photo-likes',

  render: function () {
    this.$el.html(this.template({ photos: this.collection, isFirst: true }));
    this.applyFilters();
    return this;
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
