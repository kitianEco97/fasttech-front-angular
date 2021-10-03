import { Component, OnInit } from '@angular/core';
import { File } from 'src/app/models/file';
import { FileService } from 'src/app/services/file.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  nombreUsuario: any = '';
  files: any;
  public loading?: boolean;

  constructor(
    private tokenService: TokenService,
    private fileService: FileService
  ) { this.loading = true }

  ngOnInit(): void {
    this.nombreUsuario = this.tokenService.getUserName();
    this.getFiles();
  }

  getFiles() {
    return this.fileService.list()
      .subscribe(
        resp => {
          this.files = resp;
          console.log(this.files);
          this.loading = false;
        },
        err => {
          console.error(err);
        }
      )
  }

}
