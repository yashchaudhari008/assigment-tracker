import React from "react";
import { Key, useEffect, useState } from "react";
import { subjectType } from "@/types/subject";
import { assignmentType } from "@/types/assignment";
import Assignment from "@/components/Assignment";
import CreateForm from "@/components/CreateForm";
import Spacer from "@/components/Spacer";
import { stringifySubjects } from "@/helper/output";
import Loading from "./Loading";
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
		<div className="subjectHolder">
			<CreateForm
				showLabel={true}
				onSubmitHandler={createSubject}
				name={"Subject"}
			/>
			<button onClick={() => stringifySubjects(subjects)}>
				Copy to Clipboard
			</button>
			<ul className="myList">
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
			</ul>
		</div>
	);
}

function Subject({ data, markCompleted, addAssignment, markSubmitted }: any) {
	return (
		<li>
			<h3>{data.subject} </h3>
			<Spacer space={5} />
			<ul>
				{data.assignments
					.sort((first: assignmentType, second: assignmentType) => {
						return first.name.localeCompare(second.name);
					})
					.map((eachAssign: assignmentType) => (
						<Assignment
							key={eachAssign.name}
							subject={data.subject}
							assignment={eachAssign.name}
							completed={eachAssign.completed}
							submitted={eachAssign.submitted}
							markCompleted={markCompleted}
							markSubmitted={markSubmitted}
						/>
					))}
				<Spacer space={5} />
				<CreateForm
					onSubmitHandler={(e: Event) => addAssignment(data.subject, e)}
					name="Assignment"
				/>
			</ul>
		</li>
	);
}
