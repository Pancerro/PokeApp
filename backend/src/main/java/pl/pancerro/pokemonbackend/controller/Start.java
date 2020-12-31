package pl.pancerro.pokemonbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientResponseException;
import pl.pancerro.pokemonbackend.model.PokeList;
import pl.pancerro.pokemonbackend.model.PokeUser;
import pl.pancerro.pokemonbackend.repository.PokeListRepo;
import pl.pancerro.pokemonbackend.repository.PokeUserRepo;
import pl.pancerro.pokemonbackend.service.pokeApiService.PokeApiService;
import pl.pancerro.pokemonbackend.service.pokeApiService.PokeApiServiceImpl;

import java.util.List;

@Component
public class Start {
    private final PokeApiService pokeApiService;
    private final PokeUserRepo pokeUserRepo;
    private final PokeListRepo pokeListRepo;
    @Autowired
    public Start(PokeApiServiceImpl pokeApiService, PokeUserRepo pokeUserRepo, PokeListRepo pokeListRepo) {
        this.pokeApiService = pokeApiService;
        this.pokeUserRepo = pokeUserRepo;
        this.pokeListRepo = pokeListRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    void init() {
        PokeUser pokeUser = new PokeUser("pancerro@gmail.com");
        pokeUserRepo.save(pokeUser);
        pokeListRepo.save(new PokeList(1,pokeUser));
        pokeListRepo.save(new PokeList(11,pokeUser));
        pokeListRepo.save(new PokeList(111,pokeUser));
        pokeListRepo.save(new PokeList(121,pokeUser));
        pokeListRepo.save(new PokeList(90,pokeUser));
        pokeListRepo.save(new PokeList(61,pokeUser));
        pokeListRepo.save(new PokeList(24,pokeUser));
        pokeListRepo.save(new PokeList(15,pokeUser));
        pokeListRepo.save(new PokeList(3,pokeUser));

        System.out.println(pokeUserRepo.findById(1L).get().getEmail());
        List<PokeList> pokeLists = pokeListRepo.findByPokeUser(pokeUser);
        pokeApiService.getFavoritePokemon(pokeLists).forEach(pokemon -> System.out.println(pokemon.getName()));
        try {
            System.out.println(pokeApiService.searchPokemon("blgwe"));
        } catch (RestClientResponseException e) {
            System.out.println("BLAD");
        }
    }
}
