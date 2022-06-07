import { rest } from "msw";

const jsonUrl = "http://localhost:3000/todos";

const getAllTodos = rest.get(jsonUrl, (req, res, ctx) => {
  return res(
    ctx.json([
      {
        name: "todo 1",
        id: 1,
        completed: false,
      },
    ])
  );
});

const addTodo = rest.post(jsonUrl, (req, res, ctx) => {
  return res(
    ctx.json({
      id: req.body.id,
      name: req.body.name,
      completed: req.body.completed,
    })
  );
});

const deleteTodo = rest.delete(jsonUrl + "/1", (req, res, ctx) => {
  return res(ctx.json({}));
});

const checkTodo = rest.put(jsonUrl + "/1", (req, res, ctx) => {
  return res(
    ctx.json({
      name: req.body.name,
      id: req.body.id,
      completed: req.body.completed,
    })
  );
});

export const handlers = [getAllTodos, addTodo, deleteTodo, checkTodo];
