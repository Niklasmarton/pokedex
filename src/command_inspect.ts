import { State } from "./state";

export async function commandInspect(state: State, ...pokemon: string[]): Promise<void> {
    if (pokemon[0] in state.pokedex) {
        const pokemon_obj = state.pokedex[pokemon[0]];
        console.log(`Name: ${pokemon_obj.name}`);
        console.log(`Height: ${pokemon_obj.height}`);
        console.log(`Weight: ${pokemon_obj.height}`);
        console.log("Stats:");
        for (const s of pokemon_obj.stats) {
            console.log(`  -${s.stat.name}: ${s.base_stat}`)
        };
        console.log("Types:")
        for (const t of pokemon_obj.types) {
            console.log(`  - ${t.type.name}`)
        }
    }
    else console.log("you have not caught that pokemon")
}