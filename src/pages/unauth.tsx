import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function unauth() {
	const [token, setToken] = useState<string>("");
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				Cookies.set("token", token);
				location.reload();
			}}
		>
			<label htmlFor="token">Token: </label>
			<input
				name="token"
				type="password"
				value={token}
				onChange={(e) => setToken(e.target.value)}
			></input>
			<button type="submit">SET</button>
		</form>
	);
}
