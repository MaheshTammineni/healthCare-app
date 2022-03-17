
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router'; 
import { LoginnewComponent } from './loginnew/loginnew.component'; 
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component'; 
import { WelcomeComponent } from './welcome/welcome.component'; 
import { DashboardmaterialComponent } from './dashboardmaterial/dashboardmaterial.component'; 

import { GrowthmainComponent } from './growthmain/growthmain.component'; 
import { EducationmatComponent } from './educationmat/educationmat.component'; 
import { AppointmentmatComponent } from './appointmentmat/appointmentmat.component'; 
import { AddnewappointComponent } from './addnewappoint/addnewappoint.component'; 
 
const routes: Routes = [ 
  {path:'',redirectTo:'loginnew',pathMatch:'full'}, 
  {path:'loginnew',component:LoginnewComponent ,pathMatch:'full'}, 
  {path: 'terms-conditions', component: TermsConditionsComponent }, 
  {path: 'welcome', component: WelcomeComponent }, 
  {path: 'dashboardmaterial', component: DashboardmaterialComponent}, 
  {path: 'addnewappoint', component: AddnewappointComponent}, 
  { 
    path: 'growthmain', 
    component : GrowthmainComponent  
  }, 
  { 
    path: 'growthmain', 
    component: GrowthmainComponent 
  },  
  { 
    path: 'educationmat', 
    component: EducationmatComponent 
  }, 
  { 
    path: 'appointmentmat', 
    component: AppointmentmatComponent 
  } 
]; 
 
@NgModule({ 
  declarations: [ ],  
  imports: [RouterModule.forRoot(routes)], 
  exports: [],
}) 
 
export class AppRoutingModule{ } 
