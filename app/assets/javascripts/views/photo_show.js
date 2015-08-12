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
    'click .photo-form': 'popForm'
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model, user: this.user }));
    return this;
  },

  destroyPhoto: function () {
    this.model.destroy();
    Backbone.history.navigate('', { trigger: true });
    this.closeWindow();
  },

  popForm: function (e) {
    e.preventDefault();
    var view = new Pictur.Views.PhotoForm({ model: this.model, collection: this.collection });
    $('.pop-content').html(view.render().$el);
    $('.fullscreen').css('display', 'block');
    $('.pop-window').css('display', 'block');
  },

  closeWindow: function () {
    $('.fullscreen').css('display', 'none');
    $('.pop-window').css('display', 'none');
    this.remove();
  }
});
