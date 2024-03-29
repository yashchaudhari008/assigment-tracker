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
	console.log(req.method, "/subject");
	await dbConnect();

	if (req.method === "GET") {
		const subjectsFound = await Subject.find({
			username: req.cookies["username"],
		});
		if (subjectsFound) {
			return res.status(201).json({ success: true, data: subjectsFound });
		}
		return res.status(400).json({ success: false });
	} else if (req.method === "POST") {
		const { subject } = req.body;
		const subjectFound = await Subject.findOne({
			subject: subject,
			username: req.cookies["username"],
		});
		// console.log(subjectFound === null, subject)
		if (subjectFound === null) {
			const newSubject = new Subject({
				subject: subject,
				username: req.cookies["username"],
			});
			await newSubject.save();
			return res.status(201).json({ success: true, data: newSubject });
		}
		return res.status(400).json({ success: false });
	} else if (req.method === "DELETE") {
		const { subject } = req.query;
		const subjectFound = await Subject.findOne({
			subject: subject,
			username: req.cookies["username"],
		});
		if (subjectFound) {
			await subjectFound.deleteOne();
			return res.status(201).json({ success: true, data: subjectFound });
		}
		return res.status(400).json({ success: false });
	}
	return res.status(400).json({ success: false });
}
