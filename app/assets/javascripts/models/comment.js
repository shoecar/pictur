Pictur.Models.Comment = Backbone.Model.extend({
  urlRoot: '/api/comments',

  comparator: function (comment) {
    return comment.get('id');
  }
});
