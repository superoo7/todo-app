<template>
  <q-card class="q-mt-lg full-width">
    <q-item class="flex-center">
      <h1>Todos</h1>
    </q-item>
    <div>
      <q-list bordered separator>
        <todo-item
          v-for="(todo, key) in todos"
          :key="key"
          :uid="todo.uid"
          :description="todo.description"
          :done="todo.done"
        />
      </q-list>
      <q-item v-if="todos.length === 0" class="flex-center">
        <h5 class="text-grey-8">No Todos Item, try add some down here</h5>
      </q-item>
      <new-todo-item />
    </div>
  </q-card>
</template>

<script>
import TodoItemVue from "./TodoItem.vue";
import NewTodoItemVue from "./NewTodoItem.vue";
export default {
  name: "Todos",
  components: {
    "todo-item": TodoItemVue,
    "new-todo-item": NewTodoItemVue
  },
  data() {
    return {};
  },
  computed: {
    todos() {
      return this.$store.state.todo.todos;
    }
  },
  methods: {
    getAllTodo() {
      this.$store.dispatch("todo/serverGetAllTodos");
    }
  },
  mounted() {
    this.getAllTodo();
  }
};
</script>

<style></style>
