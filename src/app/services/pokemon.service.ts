import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

export interface PokemonDetail {
  id: number;
  name: string;
  order?: number;
  height?: number;
  weight?: number;
  base_experience?: number;
  sprites?: {
    front_default?: string | null;
    other?: any;
  };
  types?: Array<{ slot: number; type: { name: string; url: string } }>;
  moves?: Array<{ move: { name: string; url: string } }>;
  stats?: Array<{ base_stat: number; stat: { name: string } }>;
  abilities?: Array<{ is_hidden: boolean; ability: { name: string } }>;
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl || 'https://pokeapi.co/api/v2';

  // Lista paginada por offset & limit
  getPokemonList(offset = 0, limit = 20): Observable<PokemonListResponse> {
    const url = `${this.API_URL}/pokemon?offset=${offset}&limit=${limit}`;
    return this.http.get<PokemonListResponse>(url).pipe(
      map(res => res),
      catchError(err => {
        console.error('Error al obtener lista de Pokémon', err);
        return of({ count: 0, next: null, previous: null, results: [] });
      })
    );
  }

  // Detalle por id o nombre
  getPokemonById(idOrName: string | number): Observable<PokemonDetail | null> {
    const url = `${this.API_URL}/pokemon/${idOrName}`;
    return this.http.get<PokemonDetail>(url).pipe(
      map(res => res),
      catchError(err => {
        console.error('Error al obtener detalle del Pokémon', err);
        return of(null);
      })
    );
  }
}
