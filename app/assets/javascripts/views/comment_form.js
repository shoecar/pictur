Pictur.Views.CommentForm = Backbone.View.extend({
  template: JST['comment/form'],
  className: 'comment-form',

  initialize: function (options) {
    this.photoId = options.photoId;
  },

  events: {
    'click .submit-comment': 'addComment'
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  addComment: function () {
    var body = $('.photo-comment-field').val();
    var comment = new Pictur.Models.Comment({
                    body: body,
                    photo_id: this.photoId,
                    user_id: CURRENTUSER.id,
                    username: CURRENTUSER.username
                  });
    comment.save();
    this.collection.add(comment);
  }
});
