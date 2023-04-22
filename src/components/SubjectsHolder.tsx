import React from "react";
import { Key, useEffect, useState } from "react";
import { subjectType } from "@/types/subject";
import CreateForm from "@/components/CreateForm";
import { stringifySubjects } from "@/helper/output";
import Loading from "./Loading";
import Subject from "./Subject";
export default function SubjectsHolder() {
	const [subjects, setSubjects] = useState<subjectType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/subject")
			.then((res) => res.json())
			.then((res) => {
				setSubjects(res.data);
				setLoading(false);
			});
	}, []);

	const createSubject = (event: any) => {
		event.preventDefault();
		const subject = event.target.subject.value;
		fetch("/api/subject", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				subject: subject,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				setSubjects([...subjects, res.data]);
			});
	};

	const addAssignment = (subject: string, event: any) => {
		event.preventDefault();
		const assignment = event.target.assignment.value;
		fetch("/api/subject/assignment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				subject: subject,
				assignment: assignment,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				setSubjects((old: any) => [
					...old.filter((e: any) => e.subject !== subject),
					res.data,
				]);
				event.target.reset();
			});
	};

	const markCompleted = (subject: any, assignment: any, completed: boolean) => {
		fetch("/api/subject/assignment", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				subject: subject,
				assignment: assignment,
				completed: completed,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				setSubjects((old: any) => [
					...old.filter((e: any) => e.subject !== subject),
					res.data,
				]);
			});
	};

	const markSubmitted = (subject: any, assignment: any, submitted: boolean) => {
		fetch("/api/subject/assignment", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				subject: subject,
				assignment: assignment,
				submitted: submitted,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				setSubjects((old: any) => [
					...old.filter((e: any) => e.subject !== subject),
					res.data,
				]);
			});
	};

	return loading ? (
		<Loading />
	) : (
		<div className="appHolder">
			<div className="topBar">
				<CreateForm
					showLabel={true}
					onSubmitHandler={createSubject}
					name={"Subject"}
				/>
				<button onClick={() => stringifySubjects(subjects)}>
					Copy to Clipboard
				</button>
			</div>
			<div className="subjectHolder">
				{subjects
					.sort((first, second) => {
						return first.subject.localeCompare(second.subject);
					})
					.map((eachSub: subjectType) => (
						<Subject
							key={eachSub.subject as Key}
							data={eachSub}
							markCompleted={markCompleted}
							markSubmitted={markSubmitted}
							addAssignment={addAssignment}
						/>
					))}
			</div>
		</div>
	);
}
