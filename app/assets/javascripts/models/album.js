Pictur.Models.Album = Backbone.Model.extend({
  urlRoot: '/api/albums',

  parse: function (response) {
    if (response.photos) {
      this.photos().set(response.photos);
      delete response.photos;
    }
    return response
  },

  photos: function () {
    if (!this._photos) {
      this._photos = new Pictur.Collections.Photos();
    }
    return this._photos;
  }
});
