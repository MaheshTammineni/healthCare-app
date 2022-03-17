
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { AuthServiceService } from '../auth-service.service'; 
import {MatSnackBar} from '@angular/material/snack-bar'; 
import { HttpResponse } from '@angular/common/http'; 
import { MatOptionSelectionChange } from '@angular/material/core'; 
import {MatDialog} from '@angular/material/dialog'; 
import { EmptyError } from 'rxjs'; 
import { Component,  OnInit,EventEmitter, Input, Output } from '@angular/core'; 
 
@Component({ 
  selector: 'app-loginnew', 
  templateUrl: './loginnew.component.html', 
  styleUrls: ['./loginnew.component.css'] 
}) 
 
export class LoginnewComponent implements OnInit { 
 
  showMe: boolean = false; 
  count: boolean = false; 
  registerForm!: FormGroup; 
  password!: FormGroup; 
  cpassword!: FormGroup; 
  loginForm!: FormGroup; 
  message!: string; 
  email: any; 
  passwordType : string='password'; 
  x: string='value'; 
  serverError: boolean = true; 
    submitted = false; 
    submitted1 = false; 
    constructor(public dialog: MatDialog,public snackbar: MatSnackBar, private formBuilder: FormBuilder,public router: Router,private authService: AuthServiceService) {} 
 
      
    ngOnInit() { 
        this.loginForm = this.formBuilder.group({ 
           
            email: ['', [Validators.required, Validators.email]], 
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]], 
             
        }); 
        this.registerForm = this.formBuilder.group({ 
          name: ['', Validators.required], 
          age: ['', Validators.required], 
          gender: ['', Validators.required], 
          cpassword: ['', Validators.required], 
          mobile: ['', Validators.required], 
          email: ['', [Validators.required, Validators.email]], 
           password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(10), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]], 
         }); 
    } 
    get f()  
    {  
      return this.registerForm.controls;  
    } 
    get f1()  
    {  
      return this.loginForm.controls; 
    } 
 
    onSubmit2(loginForm:FormGroup){ 
      this.submitted=true; 
        console.log(this.loginForm.value); 
          if(this.loginForm.valid){ 
            this.authService.login(this.loginForm.value).subscribe(res =>{ 
              this.serverError==false; 
                this.snackbar.open('Logged in Successfully', 'Dismiss', { duration: 3000 }); 
                  this.router.navigate(['/welcome']); 
                console.log(res.msg); 
                  return res.status(200).send({ 
                  msg: 'Logged in!...............', 
                  }); 
            }, err=>{ 
              this.snackbar.open('Email or password is incorrect!!', 'Dismiss', { duration: 3000 });   
                 this.message = "Email or password is incorrect!!"; 
            } 
 
            ); 
            
          } 
 
          if(this.loginForm.value.email === '' && this.loginForm.value.password === ''){ 
            this.snackbar.open('Please Fill Email&Password!!', 'Dismiss', { duration: 3000 }); 
          } 
          if(this.loginForm.value.email === '' && this.loginForm.value.password != ''){ 
            this.snackbar.open('Please Fill Email!!', 'Dismiss', { duration: 3000 }); 
          } 
          if(this.loginForm.value.password === '' && this.loginForm.value.email != ''){ 
            this.snackbar.open('Please Fill Password!!', 'Dismiss', { duration: 3000 }); 
          } 
 
         
} 
 
   onregister1() { 
    this.submitted1=true; 
     if(this.registerForm.valid){ 
        this.authService.register(this.registerForm.value).subscribe(res =>{ 
          this.snackbar.open('Registered Successfully', 'Dismiss', { duration: 3000 }); 
          this.router.navigate(['/loginnew']); 
           
        }); 
      } 
      else { 
        alert("Please fill all required fields"); 
          //this.serverError = true; 
       this.snackbar.open('Enter details in correct format!!', 'Dismiss', { duration: 3000 }); 
       
      } 
      if(this.registerForm.value.password != this.registerForm.value.cpassword){ 
        alert("Password not Matched"); 
      } 
  } 
 
  topclose1(){ 
    window.location.reload(); 
  } 
 
  toggle(){ 
 
    this.showMe =! this.showMe 
    if ( this. passwordType='password') 
       { 
        this. passwordType = 'text'; 
      } else { 
        this. passwordType ='password'; 
      } 
      var x:any =document.getElementById("myInput"); 
      if(x.innerHTML === "Show Password"){ 
        x.innerHTML = "Hide Password"; 
      } else { 
        x.innerHTML = "Show Password"; 
      } 
  } 
 
  @Output() loggedIn = new EventEmitter<User>(); 
  @Input() enabled = true; 
 
  login(email:any, password:any) { 
    console.log(`Login ${email} ${password}`); 
    if (email && password) { 
      console.log(`Emitting`); 
      this.loggedIn.emit(new User(email, password)); 
    } 
  } 
} 
 
export function add(a:number, b:number) { 
  return a+b; 
} 
 
export class User { 
  constructor(public email: string, public password: string) { 
  } 
} 
 
