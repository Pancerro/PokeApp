package pl.pancerro.pokemonbackend.model;

import javax.persistence.*;

@Entity
public class PokeList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int pokeID;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private PokeUser pokeUser;
    public PokeList() {
    }


    public PokeList(int pokeID, PokeUser pokeUser) {
        this.pokeID = pokeID;
        this.pokeUser = pokeUser;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getPokeID() {
        return pokeID;
    }

    public void setPokeID(int pokeID) {
        this.pokeID = pokeID;
    }

    public PokeUser getPokeUser() {
        return pokeUser;
    }

    public void setPokeUser(PokeUser pokeUser) {
        this.pokeUser = pokeUser;
    }
}
