import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { File } from 'src/app/models/file';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent implements OnInit {

  name: string = '';
  description: string = '';
  img: string = '';
  status: string = '';
  seleccionado: string = '';

  constructor(
    private fileService: FileService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    this.seleccionado = this.status;
    console.log('status created', this.seleccionado);
    const file = new File(this.name, this.description, this.img, this.status);
    console.log(this.status);
    this.fileService.save(file)
      .subscribe(
        (response: File) => {
          this.toastr.success('Ficha Creado', 'OK', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          console.log(`Ficha creada  ${response}`);
          this.router.navigate(['/lista']);
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          console.error(err);
        }
      )
  }
}
