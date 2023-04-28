import React, { useState } from "react";
import Cookies from "js-cookie";

export default function signin() {
	const [signUpPage, setSignUpPage] = useState<Boolean>(false);
	const signIn = async (event: any) => {
		event.preventDefault();
		fetch("/api/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: event.target.username.value,
				password: event.target.password.value,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.success) {
					Cookies.set("username", event.target.username.value, {
						expires: 365,
					});
					Cookies.set("token", res.data, { expires: 365 });
					location.reload();
				} else {
					alert("Wrong Credentials!");
					event.target.reset();
				}
			});
	};
	const signUp = async (event: any) => {
		event.preventDefault();
		fetch("/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: event.target.username.value,
				password: event.target.password.value,
			}),
		}).then(async () => {
			await signIn(event);
		});
	};
	return (
		<div className="appHolder">
			{!signUpPage ? (
				<>
					<h1>Sign In</h1>
					<form onSubmit={signIn}>
						<input name="username" placeholder="Username" type="text"></input>
						<input
							name="password"
							placeholder="Password"
							type="password"
						></input>
						<button type="submit">Sign In</button>
					</form>
					<br />
					<p style={{ cursor: "pointer" }} onClick={() => setSignUpPage(true)}>
						Create new account | Sign Up
					</p>
				</>
			) : (
				<>
					<h1>Sign Up </h1>
					<form onSubmit={signUp}>
						<input name="username" placeholder="Username" type="text"></input>
						<input
							name="password"
							placeholder="Password"
							type="password"
						></input>
						<button type="submit">Sign Up</button>
					</form>
					<br />
					<p style={{ cursor: "pointer" }} onClick={() => setSignUpPage(false)}>
						Already have a account ? | Sign In
					</p>
				</>
			)}
		</div>
	);
}
