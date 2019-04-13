export function addTodo(state, todo) {
  state.todos.push(todo);
}

export function deleteTodo(state, uid) {
  state.todos = state.todos.filter(d => d.uid !== uid);
}

export function editTodo(state, todo) {
  state.todos = state.todos.map(d => (d.uid === todo.uid ? todo : d));
}

export function setAllTodo(state, todos) {
  state.todos = todos;
}
