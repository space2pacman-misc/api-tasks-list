const tasks = require('./../db/tasks');
const id = require('./Id');

class Tasks {
	constructor() {
		this._tasks = tasks;
	}

	getById(id) {
		return this._tasks.find(task => task.id === id) || null;
	}

	getAll() {
		return this._tasks;
	}

	add(params) {
		this._tasks.push({ id: id.getId(), name: params.name, description: params.description });
	}
}

module.exports = Tasks;