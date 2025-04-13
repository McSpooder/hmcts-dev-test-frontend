import { Application } from 'express';
import axios from 'axios';
import { TaskClient } from '../modules/api-client';

export default function (app: Application): void {
  app.get('/', async (req, res) => {
    try {
      // Example case logic
      const exampleResponse = await axios.get('http://localhost:4000/get-example-case');
      
      // Also fetch recent tasks (optional)
      const tasks = await TaskClient.getAllTasks();
      const recentTasks = tasks.slice(0, 5); // Just get the first 5 tasks
      
      res.render('home', { 
        "example": exampleResponse.data,
        "recentTasks": recentTasks
      });
    } catch (error) {
      console.error('Error making request:', error);
      res.render('home', {});
    }
  });
}
