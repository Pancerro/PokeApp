package pl.pancerro.pokemonbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.pancerro.pokemonbackend.model.PokeUser;
@Repository
public interface PokeUserRepo  extends JpaRepository<PokeUser,Long> {
    PokeUser findByEmail(String email);
}
