import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { EXPANSION_HELPERS, STEPPER_HELPERS } from './helpers.data';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'cdk-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})

export class ExpansionPanelComponent implements OnInit {
	isLinear = true;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	stepperHelpers = STEPPER_HELPERS;
  	constructor(@Inject('CommonService') private service,private formBuilder: FormBuilder) { }
	public dataSource;
	public selectedCampaign = true;
	public CampaignImage;
  	ngOnInit() {
		this.firstFormGroup = this.formBuilder.group({
			
		});
		this.secondFormGroup = this.formBuilder.group({
				
		});
		this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetAllCampaignList").then((result)=>{        
			this.dataSource  = JSON.parse(result.d);    
		  });
  	}
	  
	public beneficiaryData;
	public contributorData;
	SelectCampaign(campaign, stepper: MatStepper){
		this.selectedCampaign = campaign;
		this.CampaignImage = campaign.ImageId;
		var postData=  {beneficiaryId:campaign.BeneficiaryId};		
		this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetBeneficiaryDetails", postData).then((result)=>{        
			this.beneficiaryData  = JSON.parse(result.d)[0];    
			var postData1=  {compaignId:campaign.ID};
			this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetContributorDetails", postData1).then((result1)=>{        
				this.contributorData = JSON.parse(result1.d);    
				stepper.next();		
			});
		  });
		
	}

	BackClick(){
		this.CampaignImage = "";
	}
}
