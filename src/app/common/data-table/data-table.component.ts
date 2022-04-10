import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

export interface DataTableColumnDef {
  id: string;
  label: string;
  width?: string;
  headerAlign?: 'left' | 'center' | 'right';
  renderer?: InstanceType<any>;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() columns!: DataTableColumnDef[];
  @Input() data!: any[];
  @Input() loading!: boolean;
  @Input() paginated!: boolean;
  @Input() length!: number;
  @Input() page!: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  @Input() size!: number;
  @Output() sizeChange: EventEmitter<number> = new EventEmitter();
  @Input() sort!: string;
  @Output() sortChange: EventEmitter<string> = new EventEmitter();
  @Input() sortDir!: string;
  @Output() sortDirChange: EventEmitter<string> = new EventEmitter();
  @Input() sortable!: boolean;

  pageSizeOptions: number[] = [25, 50, 100];

  constructor() {}

  ngOnInit(): void {}

  handlePageEvent(event: PageEvent) {
    this.pageChange.emit(event.pageIndex);
    this.sizeChange.emit(event.pageSize);
  }

  setSort(sort: string): void {
    if (!this.sortable) {
      return;
    }

    if (sort === this.sort) {
      if (this.sortDir === 'desc') {
        this.sortChange.emit(null);
        this.sortDirChange.emit(null);
      } else {
        this.sortDirChange.emit(this.sortDir === 'desc' ? 'asc' : 'desc');
      }
    } else {
      this.sortChange.emit(sort);
      this.sortDirChange.emit(null);
    }
  }
}
