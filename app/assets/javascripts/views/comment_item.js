Pictur.Views.CommentItem = Backbone.View.extend({
  template: JST['comment/item'],
  className: 'comment-wrap col-xs-12 col-sm-10 col-sm-offset-1',

  initialize: function (options) {
    this.photo = options.photo
    this.forPhoto = options.forPhoto
  },

  events: {
    'click .delete-comment': 'deleteComment'
  },

  render: function () {
    this.$el.html(this.template({ comment: this.model, forPhoto: this.forPhoto }));
    return this;
  },

  deleteComment: function (e) {
    e.preventDefault();
    e.currentTarget.blur();
    bootbox.confirm("Are you sure you want to delete this comment?", function(result) {
      if (result) {
        this.$el.fadeOut({ duration: 1000, easing: 'easeOutQuad', complete: function () {
            if (this.photo) {
              this.photo.set({ comments: this.photo.attributes.comments -= 1 });
              this.photo.trigger('change');
            }
            this.model.destroy();
          }.bind(this)
        });
      }
    }.bind(this));
  }
});
