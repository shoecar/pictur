Pictur.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/show'],
  className: 'user-show col-xs-12',

  initialize: function () {
    this.photos = this.model.photos();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.addPhotoView);
    this.listenTo(this.model, 'sync', this.addCommentView);
  },

  addPhotoView: function () {
    var subView = new Pictur.Views.PhotoIndex({ collection: this.photos });
    this.addSubview('#user-photos', subView);
  },

  addCommentView: function () {
    var subView = new Pictur.Views.CommentIndex({ collection: this.model.comments() });
    this.addSubview('#user-comments', subView);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();
    return this;
  }
});
