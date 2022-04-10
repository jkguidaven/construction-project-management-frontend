import { Customer } from './customer.model';

export class Project {
  id?: number;
  name: string;
  description: string;
  customer?: Customer;
  hasExistingDesign?: boolean;
  status?: string;
  designStatus?: string;
}

export class ProjectPageResult {
  count: number;
  page: number;
  total: number;
  results: Project[];
}
