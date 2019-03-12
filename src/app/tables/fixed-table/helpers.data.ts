
import {merge as observableMerge,  BehaviorSubject ,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { UserData } from '../interfaces';


export const STEPPER_HELPERS: any = {
	
		 tsSourceRaisedButton: `
			 import { MatStepperModule } from '@angular/material/button';
	
			  @NgModule({
			  imports: [
				MatStepperModule,
			})
			export class AppModule { }
			
			import { Component, OnInit } from '@angular/core';
	
			@Component({
			  selector: 'cdk-stepper',
			  templateUrl: './stepper.component.html',
			  styleUrls: ['./stepper.component.scss']
			})
			export class CardsComponent implements OnInit {
			}`.trim(),
		  htmlSourceRaisedButton: `
			  
				  <button mat-raised-button (click)="isLinear = true" id="toggle-linear">Enable linear mode</button>
				<mat-horizontal-stepper [linear]="isLinear">
				  <mat-step [stepControl]="firstFormGroup">
					<form [formGroup]="firstFormGroup">
					  <ng-template matStepLabel>Fill out your name</ng-template>
					  <mat-form-field>
						<input matInput placeholder="Last name, First name" formControlName="firstCtrl" required>
					  </mat-form-field>
					  <div>
						<button mat-button matStepperNext>Next</button>
					  </div>
					</form>
				  </mat-step>
				  <mat-step [stepControl]="secondFormGroup">
					<form [formGroup]="secondFormGroup">
					  <ng-template matStepLabel>Fill out your address</ng-template>
					  <mat-form-field>
						<input matInput placeholder="Address" formControlName="secondCtrl" required>
					  </mat-form-field>
					  <div>
						<button mat-button matStepperPrevious>Back</button>
						<button mat-button matStepperNext>Next</button>
					  </div>
					</form>
				  </mat-step>
				  <mat-step>
					<ng-template matStepLabel>Done</ng-template>
					You are now done.
					<div>
					  <button mat-button matStepperPrevious>Back</button>
					</div>
				  </mat-step>
				</mat-horizontal-stepper>
			`.trim(),
	
	 };
			





const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

 /** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }

  constructor() {
    // Fill up the database with 100 users.
    for (let i = 0; i < 100; i++) { this.addUser(); }
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */

export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return observableMerge(...displayDataChanges).pipe(map(() => {
      return this._exampleDatabase.data.slice().filter((item: UserData) => {
        let searchStr = (item.name + item.color).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    }));
  }

  disconnect() {}
}
