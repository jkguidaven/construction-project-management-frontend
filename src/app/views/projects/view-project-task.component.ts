import { Component, Input, OnInit } from '@angular/core';
import { DataTableColumnDef } from 'src/app/common/data-table/data-table.component';
import { DateDataTableRendererComponent } from 'src/app/common/data-table/renderers/date.component';
import { StatusDataTableRendererComponent } from 'src/app/common/data-table/renderers/status.component';
import { TaskTypeDataTableRendererComponent } from 'src/app/common/data-table/renderers/task-type.component';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-view-project-task',
  templateUrl: './view-project-task.component.html',
  styleUrls: ['./view-project-task.component.scss'],
})
export class ViewProjectTaskComponent implements OnInit {
  columns: DataTableColumnDef[] = [
    { id: 'type', label: 'Task', renderer: TaskTypeDataTableRendererComponent },
    { id: 'assignedTo', label: 'Assigned To' },
    {
      id: 'date',
      label: 'Date',
      width: '10%',
      renderer: DateDataTableRendererComponent,
    },
    {
      id: 'status',
      label: 'Status',
      width: '10%',
      renderer: StatusDataTableRendererComponent,
    },
  ];

  @Input() tasks: Task[];

  constructor() {}

  ngOnInit(): void {}
}
