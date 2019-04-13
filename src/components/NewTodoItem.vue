<template>
  <q-item class="column">
    <div class="full-width" v-if="errorMessage !== ''">
      <span class="text-red">{{ errorMessage }}</span>
    </div>
    <div class="full-width row">
      <q-input
        class="col-10"
        ref="textinput"
        v-model="value"
        filled
        autofocus
        @keydown.enter="submit"
      />
      <q-btn class="col-2" @click="submit">Submit</q-btn>
    </div>
  </q-item>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      errorMessage: ""
    };
  },
  methods: {
    submit() {
      if (this.value === "") {
        this.errorMessage = "No data entered";
        return;
      }
      this.addTodo({
        description: this.value,
        done: false
      }).then(() => {
        this.errorMessage = "";
        this.value = "";
      });
    },
    addTodo(todo) {
      return this.$store.dispatch("todo/serverAddTodo", todo);
    }
  }
};
</script>
