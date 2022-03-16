import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appUploadFileDropbox]',
})
export class UploadFileDropboxDirective {
  @Output() drop: EventEmitter<FileList> = new EventEmitter<FileList>();
  @HostBinding('class.fileover') fileOver!: boolean;

  constructor() {}

  @HostListener('dragover', ['$event'])
  onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    this.fileOver = false;
    const files = evt.dataTransfer?.files;

    if (files) {
      this.drop.emit(files);
    }
  }
}
