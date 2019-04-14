import { Notify } from "quasar";
import { LocalStorage } from "quasar";

const BASE_URL = "http://localhost:3010";
const STORAGE_NAME = "todo";

export async function serverAddTodo({ commit }, todo) {
  let data;
  try {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "content-type": "application/json"
      }
    });
    data = await res.json();
  } catch (_err) {
    const todosStorage = LocalStorage.getItem(STORAGE_NAME);
    let todos;
    try {
      const parsedTodo = JSON.parse(todosStorage);
      todos = {
        todos: [...parsedTodo.todos, { ...todo, uid: parsedTodo.todos.length }]
      };
    } catch (err) {
      todos = { todos: [{ ...todo, uid: 0 }] };
    }
    LocalStorage.set(STORAGE_NAME, JSON.stringify(todos));
    data = {
      success: true,
      todos
    };
  }

  if (data.success) {
    commit("addTodo", { ...todo, uid: data.uid });
    Notify.create("Successfully added");
  } else {
    Notify.create("Failed to add");
  }
}

export async function serverEditTodo({ commit }, todo) {
  let data;
  try {
    const res = await fetch(`${BASE_URL}/todos/edit`, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "content-type": "application/json"
      }
    });
    data = await res.json();
  } catch (err) {
    const todosStorage = LocalStorage.getItem(STORAGE_NAME);
    let todos;
    try {
      const parsedTodo = JSON.parse(todosStorage);
      todos = {
        todos: [...parsedTodo.todos.map(d => (d.uid === todo.uid ? todo : d))]
      };
    } catch (err) {
      todos = { todos: [{ ...todo, uid: 0 }] };
    }
    LocalStorage.set(STORAGE_NAME, JSON.stringify(todos));
    data = {
      success: true
    };
  }
  if (data.success) {
    commit("editTodo", todo);
    Notify.create("Successfully updated");
  } else {
    Notify.create("Failed to change");
  }
}

export async function serverDeleteTodo({ commit }, id) {
  let data;
  try {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "DELETE",
      body: JSON.stringify({ uid: id }),
      headers: {
        "content-type": "application/json"
      }
    });
    data = await res.json();
  } catch (err) {
    const todosStorage = LocalStorage.getItem(STORAGE_NAME);
    let todos;
    try {
      const parsedTodo = JSON.parse(todosStorage);
      todos = {
        todos: [...parsedTodo.todos.filter(d => d.uid !== id)]
      };
      LocalStorage.set(STORAGE_NAME, JSON.stringify(todos));
    } catch (err) {
      Notify.create("Failed to delete");
    }
    data = {
      success: true
    };
  }
  if (data.success) {
    commit("deleteTodo", id);
    Notify.create("Successfully deleted");
  } else {
    Notify.create("Failed to delete");
  }
}

export async function serverGetAllTodos({ commit }) {
  let data;
  try {
    const res = await fetch(`${BASE_URL}/todos`);
    data = await res.json();
  } catch (err) {
    const todosStorage = LocalStorage.getItem(STORAGE_NAME);
    let todos;
    try {
      const parsedTodo = JSON.parse(todosStorage);
      todos = parsedTodo;
    } catch (err) {
      todos = { todos: [] };
    }
    LocalStorage.set(STORAGE_NAME, JSON.stringify(todos));
    data = todos;
  }
  commit("setAllTodo", data.todos);
}
