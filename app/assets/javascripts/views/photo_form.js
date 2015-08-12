Pictur.Views.PhotoForm = Backbone.View.extend({
  template: JST['photo/form'],
  tagName: 'form',
  className: 'photo-form',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  events: {
    'click .photo-submit': 'savePhoto'
  },

  savePhoto: function (e) {
    e.preventDefault();
    var formData = this.$el.serializeJSON();
    formData.photo['user_id'] = CURRENTUSER.id;
    this.model.set(formData);
    this.model.save({}, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate('#photo/' + this.model.get('id'), { trigger: true });
      }.bind(this)
    });
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model }));
    return this;
  }
});
