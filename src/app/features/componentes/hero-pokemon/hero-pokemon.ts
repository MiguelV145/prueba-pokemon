import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './hero-pokemon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroPokemon {
  pokemonCount = input.required<number>();
  totalPages = input.required<number>();
 }
