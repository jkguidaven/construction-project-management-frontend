import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { DataTableColumnDef } from 'src/app/common/data-table/data-table.component';
import { ActionDataTableRendererComponent } from 'src/app/common/data-table/renderers/action.component';
import { DateDataTableRendererComponent } from 'src/app/common/data-table/renderers/date.component';
import { LinkDataTableRendererComponent } from 'src/app/common/data-table/renderers/link.component';
import { MaterialRequestStatusDataTableRendererComponent } from 'src/app/common/data-table/renderers/material-request-status.component';
import { MaterialRequestPageResult } from 'src/app/models/material-request.model';
import { MaterialRequestClientApiService } from 'src/app/services/material-request-client-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class MaterialRequestListComponent implements OnInit {
  columns: DataTableColumnDef[] = [
    {
      id: 'id',
      label: 'ID',
      renderer: LinkDataTableRendererComponent,
    },
    {
      id: 'name',
      label: 'Project name',
    },
    { id: 'customer', label: 'Customer name' },
    { id: 'task', label: 'Scope of work' },
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
      renderer: MaterialRequestStatusDataTableRendererComponent,
    },
  ];

  result!: MaterialRequestPageResult;
  size: number = 25;
  loading!: boolean;

  sort!: string;
  sortDir!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private materialRequestClientAPI: MaterialRequestClientApiService
  ) {}

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.loading = true;
    this.materialRequestClientAPI
      .getAll(this.page, this.size, this.sort, this.sortDir)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((result) => {
        this.result = result;
      });
  }

  get data(): any[] {
    return this.result
      ? this.result.results.map((request) => ({
          id: request.id,
          name: request.project.name,
          customer: request.project.customer.name,
          task: request.task.name,
          status: request.status,
          link: ['/material-request', request.id],
        }))
      : [];
  }

  get page(): number {
    const page = this.activatedRoute.snapshot.queryParams['page'];
    return page ? Number(page) : 0;
  }

  set page(value: number) {
    this.router.navigate(['/material-request'], {
      queryParams: { page: value },
    });

    setTimeout(() => this.refreshList(), 100);
  }
}
