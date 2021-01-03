package pl.pancerro.pokemonbackend.model;

import java.sql.Blob;

public class Pokemon {
    int idPokemon;
    String name;
    String height;
    String weight;
    String type;
    String ability;
    String url;

    public Pokemon(int idPokemon, String name, String height, String weight, String type, String ability, String url) {
        this.idPokemon = idPokemon;
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.type = type;
        this.ability = ability;
        this.url = url;
    }

    public int getIdPokemon() {
        return idPokemon;
    }

    public void setIdPokemon(int idPokemon) {
        this.idPokemon = idPokemon;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAbility() {
        return ability;
    }

    public void setAbility(String ability) {
        this.ability = ability;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
