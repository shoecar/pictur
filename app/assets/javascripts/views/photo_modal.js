Pictur.Views.PhotoModal = Backbone.CompositeView.extend({
  template: JST['photo/modal'],
  tagName: 'div',
  className: 'photo-modal',

  initialize: function (options) {
    this.photo = new Pictur.Models.Photo({ id: this.model.id });
    this.photo.fetch();
    this.listenTo(this.photo, 'sync', this.render);
    this.listenTo(this.photo, 'sync', this.addCommentView);
    $(document).on('keyup', this.trackEsc.bind(this));
  },

  events: {
    'click .close-window, .fullscreen, .close-window-user': 'closeWindow',
    'click .delete-photo': 'destroyPhoto',
    'click .comment-photo, .submit-comment': 'toggleCommentForm',
    'click .voting-photo, .submit-comment': 'toggleVoting',
    'click .change-title, .photo-title.can-edit': 'changeTitle',
    'keypress .photo-title input': 'trackEnter',
    'blur .photo-title': 'updateTitle',
    'click .change-description, .photo-description.can-edit': 'changeDescription',
    'blur .photo-description': 'updateDescription'
  },

  render: function () {
    var user = this.photo.user();
    this.$el.html(this.template({ photo: this.model, user: user }));
    this.likedModel = this.photo.votings().find(function (voting) {
      return voting.get('user_id') === CURRENTUSER.id
    });
    if (this.likedModel) { $('.voting-photo').addClass('is-liked'); }
    $('.pop-window').imagesLoaded(function () {
      $('.pop-window').css('display', 'block').css('top', $(window).scrollTop() + 'px');
    });
    this.attachSubviews();

    return this;
  },

  addCommentView: function () {
    var subView = new Pictur.Views.CommentIndex({ collection: this.photo.comments(), forPhoto: true });
    this.addSubview('.photo-comments', subView);
  },

  destroyPhoto: function (e) {
    e.preventDefault();
    e.currentTarget.blur();
    bootbox.confirm("Are you sure you want to delete this photo?", function(result) {
      if (result) {
        this.model.destroy();
        this.closeWindow();
      }
    }.bind(this));
  },

  toggleCommentForm: function (e) {
    e.currentTarget.blur();
    $('.photo-comment-form').html('');
    var subView = new Pictur.Views.CommentForm({ collection: this.photo.comments(), photoId: this.model.id });
    this.addSubview('.photo-comment-form', subView);
    $('.photo-comment-form').slideToggle({ duration: 500, easing: 'easeOutQuad' });
    $.scrollTo($('.modal-info'), {duration: 1000, easing: 'easeOutQuad'});
  },

  toggleVoting: function (e) {
    e.currentTarget.blur();
    $(e.currentTarget).toggleClass('is-liked');
    if (this.likedModel) {
      this.likedModel.destroy();
      this.likedModel = undefined;
    } else {
      var voting = new Pictur.Models.Voting()
      voting.set({
        user_id: CURRENTUSER.id,
        photo_id: this.photo.get('id'),
        score: 1
      });
      voting.save();
      this.likedModel = voting;
    }
  },

  changeTitle: function (e) {
    if (CURRENTUSER.id === this.model.get('user_id')) {
      var text = this.model.escape('title');
      $('.photo-modal .photo-title').html('<input type="text" value="' + text + '">');
      $('.photo-modal .photo-title').find('input').putCursorAtEnd();
    }
  },

  updateTitle: function (e) {
    var newTitle = e.target.value;
    if (newTitle.length > 0 && newTitle != '<span>(no title)</span>') {
      this.model.set({ title: newTitle });
      this.model.save();
      $('.photo-modal .photo-title').html(newTitle);
    } else {
      this.model.set({ title: null });
      this.model.save();
      $('.photo-modal .photo-title').html('<span>(no title)</span>');
    }
  },

  changeDescription: function (e) {
    if (CURRENTUSER.id === this.model.get('user_id')) {
      var text = this.model.escape('description');
      $('.photo-modal .photo-description').html('<textarea rows="4">' + text + '</textarea>');
      $('.photo-modal .photo-description').find('textarea').putCursorAtEnd();
    }
  },

  updateDescription: function (e) {
    var newDescription = e.target.value;
    if (newDescription.length > 0 && newDescription != '<span>(no description)</span>') {
      this.model.set({ description: newDescription });
      this.model.save();
      $('.photo-modal .photo-description').html(newDescription);
    } else {
      this.model.set({ description: null });
      this.model.save();
      $('.photo-modal .photo-description').html('<span>(no description)</span>');
    }
  },

  trackEnter: function (e) {
    if (e.keyCode === 13) {
      e.currentTarget.blur();
    }
  },

  trackEsc: function (e) {
    if (e.keyCode === 27) {
      this.closeWindow();
    }
  },

  closeWindow: function () {
    this.remove();
  }
});
