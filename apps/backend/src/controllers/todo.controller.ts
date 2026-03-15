import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { Todo } from '@tasks-app/shared';
import { CreateTodoDto, UpdateTodoDto } from '@tasks-app/shared';

// In-memory store (replace with a database later)
const todos: Todo[] = [];

export const getAllTodos = (req: Request, res: Response): void => {
  res.json(todos);
};

export const getTodoById = (req: Request, res: Response): void => {
  const todo = todos.find((t) => t.id === req.params.id);

  if (!todo) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  res.json(todo);
};

export const createTodo = (req: Request, res: Response): void => {
  const body: CreateTodoDto = req.body;

  if (!body.title || body.title.trim() === '') {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  const now = new Date();
  const todo: Todo = {
    id: randomUUID(),
    title: body.title.trim(),
    description: body.description,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };

  todos.push(todo);
  res.status(201).json(todo);
};

export const updateTodo = (req: Request, res: Response): void => {
  const index = todos.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  const body: UpdateTodoDto = req.body;
  const existing = todos[index];

  todos[index] = {
    ...existing,
    ...(body.title !== undefined && { title: body.title.trim() }),
    ...(body.description !== undefined && { description: body.description }),
    ...(body.completed !== undefined && { completed: body.completed }),
    updatedAt: new Date(),
  };

  res.json(todos[index]);
};

export const deleteTodo = (req: Request, res: Response): void => {
  const index = todos.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  todos.splice(index, 1);
  res.status(204).send();
};
