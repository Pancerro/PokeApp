package pl.pancerro.pokemonbackend.service.pokeApiService;

import pl.pancerro.pokemonbackend.model.PokeList;
import pl.pancerro.pokemonbackend.model.Pokemon;

import java.util.List;

public interface PokeApiService {
    Pokemon getPokemon(int id);
    List<Pokemon> getAllPokemon();
    List<Pokemon> getRangePokemon(int start, int end);
    List<Pokemon> getFavoritePokemon(List<PokeList> favoriteId);
    Pokemon searchPokemon(String pokemonName);
}
