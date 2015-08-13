Pictur.Views.PhotoIndex = Backbone.CompositeView.extend({
  template: JST['photo/index'],
  className: 'photo-index',

  initialize: function (options) {
    this.photos = options.photos;
    this.listenTo(this.photos, 'add change remove reset', this.render);
    this.listenTo(this.photos, 'add', this.addPhotoItem);
    this.listenTo(this.photos, 'remove', this.removePhotoItem);
    this.photos.each(this.addPhotoItem.bind(this));
  },


  addPhotoItem: function (photo) {
    if (this.users) {
      var user = this.users.getOrFetch(photo.get('user_id'));
    }
    var subView = new Pictur.Views.PhotoItem({ model: photo, collection: this.photos });
    this.addSubview('#masonry-container', subView);
  },

  removePhotoItem: function (photo) {
    this.removeModelSubview('#masonry-container', photo);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    this.loadMasonry();
    return this;
  },

  loadMasonry: function () {
    var $grid = $('#masonry-container').imagesLoaded(function () {
      $('#masonry-container').prepend($('<div class="photo-sizer"></div>'));
      $grid.masonry({
        itemSelector: '.photo-item',
        percentPosition: true,
        columnWidth: '.photo-sizer'
      });

      $('#masonry-container').infinitescroll({
        navSelector  : '#page-nav',
        nextSelector : '#page-nav a',
        itemSelector : '.photo-item',
        loading: {
            finishedMsg: 'No more pages to load.',
            img: 'http://i.imgur.com/6RMhx.gif'
          }
        },
        function( newElements ) {
          var $newElems = $( newElements ).css({ opacity: 0 });
          $newElems.imagesLoaded(function(){
            $newElems.animate({ opacity: 1 });
            $container.masonry( 'appended', $newElems, true );
          });
        }
      );
    });
  }
});
