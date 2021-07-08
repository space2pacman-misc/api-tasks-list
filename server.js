const express = require('express');
const app = express();
const Payload = require('./core/Payload');
const tasks = require('./db/tasks');

app.get('/tasks', (request, response) => {
		response.send(tasks);
});

app.get('/tasks/:id', (request, response) => {
	const id = Number(request.params.id);
	const task = tasks.find(task => task.id === id) || null;
	const message = task ? null : 'Task not found'
	const payload = new Payload();

	payload.add('task', task);
	payload.add('message', message);

	response.send(payload.get());
})

app.listen(7777);