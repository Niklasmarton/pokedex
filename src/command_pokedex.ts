import { State } from "./state";

export async function commandPokedex(state: State): Promise<void> {
    if (Object.keys(state.pokedex).length === 0) {
        console.log("Pokedex is empty")
    }
    else {
        console.log("Your pokedex:")
        for (const pokemon_name in state.pokedex) {
            console.log(`- ${pokemon_name}`)
        }
    }
}