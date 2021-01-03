import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonType'
})
export class PokemonTypePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    let json = JSON.parse(value);
    value = "";
    for (let type of json) {
      value = value + type.type.name + "/";
    }
    value = value.slice(0, value.length - 1);
    return "Typ: " + value;
  }

}
