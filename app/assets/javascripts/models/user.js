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

  votings: function () {
    if (!this._votings) {
      this._votings = new Pictur.Collections.Votings();
    }
    return this._votings;
  }
});
