import { computed, inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Employee } from '../models/employee';
import { catchError, Observable } from 'rxjs';
import { Note } from '../models/note';


@Injectable({
	providedIn: 'root'
})
export class EmployeeService {
	//This is a quick thing for the apiUrl, this would ideally be in a config/environment file
	apiUrl = 'http://localhost:5126';
	httpClient = inject(HttpClient);

	//Not exactly a fan of this, but it's a quick way to format the response, I think the httpResource has a parser option which could be cool'
	employees = computed(() => {
		const employeesList = this.employeesResource.value();
		if (employeesList) {
			return employeesList.map(employee => {
				const fullName = `${employee.name.first} ${employee.name.last}`;
				return {
					...employee,
					name: {
						...employee.name,
						fullName
					}
				};
			});
		}
		return [];
	});
	employeesResource = httpResource<Employee[]>(() => `${this.apiUrl}/employees`);

	getUserNotes(id: number): Observable<any> {
		// The service method returns an Observable.
		return this.httpClient.get<Note[]>(`${this.apiUrl}/employees/${id}/notes`);
	}

	addNoteToEmployee(id: number, note: string) {
		return this.httpClient.post(`${this.apiUrl}/employees/${id}/notes`, {text: note}).pipe(
			catchError((err) => {
				console.error(err.message);
				throw new Error(err);
			}));
	}

	updateEmployee(employee: Employee) {
		this.employeesResource.value.update(value => {
			if (!value) return;
			if (!value[employee.id]) return;
			value[employee.id] = employee;
			return value;
		});
		return employee;
	}
}
