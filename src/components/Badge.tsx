import React from "react";
import styles from "./Badge.module.css";

type BadgeProps = {
	name: string;
	color: string;
	onClickHandler?: any;
};
export default function Badge({ name, color, onClickHandler }: BadgeProps) {
	return (
		<div
			className={`${styles.badge} ${styles[`${color}`]}`}
			onClick={onClickHandler}
		>
			{name}
		</div>
	);
}
