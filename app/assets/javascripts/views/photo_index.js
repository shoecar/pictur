Pictur.Views.PhotoIndex = Backbone.CompositeView.extend({
  template: JST['photo/index'],
  className: 'photo-index',

  initialize: function (options) {
    this.sortType = 'time';
    this.userId = options.userId;
    this.ascend = false;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addPhotoItem);
    this.listenTo(this.collection, 'remove', this.removePhotoItem);
    this.collection.each(this.addPhotoItem.bind(this));
  },

  events: {
    'click .sort-submit': 'sortPhotos'
  },

  addPhotoItem: function (photo) {
    var subView = new Pictur.Views.PhotoItem({ model: photo, collection: this.collection });
    this.addSubview('#masonry-container', subView);
  },

  removePhotoItem: function (photo) {
    this.removeModelSubview('#masonry-container', photo);
  },

  sortPhotos: function (e) {
    this.ascend = $("#sort-asc").hasClass('active');
    this.sortType = $('.sort-type').val();
    this.collection.remove(this.collection.models);
    this.collection.fetch({
      data: {
        ascend: this.ascend,
        sort_type: this.sortType,
        user_id: this.userId
      }
    });
  },

  render: function () {
    this.$el.html(this.template());
    this.ascend ? $('#sort-asc').addClass('active') : $('#sort-des').addClass('active');
    switch (this.sortType) {
      case 'time':
        this.sortType = 'time';
        break;
      case 'num_comments':
        this.sortType = 'num_comments'
        break;
      case 'votings_score':
      this.sortType = 'votings_score'
      break;
    }
    this.$el.find('option.' + this.sortType).attr('selected', 'selected');
    this.attachSubviews();
    this.loadMasonry();
    this.listenForScroll();
    return this;
  },

  loadMasonry: function () {
    var $grid = $('#masonry-container').imagesLoaded(function () {
      $grid.prepend($('<div class="photo-sizer"></div>'));
      $grid.masonry({
        itemSelector: '.photo-item',
        percentPosition: true,
        columnWidth: '.photo-sizer'
      });
    });
  },

  listenForScroll: function () {
    $(window).off("scroll");
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
    var view = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if(isNaN(view.collection.page_number)) {
        view.collection.page_number = 1;
      }

      if (view.collection.page_number < view.collection.total_pages) {
        view.collection.fetch({
          data: { page: view.collection.page_number + 1,
            ascend: this.ascend,
            sort_type: this.sortType,
            user_id: this.userId
          },
          remove: false
        });
      }
    }
  }
});
