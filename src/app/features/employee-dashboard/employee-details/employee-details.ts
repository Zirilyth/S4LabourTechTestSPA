import { Component, computed, inject, input, InputSignal, resource } from '@angular/core';
import { Employee } from '../../../models/employee';
import { NgOptimizedImage } from '@angular/common';
import { EmployeeNotesTable } from './employee-notes-table/employee-notes-table';
import { EmployeeService } from '../../../shared/employee-service';
import { lastValueFrom } from 'rxjs';
import { Note } from '../../../models/note';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'app-employee-details',
	imports: [
		NgOptimizedImage,
		EmployeeNotesTable,
		ReactiveFormsModule
	],
	templateUrl: './employee-details.html',
	styleUrl: './employee-details.css'
})
export class EmployeeDetails {
	employeeService = inject(EmployeeService);
	employee: InputSignal<Employee> = input.required<Employee>();
	notesResource = resource<Note[], { id: number }>({
		// 'params' should be a signal that the resource can track.
		// We use 'computed' to create a signal that updates whenever 'this.employee()' changes.
		params: computed(() => ({id: this.employee().id})),
		// The loader function correctly uses 'lastValueFrom' to return a Promise.
		loader: ({params}) => lastValueFrom(this.employeeService.getUserNotes(params.id)),
	});
	noteInput = new FormControl<string>('', Validators.required);

	addNote() {
		if (!this.noteInput.valid) return;
		let newNote: Note = {
			id: 1,
			text: this.noteInput.value!,
		};
		this.employeeService.addNoteToEmployee(this.employee().id, this.noteInput.value!).subscribe(() => {
			this.notesResource.value.update((value) => value?.concat([newNote]));
			this.noteInput.reset();
		});
	}
}

