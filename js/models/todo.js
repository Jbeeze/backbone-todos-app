var app = app || {};

// Todo Model
// ----------
// Has properties 'title' and 'completed'

app.Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },

  toggle: function() {
    this.save({
      completed: !this.get('completed')
    });
  }

});
