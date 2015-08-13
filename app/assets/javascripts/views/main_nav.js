Pictur.Views.MainNav = Backbone.CompositeView.extend({
  template: JST['app/main_nav'],

  initialize: function (options) {
    this.router = options.router;
    this.photos = options.photos;
    this.listenTo(this.router, "route", this.handleRoute);
    this.authToken = $('meta[name=csrf-token]').attr('content');
  },

  events: {
    'click .photo-form': 'popForm'
  },

  handleRoute: function (routeName, params) {
    this.$el.find(".active").removeClass("active");
    this.$el.find("." + routeName).addClass("active");
  },

  render: function () {
    this.$el.html(this.template({ authToken: this.authToken }));
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
        thumb_url: data.eager[0]['url'],
        user_id: CURRENTUSER.id,
        title: '.'
      });
      photo.save({}, {
        success: function(){
          photos.add(photo);
          var view = new Pictur.Views.PhotoShow({ model: photo });
          $('.pop-content').html(view.render().$el);
          $('.fullscreen').css('display', 'block');
          $('.pop-window').css('display', 'block');
        }
      });
    });
  }
});
