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
		const task = {
			id: id.getId(),
			name: params.name,
			description: params.description,
			complited: false,
			time: {
				completion: params.data || null,
				creation: Date.now()		
			},
		};
		
		this._tasks.push(task);
	}
}

module.exports = Tasks;