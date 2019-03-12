import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from 'app/common.service';
import { 
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule
       } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
    {path: '', component: LoginComponent},
  ];
@NgModule({
    imports: [
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,        
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    bootstrap: [LoginComponent],
    declarations: [   
        LoginComponent,
    ],
    exports: [
        RouterModule
    ],
    providers: [
        {provide: 'CommonService', useClass: CommonService},
    ]
})
export class LoginModule {
}
