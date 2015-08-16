Pictur.Views.CommentIndex = Backbone.View.extend({
  template: JST['comment/index'],
  className: 'comment-index',

  render: function () {
    this.$el.html(this.template({ comments: this.collection }));
    return this;
  }
});
