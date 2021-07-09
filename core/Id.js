const fs = require('fs');
const path = __dirname + './../db/id.json';

class Id {
	getId() {
		const file = fs.readFileSync(path);
		const value = JSON.parse(file).value;
		const newValue = value + 1;

		fs.writeFile(path, JSON.stringify({ value: newValue }), () => {});

		return JSON.parse(file).value;
	}
}

module.exports = new Id();