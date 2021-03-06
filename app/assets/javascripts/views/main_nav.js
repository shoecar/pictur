Pictur.Views.MainNav = Backbone.CompositeView.extend({
  template: JST['app/main_nav'],

  initialize: function (options) {
    this.router = options.router;
    this.photos = options.photos;
    this.authToken = $('meta[name=csrf-token]').attr('content');
  },

  events: {
    'click .photo-form': 'uploadPhoto',
    'click .home-button': 'goHome',
    'click .random-button': 'randomPhoto'
  },

  goHome: function (e) {
    e.preventDefault();
    e.currentTarget.blur();
    Backbone.history.navigate('/#', { trigger: true });
  },

  randomPhoto: function (e) {
    e.preventDefault();
    e.currentTarget.blur();
    var arr = this.photos.pluck("id");
    var model = this.photos.get(arr[Math.floor(Math.random() * arr.length)]);
    var view = new Pictur.Views.PhotoModal({ model: model, collection: this.photos });
    $('body').append(view.$el);
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
      if(!result) { return; }
      var data = result[0];
      photo.set({
        url: data.secure_url,
        thumb_url: data.eager[0].secure_url,
        user_id: CURRENTUSER.id
      });
      photo.save({}, {
        success: function(){
          Backbone.history.navigate('temp', {trigger : false});
          Backbone.history.navigate('/user/' + CURRENTUSER.id +'/photos', { trigger: true, replace: true });
          var view = new Pictur.Views.PhotoModal({ model: photo });
          $('body').append(view.$el);
        }
      });
    });
  }
});
