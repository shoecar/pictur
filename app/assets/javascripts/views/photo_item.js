Pictur.Views.PhotoItem = Backbone.View.extend({
  template: JST['photo/item'],
  tagName: 'div',
  className: 'photo-item',

  initialize: function () {
    this.user = this.model.user();
    this.listenTo(this.model, 'sync change', this.render);
  },

  events: {
    'click .photo-thumb': 'createModal',
    'mouseover .photo-thumb': 'removeFilters',
    'mouseout .photo-thumb': 'applyFilters'
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model, user: this.user }));
    this.applyFilters();
    return this;
  },

  createModal: function (e) {
    e.preventDefault();
    var view = new Pictur.Views.PhotoModal({ model: this.model, collection: this.collection });
    $('body').append(view.$el);
  },

  applyFilters: function () {
    filters = this.model.get('filters');
    if (filters) {
      window.filterImage(JSON.parse(filters), this.$el.find('img'));
    }
  },

  removeFilters: function () {
    this.$el.find('img').css('-webkit-filter','');
    this.$el.find('img').css('filter','');
  }
});
