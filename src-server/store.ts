import * as fs from "fs-extra";

export const TODO_FILE = "todos.json";

export interface JsonData {
  todos: TodoItem[];
}

export interface TodoItem {
  done: boolean;
  description: string;
  uid: number;
}

const saveTodo = (data: JsonData) => {
  return fs.writeFile(TODO_FILE, JSON.stringify(data));
};

export const getTodos = async (): Promise<JsonData> => {
  try {
    const todosJson = await fs.readFile(TODO_FILE, "utf-8");
    const todos: JsonData = JSON.parse(todosJson);
    return todos;
  } catch (_err) {
    return {
      todos: []
    };
  }
};

export const addTodo = async (todo: TodoItem): Promise<boolean> => {
  try {
    const todos = await getTodos();
    todos.todos.push({
      done: todo.done,
      description: todo.description,
      uid: todo.uid
    });
    await saveTodo(todos);
    return true;
  } catch (_err) {
    return false;
  }
};

export const editTodo = async (todo: TodoItem): Promise<boolean> => {
  try {
    const todos = await getTodos();
    const savedTodos = {
      todos: todos.todos.map(d =>
        d.uid === todo.uid
          ? { done: todo.done, description: todo.description, uid: todo.uid }
          : d
      )
    };
    await saveTodo(savedTodos);
    return true;
  } catch (_err) {
    return false;
  }
};

export const deleteTodo = async (uid: number): Promise<boolean> => {
  try {
    const todos = await getTodos();
    await saveTodo({ todos: todos.todos.filter(d => d.uid !== uid) });
    return true;
  } catch (_err) {
    return false;
  }
};
