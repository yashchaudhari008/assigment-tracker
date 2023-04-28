import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case "POST":
			try {
				const { username, password } = req.body;
				const userFound = await User.findOne({ username: username });
				const result = await userFound.matchPassword(password);
                if (result) {
					const token = await userFound.generateToken();
					res.status(201).json({ success: result, data: token});
				} else {
					res.status(401).json({ success: false });
				}
			} catch (error) {
				res.status(401).json({ success: false });
			}
			break;
		default:
			res.status(405).json({ success: false });
			break;
	}
}
