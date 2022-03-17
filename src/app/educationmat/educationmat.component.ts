
import { Component, OnInit ,ViewChild} from '@angular/core'; 
import { MatSidenav } from '@angular/material/sidenav'; 
import { BreakpointObserver } from '@angular/cdk/layout'; 
import { delay } from 'rxjs/operators'; 
import { Router } from '@angular/router'; 
import { AuthServiceService } from '../auth-service.service'; 
 
import { HttpClient } from '@angular/common/http'; 
 
@Component({ 
  selector: 'app-educationmat', 
  templateUrl: './educationmat.component.html', 
  styleUrls: ['./educationmat.component.scss'] 
}) 
export class EducationmatComponent implements OnInit { 
  userData: any; 
  profileData: any=[]; 
  @ViewChild(MatSidenav) 
  sidenav!: MatSidenav; 
   
   
 
    constructor(private authService: AuthServiceService,public router: Router,private observer: BreakpointObserver,private httpService: HttpClient) {  
   
    } 
  ngOnInit (): void{ 
    this.getAllProfile(); 
  this.getUser(); 
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
   getAllProfile(){ 
    this.authService.getProfile().subscribe(res=>{ 
      this.profileData = res[0]; }); 
   } 
   getUser(){ 
    this.authService.getDetails().subscribe(res=>{ 
      this.userData = res; 
    }) 
    } 
      
} 
