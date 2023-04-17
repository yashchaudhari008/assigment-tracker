import { subjectType } from "@/types/subject";

export function stringifySubjects(subjects: subjectType[]) {
	let result = "";
	for (let i = 0; i < subjects.length; i++) {
        let buffer:string[] = [];
        for (let j = 0; j < subjects[i].assignments.length; j++) {
            if(subjects[i].assignments[j].completed){
                buffer.push(subjects[i].assignments[j].name);
            }
        }
        if(buffer.length >= 1){
            result += line();
            result += subjects[i].subject.toUpperCase() + "\n";
            for (let j = 0; j < buffer.length; j++) {
                if(buffer[j]){
                    result += '--> ' + buffer[j] + '\n';
                }
            }
        }
	}
	result += line();
    navigator.clipboard.writeText(result).then(() => alert('Copied to clipboard!')).catch((err) => console.error(err))
}

function line() {
	return "----------------\n";
}
