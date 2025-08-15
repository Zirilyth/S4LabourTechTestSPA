import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { EmployeeService } from '../employee-service';
import { inject } from '@angular/core';
import { Employee } from '../../models/employee';
import { of } from 'rxjs';

export const employeeResolver: ResolveFn<Employee> = (route, state) => {
	const employeeService = inject(EmployeeService);
	const router = inject(Router);

	const userId = Number(route.paramMap.get('id')!);
	const employee = employeeService.employees()?.find((val) => val.id === userId);
	if (!employee) {
		console.error('Failed to load user');
		return of(new RedirectCommand(router.parseUrl('/employees')));
	}
	return of(employee);
};


