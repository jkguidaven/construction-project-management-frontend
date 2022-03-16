import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';
import { AddScopeComponent } from '../../modals/add-scope.component';

@Component({
  selector: 'app-cost-estimate-task',
  templateUrl: './cost-estimate-task.component.html',
  styleUrls: ['./cost-estimate-task.component.scss'],
})
export class CostEstimateTaskComponent implements OnInit {
  scopes: ScopeOfWork[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  showAddScopeForm(): void {
    const dialogRef = this.dialog.open(AddScopeComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((data: ScopeOfWork) => {
      if (data) {
        this.scopes.push(data);
      }
    });
  }
}
