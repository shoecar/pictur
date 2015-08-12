Pictur.Views.MainNav = Backbone.CompositeView.extend({
  template: JST['app/main_nav'],

  initialize: function (options) {
    this.router = options.router;
    this.photos = options.photos;
    this.listenTo(this.router, "route", this.handleRoute);
  },

  events: {
    'click .photo-form': 'popForm'
  },

  handleRoute: function (routeName, params) {
    this.$el.find(".active").removeClass("active");
    this.$el.find("." + routeName).addClass("active");
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  popForm: function (e) {
    e.preventDefault();
    var photo = new Pictur.Models.Photo();
    var view = new Pictur.Views.PhotoForm({ model: photo, collection: this.photos });
    $('.pop-content').html(view.render().$el);
    $('.fullscreen').css('display', 'block');
    $('.pop-window').css('display', 'block');
  }
});
