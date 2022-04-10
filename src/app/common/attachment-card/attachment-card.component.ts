import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attachment-card',
  templateUrl: './attachment-card.component.html',
  styleUrls: ['./attachment-card.component.scss'],
})
export class AttachmentCardComponent implements OnInit {
  @Input() name: string;
  @Input() type: 'pdf' | 'image' | 'document';

  constructor() {}

  ngOnInit(): void {}

  get icon() {
    switch (this.type) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'image':
        return 'photo_size_select_actual';
      default:
        return 'insert_drive_file';
    }
  }
}
