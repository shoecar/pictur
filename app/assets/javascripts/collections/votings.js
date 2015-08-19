Pictur.Collections.Votings = Backbone.Collection.extend({
  url: '/api/votings',
  model: Pictur.Models.Voting,

  comparator: function(comment) {
    return comment.get('id');
  }
});
