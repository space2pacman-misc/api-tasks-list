const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Payload = require('./core/Payload');
const tasks = require('./db/tasks');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

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

app.post('/tasks/add', (request, response) => {
	const payload = new Payload();
	const name = request.body.name;
	const description = request.body.description;
	
	tasks.push({ id: 1, name, description });

	payload.add('message', 'task has been added');

	response.send(payload.get());
})

app.listen(7777);