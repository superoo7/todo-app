<template>
  <div>
    <q-item v-if="editMode">
      <div class="full-width row">
        <q-input
          ref="textinput"
          @keydown.esc="setEditFalse"
          @keydown.enter="onEnter"
          class="col-10"
          filled
          v-model="inputText"
          autofocus
        />
        <q-btn class="col-2" @click="onEnter">Submit</q-btn>
      </div>
    </q-item>
    <q-item clickable class="items-center" v-else>
      <div class="full-width row flex items-center">
        <div class="col-1">
          <q-checkbox v-model="checkbox" />
        </div>
        <span
          :style="done && 'text-decoration: line-through'"
          @click="setEditTrue"
          class="col-10"
          >{{ description }}</span
        >
        <q-btn class="col-1 bg-red" @click="deleteTodo">
          <q-icon color="white" name="delete"></q-icon>
        </q-btn>
      </div>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    uid: { type: Number, required: true },
    description: { type: String, required: true },
    done: { type: Boolean, required: true }
  },
  data() {
    return {
      editMode: false,
      inputText: ""
    };
  },
  methods: {
    editTodo(todo) {
      this.$store.dispatch("todo/serverEditTodo", todo);
    },
    deleteTodo() {
      this.$store.dispatch("todo/serverDeleteTodo", this.uid);
    },
    setEditTrue() {
      this.editMode = true;
    },
    setEditFalse() {
      this.editMode = false;
    },
    onEnter() {
      this.editTodo({
        uid: this.uid,
        description: this.inputText,
        done: this.done
      });
      this.editMode = false;
    }
  },
  computed: {
    checkbox: {
      get: function() {
        return this.done;
      },
      set: function() {
        this.editTodo({
          uid: this.uid,
          description: this.description,
          done: !this.done
        });
      }
    }
  },
  mounted() {
    this.inputText = this.description;
  }
};
</script>

<style></style>
