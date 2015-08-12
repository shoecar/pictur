Pictur.Views.PhotoItem = Backbone.CompositeView.extend({
  template: JST['photo/item'],
  tagName: 'li',
  className: 'photo-item',

  initialize: function (options) {
    this.photo = options.photo;
    this.user = options.user;
    this.listenTo(this.photo, 'sync', this.render);
    if (this.user) {
      this.listenTo(this.user, 'sync', this.render);
    }
  },

  events: {
    'click .photo-show': 'popPhoto'
  },

  render: function () {
    this.$el.html(this.template({ photo: this.photo, user: this.user }));
    return this;
  },

  popPhoto: function (e) {
    e.preventDefault();
    var subView = new Pictur.Views.PhotoShow({ photo: this.photo });
    this.addSubview('.pop-window', subView);
    debugger
  }
});
