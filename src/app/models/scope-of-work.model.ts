export interface ScopeOfWork {
  name: string;
  tasks: ScopeOfWorkTask[];
}

export interface ScopeOfWorkTask {
  name: string;
  quantity?: number;
  unit?: string;
  materials: ScopeOfWorkTaskMaterial[];
}

export interface ScopeOfWorkTaskMaterial {
  name: string;
  unit: string;
  quantity: number;
  contingency: number;
  pricePerUnit?: number;
  supplier?: string;
}
