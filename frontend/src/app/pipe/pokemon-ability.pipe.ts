import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonAbility'
})
export class PokemonAbilityPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let json = JSON.parse(value);
    value = "";
    for (let type of json) {
      value = value + type.ability.name + " i ";
    }
    value = value.slice(0, value.length - 2);
    return value;
  }

}
