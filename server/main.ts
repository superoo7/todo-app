import * as express from "express";
import * as bodyParser from "body-parser";
import {
  TODO_FILE,
  TodoItem,
  JsonData,
  getTodos,
  addTodo,
  deleteTodo,
  editTodo
} from "./store";
import * as fs from "fs-extra";
import * as cors from "cors";

const PORT = 3010;
let UID;
try {
  const todos: JsonData = JSON.parse(fs.readFileSync(TODO_FILE, "utf-8"));
  UID = todos.todos[todos.todos.length - 1].uid;
} catch (_err) {
  UID = 0;
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Get all Todos
app.get("/todos", async (req, res) => {
  const todos = await getTodos();
  res.status(200).json(todos);
});

// Add Todo
app.post("/todos", async (req, res) => {
  try {
    const { body } = req;
    UID++;
    const todo: TodoItem = { ...body, uid: UID };
    const status = await addTodo(todo);
    if (!status) throw new Error("invalid todos");
    res.status(200).json({ success: true, uid: UID });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete Todo
app.delete("/todos", async (req, res) => {
  try {
    const { body } = req;
    const { uid } = body;
    if (typeof uid !== "number") throw new Error("uid is not number");
    const status = await deleteTodo(uid);
    if (!status) throw new Error(`unable to delete id: ${uid}`);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update Todo
app.post("/todos/edit", async (req, res) => {
  try {
    const todo = req.body;
    const status = await editTodo(todo);
    if (!status) throw new Error(`unable to edit`);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
