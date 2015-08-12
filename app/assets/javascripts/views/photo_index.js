Pictur.Views.PhotoIndex = Backbone.CompositeView.extend({
  template: JST['photo/index'],
  className: 'photo-index',

  initialize: function (options) {
    this.photos = options.photos;
    this.users = options.users;
    this.listenTo(this.photos, 'sync remove', this.render);
    this.listenTo(this.photos, 'add', this.addPhotoItem);
    this.photos.each(this.addPhotoItem.bind(this));
  },

  addPhotoItem: function (photo) {
    if (this.users) {
      var user = this.users.getOrFetch(photo.get('user_id'));
    }
    var subView = new Pictur.Views.PhotoItem({ photo: photo, user: user });
    this.addSubview('.photos', subView);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});
