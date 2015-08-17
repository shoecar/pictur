Pictur.Views.CommentItem = Backbone.View.extend({
  template: JST['comment/item'],
  className: 'comment-wrap col-xs-12 col-sm-10 col-sm-offset-1',

  events: {
    'click .delete-comment': 'deleteComment'
  },

  render: function () {
    this.$el.html(this.template({ comment: this.model }));
    // $('.first').css('display', 'none').fadeIn({ duration: 1000, easing: 'easeOutQuad'});
    return this;
  },

  deleteComment: function (e) {
    e.preventDefault();
    e.currentTarget.blur();
    this.$el.fadeOut('slow', function () {
      this.model.destroy();
    }.bind(this));
  }
});
