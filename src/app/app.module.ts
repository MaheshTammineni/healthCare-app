
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
//import { MaterialModule } from './material.module'; 
import { MatSliderModule } from '@angular/material/slider';
//import {MatTableModule} from '@angular/material/table'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
//import { ChartModule } from 'ng2-charts'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ChartModule } from 'angular2-chartjs';
import { HttpClientModule } from '@angular/common/http';

import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardmaterialComponent } from './dashboardmaterial/dashboardmaterial.component';
import { GrowthmainComponent } from './growthmain/growthmain.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { EducationmatComponent } from './educationmat/educationmat.component';
import { AppointmentmatComponent } from './appointmentmat/appointmentmat.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatChipsModule } from '@angular/material/chips';

import { MatSelectModule } from '@angular/material/select';
//import {MatInputModule} from '@angular/material/input'; 
import { SortListPipe } from './appointmentmat/sort-list.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginnewComponent } from './loginnew/loginnew.component';
import { AddnewappointComponent } from './addnewappoint/addnewappoint.component';

@NgModule({
  declarations: [
    AppComponent,
    SortListPipe,
    AddnewappointComponent,
    LoginnewComponent,
    GrowthmainComponent,
    AppointmentmatComponent,
    DashboardmaterialComponent,
    EducationmatComponent
  ],
  imports: [
    HttpClientModule,
    FlexLayoutModule,
    MatChipsModule,
    MatTabsModule,
    ChartModule,
    MatMomentDateModule,
    MatStepperModule,
    MatDatepickerModule,
    MatSnackBarModule,
    OverlayModule,
    RouterModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    // MatInputModule, 
    MatDialogModule,
    MatPaginatorModule,
    BrowserModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatExpansionModule,
    //MatTableModule,
    MatFormFieldModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    //MaterialModule, 
    MatSliderModule,
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
