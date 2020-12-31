package pl.pancerro.pokemonbackend.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.Set;

@Entity
public class PokeUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Email
    private String email;
    @OneToMany(mappedBy = "pokeUser", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Set<PokeList> pokeList;

    public PokeUser() {
    }

    public PokeUser(String email) {
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<PokeList> getPokeList() {
        return pokeList;
    }

    public void setPokeList(Set<PokeList> pokeList) {
        this.pokeList = pokeList;
    }
}

