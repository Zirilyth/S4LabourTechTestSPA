import { Component, input, InputSignal, ResourceRef } from '@angular/core';
import { TableSkeleton } from '../../../../shared/table-skeleton/table-skeleton';
import { Note } from '../../../../models/note';

@Component({
	selector: 'app-employee-notes-table',
	imports: [
		TableSkeleton
	],
	templateUrl: './employee-notes-table.html',
	styleUrl: './employee-notes-table.css'
})
export class EmployeeNotesTable {
	notesResource: InputSignal<ResourceRef<Note[] | undefined>> = input.required<ResourceRef<Note[] | undefined>>();
}
