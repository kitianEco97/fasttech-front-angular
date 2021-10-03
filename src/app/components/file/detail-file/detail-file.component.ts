import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { File } from 'src/app/models/file';
import { FileService } from 'src/app/services/file.service';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-detail-file',
  templateUrl: './detail-file.component.html',
  styleUrls: ['./detail-file.component.css']
})
export class DetailFileComponent implements OnInit {

  file?: any;
  public loading?: boolean;

  constructor(
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.fileService.detail(id).subscribe(
      (response: File) => {
        this.file = response;
        console.log(response);
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.error(err);
        this.volver();
      }
    );
  }

  volver(): void {
    this.router.navigate(['/lista']);
  }

  
}
