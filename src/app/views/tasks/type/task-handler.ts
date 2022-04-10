import { Task } from 'src/app/models/task.model';

export interface TaskHandler {
  setTask(task: Task): void;
}
