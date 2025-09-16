import fetch from "node-fetch";

interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}
type fetchPokemonResults<T> = T extends undefined
  ? Promise<PokemonResults>
  : void;

function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
  url: string,
  cb?: T
): fetchPokemonResults<T> {
  if (cb) {
    fetch(url)
      .then((res) => res.json() as Promise<PokemonResults>)
      .then(cb);
    return undefined as fetchPokemonResults<T>;
  } else {
    return fetch(url).then((res) => res.json()) as fetchPokemonResults<T>;
  }
}

fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10", (data) => {
  data.results.forEach((pokemon) => console.log(pokemon.name));
});

(async function () {
  const data = <PokemonResults>(
    await fetchPokemon("https://pokeapi.co/api/v2/pokemon?limit=10")
  );
  data.results.forEach((pokemon) => console.log(pokemon.name));
})();
