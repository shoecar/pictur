Pictur.Views.CommentItem = Backbone.View.extend({
  template: JST['comment/item'],
  
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
