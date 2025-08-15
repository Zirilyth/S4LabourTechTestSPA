import { Component, input, InputSignal, output } from '@angular/core';
import { Employee } from '../../../models/employee';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { TableSkeleton } from '../../../shared/table-skeleton/table-skeleton';
import { HttpResourceRef } from '@angular/common/http';


@Component({
	selector: 'app-employee-table',
	imports: [
		NgClass,
		NgOptimizedImage,
		TableSkeleton
	],
	templateUrl: './employee-table.html',
	styleUrl: './employee-table.css'
})
export class EmployeeTable {
	employees: InputSignal<Employee[]> = input.required<Employee[]>();

	rowClicked = output<Employee>();
	rowFavorite = output<Employee>();
	resource = input.required<HttpResourceRef<Employee[]|undefined>>();

	rowPressed($event: Event, employee: Employee) {
		$event.stopPropagation();
		this.rowClicked.emit(employee);
	}

	setFavourite($event: MouseEvent, employee: Employee) {
		$event.stopPropagation();
		console.log(employee);
		this.rowFavorite.emit(employee);
	}
}
