import express from "express";
const server = express.Router();

let todos = [
  {
    id: 1,
    name: "Schedule the team standup meeting for tomorrow",
    completed: false,
  },
  {
    id: 2,
    name: "Finish reading the documentation on CSS selectors",
    completed: true,
  },
];

server.get("/", (req, res) => {
  try {
    res.status(200).send(todos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: " + error);
  }
});

server.post("/", (req, res) => {
  try {
    const text = req.body.text;
    const newTodo = {
      id: todos.length + 1,
      name: text,
      completed: false,
    };

    todos.push(newTodo);
    res.status(201).send(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error: " + error);
  }
});

server.put("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    if (typeof req.body.completed === "boolean") {
      todo.completed = req.body.completed;
    } else {
      todo.completed = true;
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

server.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    todos = todos.filter((t) => t.id !== id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

export default server;
