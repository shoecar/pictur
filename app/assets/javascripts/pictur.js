window.Pictur = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var photos = new Pictur.Collections.Photos();

    var router = new Pictur.Routers.Router({ $root: $('.root'), photos: photos });

    var nav = new Pictur.Views.MainNav({ router: router, photos: photos });
    $(".main-nav").html(nav.render().$el);

    Backbone.history.start();
  }
};

$(document).ready(function(){
  Pictur.initialize();
});
