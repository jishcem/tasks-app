import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todo.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express 5!' });
});

app.use('/api/todos', todoRoutes);

// Express 5 - async errors are automatically forwarded to error handler
// app.get('/async', async (req: Request, res: Response) => {
//   const data = await someAsyncCall();
//   res.json(data);
// });

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

export default app;