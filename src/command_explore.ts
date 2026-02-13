
import { State } from "./state";


export async function commandExplore(state: State, ...city: string[]): Promise<void> {
    const city_object = await state.pokeAPI.fetchLocation(city[0])
    const pokemon_encounter = city_object.pokemon_encounters
    console.log(`Exploring ${city[0]}`)
    console.log("Found Pokemon:")
    for (const pokemon of pokemon_encounter) {
        console.log(`- ${pokemon.pokemon.name}`)
    }
}