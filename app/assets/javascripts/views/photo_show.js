Pictur.Views.PhotoShow = Backbone.View.extend({
  template: JST['photo/show'],
  tagName: 'div',
  className: 'photo',

  initialize: function (options) {
    this.user = this.model.user();
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.user, 'sync', this.render);
  },

  events: {
    'click .delete-photo': 'destroyPhoto',
    'click .photo-form': 'popForm',
    'click .change-title': 'changeTitle',
    'click .photo-title': 'changeTitle',
    'keypress .photo-title input': 'ifEnter',
    'blur .photo-title': 'updateTitle',
    'click .change-description': 'changeDescription',
    'click .photo-description': 'changeDescription',
    'keypress .photo-description input': 'ifEnter',
    'blur .photo-description': 'updateDescription',
    // 'click .fill-screen': 'fillScreen'
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model, user: this.user }));
    $('.fullscreen').css('display', 'block').css('height', $(document).height() + 'px');
    $('.pop-window').css('display', 'block').css('top', $(window).scrollTop() + 'px');
    return this;
  },

  destroyPhoto: function (e) {
    this.model.destroy();
    Backbone.history.navigate('', { trigger: true });
    this.closeWindow();
  },

  changeTitle: function (e) {
    var text = this.model.escape('title');
    $('.photo .photo-title').html('<input type="text" value="' + text + '">');
    $('.photo .photo-title').find('input').focus();
  },

  updateTitle: function (e) {
    this.model.set({ title: e.target.value });
    this.model.save();
  },

  changeDescription: function (e) {
    var text = this.model.escape('description');
    $('.photo .photo-description').html('<textarea>' + text + '</textarea>');
    $('.photo .photo-description').find('textarea').focus();
  },

  updateDescription: function (e) {
    this.model.set({ description: e.target.value });
    this.model.save();
  },

  ifEnter: function (e) {
    if (e.keyCode === 13) {
      e.currentTarget.blur();
    }
  },

  // fillScreen: function (e) {
  //   $('.pop-window')
  //     .css('width', $('img').css('width'))
  //     .css('margin', '0')
  //     .css('left', ($(window).width() / 2) - ($('img').width() / 2) + 'px');
  // },

  closeWindow: function () {
    $('.fullscreen').css('display', 'none');
    $('.pop-window').css('display', 'none');
    $('.pop-window').css('top','').css('left', '').css('width', '').css('margin', '');
    this.remove();
  }
});
