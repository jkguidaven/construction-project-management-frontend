import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface FileUpload {
  id?: number;
  file?: File;
  progress?: number;
  error?: boolean;
  name?: string;
  mime?: string;
}

@Component({
  selector: 'app-upload-file-dropbox',
  templateUrl: './upload-file-dropbox.component.html',
  styleUrls: ['./upload-file-dropbox.component.scss'],
})
export class UploadFileDropboxComponent implements OnInit {
  @Input() uploads: FileUpload[];
  @Output() uploadsChange: EventEmitter<FileUpload[]> = new EventEmitter();
  @Output() delete: EventEmitter<FileUpload> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onFileUpload(list: FileList): void {
    const files: any[] = [];
    for (let i = 0; i < list.length; i++) {
      files.push({ file: list[i], progress: 0 });
    }

    this.uploadsChange.emit([...this.uploads, ...files]);
  }

  onFileSelected(event: any) {
    const files: any[] = [];
    for (let i = 0; i < event.target.files.length; i++) {
      files.push({ file: event.target.files[i], progress: 0 });
    }

    this.uploadsChange.emit([...this.uploads, ...files]);
  }

  isImageFile(upload: FileUpload): boolean {
    return upload.file
      ? upload.file.type.startsWith('image/')
      : upload.mime.startsWith('image/');
  }

  remove(index: number) {
    this.delete.emit(this.uploads[index]);
    this.uploadsChange.emit(this.uploads.filter((_, i) => index !== i));
  }
}
