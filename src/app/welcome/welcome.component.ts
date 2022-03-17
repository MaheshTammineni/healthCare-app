import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { AuthServiceService } from '../auth-service.service'; 
@Component({ 
  selector: 'app-welcome', 
  templateUrl: './welcome.component.html', 
  styleUrls: ['./welcome.component.scss'] 
}) 
 
export class WelcomeComponent implements OnInit { 
userData! : any; 
  interval:any; 
   
  startTime() { 
    this.interval = setTimeout(() => { 
      this.router.navigate(['/dashboardmaterial']); 
 
    }, 3000); 
  } 
  constructor(public authService : AuthServiceService, public router: Router) { 
 
  } 
  ngOnInit(): void { 
    this.getUser(); 
    this.function1(); 
    var fname:any = document.getElementById("fname"); 
    var lname:any = document.getElementById("lname"); 
       
      var output:any = document.getElementById("check"); 
      var output1:any = document.getElementById("check1"); 
     
   
  const x = localStorage.getItem("firstname"); 
  output.innerHTML = x; 
   
  const y = localStorage.getItem("lastname"); 
  output1.innerHTML = y; 
    
  } 
  getUser(){ 
    this.authService.getDetails().subscribe(res=>{ 
      this.userData = res; 
    }) 
    } 
  function1(){ 
    setTimeout (() => { 
    this.router.navigate(['/dashboardmaterial']); 
      }, 4000);} 
} 
