class RequiredFields {
	constructor(fields, values) {
		this._fields = fields;
		this._values = values;
	}

	check() {
		const payload = {
			state: true,
			message: null
		}

		for (let i = 0; i < this._fields.length; i++) {
			const field = this._fields[i];
			const value = this._values[field.name];

			if (value === undefined || value === null) {
				payload.state = false;
				payload.message = `Value cannot be empty for ${field.name}`;

				return payload;
			}

			if (typeof value !== field.type) {
				payload.state = false;
				payload.message = `Invalid data type for ${field.name}. Expected: ${field.type}, instead got: ${typeof value}`;

				return payload;
			}

			if (field.type === 'string') {
				if (value.length <= field.length.min || value.length >= field.length.max) {
					payload.state = false;
					payload.message = `Value out of range for ${field.name}. Min: ${field.length.min}. Max: ${field.length.max}. Current value length ${value.length}`;

					return payload;
				}
			}
		}

		return payload;
	}

	static get tasksAdd() {
		return require('./../required_fields/tasksAdd');
	}
}

module.exports = RequiredFields;