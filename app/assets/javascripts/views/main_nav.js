Pictur.Views.MainNav = Backbone.CompositeView.extend({
  template: JST['app/main_nav'],

  initialize: function (options) {
    this.router = options.router;
    this.photos = options.photos;
    this.authToken = $('meta[name=csrf-token]').attr('content');
  },

  events: {
    'click .photo-form': 'uploadPhoto',
    'click .home-button': 'goHome'
  },

  goHome: function (e) {
    e.preventDefault();
    e.currentTarget.blur();
    Backbone.history.navigate('/#', { trigger: true });
  },

  render: function () {
    this.$el.html(this.template({ authToken: this.authToken }));
    return this;
  },

  uploadPhoto: function (e) {
    e.preventDefault();
    var photos = this.photos;
    var photo = new Pictur.Models.Photo();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      var data = result[0];
      photo.set({
        url: data.url,
        thumb_url: data.eager[0]['url'],
        user_id: CURRENTUSER.id
      });
      photo.save({}, {
        success: function(){
          photos.add(photo);
          Backbone.history.navigate('/user/' + CURRENTUSER.id, { trigger: true });
          var view = new Pictur.Views.PhotoModal({ model: photo });
          $('body').append(view.render().$el);
        }
      });
    });
  }
});
