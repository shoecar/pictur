Pictur.Views.AlbumBuild = Backbone.View.extend({
  template: JST['album/build'],
  className: 'album-build',

  initialize: function (options) {
    this.user = new Pictur.Models.User({ id: CURRENTUSER.id });
    this.user.fetch();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.user, 'sync', this.render);
  },

  events: {
    'click .build-album': 'buildAlbum'
  },

  render: function () {
    this.generateCollections();
    this.$el.html(this.template({ album: this.model, albumPhotos: this.albumPhotos, otherPhotos: this.otherPhotos }));
    return this;
  },

  buildAlbum: function (e) {
    e.preventDefault();
  },

  generateCollections: function () {
    this.albumPhotos = this.model.photos();
    this.otherPhotos = this.user.photos();
    this.otherPhotos.remove(this.albumPhotos.models);
  }
});
