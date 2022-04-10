import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { DataTableColumnDef } from 'src/app/common/data-table/data-table.component';
import { DateDataTableRendererComponent } from 'src/app/common/data-table/renderers/date.component';
import { LinkDataTableRendererComponent } from 'src/app/common/data-table/renderers/link.component';
import { ProjectStatusDataTableRendererComponent } from 'src/app/common/data-table/renderers/project-status.component';
import { ProjectPageResult } from 'src/app/models/project.model';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ProjectListComponent implements OnInit {
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
      renderer: ProjectStatusDataTableRendererComponent,
    },
  ];

  result!: ProjectPageResult;
  size: number = 25;
  loading!: boolean;

  sort!: string;
  sortDir!: string;

  constructor(
    private projectClientAPI: ProjectClientApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.loading = true;
    this.projectClientAPI
      .getAll(this.page, this.size, this.sort, this.sortDir)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((result) => {
        this.result = result;
      });
  }

  get data(): any[] {
    return this.result
      ? this.result.results.map((project) => ({
          id: project.id,
          name: project.name,
          customer: project.customer.name,
          status: project.status,
          link: ['/projects', project.id],
        }))
      : [];
  }

  get page(): number {
    const page = this.activatedRoute.snapshot.queryParams['page'];
    return page ? Number(page) : 0;
  }

  set page(value: number) {
    this.router.navigate(['/projects'], {
      queryParams: { page: value },
    });

    setTimeout(() => this.refreshList(), 100);
  }
}
