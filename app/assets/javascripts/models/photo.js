Pictur.Models.Photo = Backbone.Model.extend({
  urlRoot: '/api/photos',

  parse: function (response) {
    if (response.user) {
      this.user().set(response.user);
      delete response.user;
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

  user: function () {
    if (!this._user) {
      this._user = new Pictur.Models.User();
    }
    return this._user;
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
