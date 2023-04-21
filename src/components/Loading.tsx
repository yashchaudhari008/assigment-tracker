import React from "react";
import { FiRefreshCw } from "react-icons/fi";

export default function Loading() {
	return (
		<div className="loading">
			Fetching for server ... <span>{<FiRefreshCw />}</span>
		</div>
	);
}
