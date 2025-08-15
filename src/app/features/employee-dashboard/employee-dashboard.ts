import { Component, computed, inject } from '@angular/core';
import { EmployeeTable } from './employee-table/employee-table';
import { EmployeeService } from '../../shared/employee-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
	selector: 'app-employee-dashboard',
	imports: [
		EmployeeTable,
		ReactiveFormsModule,
		RouterLink,
	],
	templateUrl: './employee-dashboard.html',
	styleUrl: './employee-dashboard.css'
})
export class EmployeeDashboard {
	employeeService = inject(EmployeeService);
	router = inject(Router);

	searchControl = new FormControl<string>('');
	searchQuery = toSignal(this.searchControl.valueChanges.pipe(debounceTime(300)), {initialValue: ''});

	filteredEmployees = computed(() => {
		const searchQuery = this.searchQuery();
		const employees = this.employeeService.employees();

		if (!searchQuery) return employees;
		if (!employees) return [];

		return employees.filter(employee => employee.name.fullName.toLowerCase().includes(searchQuery.toLowerCase()));
	});


	rowClicked($event: Employee) {
		this.router.navigateByUrl(`/employees/${$event.id}`).then(r => console.log(r));
	}

	rowFavourite($event: Employee) {
		$event.favourite = !$event.favourite;
		this.employeeService.updateEmployee($event)
	}
	
}
