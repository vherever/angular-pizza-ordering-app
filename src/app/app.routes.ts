import { Routes } from '@angular/router';
import { PizzeriasComponent } from './components/pizzerias/pizzerias.component';
import { PizzeriaComponent } from './components/pizzeria/pizzeria.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pizzerias', pathMatch: 'full' },
  { path: 'pizzerias', component: PizzeriasComponent },
  { path: 'pizzerias/:id', component: PizzeriaComponent },
  { path: '**', component: NotFoundComponent }
];
