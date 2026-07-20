# Pokedex

A command-line Pokédex built in TypeScript. It runs an interactive REPL that talks to the [PokéAPI](https://pokeapi.co/), lets you walk through the world's location areas, explore them for wild Pokémon, catch them, and inspect the ones you've caught. HTTP responses are cached in memory to keep things fast and avoid hammering the API.

This was built as part of the [Boot.dev](https://www.boot.dev/) "Build a Pokedex" guided project.

## Features

- Interactive REPL with a `Pokedex >` prompt
- Paginated browsing of location areas (`map` / `mapb`)
- Explore a location to list the Pokémon that can be found there
- Catch Pokémon (success depends on their base experience — some get away!)
- Inspect stats, types, height, and weight of caught Pokémon
- View your personal Pokédex of everything you've caught
- In-memory cache with a background reap loop to expire stale entries

## Requirements

- [Node.js](https://nodejs.org/) (v18+ recommended, for the built-in `fetch`)
- npm

## Installation

```bash
git clone <repo-url>
cd Pokedex
npm install
```

## Usage

Build and run:

```bash
npm run build   # compile TypeScript into dist/
npm start       # run the compiled app
```

Or do both in one step during development:

```bash
npm run dev
```

Run the tests:

```bash
npm test
```

## Commands

Once the REPL is running, type any of the following at the `Pokedex >` prompt:

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `help`              | Print the list of available commands          |
| `map`               | Show the next 20 location areas               |
| `mapb`              | Show the previous 20 location areas            |
| `explore <area>`    | List the Pokémon found in a location area      |
| `catch <pokemon>`   | Attempt to catch a Pokémon                     |
| `inspect <pokemon>` | Show details for a Pokémon you've caught       |
| `pokedex`           | List every Pokémon you've caught               |
| `exit`              | Exit the Pokédex                               |

### Example session

```text
Pokedex > map
canalave-city-area
eterna-city-area
...
Pokedex > explore pastoria-city-area
Exploring pastoria-city-area
Found Pokemon:
- tentacool
- magikarp
Pokedex > catch magikarp
Throwing a Pokeball at magikarp...
magikarp was caught!
Pokedex > inspect magikarp
Name: magikarp
Height: 9
...
Pokedex > pokedex
Your pokedex:
- magikarp
```

## Project structure

```
src/
├── main.ts            # Entry point
├── repl.ts            # REPL loop and input parsing
├── state.ts           # App state and command registry
├── pokeapi.ts         # PokéAPI client
├── pokecache.ts       # In-memory cache with reap loop
└── command_*.ts       # Individual command handlers
```

## License

ISC
