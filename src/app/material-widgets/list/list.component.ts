import { Component, OnInit, Inject } from '@angular/core';
import { LIST_HELPERS,  Messages, Links} from './helpers.data';
import { ToolbarHelpers } from 'app/core/toolbar/toolbar.helpers';

@Component({
  selector: 'cdk-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  //animations: [fadeAnimation]
})
export class ListComponent implements OnInit {

    listHelpers: any = LIST_HELPERS;
     links = Links;

    showMultiListCode: boolean = false;
     messages = Messages;
     toolbarHelpers = ToolbarHelpers;     
    constructor(@Inject('CommonService') private service) { }


 public	dataSource;
 public IsContributor;
    ngOnInit() {  
      var currentUser = this.toolbarHelpers.LoggedInUser;
      if(currentUser.UserType == 2)
      {
        this.IsContributor = true;
      var postData=  {contributorId:currentUser.Id};      
      this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetMyCampaigns", postData).then((result)=>{        
        this.dataSource = JSON.parse(result.d);    	
    });    
    
  }
  else if(currentUser.UserType == 3)
  {
    this.IsContributor = false;
    var postData1=  {beneficiaryId:currentUser.LoginId};      
    this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetBeneficiaryCampaigns", postData1).then((result1)=>{        
      this.dataSource = JSON.parse(result1.d); 			
  }); 
  }
        }
  

}
