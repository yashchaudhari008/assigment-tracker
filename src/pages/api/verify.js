import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case "POST":
			try {
				const { username, token } = req.body;
				const userFound = await User.findOne({ username: username });

				const result = await userFound.verifyToken(token);
                if (result) {
					
				res.status(201).json({ success: true, data: result});
				}

			} catch (error) {
				res.status(403).json({ success: false });
			}
			break;
		default:
			res.status(405).json({ success: false});
			break;
	}
}
