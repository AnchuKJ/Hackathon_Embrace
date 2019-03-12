export const EXPANSION_HELPERS: any = {

 	tsSourceRaisedButton: `
 		import { MatExpansionModule } from '@angular/material/expansion';
		
	  	@NgModule({
		  imports: [
		    MatExpansionModule
		})
		export class AppModule { }
		
		import { Component, OnInit } from '@angular/core';
		import { EXPANSION_HELPERS } from './helpers.data';

		@Component({
		  selector: 'cdk-expansion-panel',
		  templateUrl: './expansion-panel.component.html',
		  styleUrls: ['./expansion-panel.component.scss']
		})
		export class ExpansionPanelComponent implements OnInit {
			step = 0;
			public basicPanelOpenState:any;
			expansionHelpers = EXPANSION_HELPERS;
		  	constructor() { }

		  	ngOnInit() {
		  	}
		  	setStep(index: number) {
			    this.step = index;
			}

			nextStep() {
			    this.step++;
			}

			prevStep() {
			    this.step--;
			}

		}
`.trim(),

  	htmlSourceRaisedButton: `
  		
		  <mat-accordion>
				<mat-expansion-panel>
					<mat-expansion-panel-header>
						<mat-panel-title>
						Personal data
						</mat-panel-title>
						<mat-panel-description>
						Type your name and age
						</mat-panel-description>
					</mat-expansion-panel-header>

					<mat-form-field>
						<input matInput placeholder="First name">
					</mat-form-field>

					<mat-form-field>
					<input matInput placeholder="Age">
					</mat-form-field>
				</mat-expansion-panel>
				<mat-expansion-panel (opened)="basicPanelOpenState = true"
					(closed)="basicPanelOpenState = false">
					<mat-expansion-panel-header>
					<mat-panel-title>
						Self aware panel
					</mat-panel-title>
					<mat-panel-description>
						Currently I am {{basicPanelOpenState ? 'open' : 'closed'}}
					</mat-panel-description>
					</mat-expansion-panel-header>
					<p>I'm visible because I am open</p>
				</mat-expansion-panel>
			</mat-accordion>
		`.trim(),

 };

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
			
	
