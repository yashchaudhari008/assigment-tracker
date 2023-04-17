import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function unauth() {
    const [token, setToken] = useState<string>("")
	return (
        <form>
            <label htmlFor='token'>Token: </label>
            <input name="token" type="password" value={token} onChange={(e) => setToken(e.target.value)}>
            </input>
			<button
				onClick={() => {
					Cookies.set("token", token);
                    location.reload();
				}}
			>SET</button>
        </form>
	);
}
