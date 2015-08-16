Pictur.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/show'],
  className: 'user-show',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.addPhotoView();
  },

  addPhotoView: function () {
    var subView = new Pictur.Views.PhotoIndex({ collection: this.model.photos() });
    this.addSubview('#user-photos', subView);
  },

  addCommentView: function () {
    var subView = new Pictur.Views.CommentIndex({ collection: this.model.comments() });
    this.addSubview('#user-comments', subView);
  },

  render: function () {
    this.addCommentView();
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();
    return this;
  }
});
