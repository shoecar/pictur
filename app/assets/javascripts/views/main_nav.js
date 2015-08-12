Pictur.Views.MainNav = Backbone.View.extend({
  template: JST['app/main_nav'],

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
