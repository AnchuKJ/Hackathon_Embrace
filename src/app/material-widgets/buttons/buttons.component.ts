import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { STEPPER_HELPERS } from './helpers.data';
import { MatStepper } from '@angular/material/stepper';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'cdk-stepper',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
	public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
	
	isLinear = true;
	firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup:FormGroup;
	stepperHelpers = STEPPER_HELPERS;
  	constructor(@Inject('CommonService') private service, private formBuilder: FormBuilder) { }

    public beneficiaries;
		
  	ngOnInit() {			
		  var postData=  {status:'New'};
      this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetBeneficiaryList", postData).then((result)=>{        
        this.beneficiaries  = JSON.parse(result.d);    
      
      	});
      
  		this.firstFormGroup = this.formBuilder.group({
			});
	    this.secondFormGroup = this.formBuilder.group({
				'Name': ['', Validators.required],
				'Description': ['', Validators.required],
				'Image':[''],
        'IsCharity':['', Validators.required]
      });
			this.thirdFormGroup = this.formBuilder.group({});
			this.uploader.onAfterAddingFile = (file) => { 
				this.uploadedFile = file._file.name;				
				file.withCredentials = false; };
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			
       };
		}
		public uploadedFile;
		public getRouterOutletState(outlet) {
			return outlet.isActivated ? outlet.activatedRoute : '';
		}
		
		public selectedBeneficiary;
		public BeneficiaryImage;
		SelectBeneficiary(beneficiary, stepper: MatStepper)
		{
			this.selectedBeneficiary = beneficiary;
			this.BeneficiaryImage = beneficiary.ImageId;
			stepper.next();	
		}

		AddCampaign()
		{
		//	this.uploader.uploadAll();
			var postData = {Name:this.secondFormGroup.value.Name, 
				Description:this.secondFormGroup.value.Description, ImageID:this.uploadedFile,
				MaximumCredit:this.selectedBeneficiary.RequestAmount, 
				IsCharity:(this.secondFormGroup.value.IsCharity =='IsCharityOption'), BenefId:this.selectedBeneficiary.ID};
			var postData1=  {jsonData:JSON.stringify(postData)};
			this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/CreateCampaign", postData1).then((result)=>{
			
			});
		}

		BackClick(){
			this.BeneficiaryImage = "";
		}
}
