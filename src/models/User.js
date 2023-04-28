import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, trim: true },
		password: { type: String, required: true, trim: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

UserSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

UserSchema.methods = {
	matchPassword: async function (password) {
		return await bcrypt.compare(password, this.password);
	},
	generateToken: async function () {
		try {
			return await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
		} catch {
			console.error(err);
		}
	},
    verifyToken : async function (token) {
		try {
			let user =  await jwt.verify(token, process.env.SECRET_KEY);
			return user && this._id.equals(user._id);
        } catch {
			console.error(err);
		}
	},
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
