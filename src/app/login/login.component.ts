import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cdk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}

declare var angular: any;
var app = angular.module('loginApp',[]);
app.controller('loginCtrl', function($scope){
alert("dd");
  $scope.loginData = null;
  $scope.LoginClick = function()  {
    alert($scope.loginData.userName);
  }
});

