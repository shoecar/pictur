Pictur.Collections.Photos = Backbone.Collection.extend({
  url: '/api/photos',
  model: Pictur.Models.Photo,

  comparator: function(photo) {
    return -photo.get('id');
  },

  parse: function(response) {
    this.page_number = parseInt(response.page_number);
    this.total_pages = parseInt(response.total_pages);
    return response.models;
  },
});

Pictur.photos = new Pictur.Collections.Photos();
Pictur.photos.fetch({
  data: { page: 1 }
});
