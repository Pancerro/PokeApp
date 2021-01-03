import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PokeCardComponent } from '../dialog/poke-card/poke-card.component';
import { Pokemon } from '../model/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  @Output() favoriteList: Subject<Pokemon> = new Subject();
  @Input() favorite: boolean;

  constructor(public dialog: MatDialog,) { }

  ngOnInit() {}

  public addToFavorite(pokemon: Pokemon): void {
    this.favorite = !this.favorite;
    this.favoriteList.next(pokemon);
  }

  public moreInfo(): void {
    const dialogRef = this.dialog.open(PokeCardComponent, {
      width: '350px',
      height: '500px',
      data: { pokemon: this.pokemon, favorite: this.favorite }
    });
  }
}
