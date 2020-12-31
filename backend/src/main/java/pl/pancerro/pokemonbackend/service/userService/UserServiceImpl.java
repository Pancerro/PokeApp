package pl.pancerro.pokemonbackend.service.userService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pancerro.pokemonbackend.model.PokeList;
import pl.pancerro.pokemonbackend.model.PokeUser;
import pl.pancerro.pokemonbackend.model.Pokemon;
import pl.pancerro.pokemonbackend.repository.PokeListRepo;
import pl.pancerro.pokemonbackend.repository.PokeUserRepo;
import pl.pancerro.pokemonbackend.service.MailService;
import pl.pancerro.pokemonbackend.service.pokeApiService.PokeApiService;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final PokeListRepo pokeListRepo;
    private final PokeUserRepo pokeUserRepo;
    private final MailService mailService;
    private final PokeApiService pokeApiService;
    @Autowired
    public UserServiceImpl(PokeListRepo pokeListRepo, PokeUserRepo pokeUserRepo, MailService mailService, PokeApiService pokeApiService) {
        this.pokeListRepo = pokeListRepo;
        this.pokeUserRepo = pokeUserRepo;
        this.mailService = mailService;
        this.pokeApiService = pokeApiService;
    }
    @Override
    public void saveList(String email, List<Integer> idList) {
        Optional<PokeUser> optionalPokeUser = Optional.ofNullable(pokeUserRepo.findByEmail(email));
        if(optionalPokeUser.isPresent()) {
            List<PokeList> pokeLists = pokeListRepo.findByPokeUser(optionalPokeUser.get());
            pokeLists.forEach(pokeList -> pokeListRepo.deleteById(pokeList.getId()));
            idList.forEach(id -> pokeListRepo.save(new PokeList(id,optionalPokeUser.get())));
        } else {
            PokeUser pokeUser = new PokeUser(email);
            pokeUserRepo.save(pokeUser);
            idList.forEach(id -> pokeListRepo.save(new PokeList(id,pokeUser)));
        }
    }
    @Override
    public List<Pokemon> getPokemonList(String email) {
        Optional<PokeUser> optionalPokeUser = Optional.ofNullable(pokeUserRepo.findByEmail(email));
        if(optionalPokeUser.isPresent()) {
            List<Pokemon> pokemonList = new ArrayList<>();
            List<PokeList> pokeLists = pokeListRepo.findByPokeUser(optionalPokeUser.get());
            pokemonList = pokeApiService.getFavoritePokemon(pokeLists);
            return pokemonList;
        } else return null;
    }
    @Override
    public boolean sendMyList(String email) throws MessagingException {
        Optional<PokeUser> optionalPokeUser = Optional.ofNullable(pokeUserRepo.findByEmail(email));
        if(optionalPokeUser.isPresent()) {
            List<PokeList> pokeLists = pokeListRepo.findByPokeUser(optionalPokeUser.get());
            List<Pokemon> favoriteList = pokeApiService.getFavoritePokemon(pokeLists);
            String pokeText = "";
            for (int i = 0; i < favoriteList.size(); i++) {
                pokeText = pokeText + " <p> " + favoriteList.get(i).getIdPokemon() + "</p>" +
                        "<img style=\\\"width:200px; height:200px; src=" + favoriteList.get(i).getUrl() + ">" +
                        " <p>" + favoriteList.get(i).getName() + "</p>";
            }

            String htmlText = "<!DOCTYPE html>\n" +
                    "<html>\n" +
                    "<head>\n" +
                    "<title>PokeEmail</title>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "<div style=\"text-align:center\">\n" +
                    "<h1>To są twoje pokemony, te które wybrałes! </h1>\n" +
                    pokeText +
                    "</body>\n" +
                    "</html>";
            mailService.sendMail(email, "Pokemon List", htmlText, true);
            return true;
        } else return false;
    }
}
