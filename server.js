const express = require('express');
const bodyParser = require('body-parser');
const Payload = require('./core/Payload');
const Tasks = require('./core/Tasks');
const app = express();
const tasks = new Tasks();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/api/tasks/list/', (request, response) => {
	const payload = new Payload();

	payload.add('tasks', tasks.getAll());

	response.send(payload.get());
});

app.get('/api/tasks/id/:id/', (request, response) => {
	const id = Number(request.params.id);
	const task = tasks.getById(id);
	const message = task ? null : 'Task not found';
	const payload = new Payload();

	payload.add('task', task);
	payload.add('message', message);

	response.send(payload.get());
});

app.post('/api/tasks/add/', (request, response) => {
	const name = request.body.name;
	const description = request.body.description;
	const payload = new Payload();
	
	tasks.add({ name, description });
	payload.add('message', 'task has been added');
	response.send(payload.get());
});

app.listen(7777);