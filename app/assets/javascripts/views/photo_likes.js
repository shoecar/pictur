Pictur.Views.PhotoLikes = Backbone.CompositeView.extend({
  template: JST['photo/likes'],
  className: 'photo-likes',

  initialize: function (options) {
    this.firstItem = true;
    this.listenTo(this.collection, 'sync sort', this.render);
    this.listenTo(this.collection, 'remove', this.removeVotingItem);
    this.listenTo(this.collection, 'add', this.addVotingItem);
    this.collection.each(this.addVotingItem.bind(this));
  },

  addVotingItem: function (voting) {
    var subView = new Pictur.Views.PhotoLikeItem({ model: voting });
    this.addSubview('.carousel-inner', subView);
    if (this.firstItem) { subView.$el.addClass('active') };
    this.firstItem = false;
  },

  removeVotingItem: function (voting) {
    this.removeModelSubview('.carousel-inner', voting);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});
