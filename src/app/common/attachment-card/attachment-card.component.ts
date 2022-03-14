import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attachment-card',
  templateUrl: './attachment-card.component.html',
  styleUrls: ['./attachment-card.component.scss'],
})
export class AttachmentCardComponent implements OnInit {
  @Input() name: string;
  @Input() type: 'pdf' | 'image';

  constructor() {}

  ngOnInit(): void {}
}
