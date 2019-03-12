import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { STEPPER_HELPERS } from './helpers.data';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ToolbarHelpers } from 'app/core/toolbar/toolbar.helpers';

const URL = 'http://localhost:3000/api/upload';
@Component({
  selector: 'cdk-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
	public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});	
	public uploader1: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
	public uploader2: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
	isLinear = true;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	stepperHelpers = STEPPER_HELPERS;
	validationMessages = {
    'Amount': {
      'pattern': 'Please enter a valid amount'
    }
	};
	
	public PurposeTypeList = [
		{ PurposeType:'Business' },
		{ PurposeType:'Educational' },
		{ PurposeType:'Relief fund' },
		{PurposeType:'Charity'}
];
toolbarHelpers = ToolbarHelpers;

  	constructor(@Inject('CommonService') private service, private formBuilder: FormBuilder) { }
public uploadedIdProof;
public uploadedAttachment;
public uploadedImage;
public currentUser;
  	ngOnInit() {
		  if(this.toolbarHelpers.LoggedInUser.UserType == 3)
		  {
			this.currentUser = this.toolbarHelpers.LoggedInUser.LoginId;
		  }
  		this.firstFormGroup = this.formBuilder.group({
				'Name': ['', Validators.required],
				'Description': ['', Validators.required],
				'Amount': ['', [ Validators.pattern('^[0-9]+[0-9]*(.[0-9]+)?$')]],
			  'Purpose': ['', Validators.required]
	    });
	    this.secondFormGroup = this.formBuilder.group({
				'Image':[''],
				'IdProof': [''],
				'Attachments': ['']
		});
		this.uploader2.onAfterAddingFile = (file) => { 
			this.uploadedImage = file._file.name;				
			file.withCredentials = false; };
		this.uploader2.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
		
		};
		this.uploader.onAfterAddingFile = (file) => { 
			this.uploadedIdProof = file._file.name;				
			file.withCredentials = false; };
  this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
		
   };
   this.uploader1.onAfterAddingFile = (file) => { 
	this.uploadedAttachment = file._file.name;				
	file.withCredentials = false; };
this.uploader1.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

};
		}
		public PurposeType;
		AddBeneficiary()
		{			
			var postData = {Name:this.firstFormGroup.value.Name, RequestAmount:this.firstFormGroup.value.Amount, 
				Description:this.firstFormGroup.value.Description, IDProof:this.uploadedIdProof,
			DocumentID:this.uploadedAttachment, PurposeType:this.firstFormGroup.value.Purpose, ImageId:this.uploadedImage};
			var postData1=  {jsonData:JSON.stringify(postData)};
			this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/AddBeneficiary", postData1).then((result)=>{
				/*this.uploader.uploadAll();
				this.uploader1.uploadAll();
				this.uploader2.uploadAll();*/
			});
		}

}
