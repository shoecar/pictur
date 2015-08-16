Pictur.Views.CommentIndex = Backbone.CompositeView.extend({
  template: JST['comment/index'],

  initialize: function (options) {
    this.collection.comparator = (function (comment) {
      return -comment.get('id');
    });
    this.collection.sort();
    this.listenTo(this.collection, 'add', this.addCommentItem);
    this.listenTo(this.collection, 'remove', this.removeCommentItem);
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.each(this.addCommentItem.bind(this));
  },

  events: {
    'click .delete-comment': 'deleteComment'
  },

  addCommentItem: function (comment) {
    var subView = new Pictur.Views.CommentItem({ model: comment });
    this.firstComment = false;
    this.addSubview('.comment-index', subView);
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
