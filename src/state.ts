import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapb } from "./command_mapb.js";
import { commandMap } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js"
import { commandPokedex } from "./command_pokedex.js";

export function initState(): State {
    const myInterface = createInterface ({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > "
	})
    const commands: Record<string, CLICommand> = {
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit,
		},
		help: {
                        name: "help",
                        description: "Prints commands",
                        callback: commandHelp,
                },
		map: {
                        name: "map",
                        description: "Shows next 20 cities",
                        callback: commandMap,
                },
        mapb: {
                        name: "mapb",
                        description: "Shows previous 20 cities",
                        callback: commandMapb,
        },
        explore: {
                        name: "explore",
                        description: "Allows for exploring certain cities",
                        callback: commandExplore,
        },
        catch: {
                        name: "catch",
                        description: "Tries to catch a pokemon",
                        callback: commandCatch,
        },
        inspect: {
                        name: "inspect",
                        description: "Tells data about a pokemon",
                        callback: commandInspect,
        },
        pokedex: {
                        name: "pokedex",
                        description: "Prints the whole pokedex",
                        callback: commandPokedex,
        },
	};
    const cache = new Cache(500)
    const pokeAPI = new PokeAPI(cache);
    const nextLocationsURL = null;
    const previousLocationsURL = null;
    const pokedex: Record<string, any> = {}

    return {
        myInterface,
        pokeAPI,
        nextLocationsURL,
        previousLocationsURL,
        commands,
        pokedex,
    };
}

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;}

export type State = {
    myInterface: Interface;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    previousLocationsURL: string | null;
    commands: Record<string, CLICommand>;
    pokedex: Record<string, any>;
}

