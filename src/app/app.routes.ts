import { Routes } from '@angular/router';
import { LoginPage } from './features/login-page/login-page';
import { HomePage } from './features/home-page/home-page';
import { PokemonDetailPage } from './features/pokemon-detail-page/pokemon-detail-page';

export const routes: Routes = [
    {
        path: '',
        component: LoginPage,
    },
    {
        path: 'home',
        component: HomePage,
    },
    {
        path: 'pokemon/:id',
        component: PokemonDetailPage,
    },
    // wildcard or other routes can be added here
];
