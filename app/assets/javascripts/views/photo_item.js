Pictur.Views.PhotoItem = Backbone.CompositeView.extend({
  template: JST['photo/item'],
  tagName: 'li',
  className: 'photo-item',

  initialize: function () {
    this.user = this.model.user();
    this.listenTo(this.model, 'sync', this.render);
    if (this.user) {
      this.listenTo(this.user, 'sync', this.render);
    }
  },

  events: {
    'click .photo-show': 'popPhoto'
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model, user: this.user }));
    return this;
  },

  popPhoto: function (e) {
    e.preventDefault();
    var view = new Pictur.Views.PhotoShow({ model: this.model, collection: this.collection });
    $('.pop-content').html(view.render().$el);
    $('.fullscreen').css('display', 'block');
    $('.pop-window').css('display', 'block');
  }
});
