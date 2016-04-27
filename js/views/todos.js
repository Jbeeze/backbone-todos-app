var app = app || {};

app.TodoView = Backbone.View.extend({
  tagName: 'li',

  template: _.template( $('#item-template').html() ),

  events: {
    'dblclick label'  : 'edit',
    'keypress .edit'  : 'updateOnEnter',
    'blur     .edit'  : 'close'
  },

  // The TodoView listens for changes to its model, re-rendering. Since there's
  // a one-to-one correspondance between a **Todo** and a **TodoView** in this
  // app, we set a direct reference to the model for convenience
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    this.$input = this.$('.edit');
    return this;
  },

  edit: function() {
    this.$el.addClass('editing');
    this.$input.focus();
  },

  close: function() {
    var value = this.$input.val().trim();

    if (value) {
      this.model.save({ title: value });
    }

    this.$el.removeClass('editing');
  },

  updateOnEnter: function(e) {
    if (e.which === ENTER_KEY) {
      this.close();
    }
  }
});
