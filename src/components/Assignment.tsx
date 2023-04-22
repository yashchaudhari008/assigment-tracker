import Badge from "@/components/Badge";

type AssignmentProps = {
	subject: string;
	assignment: string;
	completed: boolean;
	submitted: boolean;
	markCompleted: any;
	markSubmitted: any;
};
export default function Assignment({
	subject,
	assignment,
	completed,
	submitted,
	markCompleted,
	markSubmitted,
}: AssignmentProps) {
	return (
		<li>
			<div>
				<span className={`${completed && "completed"}`}>{assignment}</span>{" "}
				<Badge
					name={completed ? "completed" : "in progress"}
					color={completed ? "green" : "red"}
					onClickHandler={async () => {
						if (submitted) {
							alert("Submitted assignment can't be marked as incomplete");
							return;
						}
						const ok = await confirm(
							`Mark ${!completed ? "completed" : "incomplete"}?`
						);
						if (!ok) return;
						markCompleted(subject, assignment, !completed);
					}}
				></Badge>{" "}
				<Badge
					name={`${!submitted ? "not " : ""}submitted`}
					color={submitted ? "blue" : "gray"}
					onClickHandler={async () => {
						const ok = await confirm(
							`Mark ${submitted ? "not submitted" : "submitted"}?`
						);
						if (!ok) return;
						markSubmitted(subject, assignment, !submitted);
					}}
				></Badge>{" "}
			</div>
		</li>
	);
}
