Pictur.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  parse: function (response) {
    if (response.photos) {
      this.photos().set(response.photos.reverse());
      delete response.photos;
    }
    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }
    if (response.albums) {
      this.albums().set(response.albums, { parse: true });
      delete response.albums;
    }
    if (response.votings) {
      this.votings().set(response.votings);
      delete response.votings;
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
  },

  albums: function () {
    if (!this._albums) {
      this._albums = new Pictur.Collections.Albums();
    }
    return this._albums;
  },

  votings: function () {
    if (!this._votings) {
      this._votings = new Pictur.Collections.Photos();
    }
    return this._votings;
  }
});
