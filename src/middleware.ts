// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const username = request.cookies.get("username")?.value;
	const token = request.cookies.get("token")?.value;

	if (username && token) {
		const response = await fetch(request.nextUrl.origin + "/api/verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				token: token,
			}),
		});
		const status = await response.json();
		if (status.success === true) {
			return NextResponse.next();
		}
	}

	const response = NextResponse.rewrite(new URL("/signin", request.url));
	response.cookies.delete("username");
	response.cookies.delete("token");
	return response;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/", "/api/subject:path*"],
};
