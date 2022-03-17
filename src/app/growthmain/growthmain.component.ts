

import { Component, OnInit, ViewChild } from '@angular/core'; 
import { MatSidenav } from '@angular/material/sidenav'; 
import { BreakpointObserver } from '@angular/cdk/layout'; 
import { delay } from 'rxjs/operators'; 
import { GrowthModel } from './growthmain.model'; 
import { AuthServiceService } from '../auth-service.service'; 
import { Router } from '@angular/router'; 
import { NgxPaginationModule } from 'ngx-pagination'; 
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
//import { body } from 'express-validator'; 
import { style } from '@angular/animations'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 
 
@Component({ 
  selector: 'app-growthmain', 
  templateUrl: './growthmain.component.html', 
  styleUrls: ['./growthmain.component.scss'] 
}) 
export class GrowthmainComponent implements OnInit { 
  [x: string]: any; 
   
  @ViewChild(MatSidenav) 
   sidenav!: MatSidenav; 
  formValue!: FormGroup; 
  growthModelObj: GrowthModel = new GrowthModel(); 
  growthData!: any; 
  showAdd!: boolean; 
  showUpdate!: boolean; 
  userData! : any; 
  p: any; 
  id: any = 'Height'; 

config: any;
  collection = { count: 60, data: [] };

 
  

  pageChanged(event: any){
    this.config.currentPage = event;
  }

  constructor(public snackbar: MatSnackBar, private formBuilder: FormBuilder, public router: Router,private authService: AuthServiceService, private observer: BreakpointObserver, private httpService: HttpClient) { 

  } 
  ngOnInit(): void { 
    
    var y: any = document.getElementById("defaultOpen"); 
    y.click(); 
 
    this.formValue = this.formBuilder.group({ 
      datewithtime: [''], 
      height: [''], 
      weight: [''], 
      wdiff: [''], 
      hdiff: [''], 
    }) 
    this.getAllGrowth(); 
    this.getUser(); 
  } 
 
  postGrowth(){ 
    var today: any = new Date(); 
    this.growthModelObj.datewithtime = today.toLocaleString(); 
     
    var value: any = []; 
    console.log(this.growthData); 
    for (let i = 0; i < this.growthData.length; i++) { 
      value.push(this.growthData[i].height); 
    } 
    this.growthModelObj.hdiff = (this.formValue.value.height - value[0]); 
    
    var value1: any = []; 
    console.log(this.growthData); 
    for (let i = 0; i < this.growthData.length; i++) { 
      value1.push(this.growthData[i].weight); 
    } 
    this.growthModelObj.wdiff = (this.formValue.value.weight - value1[0]); 
    this.growthModelObj.height = this.formValue.value.height; 
    this.growthModelObj.weight = this.formValue.value.weight; 
 
    ///weight difference end         
    /*this.commonService.postGrow(this.growthModelObj).subscribe(res => { 
    console.log(res); 
    this.snackbar.open('Data Saved', 'Dismiss', { duration: 3000 }); 
    let ref = document.getElementById("cancel") 
    ref?.click(); 
    this.getAllGrowth(); 
     
    }, 
    err=>{ 
    alert("Something went wrong") 
    });*/ 
    this.authService.postGrow(this.growthModelObj).subscribe( res =>{ 
       console.log(res); 
       this.snackbar.open("Data Saved Successfully", "Okay"); 
       let ref = document.getElementById('cancel'); 
        ref?.click(); 
        this.formValue.reset(); 
        this.getAllGrowth(); 
      }, 
       err => { 
         alert("Something went wrong"); 
       } 
 
      ); 
      //window.location.reload(); 
      let ref = document.getElementById('cancel'); 
      ref?.click(); 
      this.getAllGrowth(); 
      this.snackbar.open("Data Saved Successfully", "Okay"); 
 
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
     
    this.formValue.reset(); 
    this.showAdd = true; 
    this.displayStyle = "block"; 
 
    this.showUpdate = false; 
  } 
   
  getAllGrowth() { 
    this.authService.getGrowth().subscribe(res => { 
      this.growthData = res.reverse(); 
    }) 
  } 
  
   getUser(){ 
    this.authService.getDetails().subscribe(res=>{ 
      this.userData = res; 
    }) 
    } 
  deletDetailsGrowth(row: any) { 
    this.authService.deleteGrowth(row.id).subscribe(res => { 
      
 
      }) 
      this.snackbar.open("Deleted one data  Successfully", "Okay"); 
        this.getAllGrowth(); 
    //location.reload(); 
  } 
 
  changeTabTo(ids: any) { 
    this.id = ids; 
  } 
   
   
  /*openPage(grow:any)  { 
  var i, tabcontent, tablinks1,tablinks; 
   
  tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>; 
  for (i = 0; i < tabcontent.length; i++) { 
  tabcontent[i].style.display = "none"; 
  } 
  tablinks = document.getElementsByClassName("tablink") as HTMLCollectionOf<HTMLElement>; 
  for (i = 0; i < tablinks.length; i++) { 
  //tablinks[i].style.borderWidth = "25px"; 
  } 
   
  tablinks1 = document.getElementsByClassName("tablink1") as HTMLCollectionOf<HTMLElement>; 
  for (i = 0; i < tablinks1.length; i++) { 
  //tablinks1[i].style.borderWidth = "25px"; 
  } 
   
  var e:any = document.getElementById(grow); 
  e.style.display = "block";    
   
  } */ 
 
  logout() { 
    this.router.navigate(['/login']); 
  } 
  dash() { 
    this.router.navigate(['/dashboard']); 
  } 
  growc() { 
    this.router.navigate(['/growth']); 
 
  } 
  arrow() { 
    this.router.navigate(['/growthdetails']); 
  } 
 
} 
function grow(grow: any): any { 
  throw new Error('Function not implemented.'); 
} 


