import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { PokeService } from '../service/poke.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private pokeService: PokeService) { }
  @Output() save: Subject<void> = new Subject();
  @Output() see: Subject<boolean> = new Subject();
  @Output() send: Subject<void> = new Subject();
  @Output() seeRange: Subject<void> = new Subject();
  @Output() retrive: Subject<void> = new Subject();

  @Input() favoritePokemon: Pokemon[];
  @Input() email: string;

  public deleteTable: boolean[] = [false];
  public seeList = false;
  public newPokemon: Pokemon[] = [];

  ngOnInit() {
  }

  public saveMyList(): void {
    this.save.next();
  }
  public seeMyList(): void {
    this.seeList = !this.seeList;
    this.see.next(this.seeList);
  }
  public sendMyList(): void {
    this.send.next();
  }
  public retriveMyList(): void {
    this.retrive.next();
  }
  public seeListInRange(): void {
    this.seeRange.next();
  }

  public deleteFavorite(pokemon: Pokemon): void {
    if (this.pokeService.favoriteIdList.includes(pokemon.idPokemon)) {
      this.pokeService.favoriteIdList = this.pokeService.favoriteIdList.filter((id: number) => id != pokemon.idPokemon);
      this.deleteTable[pokemon.idPokemon] = true;
    } else {
      this.pokeService.favoriteIdList.push(pokemon.idPokemon);
      this.deleteTable[pokemon.idPokemon] = false;
    }
  }

  public deleteAll(): void {
    this.favoritePokemon.forEach((pokemon: Pokemon) => this.deleteFavorite(pokemon));
  }

  public newPokemonList(pokemon: Pokemon): void {
    if (this.pokeService.addNewFavoriteIdList.includes(pokemon.idPokemon)) {
      this.newPokemon = this.newPokemon.filter(pokemonCard => pokemonCard.idPokemon != pokemon.idPokemon)
      this.pokeService.addNewFavoriteIdList = this.pokeService.addNewFavoriteIdList.filter(id => id != pokemon.idPokemon);
    } else {
      this.newPokemon.push(pokemon);
      this.pokeService.addNewFavoriteIdList.push(pokemon.idPokemon);
    }
  }

}
