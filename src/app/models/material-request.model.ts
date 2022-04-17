import { Project } from './project.model';
import {
  ScopeOfWorkTask,
  ScopeOfWorkTaskMaterial,
} from './scope-of-work.model';

export class MaterialRequest {
  id?: number;
  project: Project;
  task: ScopeOfWorkTask;
  items: MaterialRequestItem[];
  status?: string;
  approver?: string;
  finalApprover?: string;
}

export class MaterialRequestItem {
  id?: number;
  material: ScopeOfWorkTaskMaterial;
  qty: number;
}

export class MaterialRequestPageResult {
  count: number;
  page: number;
  total: number;
  results: MaterialRequest[];
}
