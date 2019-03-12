import { Component, OnInit, Input } from '@angular/core';
import { fundManagermenus, Contributormenus,Benificiarymenus } from './menu-element';
import { ToolbarHelpers } from 'app/core/toolbar/toolbar.helpers';

@Component({
  selector: 'cdk-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

    @Input() iconOnly:boolean = false;
    public menus = fundManagermenus;


    toolbarHelpers = ToolbarHelpers;
    constructor() { }

    ngOnInit() {
    var currentUser = this.toolbarHelpers.LoggedInUser;
      if(currentUser.UserType == 1)
      {
        this.menus = fundManagermenus;
      }
      else if(currentUser.UserType == 2)
      {
        this.menus = Contributormenus;
      }
      else if(currentUser.UserType == 3){
        this.menus = Benificiarymenus;
      }
    }

}
