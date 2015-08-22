Pictur.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['user/show'],
  className: 'user-show col-xs-12',

  initialize: function (options) {
    this.target = options.target;
    if (this.target === 'photos') {
      this.listenTo(this.model, 'sync', this.addPhotoView);
    }
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.addAlbumView);
    this.listenTo(this.model, 'sync', this.addCommentView);
    this.listenTo(this.model, 'sync', this.addVotingView);
  },

  events: {
    'click .scrollBottom': 'scrollBottom',
    'click #user-albums': 'startCarousel',
    'mouseover #likes-carousel': 'controlIn',
    'mouseover .user-tabs': 'controlOut',
    'click .user-tab': 'changeRoute',
    'click #photos-tab': 'addPhotoView'
  },

  addPhotoView: function () {
    if (this.$el.find('#masonry-container').length > 0) { return; }
    var subView = new Pictur.Views.PhotoIndex({ collection: this.model.photos(), userId: this.model.get('id') });
    this.addSubview('#user-photos', subView);
    subView.sortPhotos();
  },

  addAlbumView: function () {
    var subView = new Pictur.Views.AlbumIndex({ collection: this.model.albums() });
    this.addSubview('#user-albums', subView);
  },

  addCommentView: function () {
    var subView = new Pictur.Views.CommentIndex({ collection: this.model.comments(), forPhoto: false });
    this.addSubview('#user-comments', subView);
  },

  addVotingView: function () {
    var subView = new Pictur.Views.PhotoLikes({ collection: this.model.votings() });
    this.addSubview('#user-votings', subView);
  },

  render: function () {
    this.$el.html(this.template({ user: this.model }));
    this.showTab();
    this.attachSubviews();
    this.setBG();
    return this;
  },

  showTab: function () {
    $(this.$el.find('.' + this.target)).addClass('active');
    $(this.$el.find('#user-' + this.target)).addClass('active');
  },

  changeRoute: function (e) {
    e.preventDefault();
    switch ($(e.currentTarget).attr('href')) {
      case '#user-photos':
        Backbone.history.navigate('#user/' + this.model.get('id') + '/photos');
        break;
      case '#user-albums':
        Backbone.history.navigate('#user/' + this.model.get('id') + '/albums');
        break;
      case '#user-comments':
        Backbone.history.navigate('#user/' + this.model.get('id') + '/comments');
        break;
      case '#user-votings':
        Backbone.history.navigate('#user/' + this.model.get('id') + '/votings');
        break;
    }
  },

  controlIn: function (e) {
    e.preventDefault();
    $(this.$el.find('.carousel-control.left')).fadeIn();
    $(this.$el.find('.carousel-control.right')).fadeIn();
  },

  controlOut: function (e) {
    e.preventDefault();
    $(this.$el.find('.carousel-control.left')).fadeOut();
    $(this.$el.find('.carousel-control.right')).fadeOut();
  },

  scrollBottom: function (e) {
    e.preventDefault();
    window.setTimeout(function() {
      $.scrollTo($('.carousel-inner'), {duration: 1000, easing: 'easeOutQuad'}),
      500
    });
  },

  setBG: function () {
    this.$el.find('.user-main').css('min-height', $(window).height() - this.$el.find('.user-main').offset().top + 'px');
  }
});
