import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file-dropbox',
  templateUrl: './upload-file-dropbox.component.html',
  styleUrls: ['./upload-file-dropbox.component.scss'],
})
export class UploadFileDropboxComponent implements OnInit {
  files: File[] = [];
  constructor() {}

  ngOnInit(): void {}

  onFileUpload(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }
  }

  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }
}
