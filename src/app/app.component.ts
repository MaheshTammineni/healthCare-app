 
import { Component} from '@angular/core'; 
import { HostListener } from '@angular/core'; 
import { timer } from 'rxjs'; 
import { map, takeUntil } from 'rxjs/operators'; 
import { Subject } from 'rxjs';   
import { __values } from 'tslib'; 
//import { Subject } from 'rxjs/Subject'; 
 
@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.scss'] 
}) 
export class AppComponent { 
  title = 'medcare-app'; 
//destroy = new Subject(); 
 
destroy = new Subject(); 
showDialog = false; 
timer!: number; 
dialog = 'stay logged in'; 
notice = 'session expired'; 
showNotice = false; 
rxjsTimer = timer(1000, 1000); 
 ngOnInit(){ 
   this.rxjsTimer.pipe(takeUntil(this.destroy)).subscribe(val => { 
     this.timer = val; 
     if(this.timer === 10){ 
       this.showDialog = true; 
     } 
     if(this.timer>=20){ 
       this.destroy.next(__values); 
       this.destroy.complete(); 
       this.showNotice = true; 
     } 
   }) 
 } 
  @HostListener('window:beforeunload', ['$event']) 
    // beforeunloadHandler(event:any){ 
     //return false;   
//} 
     
  onWindowClose(event: any) : void { 
   event.preventDefault(); 
   event.returnValue = false; 
 } 
} 
 
