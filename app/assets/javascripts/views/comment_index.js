Pictur.Views.CommentIndex = Backbone.View.extend({
  template: JST['comment/index'],
  className: 'comment-index',

  initialize: function (options) {
    this.listenTo(this.collection, 'sync add remove', this.render.bind(this, true));
  },

  events: {
    'click .delete-comment': 'deleteComment'
  },

  render: function (rerender) {
    this.collection.comparator = (function (comment) {
      return -comment.get('id');
    });
    this.collection.sort();
    this.$el.html(this.template({ comments: this.collection }));
    if (rerender) {
      $(".first-comment").css('display', 'none').fadeIn({ duration: 1000, easing: 'easeOutQuad'});
    }
    return this;
  },

  deleteComment: function (e) {
    e.preventDefault();
    e.currentTarget.blur();
  }
});
