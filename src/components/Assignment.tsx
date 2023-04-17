import { useState } from "react";

type AssignmentProps = {
	subject: string;
	assignment: string;
	completed: boolean;
	markCompleted: any;
};
export default function Assignment({
	subject,
	assignment,
	completed,
	markCompleted,
}: AssignmentProps) {
	const [isCompleted, setIsCompleted] = useState<boolean>(completed);

	return (
		<li
			className={`${completed && "completed"}`}
			onClick={async () => {
				const ok = await confirm(
					`Mark ${!completed ? "completed" : "incomplete"}?`
				);
				if (!ok) return;
				markCompleted(subject, assignment, !isCompleted, setIsCompleted);
			}}
		>
			{assignment}
		</li>
	);
}
Assignment;
