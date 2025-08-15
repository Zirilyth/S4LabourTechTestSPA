import { Routes } from '@angular/router';
import { EmployeeDashboard } from './features/employee-dashboard/employee-dashboard';
import { EmployeeDetails } from './features/employee-dashboard/employee-details/employee-details';
import { EmployeeFavourites } from './features/employee-dashboard/employee-favourites/employee-favourites';
import { employeeResolver } from './shared/resolvers/employee-resolver';

export const routes: Routes = [
	{
		path: 'employees', loadComponent: () => {
			return EmployeeDashboard;
		},
	},
	{
		path: 'favourites', loadComponent: () => {
			return EmployeeFavourites;
		}
	},
	{
		path: 'employees/:id', loadComponent: () => {
			return EmployeeDetails;
		}, resolve: {
			employee: employeeResolver
		}
	},
	{path: '', redirectTo: '/employees', pathMatch: 'full'},

];
