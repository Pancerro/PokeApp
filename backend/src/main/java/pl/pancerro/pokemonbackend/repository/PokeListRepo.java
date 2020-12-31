package pl.pancerro.pokemonbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.pancerro.pokemonbackend.model.PokeList;
import pl.pancerro.pokemonbackend.model.PokeUser;

import java.util.List;

@Repository
public interface PokeListRepo extends JpaRepository<PokeList,Long> {
    List<PokeList> findByPokeUser(PokeUser pokeUser);

}
