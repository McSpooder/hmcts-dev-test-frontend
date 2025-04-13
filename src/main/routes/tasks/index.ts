import { Router, Request, Response } from 'express';
import { TaskClient, Task } from '../../modules/api-client';

const router = Router();

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await TaskClient.getAllTasks();
    res.render('tasks/index', { tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.render('tasks/index', { tasks: [], error: 'Failed to load tasks' });
  }
});

// Render create task form
router.get('/new', (req: Request, res: Response) => {
  res.render('tasks/new');
});

// Create a new task
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const task: Task = {
      title,
      description,
      status,
      dueDate: new Date(dueDate).toISOString() // Format date for API
    };
    
    await TaskClient.createTask(task);
    res.redirect('/tasks');
  } catch (error) {
    console.error('Error creating task:', error);
    res.render('tasks/new', { 
      error: 'Failed to create task',
      formData: req.body
    });
  }
});

// Render edit task form
router.get('/:id/edit', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const task = await TaskClient.getTaskById(id);
    
    if (!task) {
      return res.redirect('/tasks');
    }
    
    res.render('tasks/edit', { task });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.redirect('/tasks');
  }
});

// Update a task
router.post('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, status, dueDate } = req.body;
    const task: Task = {
      title,
      description,
      status,
      dueDate: new Date(dueDate).toISOString() // Format date for API
    };
    
    await TaskClient.updateTask(id, task);
    res.redirect('/tasks');
  } catch (error) {
    console.error('Error updating task:', error);
    res.redirect(`/tasks/${req.params.id}/edit`);
  }
});

// Update task status
router.post('/:id/status', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    await TaskClient.updateTaskStatus(id, status);
    res.redirect('/tasks');
  } catch (error) {
    console.error('Error updating task status:', error);
    res.redirect('/tasks');
  }
});

// Delete a task
router.post('/:id/delete', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    await TaskClient.deleteTask(id);
    res.redirect('/tasks');
  } catch (error) {
    console.error('Error deleting task:', error);
    res.redirect('/tasks');
  }
});

export default router;