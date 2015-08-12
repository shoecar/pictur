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
    var photos = this.photos;
    var photo = new Pictur.Models.Photo();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      var data = result[0];
      photo.set({
        url: data.url,
        thumb_url: data.thumbnail_url,
        user_id: CURRENTUSER.id,
        title: '.'
        });
      photo.save({}, {
        success: function(){
          photos.add(photo);
          var view = new Pictur.Views.PhotoShow({ model: photo });
          $('.pop-content').html(view.render().$el);
        }
      });
    });
  }
});
