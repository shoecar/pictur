Pictur.Models.Photo = Backbone.Model.extend({
  urlRoot: '/api/photos',

  parse: function (response) {
    if (response.user) {
      this.user().set(response.user);
      delete response.user;
    }
    return response
  },

  user: function () {
    if (!this._user) {
      this._user = new Pictur.Models.User();
    }
    return this._user;
  }
});
