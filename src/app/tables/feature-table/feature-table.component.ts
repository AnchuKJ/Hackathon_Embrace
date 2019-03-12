
import {fromEvent as observableFromEvent,  Observable } from 'rxjs';

import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import { Component, OnInit , ElementRef, ViewChild, Inject} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'cdk-feature-table',
  templateUrl: './feature-table.component.html',
  styleUrls: ['./feature-table.component.scss']
})
export class FeatureTableComponent implements OnInit {

	showNavListCode;
	displayedColumns = ['Name', 'Description', 'RequestAmount', 'Status', 'PurposeType'];

	selection = new SelectionModel<string>(true, []);
	constructor(@Inject('CommonService') private service) { }

 public	dataSource;

	ngOnInit() {
		this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetAllBeneficiaryList").then((result)=>{        
			this.dataSource = JSON.parse(result.d);   
					
	});
}
}
