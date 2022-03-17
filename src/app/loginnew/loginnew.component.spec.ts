//1ST METHOD 
/*import { ComponentFixture, TestBed, fakeAsync, waitForAsync } from '@angular/core/testing'; 
 
import { LoginnewComponent } from './loginnew.component'; 
import {add} from './loginnew.component'; 
//import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing'; 
import{ BrowserModule, By}from '@angular/platform-browser'; 
import { FormsModule } from '@angular/forms'; 
import { AuthServiceService } from '../auth-service.service'; 
 
import { HttpClientModule } from '@angular/common/http'; 
import { Router } from '@angular/router'; 
import { RouterTestingModule } from '@angular/router/testing'; 
//import { by } from 'protractor'; 
import { ReactiveFormsModule } from '@angular/forms'; 
describe('LoginnewComponent', () => { 
   
 
  let component: LoginnewComponent; 
  let fixture: ComponentFixture<LoginnewComponent>; 
  let el: HTMLElement; 
 
  beforeEach(waitForAsync(() => { 
    TestBed.configureTestingModule({ 
      declarations: [ LoginnewComponent ], 
      imports: [FormsModule, HttpClientModule, RouterTestingModule,ReactiveFormsModule], 
      providers: [AuthServiceService] 
    }) 
    .compileComponents(); 
  })); 
 
  beforeEach(() => { 
    fixture = TestBed.createComponent(LoginnewComponent); 
    component = fixture.componentInstance; 
    fixture.detectChanges(); 
  }); 
 
  it('should create', () => { 
    expect(component).toBeTruthy(); 
  }); 
 
  it('Should set submitted to true', waitForAsync(() => { 
     component.onSubmit(); 
     expect(component.onSubmit).toBeTruthy(); 
 
  })); 
 
  it('Should call the OnSubmit method', () =>{ fakeAsync(() =>{ 
    fixture.detectChanges(); 
    spyOn(component,'onSubmit'); 
    el=fixture.debugElement.query(By.css('Login')).nativeElement; 
    el.click(); 
    expect(component.onSubmit).toHaveBeenCalledTimes(0); 
  }) 
 
  }); 
 
  it('Form should be invalid', waitForAsync(()=> { 
    component.loginForm.controls['UserName'].setValue(''); 
    component.loginForm.controls['Password'].setValue(''); 
    expect(component.loginForm.valid).toBeFalsy(); 
  })); 
 
  it('Form should be valid', waitForAsync(()=> { 
    component.loginForm.controls['UserName'].setValue('tamminenimahesh1225@gmail.com'); 
    component.loginForm.controls['Password'].setValue('Mahi@24HCL'); 
    expect(component.loginForm.valid).toBeTruthy(); 
  })); 
}); */ 
 
// 2nd method 
/*import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing'; 
import { LoginnewComponent, User } from './loginnew.component'; 
import { Component, DebugElement } from "@angular/core"; 
import { By } from "@angular/platform-browser"; 
 
describe('LoginnewComponent', () => { 
 
    let component: LoginnewComponent; 
    let fixture: ComponentFixture<LoginnewComponent>; 
    let submitEl: DebugElement; 
    let loginEl: DebugElement; 
    let passwordEl: DebugElement; 
 
    beforeEach(() => { 
 
        // refine the test module by declaring the test component 
        TestBed.configureTestingModule({ 
            declarations: [LoginnewComponent] 
        }); 
 
        // create component and test fixture 
        fixture = TestBed.createComponent(LoginnewComponent); 
 
        // get test component from the fixture 
        component = fixture.componentInstance; 
 
        submitEl = fixture.debugElement.query(By.css('button')); 
        loginEl = fixture.debugElement.query(By.css('input[type=email]')); 
        passwordEl = fixture.debugElement.query(By.css('input[type=password]')); 
    }); 
 
    it('Setting enabled to false disabled the submit button', () => { 
        component.enabled = false; 
        fixture.detectChanges(); 
        expect(submitEl.nativeElement.disabled).toBeTruthy(); 
    }); 
 
    it('Setting enabled to true enables the submit button', () => { 
        component.enabled = true; 
        fixture.detectChanges(); 
        expect(submitEl.nativeElement.disabled).toBeFalsy(); 
    }); 
 
    it('Entering email and password emits loggedIn event', () => { 
        let user: User; 
 
        loginEl.nativeElement.value = "test@example.com"; 
        passwordEl.nativeElement.value = "123456"; 
 
          // Subscribe to the Observable and store the user in a local variable. 
          component.loggedIn.subscribe((value) => user = value); 
 
          // This sync emits the event and the subscribe callback gets executed above 
          submitEl.triggerEventHandler('click', null); 
   
          // Now we can check to make sure the emitted value is correct 
          //expect(user.email).toBe("test@example.com"); 
          //expect(user.password).toBe("123456"); 
       
    }); 
});   */ 
 
import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { ReactiveFormsModule, FormControl, AbstractControl, FormGroup} from '@angular/forms'; 
import { RouterTestingModule } from '@angular/router/testing'; 
import { By } from '@angular/platform-browser'; 
import { LoginnewComponent } from './loginnew.component'; 
 
describe('LoginnewComponent', () => { 
 
/*let fixture: ComponentFixture<LoginnewComponent>; 
let componentInstance: LoginnewComponent; 
 
  beforeEach(async () => { 
       await TestBed.configureTestingModule({ 
         imports: [ 
           RouterTestingModule, 
           ReactiveFormsModule 
         ], 
         declarations: [ 
           LoginnewComponent 
         ], 
       }).compileComponents(); 
     fixture = TestBed.createComponent(LoginnewComponent); 
     componentInstance = fixture.componentInstance; 
      }); 
      it('check clear validation', ()=> { 
       //fixture.detectChanges(); 
        
          const emailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#emailId'); 
          emailElement.value = ''; 
          emailElement.dispatchEvent(new Event('input')); 
 
          fixture.detectChanges(); 
          fixture.whenStable().then(  () => { 
            const errorElement: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#emailErrors'); 
            expect(errorElement).not.toBeNull(); 
            expect(errorElement.children.length).toEqual(1); 
            expect(errorElement.children[0].innerHTML).toEqual('Email is required'); 
 
             
          }) 
        
       
      }); */ 
 
 
      let component: LoginnewComponent; 
      let fixture: ComponentFixture<LoginnewComponent>; 
      beforeEach(async() => { 
        TestBed.configureTestingModule({ 
          imports: [ 
             
            ReactiveFormsModule 
          ], 
          declarations: [ 
            LoginnewComponent 
          ] 
        }) 
        .compileComponents(); 
        fixture = TestBed.createComponent(LoginnewComponent); 
        component = fixture.componentInstance; 
      }); 
 
       it('should create component', () => { 
         expect(component).toBeTruthy(); 
       }) 
       it('form invalid when empty', () => { 
        expect(component.loginForm.invalid).toBeTruthy(); 
      }) 
       
      it('[Email-Check]- should check users email address is invalid', ()=> { 
      let email = component.loginForm.controls['email']; 
       
      let b = email.setValue('test@gmail.com'); 
      expect(email.valid).toBeFalsy(); 
      expect(email.pristine).toBeTruthy(); 
      email.setValue('abc'); 
      if(typeof email === 'string'){ 
        expect(b).toBeTruthy(); 
 
      } 
     // expect(email.errors['required']).toBeTruthy(); 
               //expect(email).toBe("test@example.com"); 
      //expect(email.errors['email']).toBeTruthy(); 
      }) 
 
    }); 
