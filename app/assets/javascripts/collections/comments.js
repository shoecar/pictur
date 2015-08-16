Pictur.Collections.Comments = Backbone.Collection.extend({
  model: Pictur.Models.Comment,

  comparator: function(comment) {
    return comment.id;
  }
});
