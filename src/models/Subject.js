import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema(
	{
		subject: { type: String, required: true, trim: true },
		assignments: [
			{
				name: { type: String, required: true, trim: true },
				completed: { type: Boolean},
				sumbitted: { type: Boolean},
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

SubjectSchema.methods = {
    addAssignment: async function (name) {
        const newAssignment = {
            name: name,
            completed: false,
            sumbitted: false,
        };
        const exists = this.assignments.some((entry) =>
            entry.name === name ? true : false
        ); //Already exists
        if (!exists) {
            this.assignments = this.assignments.concat(newAssignment);
        }
    
        await this.save();
    },
    deleteAssignment: async function (name) {
        this.assignments = this.assignments.filter((entry) =>
            entry.name !== name
        );
        await this.save();
    },
    markAsCompleteAssignment:  async function (name, completed) {
        const exists = this.assignments.find((entry) =>
            entry.name === name
        );
        if(exists){
            exists.completed =completed;
        }
        await this.save();
    },
    markAsSumbittedAssignment:  async function (name, submitted) {
        const exists = this.assignments.find((entry) =>
            entry.name === name
        );
        if(exists){
            exists.submitted =submitted;
        }
        await this.save();
    }

}

export default mongoose.models.Subject ||
	mongoose.model("Subject", SubjectSchema);
