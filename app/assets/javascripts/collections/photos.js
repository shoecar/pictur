Pictur.Collections.Photos = Backbone.Collection.extend({
  url: '/api/photos',
  model: Pictur.Models.Photo,

  comparator: function(photo) {
    return photo.get('created_at');
  },
});
