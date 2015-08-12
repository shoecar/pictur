window.Pictur = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new Pictur.Routers.Router({ $root: $('.root') });

    var nav = new Pictur.Views.MainNav({router: router });
    $(".main-nav").html(nav.render().$el);

    Backbone.history.start();
  }
};

$(document).ready(function(){
  Pictur.initialize();
});
