import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
// import { environment } from '../../environments/environment'; // <--- Puedes comentar esto si quieres

import { PokemonDetail, PokemonListResponse } from '../features/home-page/interface-pok/interface-pokemon';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  
  private readonly API_URL = 'https://pokeapi.co/api/v2'; 

  // Lista paginada
  getPokemonList(offset = 0, limit = 20): Observable<PokemonListResponse> {
    const url = `${this.API_URL}/pokemon?offset=${offset}&limit=${limit}`;
    
    console.log('Solicitando a:', url); 

    return this.http.get<PokemonListResponse>(url).pipe(
      map(res => res),
      catchError(err => {
        console.error('Error al obtener lista de Pokémon', err);
        return of({ count: 0, next: null, previous: null, results: [] });
      })
    );
  }

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