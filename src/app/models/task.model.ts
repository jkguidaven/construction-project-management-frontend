import { MaterialRequest } from './material-request.model';
import { Project } from './project.model';

export class Task {
  id?: number;
  type?: string;
  assignedTo?: string;
  project?: Project;
  materialRequest?: MaterialRequest;
  status?: string;
  date?: Date;
}
