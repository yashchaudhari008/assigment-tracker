type SpacerProps = {
	space : number
}
export default function Spacer({space} : SpacerProps){
	return <div style={{height:`${space}px`}}></div>
}