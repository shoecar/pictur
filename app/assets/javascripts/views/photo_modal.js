Pictur.Views.PhotoModal = Backbone.CompositeView.extend({
  template: JST['photo/modal'],
  tagName: 'div',
  className: 'photo-modal',

  initialize: function (options) {
    this.photo = new Pictur.Models.Photo({ id: this.model.id });
    this.photo.fetch();
    this.listenTo(this.photo, 'sync', this.render);
    this.listenTo(this.photo, 'sync', this.addCommentView);
  },

  events: {
    'click .close-window, .fullscreen, .close-window-user': 'closeWindow',
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
    var user = this.photo.user();
    this.$el.html(this.template({ photo: this.photo, user: user }));
    $('#spinner-load').stop(true, true).fadeIn(300);
    this.likedModel = this.photo.votings().find(function (voting) {
      return voting.get('user_id') === CURRENTUSER.id
    });
    if (this.likedModel) { $('.voting-photo').addClass('is-liked').attr('data-original-title', 'Unlike Photo'); }
    this.attachSubviews();
    $('.pop-window').imagesLoaded(function () {
      $('#spinner-load').stop(true, true).css('display', 'none');
      $('.pop-window').fadeIn(600).css('top', $(window).scrollTop() + 'px');
    });
    this.applyFilters();
    return this;
  },

  addCommentView: function () {
    var subView = new Pictur.Views.CommentIndex({ collection: this.photo.comments(), photo: this.model, forPhoto: true });
    this.addSubview('.photo-comments', subView);
  },

  destroyPhoto: function (e) {
    e.preventDefault();
    e.currentTarget.blur();
    bootbox.confirm("Are you sure you want to delete this photo?", function(result) {
      if (result) {
        this.$el.fadeOut({ duration: 500, easing: 'easeOutQuad',
          complete: function () {
            this.model.destroy();
            this.closeWindow();
          }.bind(this)
        });
      }
    }.bind(this));
  },

  toggleCommentForm: function (e) {
    e.currentTarget.blur();
    $('.photo-comment-form').html('');
    var subView = new Pictur.Views.CommentForm({ collection: this.photo.comments(), photoId: this.photo.id, itemViewModel: this.model });
    this.addSubview('.photo-comment-form', subView);
    $('.photo-comment-form').slideToggle({ duration: 500, easing: 'easeOutQuad' });
    $.scrollTo($('.modal-info'), {duration: 1000, easing: 'easeOutQuad'});
  },

  filterPhoto: function (e) {
    e.preventDefault();
    this.closeWindow();
    $.scrollTo(0, 500);
    Backbone.history.navigate('photo/filter/' + this.model.get('id'), { trigger: true });
  },

  toggleVoting: function (e) {
    e.currentTarget.blur();
    $(e.currentTarget).toggleClass('is-liked');
    if (this.likedModel) {
      this.likedModel.destroy();
      this.likedModel = undefined;
      $('.voting-photo').attr('data-original-title', 'Like Photo')
      this.model.set({ votings_score: this.model.attributes.votings_score -= 1 });
    } else {
      var voting = new Pictur.Models.Voting()
      voting.set({
        user_id: CURRENTUSER.id,
        photo_id: this.photo.get('id'),
        score: 1
      });
      voting.save();
      this.likedModel = voting;
      $('.voting-photo').attr('data-original-title', 'Unlike Photo')
      this.model.set({ votings_score: this.model.attributes.votings_score += 1 });
    }
    this.model.trigger('change');
  },

  changeTitle: function (e) {
    if (CURRENTUSER.id === this.photo.get('user_id')) {
      var text = this.photo.escape('title');
      $('.photo-modal .photo-title').html('<input type="text" value="' + text + '">');
      $('.photo-modal .photo-title').find('input').putCursorAtEnd();
    }
  },

  updateTitle: function (e) {
    var newTitle = e.target.value;
    if (newTitle.length > 0 && newTitle != '<span>(no title)</span>') {
      this.photo.set({ title: newTitle });
      $('.photo-modal .photo-title').html(newTitle);
    } else {
      this.photo.set({ title: null });
      $('.photo-modal .photo-title').html('<span>(no title)</span>');
    }
  },

  changeDescription: function (e) {
    if (CURRENTUSER.id === this.photo.get('user_id')) {
      var text = this.photo.escape('description');
      $('.photo-modal .photo-description').html('<textarea rows="4">' + text + '</textarea>');
      $('.photo-modal .photo-description').find('textarea').putCursorAtEnd();
    }
  },

  updateDescription: function (e) {
    var newDescription = e.target.value;
    if (newDescription.length > 0 && newDescription != '<span>(no description)</span>') {
      this.photo.set({ description: newDescription });
      $('.photo-modal .photo-description').html(newDescription);
    } else {
      this.photo.set({ description: null });
      $('.photo-modal .photo-description').html('<span>(no description)</span>');
    }
  },

  trackEnter: function (e) {
    if (e.keyCode === 13) {
      e.currentTarget.blur();
    }
  },

  closeWindow: function () {
    this.photo.save();
    $('.tool').tooltip('hide');
    this.remove();
  },

  applyFilters: function () {
    filters = this.model.get('filters');
    if (filters) {
      window.filterImage(JSON.parse(filters), this.$el.find('img'));
    }
  }
});
