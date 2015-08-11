Pictur.Views.PhotoForm = Backbone.View.extend({
  template: JST['photo/form'],
  tagName: 'form',
  className: 'photo-form',

  events: {
    'submit .photo-form': 'savePhoto'
  },

  savePhoto: function (e) {
    e.preventDefault();
    var formData = this.$el.serializeJSON();
    this.model.save(formData, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate(this.model.url(), { trigger: true });
      }.bind(this)
    });
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model }));
    return this;
  }
});
