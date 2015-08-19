Pictur.Collections.Comments = Backbone.Collection.extend({
  url: '/api/comments',
  model: Pictur.Models.Comment,

  comparator: function(comment) {
    return comment.get('id');
  }
});
