import { Cache } from "./pokecache";


export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(cache: Cache) {
    this.#cache = cache;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached !== undefined) return cached;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as ShallowLocations;
    this.#cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.#cache.get<Location>(url);
    if (cached !== undefined) return cached;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Location;
    this.#cache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string) {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cached = this.#cache.get<any>(url);
    if (cached !== undefined) return cached;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json());
    this.#cache.add(url, data);
    return data;
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

export type Location = {
  name: string;
  pokemon_encounters: {
    pokemon: {
      name: string;
    };
  }[];
};

