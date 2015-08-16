Pictur.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  parse: function (response) {
    if (response.photos) {
      this.photos().set(response.photos);
      delete response.photos;
    }
    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }
    return response
  },

  photos: function () {
    if (!this._photos) {
      this._photos = new Pictur.Collections.Photos();
    }
    return this._photos;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new Pictur.Collections.Comments();
    }
    return this._comments;
  }
});
