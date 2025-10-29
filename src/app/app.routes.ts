import { Routes } from '@angular/router';
import { App } from './app';
import { AddEditEmployee } from './components/add-edit-employee/add-edit-employee';
import { EmployeeDashboard } from './components/employee-dashboard/employee-dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee-dashboard',
    pathMatch: 'full',
  },
  { path: 'employee-dashboard', component: EmployeeDashboard },
  { path: 'add-employee', component: AddEditEmployee },
  { path: 'add-employee/:id', component: AddEditEmployee },
];
