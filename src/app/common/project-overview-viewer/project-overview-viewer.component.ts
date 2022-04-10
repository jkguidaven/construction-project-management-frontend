import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-overview-viewer',
  templateUrl: './project-overview-viewer.component.html',
  styleUrls: ['./project-overview-viewer.component.scss'],
})
export class ProjectOverviewViewerComponent implements OnInit {
  @Input() project!: Project;

  constructor() {}

  ngOnInit(): void {}
}
