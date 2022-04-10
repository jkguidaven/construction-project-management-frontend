import { Project } from './project.model';

export class Task {
  id?: number;
  type: string;
  assignedTo?: string;
  project: Project;
  status?: string;
  date?: Date;
}
