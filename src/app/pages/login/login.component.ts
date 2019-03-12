import { Component, OnInit, NgModule,Inject } from '@angular/core';

import { ToolbarHelpers } from 'app/core/toolbar/toolbar.helpers';
import { Router } from '@angular/router';
//import { HttpClient } from '@angular/common/http';
//import { NgxXml2jsonService } from 'ngx-xml2json';


// import { AuthService } from '../../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Please enter your email',
      'email': 'please enter your vaild email'
    },
    'password': {
      'required': 'please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 4 characters',
      'maxlength': 'Please enter less than 25 characters',
    }
  };


  toolbarHelpers = ToolbarHelpers;
  constructor(@Inject('CommonService') private service,
              private router: Router,
              private fb: FormBuilder
              ) {                
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required
      ]
      ],
      'password': ['', [
        Validators.required
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    // if (!this.userForm) {
    //   return;
    // }
    // const form = this.userForm;
    // for (const field in this.formErrors) {
    //   if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
    //     this.formErrors[field] = '';
    //     const control = form.get(field);
    //     if (control && control.dirty && !control.valid) {
    //       const messages = this.validationMessages[field];
    //       for (const key in control.errors) {
    //         if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
    //           this.formErrors[field] += messages[key] + ' ';
    //         }
    //       }
    //     }
    //   }
    // }
  }

  login() {          
    var postData = {LoginId:this.userForm.value.email, Password:this.userForm.value.password};
    var postData1=  {jsonData:JSON.stringify(postData)};

    this.service.GetPostData('http://localhost/BridgeService/webservice1.asmx/ValidateUserLogin', postData1).then((result)=>{
    var data = JSON.parse(result.d);    
    if(data[0].Id > 0)
    {
      this.toolbarHelpers.LoggedInUser = data[0];
      this.router.navigate(['auth/dashboard']);
    }
    else
    {
    }
  });
  } 
}

