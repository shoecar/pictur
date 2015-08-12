Pictur.Views.MainNav = Backbone.View.extend({
  template: JST['app/main_nav'],

  initialize: function (options) {
    this.router = options.router;
    this.listenTo(this.router, "route", this.handleRoute);
  },

  handleRoute: function (routeName, params) {
    this.$el.find(".active").removeClass("active");
    this.$el.find("." + routeName).addClass("active");
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
