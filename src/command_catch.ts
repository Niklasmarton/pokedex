import { State } from "./state";

export async function commandCatch(state: State, ...pokemon: string[]): Promise<void> {
    const pokemon_data = await state.pokeAPI.fetchPokemon(pokemon[0]);
    console.log(`Throwing a Pokeball at ${pokemon_data.name}...`);
    const catch_cutoff = 45;
    if (pokemon_data.base_experience * Math.random() <= catch_cutoff) {
        console.log(`${pokemon_data.name} was caught!`)
        state.pokedex[pokemon[0]] = pokemon_data
    }
    else {
        console.log(`${pokemon_data.name} escaped!`)
    }
}