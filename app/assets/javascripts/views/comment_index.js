Pictur.Views.CommentIndex = Backbone.CompositeView.extend({
  template: JST['comment/index'],

  initialize: function (options) {
    this.forPhoto = options.forPhoto
    this.collection.sort();
    this.listenTo(this.collection, 'sync sort', this.render);
    this.listenTo(this.collection, 'remove', this.removeCommentItem);
    this.listenTo(this.collection, 'add', this.addCommentItem);
    this.collection.each(this.addCommentItem.bind(this));
  },

  events: {
    'click .delete-comment': 'deleteComment'
  },

  addCommentItem: function (comment) {
    $('.no-comments').remove();
    var subView = new Pictur.Views.CommentItem({ model: comment, forPhoto: this.forPhoto });
    this.firstComment = false;
    this.addSubview('.comment-index', subView, true);
  },

  removeCommentItem: function (photo) {
    this.removeModelSubview('.comment-index', photo);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});
