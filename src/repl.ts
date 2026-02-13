import { State } from "./state.js";

export async function startREPL(state: State): Promise<void> {	


	state.myInterface.prompt()

	state.myInterface.on("line", async (input)=> {
		const words = cleanInput(input);
		if (words.length === 0) {
			state.myInterface.prompt()
			return;
		}

	const command = words[0];
	const cmd = state.commands[command];

	if (!cmd) {
		console.log("Unknown command")
		state.myInterface.prompt()
	} else {
		try {
			await cmd.callback(state, ...words.slice(1));
		}
		catch (err) {
		console.log((err as Error).message)
		}
		state.myInterface.prompt()
		} 
	});	
}

export function cleanInput(input: string): string[] {
	return input
    	.trim()
    	.toLowerCase()
    	.split(/\s+/);
}



