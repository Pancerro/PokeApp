package pl.pancerro.pokemonbackend.service.pokeApiService;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.pancerro.pokemonbackend.model.PokeList;
import pl.pancerro.pokemonbackend.model.Pokemon;

import java.util.ArrayList;
import java.util.List;

@Service
public class PokeApiServiceImpl implements PokeApiService{
    @Override
    public Pokemon getPokemon(int id){
        String url="https://pokeapi.co/api/v2/pokemon/"+id;
        String urlPng="https://pokeres.bastionbot.org/images/pokemon/"+id+".png";
        RestTemplate restTemplate = new RestTemplate();
        JsonNode name = restTemplate.getForObject(url, JsonNode.class).get("forms").get(0).get("name");
        JsonNode height = restTemplate.getForObject(url, JsonNode.class).get("height");
        JsonNode weight = restTemplate.getForObject(url, JsonNode.class).get("weight");
        JsonNode types = restTemplate.getForObject(url, JsonNode.class).get("types");
        JsonNode abilities = restTemplate.getForObject(url, JsonNode.class).get("abilities");
        Pokemon pokemon = new Pokemon(id,name.toString(),height.toString(),weight.toString(),types.toString(),abilities.toString(),urlPng);
        return pokemon;
    }
    @Override
    public Pokemon searchPokemon(String pokemonName) {
        String url="https://pokeapi.co/api/v2/pokemon/"+pokemonName;
        RestTemplate restTemplate = new RestTemplate();
        JsonNode id = restTemplate.getForObject(url, JsonNode.class).get("forms").get(0).get("url");
        String stringID = id.toString().split("/")[6];
        return getPokemon(Integer.parseInt(stringID));
    }
    @Override
    public List<Pokemon> getAllPokemon(){
        List<Pokemon> pokemonList = new ArrayList<>();
        for(int i = 1;i<=890;i++){
            Pokemon pokemon = getPokemon(i);
            pokemonList.add(pokemon);
            }
        return pokemonList;
    }
    @Override
    public List<Pokemon> getRangePokemon(int start, int end) {
        List<Pokemon> pokemonList = new ArrayList<>();
        for(int i = start;i<=end;i++){
            Pokemon pokemon = getPokemon(i);
            pokemonList.add(pokemon);
        }
        return pokemonList;
    }
    @Override
    public List<Pokemon> getFavoritePokemon(List<PokeList> favoriteId) {
        List<Pokemon> pokemonFavoriteList = new ArrayList<>();
        for(int i=0; i< favoriteId.size();i++) {
            Pokemon pokemon = getPokemon(favoriteId.get(i).getPokeID());
            pokemonFavoriteList.add(pokemon);
        }
       return pokemonFavoriteList;
    }
}
