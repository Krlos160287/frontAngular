import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { LibroService } from 'src/app/core/services/libro.service';
import { Libro } from 'src/app/models/libro.model';

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrls: ['./libreria.component.scss']
})
export class LibreriaComponent implements OnInit {
  formData = this.fb.group({
    titulo: ['', [Validators.required, Validators.maxLength(255)]],
    autor: ['', [Validators.required, Validators.maxLength(255)]],
    publish_data: ['', Validators.required],
    categoria: ['', [Validators.required, Validators.maxLength(255)]],
  });

  libros: Libro[] = [];

  display: boolean = false;

  modalMode: boolean = false;

  id: number = 0;

  constructor(
    private libroService: LibroService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {

   }

  ngOnInit(): void {
    this.getAllLibros();
  }

  getAllLibros() {
    this.libroService.getAllLibros().pipe(take(1)).subscribe( (resp) =>{
      if(resp) {
        this.libros = resp;
      }
    });
  }

  showDialog(libro: Libro) {
    this.modalMode = false;
    this.display = true;

    const fechaISO = new Date(libro.publish_data);
    const fechaLocal = new Date(fechaISO.getTime() - fechaISO.getTimezoneOffset() * 60000);
    const fechaISOFormatted = fechaLocal.toISOString().slice(0, 10);

    this.id = libro.id;
    this.formData.get("titulo")?.setValue(libro.titulo);
    this.formData.get("autor")?.setValue(libro.autor);
    this.formData.get("publish_data")?.setValue(fechaISOFormatted);
    this.formData.get("categoria")?.setValue(libro.categoria);
  }

  addLibro() {
    this.formData.get("titulo")?.setValue("");
    this.formData.get("autor")?.setValue("");
    this.formData.get("publish_data")?.setValue("");
    this.formData.get("categoria")?.setValue("");
    this.modalMode = true;
    this.display = true;
  } 

  getDateValue(event: any) {
    this.formData.get("publish_data")?.setValue(event.target.value);
  }

  saveForm() {
    if (this.formData.valid) {

      let libro = this.formData.value as Libro;

      if(this.modalMode) {
        this.libroService.saveLibro(libro).subscribe((resp) =>{
          this.messageService.add({
            severity: 'success',
            summary: "Libro creado con éxito",
            detail: "",
            life: 2000,
          });
          this.display = false;
          this.getAllLibros();
        });
      } else {
        libro.id = this.id; 
        this.libroService.updateLibro(libro.id, libro).pipe(take(1)).subscribe((resp) => {
          this.messageService.add({
            severity: 'success',
            summary: "Libro modificado con éxito",
            detail: "",
            life: 2000,
          });
          this.display = false;
          this.getAllLibros();
        })
      }
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: "Error a la hora de crear o modificar un libro",
        detail: "Complete los campos del formulario correctamente",
        life: 2000,
      });
      this.getAllLibros();
    }
  }

  deleteLibro(id: number) {
    this.confirmationService.confirm({
      message: "¿Desea eliminar este libro?",
      header: 'Eliminación de libro',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.libroService.deleteLibro(id).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: "Libro borrado con éxito",
            detail: "",
            life: 2000,
          });
          this.getAllLibros();
        });
      },
    });
  }
}
