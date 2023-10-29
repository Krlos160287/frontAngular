import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibreriaComponent } from './libreria.component';
import { LibreriaPageRoutingModule } from './libreria-routing.module';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  imports: [
    CommonModule,
    LibreriaPageRoutingModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ReactiveFormsModule
  ],
  declarations: [LibreriaComponent],
  providers: [MessageService, ConfirmationService]
})
export class LibreriaPageModule { }
