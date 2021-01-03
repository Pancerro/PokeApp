import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { PokeService } from '../service/poke.service';
import { map, pairwise, filter, throttleTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { EmailFormComponent } from '../dialog/email-form/email-form.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RangeListPokemonComponent } from '../dialog/range-list-pokemon/range-list-pokemon.component';

@Component({
  selector: 'app-starter-page',
  templateUrl: './starter-page.component.html',
  styleUrls: ['./starter-page.component.css']
})
export class StarterPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scroller', { static: false }) scroller: CdkVirtualScrollViewport;
  @ViewChild('sidenavright', { static: true }) private sidenavright;
  @ViewChild(SideNavComponent, { static: true }) private sidenav: SideNavComponent;

  private subscription: Subscription[] = [];
  private startRange = 1;
  private endRange = 12;
  private ifLoading = true;
  private loadingMore: boolean = true;
  private saveSubject = new Subject<void>();
  public pokeRangeList: Pokemon[] = [];
  public seePokeCard = false;
  public error = "Wystąpił chwilowy problem";
  public loadingSpinner = true;
  public favoriteList: Pokemon[] = [];
  public email: string;
  public searchPokemon: string = null;
  public btnAll = false;

  constructor(private pokeService: PokeService,
    private ngZone: NgZone,
    public dialog: MatDialog) { }
  ngOnInit() {
    this.email = localStorage.getItem("email");
    this.getRangePokemon();
    this.saveSubject.subscribe(() => {
      this.getFavoriteList();
    });
    this.saveSubject.next();
  }

  ngAfterViewInit(): void {
    this.scroller.elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => (y2 < y1 && y2 < 200)),
        throttleTime(200)
      ).subscribe(() => {
        this.ngZone.run(() => {
          if (this.loadingMore) {
            if (this.ifLoading) {
              this.getNewRangePokemon();
            }
          }
        });
      }
      );
  }
  public seeMyList(see: boolean): void {
    this.loadingMore = !see;
    if (see) {
      if (this.email) {
        this.pokeRangeList = this.favoriteList;
        this.loadingSpinner = false;
      } else window.alert("Nie masz zadnej listy, dodaj ją i zapisz");
    } else {
      this.startRange = 1;
      this.endRange = 12;
      this.seePokeCard = false;
      this.getRangePokemon();
    }
    this.sidenavright.toggle();
  }
  public sendMyList(): void {
    if (this.email) {
      this.pokeService.sendEmail(this.email);
    } else window.alert("Nie masz zadnej listy, dodaj ją i zapisz");
  }
  public retriveMyList(): void {
    const dialogRef = this.dialog.open(EmailFormComponent, {
      width: '350px',
      height: '240px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.invalid) {
          window.alert("Coś nie wyszło");
        } else {
          this.email = result.value.email.email;
          localStorage.setItem("email", result.value.email.email);
          window.location.reload();
        }
      }
    })
  }

  private getRangePokemon(): void {
    this.subscription.push(this.pokeService.getRangePokemon(this.startRange, this.endRange).subscribe((pokeList: Pokemon[]) => {
      this.pokeRangeList = pokeList;
      this.seePokeCard = true;
    }, err => {
      this.seePokeCard = true;
      this.error = this.error + err.response;
    },
      () => this.seePokeCard = true));
  }

  private getNewRangePokemon(): void {
    this.loadingSpinner = true;
    this.ifLoading = false;
    this.startRange = this.endRange + 1;
    this.endRange = this.startRange + 4;
    if (this.endRange > 890) {
      this.endRange = 890;
    }
    this.subscription.push(this.pokeService.getRangePokemon(this.startRange, this.endRange).subscribe((pokeList: Pokemon[]) => {
      setTimeout(() => document.getElementById("poke-card-" + (this.pokeRangeList.length - 9)).scrollIntoView(), 300);
      this.pokeRangeList = this.pokeRangeList.concat(pokeList);
    }, err => {
      this.error = this.error + err.response;
      this.loadingSpinner = false;
    },
      () => {
        this.ifLoading = true;
        this.loadingSpinner = false;
      }));
  }
  private getFavoriteList(): void {
    if (this.email) {
      this.subscription.push(this.pokeService.getFavoritePokemon(this.email).subscribe((favoriteList: Pokemon[]) => {
        this.pokeService.favoriteIdList = [];
        if (favoriteList) {
          this.favoriteList = Object.create(favoriteList);
          for (let id of favoriteList) {
            this.pokeService.favoriteIdList.push(id.idPokemon);
          }
        }
      }));
    }
  }
  public checkFavoriteIdList(idPokemon: number) {
    if (this.pokeService.favoriteIdList.includes(idPokemon))
      return true;
    else if (this.pokeService.addNewFavoriteIdList.includes(idPokemon)) {
      return true;
    } else return false;
  }


  public toFavorite(pokemon: Pokemon): void {
    if (this.pokeService.favoriteIdList.includes(pokemon.idPokemon)) {
      this.sidenav.deleteFavorite(pokemon);
    } else this.sidenav.newPokemonList(pokemon);
  }

  public saveMyList(): void {
    const dialogRef = this.dialog.open(EmailFormComponent, {
      width: '350px',
      height: '240px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.invalid) {
          window.alert("Coś nie wyszło");
        } else {
          this.pokeService.favoriteIdList = this.pokeService.favoriteIdList.concat(this.pokeService.addNewFavoriteIdList);
          this.pokeService.savePokemonList(result.value.email.email, this.pokeService.favoriteIdList);
          localStorage.setItem("email", result.value.email.email);
          this.email = localStorage.getItem("email");
          this.sidenavright.toggle();
          window.location.reload();
        }
      }
    })
  }

  public searchPoke(): void {
    this.seePokeCard = false;
    this.searchPokemon = this.searchPokemon.toLocaleLowerCase();
    this.pokeService.searchPokemon(this.searchPokemon).subscribe((pokemon: Pokemon) => {
      this.pokeRangeList = [];
      this.pokeRangeList.push(pokemon);
      this.btnAll = true;
      this.seePokeCard = true;
    }, err => {
      this.seePokeCard = true;
      this.btnAll = true;
      this.pokeRangeList = [];
      window.alert("Nie ma takiego pokemona");
    });
    this.loadingSpinner = false;
  }
  public seeAllPokemon(): void {
    this.btnAll = false;
    this.startRange = 1;
    this.endRange = 12;
    this.seePokeCard = false;
    this.searchPokemon = null;
    this.getRangePokemon();
  }

  public seeRange(): void {
    const dialogRef = this.dialog.open(RangeListPokemonComponent, {
      width: '350px',
      height: '240px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.invalid) {
          window.alert("Coś nie wyszło");
        } else {
          this.startRange = result.value.range.start;
          this.endRange = result.value.range.end;
          if (this.startRange > 0 && this.startRange < 891 && this.endRange > 0 && this.endRange < 891) {
            this.seePokeCard = false;
            this.btnAll = true;
            this.loadingSpinner = false;
            this.getRangePokemon();
            this.sidenavright.toggle();
          } else {
            window.alert("Nieprawidłowy zasięg, spróbuj ponownie");
            this.seeRange();
          }
        }
      }
    })
  }
  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
