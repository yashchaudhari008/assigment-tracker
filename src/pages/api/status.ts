// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Subject from "@/models/Subject";
import dbConnect from "@/lib/dbConnect";

type responseType = {
	success: Boolean;
	data?: any;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<responseType>
) {
	console.log(req.method, "/all");
	await dbConnect();

	if (req.method === "GET") {
		const subjectsFound = await Subject.find({username: req.query.username});
		console.log(req.query)
		if (subjectsFound) {
			return res.status(201).json({ success: true, data: subjectsFound });
		}
		return res.status(400).json({ success: false });
	}
	return res.status(400).json({ success: false });
}
