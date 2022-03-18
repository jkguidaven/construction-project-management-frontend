import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ScopeOfWork,
  ScopeOfWorkTask,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';
import { AddScopeOfWorkMaterialSubconBudgetComponent } from '../../modals/add-scope-of-work-material-subcon-budget.component';
import { AddScopeOfWorkTaskSubconBudgetComponent } from '../../modals/add-scope-of-work-task-subcon-budget.component';

@Component({
  selector: 'app-cost-estimate-approval-task',
  templateUrl: './cost-estimate-approval-task.component.html',
  styleUrls: ['./cost-estimate-approval-task.component.scss'],
})
export class CostEstimateApprovalTaskComponent implements OnInit {
  scopes: ScopeOfWork[] = [
    {
      name: 'EARTHWORK',
      tasks: [
        {
          name: 'Demotion Works',
          unit: 'LOT',
          quantity: 1.0,
          materials: [],
        },
        {
          name: 'Excavation Works',
          unit: 'cu.m.',
          quantity: 112.98,
          materials: [],
        },
        {
          name: 'Backfilling',
          unit: 'cu.m.',
          quantity: 210.74,
          materials: [],
        },
      ],
    },
    {
      name: 'RETAINING WALL',
      tasks: [
        {
          name: 'Reinforcement Bars',
          materials: [
            {
              name: 'Footing RSB 25mm x 9mm',
              unit: 'pcs',
              quantity: 20.0,
              contingency: 5,
              pricePerUnit: 300,
            },
            {
              name: 'Footing RSB 20mm x 6mm',
              unit: 'pcs',
              quantity: 42.0,
              contingency: 5,
              pricePerUnit: 231.14,
            },
            {
              name: 'Footing RSB 16mm x 6mm',
              unit: 'pcs',
              quantity: 240.0,
              contingency: 5,
              pricePerUnit: 900.2,
            },
          ],
        },
        {
          name: 'Formworks',
          materials: [
            {
              name: 'Phenolic Board 3/4',
              unit: 'pcs',
              quantity: 1,
              contingency: 5,
              pricePerUnit: 1050.12,
            },
          ],
        },
      ],
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  getTotalMaterialCost(task: ScopeOfWorkTask): number {
    return task.materials.reduce((total, material) => {
      return total + (material.pricePerUnit ?? 0);
    }, 0);
  }

  showAddTaskSubconBudgetForm(task: ScopeOfWorkTask): void {
    const dialogRef = this.dialog.open(
      AddScopeOfWorkTaskSubconBudgetComponent,
      {
        data: task,
        width: '400px',
      }
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        task.subconPricePerUnit = data.subconPricePerUnit;
      }
    });
  }

  showAddMaterialSubconBudgetForm(material: ScopeOfWorkTaskMaterial): void {
    const dialogRef = this.dialog.open(
      AddScopeOfWorkMaterialSubconBudgetComponent,
      {
        data: material,
        width: '400px',
      }
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        material.subconPricePerUnit = data.subconPricePerUnit;
      }
    });
  }
}
