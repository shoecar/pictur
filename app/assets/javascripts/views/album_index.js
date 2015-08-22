Pictur.Views.AlbumIndex = Backbone.CompositeView.extend({
  template: JST['album/index'],

  initialize: function (options) {
    this.listenTo(this.collection, 'sync sort', this.render);
    this.listenTo(this.collection, 'remove', this.removeAlbumItem);
    this.listenTo(this.collection, 'add', this.addAlbumItem);
    this.collection.each(this.addAlbumItem.bind(this));
  },

  addAlbumItem: function (album) {
    var subView = new Pictur.Views.AlbumItem({ model: album, collection: this.collection });
    this.addSubview('.album-index', subView, true);
  },

  removeAlbumItem: function (album) {
    this.removeModelSubview('.album-index', album);
  },

  render: function () {
    var areAlbums = this.collection.length > 0;
    this.$el.html(this.template({ areAlbums: areAlbums }));
    this.attachSubviews();
    return this;
  }
});
