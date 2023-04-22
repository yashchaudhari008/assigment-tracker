import React from "react";
import { FiPlus } from "react-icons/fi";
type CreateFormProps = {
	onSubmitHandler: any;
	showLabel?: boolean;
	name: string;
};
export default function CreateForm({
	onSubmitHandler,
	showLabel,
	name,
}: CreateFormProps) {
	return (
		<form onSubmit={onSubmitHandler}>
			{/* {showLabel && <label htmlFor={name.toLowerCase()}>Add Subject: </label>} */}
			<input
				name={name.toLowerCase()}
				placeholder={`New ${name}`}
				type="text"
			></input>
			<button type="submit">
				{showLabel ? `Add ${name}` : <FiPlus style={{ strokeWidth: "4" }} />}
			</button>
		</form>
	);
}
