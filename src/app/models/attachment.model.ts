import { Task } from './task.model';

export class Attachment {
  id?: number;
  type?: 'CONTRACT' | 'DESIGN';
  file: File;
  name?: string;
  task?: Task;
}
