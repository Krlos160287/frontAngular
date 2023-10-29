import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'libreria',
    loadChildren: () => import('./modules/libreria/libreria.module').then( m => m.LibreriaPageModule)
  },
  {
    path: '',
    redirectTo: '/libreria',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
