import { ChangeDetectionStrategy, Component, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonService, PokemonListResponse } from '../../services/pokemon.service';
import { PaginationService } from '../../services/pagination.service';
import { Observable } from 'rxjs';

type RxResourceParams = { page: number; limit: number };

function rxResource<T>(opts: {
  params: () => RxResourceParams;
  stream: (ctx: { params: RxResourceParams }) => Observable<T>;
}) {
  const data = signal<T | null>(null);
  const loading = signal(false);
  const error = signal<string | null>(null);

  async function load(params: RxResourceParams) {
    loading.set(true);
    error.set(null);
    try {
      const obs$ = opts.stream({ params });

      obs$.subscribe({
        next(value) {
          data.set(value as T);
          loading.set(false);
        },
        error(err) {
          error.set(String(err || 'Error'));
          data.set(null);
          loading.set(false);
        }
      });
    } catch (err) {
      error.set(String(err || 'Error'));
      data.set(null);
      loading.set(false);
    }
  }

 
  effect(() => {
    const p = opts.params();
    load(p);
  });

  return {
    data,
    loading,
    error,
    hasValue() {
      return Boolean(data());
    },
    value() {
      return data() as any;
    }
  };
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  pokemonService = inject(PokemonService);
  paginationService = inject(PaginationService);

  charactersPerPage = signal<number>(20);
  totalPages = signal(0);

  // rxResource that calls the service
  pokemonResource = rxResource<PokemonListResponse>({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.charactersPerPage(),
    }),
    stream: ({ params }) => {
      const offset = params.page * params.limit;
      return this.pokemonService.getPokemonList(offset, params.limit);
    }
  });

  constructor() {
    // update totalPages when resource has data
    effect(() => {
      if (this.pokemonResource.hasValue()) {
        const res = this.pokemonResource.value();
        if (res && res.count != null) {
          const tp = Math.ceil(res.count / this.charactersPerPage());
          this.totalPages.set(tp);
        }
      }
    });
  }

  next() {
    this.paginationService.next();
  }

  prev() {
    this.paginationService.prev();
  }

  // extract id from pokemon url
  pokemonId(url: string) {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
  }
}
