import React from "react";
import { Key, useEffect, useState } from "react";
import { subjectType } from "@/types/subject";
import { assignmentType } from "@/types/assignment";
import Assignment from "@/components/Assignment";
import CreateForm from "@/components/CreateForm";
import Spacer from "@/components/Spacer";
import { stringifySubjects } from "@/helper/output";
export default function SubjectsHolder() {
	const [subjects, setSubjects] = useState<subjectType[]>([]);

	useEffect(() => {
		fetch("/api/subject")
			.then((res) => res.json())
			.then((res) => setSubjects(res.data));
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
		console.log(event);
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

	const markCompleted = (
		subject: any,
		assignment: any,
		completed: boolean,
		setIsCompleted: any
	) => {
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
				setIsCompleted((old: boolean) => !old);
			});
	};

	return (
		<div className="subjectHolder">
			<CreateForm
				showLabel={true}
				onSubmitHandler={createSubject}
				name={"Subject"}
			/>
			<button onClick={() => stringifySubjects(subjects)}>GET OUT</button>
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
							addAssignment={addAssignment}
						/>
					))}
			</ul>
		</div>
	);
}

function Subject({ data, markCompleted, addAssignment }: any) {
	return (
		<li>
			Subject : {data.subject}{" "}
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
							markCompleted={markCompleted}
						/>
					))}
					<Spacer space={5}/>
				<CreateForm
					onSubmitHandler={(e: Event) => addAssignment(data.subject, e)}
					name="Assignment"
				/>
			</ul>
		</li>
	);
}

