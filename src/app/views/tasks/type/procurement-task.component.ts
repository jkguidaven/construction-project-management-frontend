import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ScopeOfWork,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';
import { AddScopeOfWorkMaterialPriceComponent } from '../../modals/add-scope-of-work-material-price.component';

@Component({
  selector: 'app-procurement-task',
  templateUrl: './procurement-task.component.html',
  styleUrls: ['./procurement-task.component.scss'],
})
export class ProcurementTaskComponent implements OnInit {
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
            },
            {
              name: 'Footing RSB 20mm x 6mm',
              unit: 'pcs',
              quantity: 42.0,
              contingency: 5,
            },
            {
              name: 'Footing RSB 16mm x 6mm',
              unit: 'pcs',
              quantity: 240.0,
              contingency: 5,
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
            },
          ],
        },
      ],
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  addPrice(material: ScopeOfWorkTaskMaterial): void {
    const dialogRef = this.dialog.open(AddScopeOfWorkMaterialPriceComponent, {
      data: material,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        material.pricePerUnit = data.pricePerUnit;
      }
    });
  }
}
