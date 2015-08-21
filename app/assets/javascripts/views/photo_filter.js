Pictur.Views.PhotoFilter = Backbone.View.extend({
  template: JST['photo/filter'],
  className: 'photo-filter',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .save-filter': 'saveFilter',
    'click .update-filter': 'updateFilter',
    'click .reset-filter': 'scrapeFilters',
    'click .remove-filter': 'removeFilter'
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model }));
    this.setUpSliders();
    this.scrapeFilters();
    if (this.model.get('user_id') !== CURRENTUSER.id) {
      this.$el.find('.update-filter').addClass('disabled');
    }
    return this;
  },

  scrapeFilters: function (e) {
    e && e.currentTarget.blur();
    filtersString = this.model.get('filters');
    if (filtersString) {
      this.filters = JSON.parse(filtersString);
      this.bl.setValue(this.filters.bl);
      this.br.setValue(this.filters.br);
      this.co.setValue(this.filters.co);
      this.gr.setValue(this.filters.gr);
      this.hu.setValue(this.filters.hu);
      this.iv.setValue(this.filters.iv);
      this.sa.setValue(this.filters.sa);
      this.se.setValue(this.filters.se);
      this.filterImage();
    }
  },

  filterImage: function() {
    $('#filter-img').css('-webkit-filter', 'blur('+this.bl.getValue()+'px)' +
                                           ' brightness('+this.br.getValue()+'%)' +
                                           ' contrast('+this.co.getValue()+'%)' +
                                           ' grayscale('+this.gr.getValue()+'%)' +
                                           ' hue-rotate('+this.hu.getValue()+'deg)' +
                                           ' invert('+this.iv.getValue()+'%)' +
                                           ' saturate('+this.sa.getValue()+'%)' +
                                           ' sepia('+this.se.getValue()+'%)')
  },

  setUpSliders: function () {
    this.bl = this.$el.find('#blur').slider()
        .on('slide', this.filterImage.bind(this))
        .data('slider');
    this.br = this.$el.find('#brightness').slider()
        .on('slide', this.filterImage.bind(this))
        .data('slider');
    this.co = this.$el.find('#contrast').slider()
        .on('slide', this.filterImage.bind(this))
        .data('slider');
    this.gr = this.$el.find('#grayscale').slider()
        .on('slide', this.filterImage.bind(this))
        .data('slider');
    this.hu = this.$el.find('#hue').slider()
        .on('slide', this.filterImage.bind(this))
        .data('slider');
    this.iv = this.$el.find('#invert').slider()
        .on('slide', this.filterImage.bind(this))
        .data('slider');
    this.sa = this.$el.find('#saturate').slider()
        .on('slide', this.filterImage.bind(this))
        .data('slider');
    this.se= this.$el.find('#sepia').slider()
        .on('slide', this.filterImage.bind(this))
        .data('slider');
  },

  saveFilter: function (e) {
    e.preventDefault();
    e.currentTarget.blur();
    var filters = JSON.stringify ({
      bl: this.bl.getValue(),
      br: this.br.getValue(),
      co: this.co.getValue(),
      gr: this.gr.getValue(),
      hu: this.hu.getValue(),
      iv: this.iv.getValue(),
      sa: this.sa.getValue(),
      se: this.se.getValue()
    });

    var newPhoto = new Pictur.Models.Photo({
      user_id: CURRENTUSER.id,
      url: this.model.attributes.url,
      thumb_url: this.model.attributes.thumb_url,
      filters: filters
    });
    newPhoto.save();
    Backbone.history.navigate('/#user/' + CURRENTUSER.id, { trigger: true });
  },

  updateFilter: function (e) {
    e.preventDefault();
    e.currentTarget.blur();
    if (this.$el.find('.update-filter').hasClass('disabled')) { return; }
    var filters = JSON.stringify ({
      bl: this.bl.getValue(),
      br: this.br.getValue(),
      co: this.co.getValue(),
      gr: this.gr.getValue(),
      hu: this.hu.getValue(),
      iv: this.iv.getValue(),
      sa: this.sa.getValue(),
      se: this.se.getValue()
    });

    this.model.set({ filters: filters });
    this.model.save();
    Backbone.history.navigate('/#user/' + CURRENTUSER.id, { trigger: true });
  },

  removeFilter: function (e) {
    e.preventDefault();
    e.currentTarget.blur();
    this.bl.refresh();
    this.br.refresh();
    this.co.refresh();
    this.gr.refresh();
    this.hu.refresh();
    this.iv.refresh();
    this.sa.refresh();
    this.se.refresh();
    this.filterImage();
  }
});
