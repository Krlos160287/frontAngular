import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibreriaComponent } from './libreria.component';


const routes: Routes = [
  {
    path: '',
    component: LibreriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibreriaPageRoutingModule {}