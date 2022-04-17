export type ActionCommand = 'DELETE' | 'CREATE' | 'UPDATE';

export interface ScopeOfWork {
  type?: ActionCommand;
  id?: number;
  name: string;
  tasks: ScopeOfWorkTask[];
}

export interface ScopeOfWorkTask {
  type?: ActionCommand;
  id?: number;
  name: string;
  qty?: number;
  unit?: string;
  subconPricePerUnit?: number;
  scope?: ScopeOfWork;
  materials: ScopeOfWorkTaskMaterial[];
}

export interface ScopeOfWorkTaskMaterial {
  type?: ActionCommand;
  id?: number;
  name: string;
  unit: string;
  qty: number;
  contingency: number;
  pricePerUnit?: number;
  subconPricePerUnit?: number;
  supplier?: string;
  released?: number;
  requested?: number;
}
