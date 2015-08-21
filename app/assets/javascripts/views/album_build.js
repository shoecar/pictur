Pictur.Views.AlbumBuild = Backbone.View.extend({
  template: JST['album/build'],
  className: 'album-build',

  initialize: function (options) {
    this.user = new Pictur.Models.User({ id: CURRENTUSER.id });
    this.user.fetch();
    this.albumings = this.model.albumings();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.user, 'sync', this.render);
  },

  events: {
    'click .save-album': 'saveAlbum'
  },

  render: function () {
    this.generateCollections();
    this.$el.html(this.template({ album: this.model, albumPhotos: this.albumPhotos, otherPhotos: this.otherPhotos }));
    // this.setUpMasonry();
    this.setUpSortable();
    return this;
  },

  saveAlbum: function (e) {
    e.preventDefault();
    var albumings = [];
    for (var i = this.albumings.models.length - 1; i > -1; i--) {
      this.albumings.models[i].destroy();
    }
    this.$el.find('#album-container').find('.photo-wrap').each(function (div) {
      var photo_id = $(this.$el.find('#album-container').find('.photo-wrap')[div]).data('id');
      if (this.user.photos().pluck('id').indexOf(photo_id) > -1) {
        var newAlbuming = new Pictur.Models.Albuming({ album_id: this.model.get('id'), photo_id: photo_id });
        newAlbuming.save();
      }
    }.bind(this));
    Backbone.history.navigate('user/' + CURRENTUSER.id, { trigger: true });
  },

  generateCollections: function () {
    this.albumPhotos = this.model.photos();
    this.otherPhotos = this.user.photos().clone();
    this.otherPhotos.remove(this.albumPhotos.models);
  },

  setUpMasonry: function () {
    var $albumGrid = $('#album-container').imagesLoaded(function () {
      $albumGrid.masonry({
        itemSelector: '.album-item',
        percentPosition: true,
        columnWidth: '.photo-sizer'
      });
    });

    var $otherGrid = $('#other-container').imagesLoaded(function () {
      $otherGrid.masonry({
        itemSelector: '.other-item',
        percentPosition: true,
        columnWidth: '.photo-sizer'
      });
    });
  },

  updateGrid: function (e) {
    var $toGrid = $('#' + e.target.id);
    var $fromGrid = e.target.id === 'other-masonry-container' ? $('#other-masonry-container') : $('#album-masonry-container')
    var $movedItem = e.toElement.parentElement


    // $toGrid.masonry('destroy');
    // $fromGrid.masonry('destroy');
    // this.setUpMasonry();
  },

  setUpSortable: function () {
    var that = this;
    $("#album-container, #other-container").sortable({
      connectWith: ".sortable-connect",
      update: function (e) {
        // var $toGrid = $('#' + e.target.id);
        // var $fromGrid = e.target.id === 'other-masonry-container' ? $('#other-masonry-container') : $('#album-masonry-container')
        // var $movedItem = e.toElement

        // $toGrid.masonry('prepended', $movedItem);
        // $fromGrid.masonry('remove', $movedItem);
        // debugger
        // window.setTimeout(function () {
        //   $toGrid.masonry('destroy');
        //   $fromGrid.masonry('destroy');
        //   that.setUpMasonry();
        //   $toGrid.masonry('appended', $movedItem);
        // }, 500);
      }
    });
  }
});
