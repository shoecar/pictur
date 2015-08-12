window.Pictur = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Pictur.Routers.Router({ $root: $('.root') });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Pictur.initialize();
});
