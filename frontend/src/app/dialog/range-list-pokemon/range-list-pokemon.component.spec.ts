import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeListPokemonComponent } from './range-list-pokemon.component';

describe('RangeListPokemonComponent', () => {
  let component: RangeListPokemonComponent;
  let fixture: ComponentFixture<RangeListPokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeListPokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeListPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
