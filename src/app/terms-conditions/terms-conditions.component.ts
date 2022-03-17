import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
 
@Component({ 
  selector: 'app-terms-conditions', 
  templateUrl: './terms-conditions.component.html', 
  styleUrls: ['./terms-conditions.component.scss'] 
}) 
export class TermsConditionsComponent implements OnInit { 
 
  constructor(public router: Router) { 
 
  } 
 
  ngOnInit(): void { 
  } 
  declice(){ 
         
    this.router.navigate(['/loginnew']); 
 
  } 
  agree(){ 
     
    this.router.navigate(['/welcome']); 
 
} 
} 
