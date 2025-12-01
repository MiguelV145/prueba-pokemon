import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PaginationService {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  // currentPage se deriva de la query param `page` y se expone como señal
  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => (params.get('page') ? +params.get('page')! : 1)),
      map((page) => (isNaN(page) ? 1 : page))
    ),
    { initialValue: 1 }
  );

  // actualizar la página modificando la query param `page`
  setPage(page: number) {
    const next = Math.max(1, Math.trunc(page));
    // Navega manteniendo otras query params
    this.router.navigate([], { queryParams: { page: next }, queryParamsHandling: 'merge' });
  }

  next() {
    this.setPage(this.currentPage() + 1);
  }

  prev() {
    this.setPage(Math.max(1, this.currentPage() - 1));
  }
}
