import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonName'
})
export class PokemonNamePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    value = value.slice(1, value.length);
    value = value.slice(0, value.length - 1);
    return value;
  }

}
