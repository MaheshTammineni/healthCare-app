
import { Component, Inject, OnInit,ViewChild } from '@angular/core'; 
import { MatSidenav } from '@angular/material/sidenav'; 
import { BreakpointObserver } from '@angular/cdk/layout'; 
import { delay } from 'rxjs/operators'; 
import { Router } from '@angular/router'; 
import { AuthServiceService } from '../auth-service.service'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { AppointModel } from './addnewappoint.model'; 
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { DatePipe } from '@angular/common'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
 
interface Payment { 
  value: string; 
  viewValue: string; 
} 
@Component({ 
  selector: 'app-addnewappoint', 
  templateUrl: './addnewappoint.component.html', 
  styleUrls: ['./addnewappoint.component.scss'], 
}) 
export class AddnewappointComponent implements OnInit { 
  profileData: any=[]; 
  location!: string; 
  department!: string; 
  doctor!: string; 
  id: any = 'Pediatrics'; 
   
 
 
  payments: Payment[] = [ 
    {value: 'Cash Mode', viewValue: 'Cash Mode'}, 
    {value: 'Cashless with insurance', viewValue: 'Cashless with insurance'}, 
  ]; 
  isLinear = false; 
  formValue!: FormGroup; 
  appointModelObj : AppointModel = new AppointModel(); 
  appointData! : any; 
  userData! : any; 
 
  selected: any = new Date(); 
 
   
  
  firstFormGroup!: FormGroup; 
  secondFormGroup!: FormGroup; 
  thirdFormGroup!: FormGroup; 
  fourFormGroup!: FormGroup; 
  fiveFormGroup!: FormGroup; 
  sixFormGroup!: FormGroup; 
  @ViewChild(MatSidenav) 
  sidenav!: MatSidenav; 
  showAdd!: boolean; 
 
    constructor(public dialog: MatDialog,public snackbar: MatSnackBar,private authService: AuthServiceService,private formBuilder: FormBuilder,public router: Router,private observer: BreakpointObserver) {  
   
    } 
  
  ngOnInit() { 
    this.getAllProfile(); 
    this.getUser(); 
    this.firstFormGroup = this.formBuilder.group({ 
      location: ['', Validators.required], 
    }); 
    this.secondFormGroup = this.formBuilder.group({ 
      department: ['', Validators.required], 
    }); 
    this.thirdFormGroup = this.formBuilder.group({ 
      doctor: ['', Validators.required], 
    }); 
    this.fourFormGroup = this.formBuilder.group({ 
      appointdate: ['', Validators.required], 
    }); 
    this.fiveFormGroup = this.formBuilder.group({ 
      timeslot: ['', Validators.required], 
    }); 
    this.sixFormGroup = this.formBuilder.group({ 
      payment: ['', Validators.required], 
    }); 
 
   
   this.getAllAppoint(); 
  } 
  
  postAppointDetails(){ 
    this.appointModelObj.appointdate = this.selected.toLocaleString().slice(0,15); 
    this.appointModelObj.location = this.firstFormGroup.value.location; 
    this.appointModelObj.doctor = this.thirdFormGroup.value.doctor; 
    //this.appointModelObj.timeslot = this.fiveFormGroup.value.timeslot; 
    this.appointModelObj.department = this.secondFormGroup.value.department; 
    this.appointModelObj.payment = this.sixFormGroup.value.payment; 
 
    this.authService.postAppoint(this.appointModelObj).subscribe(res=>{ 
      console.log(res); 
      let ref = document.getElementById("cancel"); 
      ref?.click(); 
     // this.formValue.reset(); 
     // location.reload(); 
     this.getAllAppoint(); 
    },err=>{ 
      alert("Something went wrong"); 
    }) 
     
    let ref = document.getElementById('cancel'); 
      ref?.click(); 
      this.getAllAppoint(); 
      this.snackbar.open("Appointment Booked Successfully", "Okay"); 
      this.router.navigate(['/appointmentmat']); 
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
 
    displayStyle = "none"; 
  closePopup() { 
    this.displayStyle = "none"; 
  } 
  openPopup(): void { 
     
    //this.formValue.reset(); 
    this.showAdd = true; 
    this.displayStyle = "block"; 
 
  } 
  changeTabTo(ids: any) { 
    this.id = ids; 
  } 
 
  getAllProfile(){ 
    this.authService.getProfile().subscribe(res=>{ 
      this.profileData = res[0]; }); 
   } 
   getUser(){ 
    this.authService.getDetails().subscribe(res=>{ 
      this.userData = res; 
    }) 
    } 
      getAllAppoint(){ 
        this.authService.getAppoint().subscribe(res=>{ 
              this.appointData = res.reverse()[0]; 
        }) 
      } 
      timeslot(slot:string){ 
        this.appointModelObj.timeslot = slot ; 
      } 
     
} 
