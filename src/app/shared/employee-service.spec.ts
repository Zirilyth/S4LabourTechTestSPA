import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection, signal, WritableSignal } from '@angular/core';
import { Employee } from '../models/employee';


function createMockHttpResource(initialValue: Employee[]) {
	const resourceSignal: WritableSignal<Employee[] | undefined> = signal(initialValue);

	return {
		value: resourceSignal,
		update: (updateFn: (currentValue: Employee[] | undefined) => Employee[] | undefined) => {
			resourceSignal.update(updateFn);
		}
	};
}

describe('EmployeeService', () => {
	let service: EmployeeService;
	let mockHttp: HttpTestingController;
	const mockEmployees: Employee[] = [
		{
			id: 1, name: {
				fullName: 'Test',
				first: 'a',
				last: 'b',
				title: 'c'
			},
			favourite: false,
			email: 'wwddd',
			gender: 'dwd',
			phone: 'wdwd',
			picture: {
				large: 'wd',
				medium: 'dw',
				thumbnail: 'dw'
			}
		},
		{
			id: 2, name: {
				fullName: 'Test',
				first: 'a',
				last: 'b',
				title: 'c'
			},
			favourite: false,
			email: 'wwddd',
			gender: 'dwd',
			phone: 'wdwd',
			picture: {
				large: 'wd',
				medium: 'dw',
				thumbnail: 'dw'
			}
		},
		{
			id: 3, name: {
				fullName: 'Test',
				first: 'a',
				last: 'b',
				title: 'c'
			},
			favourite: false,
			email: 'wwddd',
			gender: 'dwd',
			phone: 'wdwd',
			picture: {
				large: 'wd',
				medium: 'dw',
				thumbnail: 'dw'
			}
		},
	];
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideZonelessChangeDetection(),
				provideHttpClient(),
				provideHttpClientTesting(),
			]
		});
		service = TestBed.inject(EmployeeService);
		mockHttp = TestBed.inject(HttpTestingController);



	});
	afterEach(() => {
		// Verify that there are no outstanding requests.
		mockHttp.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should correctly handle the httpResource', () => {
		const id = signal(0);


		const result = service.getUserNotes(id());
		expect(result).toBeTruthy();
	});
	it('should not update the resource if the employee ID does not exist', () => {
		const invalidEmployee: Employee = {
			id: 9999999, name: {
				fullName: 'Test',
				first: 'a',
				last: 'b',
				title: 'c'
			},
			favourite: false,
			email: 'wwddd',
			gender: 'dwd',
			phone: 'wdwd',
			picture: {
				large: 'wd',
				medium: 'dw',
				thumbnail: 'dw'
			}
		};

		// Get the initial state of the employees signal
		const initialEmployees = (service as any).employeesResource.value();

		// Call the method with an invalid employee
		service.updateEmployee(invalidEmployee);

		// The signal's value should be exactly the same as the initial state
		const finalEmployees = (service as any).employeesResource.value();

		expect(finalEmployees).toEqual(initialEmployees);
	});
});

