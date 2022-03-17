
import { Injectable } from '@angular/core'; 
import { HttpClient} from '@angular/common/http'; 
import { map } from 'rxjs/operators'; 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class ProfileserviceService { 
 
  constructor(private http: HttpClient) { } 
  
  deleteProfile(id:number){ 
 
    return this.http.delete<any>("http://localhost:3000/myprofile/"+id) 
 
    .pipe(map((res:any)=>{ 
      return res; 
 
    })) 
 
  } 
} 
