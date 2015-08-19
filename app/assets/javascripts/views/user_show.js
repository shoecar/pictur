Pictur.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/show'],
  className: 'user-show col-xs-12',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.addPhotoView);
    this.listenTo(this.model, 'sync', this.addCommentView);
    this.listenTo(this.model, 'sync', this.addVotingView);
  },

  addPhotoView: function () {
    var subView = new Pictur.Views.PhotoIndex({ collection: this.model.photos() });
    this.addSubview('#user-photos', subView);
  },

  addCommentView: function () {
    var subView = new Pictur.Views.CommentIndex({ collection: this.model.comments(), forPhoto: false });
    this.addSubview('#user-comments', subView);
  },

  addVotingView: function () {
    var subView = new Pictur.Views.PhotoIndex({ collection: this.model.votings(), userId: this.model.get('id') });
    this.addSubview('#user-votings', subView);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();
    return this;
  }
});
