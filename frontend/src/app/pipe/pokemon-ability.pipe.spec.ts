import { PokemonAbilityPipe } from './pokemon-ability.pipe';

describe('PokemonAbilityPipe', () => {
  it('create an instance', () => {
    const pipe = new PokemonAbilityPipe();
    expect(pipe).toBeTruthy();
  });
});
