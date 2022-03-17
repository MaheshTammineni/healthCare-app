 
import { Component, OnInit ,ViewChild} from '@angular/core'; 
import { BreakpointObserver } from '@angular/cdk/layout'; 
import { MatSidenav } from '@angular/material/sidenav'; 
import { delay } from 'rxjs/operators'; 
//import { Chart} from 'chart.js'; 
import { HttpClient } from '@angular/common/http'; 
import { HttpErrorResponse } from '@angular/common/http'; 
import { MatTableDataSource} from '@angular/material/table'; 
import { MatPaginator } from '@angular/material/paginator'; 
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { ProfileModel } from './dashboardmaterial.model'; 
import { LabModel } from './dashboardmaterial.model'; 
//import { ProfileserviceService } from 'src/app/profileservice.service'; 
import { AuthServiceService } from '../auth-service.service'; 
/*export interface Tile { 
  color: string; 
  cols: number; 
  rows: number; 
  text: string; 
} 
 
interface doctor{ 
  id:Number; 
  name:String; 
  gender:String; 
  email:String; 
  mobile:Number; 
  qualification: String; 
  experience: String; 
} 
 
const ELEMENT_DATA: doctor[] = [ 
  { id: 1, name: 'Vamsi', gender: 'male', email: 'vamsi12@gmail.com',mobile: 9807686543 ,qualification:'M.B.B.S', experience: '4years'}, 
  { id: 2, name: 'mahesh', gender: 'male', email: 'mahesh412@gmail.com' ,mobile:9654821331,qualification:'M.Ch',experience: '2years'}, 
  { id: 3, name: 'swapna', gender: 'female', email: 'swapna12@gmail.com',mobile: 7013425322 ,qualification:'CONSULTANT UROLOGIST',experience: '6years'}, 
  { id: 4, name: 'manoj', gender: 'male', email: 'manoj12@gmail.com',mobile: 8765463214,qualification:'M.S,M.Ch', experience: '8years'}, 
];*/ 
 
@Component({ 
  selector: 'app-dashboardmaterial', 
  templateUrl: './dashboardmaterial.component.html', 
  styleUrls: ['./dashboardmaterial.component.scss'] 
}) 
export class DashboardmaterialComponent implements OnInit { 
  panelOpenState = false; 
  isOpen = false; 
  isOpen1 = false; 
  formValue!: FormGroup; 
  formValue1!: FormGroup; 
  profileModelObj : ProfileModel = new ProfileModel(); 
  profileData! : any; 
  labModelObj : LabModel = new LabModel(); 
  labData! : any; 
  //growthData! : any; 
  userData! : any; 
  growthData: any=[]; 
  id: any = 'Profile'; 
 
  tabLoadTimes: Date[] = []; 
  showUpdate: boolean = false; 
  showAdd: boolean = false; 
 
  getTimeLoaded(index: number) { 
    if (!this.tabLoadTimes[index]) { 
      this.tabLoadTimes[index] = new Date(); 
    } 
    return this.tabLoadTimes[index]; 
  } 
 
   
  @ViewChild(MatSidenav) 
 
  sidenav!: MatSidenav; 
  //displayedColumns: string[] = ['Id','name','gender','email','mobile','qualification','experience']; 
   
  //dataSource = new MatTableDataSource<doctor>(ELEMENT_DATA); 
  nextElementSibling: any; 
  classList: any; 
 
    constructor(private http:HttpClient,private authService: AuthServiceService,private formBuilder: FormBuilder,private observer: BreakpointObserver,private httpService: HttpClient) {  
   
    } 
     
    // pieChartOptions = { 
     // responsive: true 
  //} 
   
    
  /*pieChartColor:any = [ 
      { 
          backgroundColor: ['rgba(30, 169, 224, 0.8)', 
          'rgba(255,165,0,0.9)', 
          'rgba(139, 136, 136, 0.9)', 
          'rgba(255, 161, 181, 0.9)', 
          'rgba(255, 102, 0, 0.9)' 
          ] 
      } 
  ] 
  pieChartLabels:any =  ['outPatient','inPatient','emergency']; 
   
  ChartData:any = [ 
      {  
          data: [], 
      } 
  ];*/ 
  type = 'bar'; 
  options = { 
     responsive: true, 
     maintainAspectRatio: true, 
     scales: { 
         yAxes : [{ 
             ticks : { 
                 max : 200,    
                 min : 20 
             }, 
             scaleLabel: { 
               display: true, 
               labelString: '--->Height(CMs) and Weight(kGs)', 
             } 
         }], 
         xAxes : [{ 
          scaleLabel: { 
            display: true, 
            labelString: '--->Date and Time', 
          } 
      }] 
     } 
 }; 
 data:any; 
 barchart:any; 
 
  ngOnInit () { 
    //this.authService.getGrowth().subscribe(data => { 
     // this.barchart = data; 
       
    
    this.http.get("http://localhost:7001/api/growthmain").subscribe(data => { 
      this.barchart = data; 
      console.log(this.barchart); 
       
      console.log(this.barchart.data.length); 
      var hvalue: any = []; 
      var dvalue: any = []; 
      var wvalue: any = []; 
      console.log(this.growthData); 
      for (let i = 0; i <this.barchart.data.length; i++) { 
        dvalue.push(this.barchart.data[i].datewithtime); 
        hvalue.push(this.barchart.data[i].height); 
        wvalue.push(this.barchart.data[i].weight); 
      } 
      console.log(dvalue); 
      this.data = { 
        labels:  
          dvalue, 
          
         
        datasets: [{ 
        label: "Height", 
        data: hvalue, 
        backgroundColor: "#f38b4a", 
        },{ 
            label: "Weight", 
            data: wvalue, 
             backgroundColor: "#6970d5", 
        }] 
    };  
    
});  
 
    this.formValue1 = this.formBuilder.group({ 
      bp: [''], 
      hrate: [''], 
      bglucose: [''], 
      gtest: [''], 
      igf: [''], 
      tsh: [''], 
    }) 
    this.formValue = this.formBuilder.group({ 
      fname : [''], 
      lname : [''], 
      email : [''], 
      mobile : [''], 
      age : [''], 
      gender: [''], 
      pname: [''], 
      rname: [''], 
      address: [''], 
      insurance: [''], 
    }) 
 
    this.getAllProfile(); 
    this.getAllLab(); 
    this.getUser(); 
    this. getAllGrowth(); 
    /*this.httpService.get('./assets/graphtotaldata.json', {responseType: 'json'}).subscribe( 
         data => { 
            this.ChartData = data as any [];    
        }, 
        (err: HttpErrorResponse) => { 
            console.log (err.message); 
        } 
    );*/ 
  }  
  postLabDetails(){ 
    this.labModelObj.bp = this.formValue1.value.bp; 
    this.labModelObj.hrate = this.formValue1.value.hrate; 
    this.labModelObj.bglucose = this.formValue1.value.bglucose; 
    this.labModelObj.gtest = this.formValue1.value.gtest; 
    this.labModelObj.igf = this.formValue1.value.igf; 
    this.labModelObj.tsh = this.formValue1.value.tsh; 
    this.authService.postLab(this.labModelObj).subscribe( res =>{ 
      console.log(res); 
      //this.snackbar.open("Data Saved Successfully", "Okay"); 
      alert("data saved"); 
      
     }, 
      err => { 
        alert("Something went wrong"); 
      } 
 
     ); 
     let ref = document.getElementById('cancel'); 
     ref?.click(); 
     this.formValue.reset(); 
     this.getAllLab();  
  } 
 
  postProfileDetails(){ 
    this.profileModelObj.fname = this.formValue.value.fname; 
    this.profileModelObj.lname = this.formValue.value.lname; 
    this.profileModelObj.age = this.formValue.value.age; 
    this.profileModelObj.pname = this.formValue.value.pname; 
    this.profileModelObj.rname = this.formValue.value.rname; 
    this.profileModelObj.gender = this.formValue.value.gender; 
    this.profileModelObj.mobile = this.formValue.value.mobile; 
    this.profileModelObj.email = this.formValue.value.email; 
    this.profileModelObj.address = this.formValue.value.address; 
    this.profileModelObj.insurance = this.formValue.value.insurance; 
    this.authService.postProfile(this.profileModelObj).subscribe( res =>{ 
      console.log(res); 
      //this.snackbar.open("Data Saved Successfully", "Okay"); 
      alert("data saved"); 
      
     }, 
      err => { 
        alert("Something went wrong"); 
      } 
 
     ); 
     let ref = document.getElementById('cancel'); 
     ref?.click(); 
     this.formValue.reset(); 
     this.getAllProfile();  
  } 
  
  updateLabDetails(){ 
    this.labModelObj.bp = this.formValue1.value.bp; 
    this.labModelObj.hrate = this.formValue1.value.hrate; 
    this.labModelObj.bglucose = this.formValue1.value.bglucose; 
    this.labModelObj.gtest = this.formValue1.value.gtest; 
    this.labModelObj.igf = this.formValue1.value.igf; 
    this.labModelObj.tsh = this.formValue1.value.tsh; 
    this.authService.updateLab(this.labModelObj,this.labModelObj.id) 
    .subscribe(res=>{ 
      
    }, 
    err=>{ 
      alert("Update Successfull"); 
      let reference= document.getElementById('cancel'); 
 
      reference?.click(); 
 
      this.formValue1.reset(); 
 
      this.getAllLab(); 
    }) 
 
  } 
  updateProfileDetails(){ 
    this.profileModelObj.fname = this.formValue.value.fname; 
    this.profileModelObj.lname = this.formValue.value.lname; 
    this.profileModelObj.email = this.formValue.value.email; 
    this.profileModelObj.mobile = this.formValue.value.mobile; 
    this.profileModelObj.age = this.formValue.value.age; 
    this.profileModelObj.gender= this.formValue.value.gender; 
    this.profileModelObj.pname= this.formValue.value.pname; 
    this.profileModelObj.rname= this.formValue.value.rname; 
    this.profileModelObj.address= this.formValue.value.address; 
    this.profileModelObj.insurance= this.formValue.value.insurance; 
    this.authService.updateProfile(this.profileModelObj,this.profileModelObj.id) 
    .subscribe(res=>{ 
      
    }, 
    err=>{ 
      alert("Update Successfull"); 
      let reference= document.getElementById('cancel'); 
 
      reference?.click(); 
 
      this.formValue.reset(); 
 
      this.getAllProfile(); 
    }) 
 
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
      displayStyle1 = "none"; 
      closePopup1() { 
        this.displayStyle1 = "none"; 
      } 
      openPopup1(): void { 
         
        this.formValue1.reset(); 
        this.showAdd = true; 
        this.displayStyle1 = "block"; 
     
        this.showUpdate = false; 
      } 
      closePopup() { 
        this.displayStyle = "none"; 
      } 
      openPopup(): void { 
         
        this.formValue.reset(); 
        this.showAdd = true; 
        this.displayStyle = "block"; 
     
        this.showUpdate = false; 
      } 
      changeTabTo(ids: any) { 
        this.id = ids; 
      } 
      onEditLab(row: any){ 
         
        this.showAdd = false; 
      this.displayStyle1 = "block"; 
   
      this.showUpdate = true; 
        this.labModelObj.id = row.id; 
     
        this.formValue1.controls['bp'].setValue(row.bp); 
     
        this.formValue1.controls['hrate'].setValue(row.hrate); 
 
        this.formValue1.controls['bglucose'].setValue(row.bglucose); 
        this.formValue1.controls['gtest'].setValue(row.gtest); 
        this.formValue1.controls['igf'].setValue(row.igf); 
        this.formValue1.controls['tsh'].setValue(row.tsh); 
 
        } 
        onEdit(row: any){ 
         
          this.showAdd = false; 
        this.displayStyle = "block"; 
     
        this.showUpdate = true; 
          this.profileModelObj.id = row.id; 
       
          this.formValue.controls['fname'].setValue(row.fname); 
       
          this.formValue.controls['lname'].setValue(row.lname); 
 
          this.formValue.controls['pname'].setValue(row.pname); 
          this.formValue.controls['rname'].setValue(row.rname); 
          this.formValue.controls['address'].setValue(row.address); 
          this.formValue.controls['insurance'].setValue(row.insurance); 
 
          this.formValue.controls['email'].setValue(row.email); 
          this.formValue.controls['mobile'].setValue(row.mobile); 
 
          this.formValue.controls['age'].setValue(row.age); 
          this.formValue.controls['gender'].setValue(row.gender); 
 
          } 
  getAllProfile(){ 
  this.authService.getProfile().subscribe(res=>{ 
    this.profileData = res; 
  }) 
  } 
 
 
  getAllGrowth() { 
    this.authService.getGrowth().subscribe(res => { 
      this.growthData = res.reverse()[0]; 
      console.log(this.growthData); 
    }) 
  } 
  getAllLab(){ 
    this.authService.getLab().subscribe(res=>{ 
      this.labData = res; 
    }) 
    } 
  getUser(){ 
      this.authService.getDetails().subscribe(res=>{ 
        this.userData = res; 
      }) 
      } 
  } 
 
