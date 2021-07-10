const express = require('express');
const bodyParser = require('body-parser');
const Payload = require('./core/Payload');
const Tasks = require('./core/Tasks');
const RequiredFields = require('./core/RequiredFields');
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
	const payload = new Payload();

	if (!task) {
		payload.add('error', 'Task not found');
	} else {
		payload.add('task', task);
	}

	response.send(payload.get());
});

app.post('/api/tasks/add/', (request, response) => {
	const name = request.body.name;
	const description = request.body.description;
	const payload = new Payload();
	const requiredFields = new RequiredFields(RequiredFields.tasks.add, { name, description });
	const checkingRequiredResult = requiredFields.check();

	if (checkingRequiredResult.state) {
		tasks.add({ name, description });
		payload.add('message', 'task has been added');
	} else {
		payload.add('error', checkingRequiredResult.message);
	}

	response.send(payload.get());
});

app.post('/api/tasks/edit/', (request, response) => {
	const id = request.body.id;
	const requiredFields = new RequiredFields(RequiredFields.tasks.edit, { id });
	const checkingRequiredResult = requiredFields.check();
	const payload = new Payload();

	if (checkingRequiredResult.state) {
		const task = tasks.getById(id);
		const name = request.body.name;
		const description = request.body.description;
		const complited = request.body.complited;

		tasks.edit(id, { name, description, complited });
		payload.add('message', 'task has been edited');
	} else {
		payload.add('error', checkingRequiredResult.message);
	}

	response.send(payload.get());
});

app.listen(7777);