import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService, PokemonDetail } from '../../services/pokemon.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

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

  pokemon = toSignal<PokemonDetail | null>(
    this.route.paramMap.pipe(
      map(params => params.get('id')!),
      switchMap(id => this.service.getPokemonById(id))
    ),
    { initialValue: null }
  );
}
