import { Customer } from './customer.model';

export class Project {
  id?: number;
  name: string;
  description: string;
  customer?: Customer;
  hasExistingDesign?: boolean;
}
