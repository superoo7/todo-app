import { Notify } from "quasar";

const BASE_URL = "http://localhost:3010";

export async function serverAddTodo({ commit }, todo) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "content-type": "application/json"
    }
  });
  const data = await res.json();
  if (data.success) {
    commit("addTodo", { ...todo, uid: data.uid });
    Notify.create("Successfully added");
  } else {
    Notify.create("Failed to add");
  }
}

export async function serverEditTodo({ commit }, todo) {
  const res = await fetch(`${BASE_URL}/todos/edit`, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "content-type": "application/json"
    }
  });
  const data = await res.json();
  if (data.success) {
    commit("editTodo", todo);
    Notify.create("Successfully updated");
  } else {
    Notify.create("Failed to change");
  }
}

export async function serverDeleteTodo({ commit }, id) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "DELETE",
    body: JSON.stringify({ uid: id }),
    headers: {
      "content-type": "application/json"
    }
  });
  const data = await res.json();
  if (data.success) {
    commit("deleteTodo", id);
    Notify.create("Successfully deleted");
  } else {
    Notify.create("Failed to delete");
  }
}

export async function serverGetAllTodos({ commit }) {
  const res = await fetch(`${BASE_URL}/todos`);
  const data = await res.json();
  commit("setAllTodo", data.todos);
}
