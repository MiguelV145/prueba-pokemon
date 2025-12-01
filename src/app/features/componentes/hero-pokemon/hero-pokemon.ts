import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero-pokemon',
  imports: [],
  templateUrl: './hero-pokemon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroPokemon { }
