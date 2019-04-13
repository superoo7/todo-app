<template>
  <q-page class="flex items-start justify-center q-px-lg">
    <todos />
  </q-page>
</template>

<style></style>

<script>
import TodosVue from "../components/Todos.vue";

export default {
  name: "PageIndex",
  components: {
    todos: TodosVue
  }
};
</script>
