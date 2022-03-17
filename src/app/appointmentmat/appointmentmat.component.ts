
import { Component, OnInit,ViewChild } from '@angular/core'; 
import { MatSidenav } from '@angular/material/sidenav'; 
import { BreakpointObserver } from '@angular/cdk/layout'; 
import { delay } from 'rxjs/operators'; 
//import { AppointserviceService } from 'src/app/appointservice.service'; 
import { AuthServiceService } from '../auth-service.service'; 
import { Router } from '@angular/router'; 
import { AppointModel } from './appointmentmat.model'; 
import { SortListPipe } from './sort-list.pipe'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 
 
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
 
import { HttpClient } from '@angular/common/http'; 
import { zip } from 'rxjs'; 
 
@Component({ 
  selector: 'app-appointmentmat', 
  templateUrl: './appointmentmat.component.html', 
  styleUrls: ['./appointmentmat.component.scss'] 
}) 
export class AppointmentmatComponent implements OnInit { 
  profileData: any=[]; 
  @ViewChild(MatSidenav) 
  sidenav!: MatSidenav; 
  formValue!: FormGroup; 
  appointModelObj : AppointModel = new AppointModel(); 
  appointData! : any; 
  showAdd!: boolean; 
  showUpdate!: boolean; 
  userData! : any; 
   
 
    constructor(public snackbar: MatSnackBar,private formBuilder: FormBuilder,public router: Router,private authService: AuthServiceService,private observer: BreakpointObserver,private httpService: HttpClient) {  
   
    } 
  ngOnInit (): void{ 
    this.getAllProfile(); 
    this.getUser(); 
    this.formValue = this.formBuilder.group({ 
      appointdate : [''], 
      location : [''], 
      doctor : [''], 
      timeslot : [''], 
    }) 
   this.getAllAppoint(); 
  } 
  
 
  displayStyle = "none"; 
  closePopup() { 
    this.displayStyle = "none"; 
  } 
  openPopup(): void { 
     
    this.formValue.reset(); 
    this.showAdd = true; 
    this.displayStyle = "block"; 
 
    this.showUpdate = false; 
  } 
 
    ngAfterViewInit() { 
      this.observer 
        .observe(['(max-width: 800px)']) 
        .pipe(delay(1)) 
        .subscribe((res) => { 
          if (res.matches) { 
            this.sidenav.mode = 'over'; 
            this.sidenav.close(); 
          } else { 
            this.sidenav.mode = 'side'; 
            this.sidenav.open(); 
          } 
        }); 
    } 
 
    onEdit(row: any){ 
     
      this.showAdd = false; 
    this.displayStyle = "block"; 
 
    this.showUpdate = true; 
      this.appointModelObj.id = row.id; 
   
      this.formValue.controls['appointdate'].setValue(row.appointdate); 
   
      this.formValue.controls['location'].setValue(row.location); 
   
      this.formValue.controls['doctor'].setValue(row.doctor); 
   
      this.formValue.controls['timeslot '].setValue(row.timeslot ); 
   
      } 
   
   
   
      updateAppointDetails(){ 
      this.appointModelObj.appointdate = this.formValue.value.appointdate; 
    this.appointModelObj.location = this.formValue.value.location; 
    this.appointModelObj.doctor = this.formValue.value.doctor; 
    this.appointModelObj.timeslot = this.formValue.value.timeslot; 
    this.authService.updateAppoint(this.appointModelObj, this.appointModelObj.id).subscribe(res=>{ 
       
      }) 
      alert("Update Successfull"); 
      let reference= document.getElementById('cancel'); 
      reference?.click(); 
      this.getAllAppoint(); 
   
    } 
    deleteAppoint(row:any){ 
       
      this.authService.deletetotalappoint(row.id) 
   
      .subscribe(res =>{ 
   
      }) 
      this.snackbar.open("Deleted one data  Successfully", "Okay"); 
      this.getAllAppoint(); 
    } 
    getAllAppoint(){ 
      this.authService.getAppoint().subscribe(res=>{ 
            this.appointData = res.reverse(); 
      }) 
    } 
 
    getUser(){ 
      this.authService.getDetails().subscribe(res=>{ 
        this.userData = res; 
      }) 
      } 
    getAllProfile(){ 
      this.authService.getProfile().subscribe(res=>{ 
        this.profileData = res[0]; }); 
     } 
     
} 
 
