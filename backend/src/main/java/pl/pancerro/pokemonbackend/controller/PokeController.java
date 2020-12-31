package pl.pancerro.pokemonbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientResponseException;
import pl.pancerro.pokemonbackend.model.Pokemon;
import pl.pancerro.pokemonbackend.service.pokeApiService.PokeApiService;
import pl.pancerro.pokemonbackend.service.userService.UserService;

import javax.mail.MessagingException;
import java.util.List;

@RestController
public class PokeController {

    private final PokeApiService pokeApiService;
    private final UserService userService;
    @Autowired
    public PokeController(PokeApiService pokeApiService, UserService userService) {
        this.pokeApiService = pokeApiService;
        this.userService = userService;
    }

    @GetMapping("/get-range-pokemon/{start}/{end}")
    public ResponseEntity<List<Pokemon>> getRangePokemon(@PathVariable int start, @PathVariable int end) {
        if(start>0 && end<891) {
            return new ResponseEntity<>(pokeApiService.getRangePokemon(start, end), HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("/get-all-pokemon")
    public ResponseEntity<List<Pokemon>> getAllPokemon() {
        return new ResponseEntity<>(pokeApiService.getAllPokemon(), HttpStatus.OK);
    }

    @GetMapping("/get-favorite-pokemon/{email}")
    public ResponseEntity<List<Pokemon>> getFavoritePokemon(@PathVariable String email) {
        return new ResponseEntity<>(userService.getPokemonList(email), HttpStatus.OK);
    }

    @PostMapping("/save-list/{email}")
    public ResponseEntity<?>saveList(@PathVariable String email,@RequestBody List<Integer> list) {
        System.out.println(list);
        userService.saveList(email, list);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @GetMapping("send-email/{email}")
    public ResponseEntity<?> sendEmail(@PathVariable String email) throws MessagingException {
        if(userService.sendMyList(email)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("/search-pokemon/{name}")
    public ResponseEntity<Pokemon> searchPokemon(@PathVariable String name) {
        try {
            return new ResponseEntity<>(pokeApiService.searchPokemon(name), HttpStatus.OK);
        } catch (RestClientResponseException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
