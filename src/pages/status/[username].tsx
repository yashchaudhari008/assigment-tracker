import Loading from "@/components/Loading";
import Subject from "@/components/Subject";
import { subjectType } from "@/types/subject";
import Head from "next/head";
import React, { Key, useEffect, useState } from "react";
import { useRouter } from 'next/router'

export default function status() {
	const router = useRouter()
	const [subjects, setSubjects] = useState<subjectType[]>([]);
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState("");
	useEffect(() => {
		setUsername(router.query.username as string)
	}, [router.isReady])
	useEffect(() => {
		if(!username) return
		fetch("/api/status?username="+username)
			.then((res) => res.json())
			.then((res) => {
				setSubjects(res.data);
				setLoading(false);
			});
	}, [username]);

	return (
		<>
			<Head>
				<title>Status | {username}</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{loading ? <Loading /> : <div className="appHolder">
            <div className="subjectHolder unclickable">
				{subjects.length > 0 ? subjects
					.sort((first, second) => {
						return first.subject.localeCompare(second.subject);
					})
					.map((eachSub: subjectType) => (
						<Subject
							key={eachSub.subject as Key}
							data={eachSub}
						/>
					)): <div>No Data!</div>}
			</div>
            </div>}
		</>
	);
}