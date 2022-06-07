import { Attachment } from './attachment.model';
import { Customer } from './customer.model';

export class Project {
  id?: number;
  name: string;
  description: string;
  customer?: Customer;
  hasExistingDesign?: boolean;
  status?: string;
  designStatus?: string;
  attachments?: Attachment[];
  tasks?: Task[];
}

export class ProjectPageResult {
  count: number;
  page: number;
  total: number;
  results: Project[];
}
