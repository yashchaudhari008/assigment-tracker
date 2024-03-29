import React from "react";
import { assignmentType } from "@/types/assignment";
import Assignment from "@/components/Assignment";
import Spacer from "@/components/Spacer";
import styles from "./Subject.module.css";

export default function Subject({
	data,
	markCompleted,
	markSubmitted,
	children
}: any) {
	return (
		<div className={styles.subject}>
			<h3>{data.subject} </h3>
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
				<Spacer space={10} />
				{children}
			</ul>
		</div>
	);
}
