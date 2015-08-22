Pictur.Views.CommentIndex = Backbone.CompositeView.extend({
  template: JST['comment/index'],

  initialize: function (options) {
    this.photo = options.photo
    this.forPhoto = options.forPhoto
    this.collection.sort();
    this.listenTo(this.collection, 'sync sort', this.render);
    this.listenTo(this.collection, 'remove', this.removeCommentItem);
    this.listenTo(this.collection, 'add', this.addCommentItem);
    this.collection.each(this.addCommentItem.bind(this));
  },

  addCommentItem: function (comment) {
    $('.no-comments').remove();
    var subView = new Pictur.Views.CommentItem({ model: comment, photo: this.photo, forPhoto: this.forPhoto });
    subView.$el.fadeIn({ duration: 300, easing: 'easeInQuad' });
    this.addSubview('.comment-index', subView, true);
  },

  removeCommentItem: function (comment) {
    this.removeModelSubview('.comment-index', comment);
  },

  render: function () {
    areComments = this.collection.models.length > 0;
    this.$el.html(this.template({ areComments: areComments }));
    this.attachSubviews();
    return this;
  }
});
