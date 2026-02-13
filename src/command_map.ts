import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    const data = state.nextLocationsURL
        ? await state.pokeAPI.fetchLocations(state.nextLocationsURL)
        : await state.pokeAPI.fetchLocations();

    for (const result of data.results) {
        console.log(result.name)
    }
    state.nextLocationsURL = data.next;
    state.previousLocationsURL = data.previous;
}