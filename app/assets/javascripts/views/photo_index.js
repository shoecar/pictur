Pictur.Views.PhotoIndex = Backbone.CompositeView.extend({
  template: JST['photo/index'],
  className: 'photo-index',

  initialize: function (options) {
    this.photos = options.photos;
    this.listenTo(this.photos, 'add change remove reset', this.render);
    this.listenTo(this.photos, 'add', this.addPhotoItem);
    this.photos.each(this.addPhotoItem.bind(this));
    if (options.users) {
      this.users = options.users;
      this.listenTo(this.users, 'add change remove reset', this.render);
    }
  },


  addPhotoItem: function (photo) {
    if (this.users) {
      var user = this.users.getOrFetch(photo.get('user_id'));
    }
    var subView = new Pictur.Views.PhotoItem({ model: photo, collection: this.photos });
    this.addSubview('.photos', subView);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});
