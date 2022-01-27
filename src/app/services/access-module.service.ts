import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccessModuleService {
  constructor() {}

  getModulesByGroup(group: string): any[] {
    return [];
  }

  hasAccessToModule(id: string, group: string): boolean {
    return false;
  }

  getModuleInfo(id: string): any {
    return null;
  }
}
