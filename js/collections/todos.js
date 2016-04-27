var app = app || {};

// Todo Collection
// -----------------
// The collection of todos is backed by *localStorage*
// instead of a remote server

var TodoList = Backbone.Collection.extend({
  model: app.Todo,

  // Save all of the todo items under the `"todos-backbone"` namespace.
  localStorage: new Backbone.LocalStorage('todos-backbone'),

  // Filter down the list of all todo items that are finished.
  completed: function() {
    return this.filter(function(todo) {
      return todo.get('completed');
    });
  },

  // Filter down the list to only todo items that are still not finished
  remaining: function() {
    return this.without.apply(this, this.completed());
  },

  // We keep the todos in sequential order, despite being saved unordered
  // GUID in teh database.
  nextOrder: function() {
    if (!this.length) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  // Todos are sorted by their original insertion order
  comparator: function(todo) {
    return todo.get('order');
  }
});

app.Todos = new TodoList();
