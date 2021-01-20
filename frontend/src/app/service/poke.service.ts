import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private basicUrl = "http://poke-backend-route-labproj21.apps.cp4apps.cloudpak.site/";
  public favoriteIdList: number[] = [];
  public addNewFavoriteIdList: number[] = [];
  constructor(private http: HttpClient) { }

  public getAllPokemon(): Observable<Pokemon[]> {
    let url = this.basicUrl + "get-all-pokemon";
    return this.http.get<Pokemon[]>(url);
  }

  public getRangePokemon(start: number, end: number): Observable<any> {
    let url = this.basicUrl + "get-range-pokemon/" + start + "/" + end;
    return this.http.get(url);
  }

  public getFavoritePokemon(email: string): Observable<Pokemon[]> {
    let url = this.basicUrl + "get-favorite-pokemon/" + email;
    return this.http.get<Pokemon[]>(url);
  }

  public savePokemonList(email: string, pokeList: number[]): void {
    let url = this.basicUrl + "save-list/" + email;
    this.http.post(url, pokeList).subscribe();
  }

  public sendEmail(email: string): void {
    let url = this.basicUrl + "send-email/" + email;
    this.http.get(url).subscribe();
  }

  public searchPokemon(pokeName: string): Observable<Pokemon> {
    let url = this.basicUrl + "search-pokemon/" + pokeName;
    return this.http.get<Pokemon>(url);
  }
}
