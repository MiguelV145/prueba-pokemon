import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetail } from '../home-page/interface-pok/interface-pokemon';

@Component({
  selector: 'app-pokemon-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-detail-page.html',
  styleUrls: ['./pokemon-detail-page.css'],
})
export class PokemonDetailPage {
  private route = inject(ActivatedRoute);
  private service = inject(PokemonService);
  typeColor(type: string): string {
  const colors: Record<string, string> = {
    fire:    'bg-red-500 text-white',
    water:   'bg-blue-500 text-white',
    grass:   'bg-green-500 text-white',
    electric:'bg-yellow-400 text-black',
    ice:     'bg-cyan-300 text-black',
    fighting:'bg-orange-700 text-white',
    poison:  'bg-purple-600 text-white',
    ground:  'bg-yellow-700 text-white',
    flying:  'bg-indigo-300 text-black',
    psychic: 'bg-pink-500 text-white',
    bug:     'bg-lime-600 text-white',
    rock:    'bg-stone-500 text-white',
    ghost:   'bg-indigo-700 text-white',
    dragon:  'bg-purple-800 text-white',
    dark:    'bg-gray-800 text-white',
    steel:   'bg-gray-500 text-white',
    fairy:   'bg-pink-300 text-black',
    normal:  'bg-zinc-400 text-black'
  };

  return colors[type] ?? 'bg-gray-300 text-black';
}
  pokemon = toSignal<PokemonDetail | null>(
    this.route.paramMap.pipe(
      map(params => params.get('id')!),
      switchMap(id => this.service.getPokemonById(id))
    ),
    { initialValue: null }
  );
}
