Pictur.Models.Album = Backbone.Model.extend({
  urlRoot: '/api/albums',

  parse: function (response) {
    if (response.photos) {
      this.photos().set(response.photos);
      delete response.photos;
    }
    if (response.albumings) {
      this.albumings().set(response.albumings);
      delete response.albumings;
    }
    return response
  },

  photos: function () {
    if (!this._photos) {
      this._photos = new Pictur.Collections.Photos();
    }
    return this._photos;
  },

  albumings: function () {
    if (!this._albumings) {
      this._albumings = new Pictur.Collections.Albumings();
    }
    return this._albumings;
  }
});
