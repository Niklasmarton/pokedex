import { State } from "./state.js";

export async function commandMapb (state: State): Promise<void> {
    if (!state.previousLocationsURL) {
        console.log("You're on the first page")
        return;
    }
    const data = await state.pokeAPI.fetchLocations(state.previousLocationsURL)
    for (const result of data.results) {
        console.log(result.name)
    }
    state.nextLocationsURL = data.next;
    state.previousLocationsURL = data.previous
}