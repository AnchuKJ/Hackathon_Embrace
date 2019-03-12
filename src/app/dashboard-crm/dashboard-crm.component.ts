import { Component, OnInit, Inject } from '@angular/core';
import { ToolbarHelpers } from 'app/core/toolbar/toolbar.helpers';

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {
    
    public dashCard = [
        { colorDark: '#5C6BC0', colorLight: '#7986CB', number: 1221, title: 'Campaigns', icon: 'local_grocery_store' },
        { colorDark: '#42A5F5', colorLight: '#64B5F6', number: 1221, title: 'Contributors', icon: 'new_releases' },
        { colorDark: '#26A69A', colorLight: '#4DB6AC', number: 1221, title: 'Beneficiaries', icon: 'assignments' }
    ];

    constructor(@Inject('CommonService') private service) { }
    toolbarHelpers = ToolbarHelpers;
    public campaignList;
    ngOnInit() {
        this.campaignList = [{Name:'Campaign1', AvailAmount:'20', MaxAmount:'100', PhotoId:'assets/images/campaign/campaign1.png'}, {Name:'Campaign2', AvailAmount:'40', MaxAmount:'150', PhotoId:'assets/images/campaign/campaign2.png'},
        {Name:'Campaign3', AvailAmount:'70', MaxAmount:'170', PhotoId:'assets/images/campaign/campaign3.png'}, {Name:'Campaign4', AvailAmount:'60', MaxAmount:'200', PhotoId:'assets/images/campaign/campaign4.png'} ]
        
        this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetCountForDashBoard").then((result)=>{
            var data = JSON.parse(result.d);    
        this.dashCard[0].number = data[0];
        this.dashCard[1].number = data[1];
        this.dashCard[2].number = data[2];
        setTimeout(() => {
            this.GetCampaignCount();
        },500);
       
        });

        /*

        this.campaignList = [{Name:'Campaign1', AvailAmount:'20', MaxAmount:'100', PhotoId:'assets/images/campaign/campaign1.png'}, {Name:'Campaign2', AvailAmount:'40', MaxAmount:'150', PhotoId:'assets/images/campaign/campaign2.png'},
        {Name:'Campaign3', AvailAmount:'70', MaxAmount:'170', PhotoId:'assets/images/campaign/campaign3.png'}, {Name:'Campaign4', AvailAmount:'60', MaxAmount:'200', PhotoId:'assets/images/campaign/campaign4.png'} ]
        this.dashCard[0].number = 100;
        this.dashCard[1].number = 200;
        this.dashCard[2].number = 300;
        //alert(this.toolbarHelpers.LoggedInUser.UserType);*/
    }

    GetCampaignCount(){
        this.service.GetPostData("http://localhost/BridgeService/webservice1.asmx/GetCampaignCount").then((result1)=>{   
        this.campaignList = JSON.parse(result1.d); 
        
        });
    }

}
