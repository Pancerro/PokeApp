package pl.pancerro.pokemonbackend.service.userService;

import pl.pancerro.pokemonbackend.model.Pokemon;

import javax.mail.MessagingException;
import java.util.List;

public interface UserService {
    void saveList(String email, List<Integer> idList);
    List<Pokemon> getPokemonList(String email);
    boolean sendMyList(String email) throws MessagingException;
}
