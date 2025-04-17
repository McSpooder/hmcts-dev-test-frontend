const axios = require('axios');
const { TaskClient } = require('../modules/api-client');

module.exports = function (app) {
  app.get('/', async (req, res) => {
    try {
      // Fetch the example case
      const exampleResponse = await axios.get('http://localhost:4000/get-example-case');

      // Try to fetch recent tasks
      let recentTasks = [];
      try {
        const tasks = await TaskClient.getAllTasks();
        recentTasks = tasks.slice(0, 5); // Get the 5 most recent tasks
      } catch (taskError) {
        console.error('Error fetching tasks:', taskError);
      }

      // Process recent tasks for the template
      const statusClassMap = {
        PENDING: 'govuk-tag--blue',
        IN_PROGRESS: 'govuk-tag--yellow',
        DONE: 'govuk-tag--green',
        CANCELED: 'govuk-tag--grey',
      };

      const rows = recentTasks.map(task => [
        { text: task.title },
        {
          html: `<span class="govuk-tag ${statusClassMap[task.status] || ''}">${task.status}</span>`,
        },
        { text: task.dueDate },
        {
          html: `<a href="/tasks/${task.id}/edit" class="govuk-link">View/Edit</a>`,
        },
      ]);

      res.render('home', {
        example: exampleResponse.data,
        rows: rows, // Pass processed rows to the template
      });
    } catch (error) {
      console.error('Error making request:', error);
      res.render('home', { rows: [] }); // Pass an empty rows array in case of error
    }
  });
};
