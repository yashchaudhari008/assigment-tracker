import React from "react";
import Cookies from "js-cookie";

export default function unauth() {
	const addToken = (event: any) => {
		event.preventDefault();
		Cookies.set("token", event.target.token.value);
		location.reload();
	};
	return (
		<div className="appHolder">
			<p>Incorrect Token or No Token Present !</p>
			<form onSubmit={addToken}>
				<input name="token" placeholder="New Token" type="password"></input>
				<button type="submit"> Save Token</button>
			</form>
		</div>
	);
}
