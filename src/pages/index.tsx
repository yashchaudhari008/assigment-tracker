import Head from "next/head";
import { Inter } from "next/font/google";
import { Key, useEffect, useState } from "react";
import { subjectType } from "@/types/subject";
import { assignmentType } from "@/types/assignment";

export default function Home() {
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
		<>
			<Head>
				<title>Assignment Tracker</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="app">
				<form onSubmit={createSubject}>
					<label htmlFor="subject">Add Subject: </label>
					<input name="subject" type="text"></input>
					<button type="submit">Add</button>
				</form>
				<ul className="myList">
					{subjects
						.sort((first, second) => {
							return first.subject.localeCompare(second.subject);
						})
						.map((eachSub: subjectType) => (
							<li key={eachSub.subject as Key}>
								Subject : {eachSub.subject}{" "}
								<ul>
									{eachSub.assignments
										.sort((first, second) => {
											return first.name.localeCompare(second.name);
										})
										.map((eachAssign: assignmentType) => (
											<Assignment
												key={eachAssign.name}
												subject={eachSub.subject}
												assignment={eachAssign.name}
												completed={eachAssign.completed}
												markCompleted={markCompleted}
											/>
										))}
									<form
										onSubmit={(e) =>
											addAssignment(eachSub.subject as string, e)
										}
									>
										<input name="assignment" type="text"></input>
										<button type="submit">Add</button>
									</form>
								</ul>
							</li>
						))}
				</ul>
			</div>
		</>
	);
}

type assignmentProps = {
	subject: string;
	assignment: string;
	completed: boolean;
	markCompleted: any;
};
const Assignment = ({
	subject,
	assignment,
	completed,
	markCompleted,
}: assignmentProps) => {
	const [isCompleted, setIsCompleted] = useState<boolean>(completed);

	return (
		<li
			className={`${completed && "completed"}`}
			onClick={async () => {
				if (isCompleted) {
					const ok = await confirm("Mark incompleted?");
					if (!ok) return;
				}
				markCompleted(subject, assignment, !isCompleted, setIsCompleted);
			}}
		>
			{assignment}
		</li>
	);
};
