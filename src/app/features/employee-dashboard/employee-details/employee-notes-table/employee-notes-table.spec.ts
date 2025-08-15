import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection, ResourceRef, signal, viewChild } from '@angular/core';

import { EmployeeNotesTable } from './employee-notes-table';
import { Note } from '../../../../models/note';

function createMockNotesResource(notes: Note[]): ResourceRef<Note[] | undefined> {
	const data = signal(notes);

	return {
		data: data,
		value: data,
		state: 'success',
		// Make error a callable to match template usage: notesResource().error()
		error: () => undefined,
		// Provide commonly used state helpers
		isLoading: () => false,
		isSuccess: () => true,
		isError: () => false,
		hasValue:() => true,
	} as unknown as ResourceRef<Note[] | undefined>;
}

@Component({
	standalone: true,
	template: `
		<app-employee-notes-table [notesResource]="notesResource"></app-employee-notes-table>
	`,
	imports: [EmployeeNotesTable],
})
class HostComponent {
	notesResource = createMockNotesResource([
		{ id: 1, text: 'First note content.' },
		{ id: 2, text: 'Second note content.' },
	]);

	// Use viewChild to get an instance of the component we are testing.
	component = viewChild(EmployeeNotesTable);
}

describe('EmployeeNotesTable', () => {
	let hostFixture: ComponentFixture<HostComponent>;
	let hostComponent: HostComponent;
	let component: EmployeeNotesTable;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HostComponent],
			providers: [provideZonelessChangeDetection()],
		}).compileComponents();

		hostFixture = TestBed.createComponent(HostComponent);
		hostComponent = hostFixture.componentInstance;
		component = hostComponent.component()!;
		hostFixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render the correct number of notes', () => {
		const noteRows = hostFixture.nativeElement.querySelectorAll('[id="noteRow"]');
		expect(noteRows.length).toBe(2);
	});

	it('should update the view when notes change', () => {
		hostComponent.notesResource.value.set([
			{id: 1, text: 'First note content.'},
			{id: 2, text: 'Second note content.'},
			{id: 3, text: 'Third note content.'},
		]);

		hostFixture.detectChanges();

		const noteRows = hostFixture.nativeElement.querySelectorAll('[id="noteRow"]');
		expect(noteRows.length).toBe(3);
	});
});
