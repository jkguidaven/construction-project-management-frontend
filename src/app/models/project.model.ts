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

  accountingApprover?: string;
  accountingRejector?: string;

  stakeholderApprover?: string;
  stakeholderRejector?: string;

  clientApprover?: string;
  clientRejector?: string;

  tasks?: Task[];
}

export class ProjectPageResult {
  count: number;
  page: number;
  total: number;
  results: Project[];
}
