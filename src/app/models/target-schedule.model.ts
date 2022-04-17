export class TargetSchedule {
  id?: number;
  taskId: number;
  start: Date;
  end: Date;
  dates: TargetScheduleDates[];
}

export class TargetScheduleDates {
  materialId?: number;
  date: Date;
  target: number;
}
