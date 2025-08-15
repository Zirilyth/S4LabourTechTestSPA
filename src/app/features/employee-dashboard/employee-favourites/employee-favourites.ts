import { Component, computed, inject } from '@angular/core';
import { EmployeeTable } from '../employee-table/employee-table';
import { EmployeeService } from '../../../shared/employee-service';
import { Employee } from '../../../models/employee';
import { Router } from '@angular/router';

@Component({
	selector: 'app-employee-favourites',
	imports: [
		EmployeeTable
	],
	templateUrl: './employee-favourites.html',
	styleUrl: './employee-favourites.css'
})
export class EmployeeFavourites {
	employeeService = inject(EmployeeService);
	router = inject(Router);

	favouriteEmployees = computed(() => {
		const employees = this.employeeService.employees();

		if (!employees) return [];

		return employees.filter(employee => employee.favourite);
	});

	rowClicked($event: Employee) {
		this.router.navigateByUrl(`/employees/${$event.id}`).then(r => console.log(r));
	}
}
