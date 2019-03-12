import { Component, OnInit , ElementRef, ViewChild, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import { ToolbarHelpers } from 'app/core/toolbar/toolbar.helpers';
import { Observable } from 'rxjs';

import { MatStepper } from '@angular/material/stepper';
import { STEPPER_HELPERS } from './helpers.data';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './fixed-table.component.html',
  styleUrls: ['./fixed-table.component.scss']
})
export class FixedTableComponent implements OnInit {
	isLinear = true;
	firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup:FormGroup;
	stepperHelpers = STEPPER_HELPERS;
	toolbarHelpers = ToolbarHelpers;
    
  	constructor(@Inject('CommonService') private service, private formBuilder: FormBuilder) { }

	  public campaigns;
  	ngOnInit() {
		this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetCampaignList").then((result)=>{            
		  this.campaigns = JSON.parse(result.d);
			});

		this.firstFormGroup = this.formBuilder.group({
		});
		this.secondFormGroup = this.formBuilder.group({			
		});
		this.thirdFormGroup = this.formBuilder.group({
			'Amount': ['', Validators.required]			
		}); 
	}
	public selectedCampaign;
	public beneficiaryData;
	public CampaignImage;
	SelectCampaign(campaign, stepper: MatStepper){
		this.selectedCampaign = campaign;
		this.CampaignImage = campaign.ImageId;
		var postData=  {beneficiaryId:campaign.BeneficiaryId};		
		this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetBeneficiaryDetails", postData).then((result)=>{        
			this.beneficiaryData = JSON.parse(result.d)[0];
			stepper.next();
		  });
	}

	BackClick(){
		this.CampaignImage = "";
	}
	SubmitContribution(){
		var currentUser = this.toolbarHelpers.LoggedInUser;
		var postData = {ContributorID:currentUser.Id, 
			CampaignID:this.selectedCampaign.ID, DonatedAmount:this.thirdFormGroup.value.Amount,
			MaximumCredit:this.selectedCampaign.MaximumCredit, AvailableCredit:this.selectedCampaign.AvailableCredit, 
			IsCharity:this.selectedCampaign.IsCharity, BenefId:this.selectedCampaign.BeneficiaryID};
		var postData1=  {jsonData:JSON.stringify(postData)};
		this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/AddContribution", postData1).then((result)=>{
			return true;
		});
	}
}
