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
	console.log(req.method, "/subject/assignment");
	await dbConnect();

	if (req.method === "GET") {
		return res.status(400).json({ success: false });
	} else if (req.method === "POST") {
		const { subject, assignment } = req.body;
		const subjectFound = await Subject.findOne({ subject: subject });

		await subjectFound.addAssignment(assignment);
		return res.status(201).json({ success: true, data: subjectFound });
	} else if (req.method === "PATCH") {
		const { subject, assignment, completed, submitted } = req.body;

		const subjectFound = await Subject.findOne({ subject: subject });
		if (completed != null)
			await subjectFound.markAsCompleteAssignment(assignment, completed);
		if (submitted != null)
			await subjectFound.markAsSubmittedAssignment(assignment, submitted);
		return res.status(201).json({ success: true, data: subjectFound });
	} else if (req.method === "DELETE") {
		const { subject, assignment } = req.query;
		const subjectFound = await Subject.findOne({ subject: subject });
		if (subjectFound) {
			await subjectFound.deleteAssignment(assignment);
			return res.status(201).json({ success: true, data: subjectFound });
		}
		return res.status(400).json({ success: false });
	}
	return res.status(400).json({ success: false });
}
