import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarterPageComponent } from './starter-page/starter-page.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { PokeCardComponent } from './dialog/poke-card/poke-card.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { PokemonNamePipe } from './pipe/pokemon-name.pipe';
import { PokemonTypePipe } from './pipe/pokemon-type.pipe';
import { PokemonAbilityPipe } from './pipe/pokemon-ability.pipe';
import { EmailFormComponent } from './dialog/email-form/email-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { RangeListPokemonComponent } from './dialog/range-list-pokemon/range-list-pokemon.component';


@NgModule({
  entryComponents: [PokeCardComponent,EmailFormComponent,RangeListPokemonComponent],
  declarations: [
    AppComponent,
    StarterPageComponent,
    PokemonCardComponent,
    SideNavComponent,
    PokeCardComponent,
    PokemonNamePipe,
    PokemonTypePipe,
    PokemonAbilityPipe,
    EmailFormComponent,
    RangeListPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ScrollingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,  
    MatListModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
