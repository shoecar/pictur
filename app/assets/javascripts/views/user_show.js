Pictur.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/show'],
  className: 'user',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addPhotoView)
    this.addPhotoView.bind(this);
  },

  addPhotoView: function () {
    var subView = new Pictur.Views.PhotoIndex({ collection: this.collection });
    this.addSubview('.photos', subView);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();
    return this;
  }
});
