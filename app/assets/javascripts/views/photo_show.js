Pictur.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photo/show'],
  className: 'photo-show',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.addCommentView);
  },

  events: {
    'click .full-photo': 'toggleSize',
    'click .delete-photo': 'destroyPhoto',
    'click .comment-photo, .submit-comment': 'toggleCommentForm',
    'click .voting-photo': 'toggleVoting',
    'click .filter-photo': 'filterPhoto',
    'click .change-title, .photo-title.can-edit': 'changeTitle',
    'keypress .photo-title input': 'trackEnter',
    'blur .photo-title': 'updateTitle',
    'click .change-description, .photo-description.can-edit': 'changeDescription',
    'blur .photo-description': 'updateDescription'
  },

  render: function () {
    var user = this.model.user();
    this.$el.html(this.template({ photo: this.model, user: user }));
    this.likedModel = this.model.votings().find(function (voting) {
      return voting.get('user_id') === CURRENTUSER.id
    });
    if (this.likedModel) { $('.voting-photo').addClass('is-liked').attr('data-original-title', 'Unlike Photo'); }
    this.attachSubviews();
    this.applyFilters();
    return this;
  },

  addCommentView: function () {
    var subView = new Pictur.Views.CommentIndex({ collection: this.model.comments(), photo: this.model, forPhoto: true });
    this.addSubview('.photo-comments', subView);
  },

  destroyPhoto: function (e) {
    e.preventDefault();
    e.currentTarget.blur();
    bootbox.confirm("Are you sure you want to delete this photo?", function(result) {
      if (result) {
        this.model.destroy();
        $('.tool').tooltip('hide');
        Backbone.history.navigate('user/' + CURRENTUSER.id + '/photos', { trigger: true });
      }
    }.bind(this));
  },

  toggleSize: function (e) {
    e.preventDefault();
    var $photo = this.$el.find('.full-photo');
    if ($photo.css('cursor') === 'zoom-out') {
      $photo.css('cursor', 'zoom-in')
        .css('height', $(window).height() - 50 + 'px')
        .css('width', 'auto');
    } else {
      $photo.css('cursor', '').css('height', '').css('width', '');
    }
  },

  toggleCommentForm: function (e) {
    e.currentTarget.blur();
    $('.photo-comment-form').html('');
    var subView = new Pictur.Views.CommentForm({ collection: this.model.comments(), photoId: this.model.id, itemViewModel: this.model });
    this.addSubview('.photo-comment-form', subView);
    $('.photo-comment-form').slideToggle({ duration: 500, easing: 'easeOutQuad' });
  },

  filterPhoto: function (e) {
    e.preventDefault();
    $('.tool').tooltip('hide');
    Backbone.history.navigate('photo/filter/' + this.model.get('id'), { trigger: true });
  },

  toggleVoting: function (e) {
    e.currentTarget.blur();
    $(e.currentTarget).toggleClass('is-liked');
    if (this.likedModel) {
      this.likedModel.destroy();
      this.likedModel = undefined;
      $('.voting-photo').attr('data-original-title', 'Like Photo')
      this.model.set({ likes: this.model.attributes.likes -= 1 });
    } else {
      var voting = new Pictur.Models.Voting()
      voting.set({
        user_id: CURRENTUSER.id,
        photo_id: this.model.get('id'),
        score: 1
      });
      voting.save();
      this.likedModel = voting;
      $('.voting-photo').attr('data-original-title', 'Unlike Photo')
      this.model.set({ likes: this.model.attributes.likes += 1 });
    }
    this.model.trigger('change');
  },

  changeTitle: function (e) {
    if (CURRENTUSER.id === this.model.get('user_id')) {
      var text = this.model.escape('title');
      $('.photo-title').html('<input type="text" value="' + text + '">');
      $('.photo-title').find('input').putCursorAtEnd();
    }
  },

  updateTitle: function (e) {
    var newTitle = e.target.value;
    if (newTitle.length > 0 && newTitle != '<span>(no title)</span>') {
      this.model.set({ title: newTitle });
      $('.photo-title').html(newTitle);
    } else {
      this.model.set({ title: null });
      $('.photo-title').html('<span>(no title)</span>');
    }
  },

  changeDescription: function (e) {
    if (CURRENTUSER.id === this.model.get('user_id')) {
      var text = this.model.escape('description');
      $('.photo-description').html('<textarea rows="4">' + text + '</textarea>');
      $('.photo-description').find('textarea').putCursorAtEnd();
    }
  },

  updateDescription: function (e) {
    var newDescription = e.target.value;
    if (newDescription.length > 0 && newDescription != '<span>(no description)</span>') {
      this.model.set({ description: newDescription });
      $('.photo-description').html(newDescription);
    } else {
      this.model.set({ description: null });
      $('.photo-description').html('<span>(no description)</span>');
    }
  },

  trackEnter: function (e) {
    if (e.keyCode === 13) {
      e.currentTarget.blur();
    }
  },

  applyFilters: function () {
    filters = this.model.get('filters');
    if (filters) {
      window.filterImage(JSON.parse(filters), this.$el.find('img'));
    }
  }
});
