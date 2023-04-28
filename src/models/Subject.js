import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
	{
		subject: { type: String, required: true, trim: true },
		assignments: [
			{
				name: { type: String, required: true, trim: true },
				completed: { type: Boolean },
				submitted: { type: Boolean },
			},
		],
		username: { type: String, required: true, trim: true }
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

SubjectSchema.methods = {
	addAssignment: async function (name) {
		const exists = this.assignments.some((entry) =>
			entry.name === name ? true : false
		); //Already exists
		if (!exists) {
            const newAssignment = {
                name: name,
                completed: false,
                submitted: false,
            };
			this.assignments = this.assignments.concat(newAssignment);
		}

		await this.save();
	},
	deleteAssignment: async function (name) {
		this.assignments = this.assignments.filter((entry) => entry.name !== name);
		await this.save();
	},
	markAsCompleteAssignment: async function (name, completed) {
		this.assignments = this.assignments.map((entry) => {
			if (entry.name === name) {
				entry.completed = completed;
			}
			return entry;
		});
		await this.save();
	},
	markAsSubmittedAssignment: async function (name, submitted) {
		this.assignments = this.assignments.map((entry) => {
			if (entry.name === name) {
				entry.completed = true;
				entry.submitted = submitted;
			}
			return entry;
		});
		await this.save();
	},
};

export default mongoose.models.Subject ||
	mongoose.model("Subject", SubjectSchema);
