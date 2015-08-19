Pictur.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/show'],
  className: 'user-show col-xs-12',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.addPhotoView);
    this.listenTo(this.model, 'sync', this.addCommentView);
    this.listenTo(this.model, 'sync', this.addVotingView);
  },

  events: {
    'click .scrollBottom': 'scrollBottom'
  },

  addPhotoView: function () {
    var subView = new Pictur.Views.PhotoIndex({ collection: this.model.photos(), userId: this.model.get('id') });
    this.addSubview('#user-photos', subView);
  },

  addCommentView: function () {
    var subView = new Pictur.Views.CommentIndex({ collection: this.model.comments(), forPhoto: false });
    this.addSubview('#user-comments', subView);
  },

  addVotingView: function () {
    var subView = new Pictur.Views.PhotoLikes({ collection: this.model.votings() });
    this.addSubview('#user-votings', subView);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.attachSubviews();
    return this;
  },

  scrollBottom: function (e) {
    e.preventDefault();
    window.setTimeout(function() {
      $.scrollTo($('.carousel-inner'), {duration: 1000, easing: 'easeOutQuad'}),
      500
    });
  }
});
