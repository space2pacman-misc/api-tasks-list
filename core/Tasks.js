const fs = require('fs');
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

	edit(id, params) {
		const task = this.getById(id);

		task.name = params.name || task.name;
		task.description = params.description || task.description;
		task.complited = params.complited === undefined ? task.complited : params.complited;

		fs.writeFile(__dirname + './../db/tasks.json', JSON.stringify(this.getAll()), () => {
			fs.readFile(__dirname + './../db/tasks.json', 'utf-8', (error, tasks) => {
				this._tasks = JSON.parse(tasks);
			});
		});
	}
}

module.exports = Tasks;