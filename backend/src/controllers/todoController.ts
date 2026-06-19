import Todo from "../models/Todo";

export const getTodos = async (
  req: any,
  res: any
) => {
  const todos = await Todo.find({
    user: req.user.id,
  });

  res.json(todos);
};

export const createTodo = async (
  req: any,
  res: any
) => {
  const todo = await Todo.create({
    title: req.body.title,
    user: req.user.id,
  });

  res.status(201).json(todo);
};

export const updateTodo = async (
  req: any,
  res: any
) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.json(todo);
};

export const deleteTodo = async (
  req: any,
  res: any
) => {
  await Todo.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted",
  });
};