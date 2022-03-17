
import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class AuthServiceService { 
  constructor(private http:HttpClient) { } 
   
  login(data:any): Observable<any>{ 
      return this.http.post('http://localhost:7001/api/loginnew',data); 
  } 
 
  register(data:any): Observable<any> { 
     return this.http.post('http://localhost:7001/api/register',data); 
  } 
  
  postProfile(data:any){ 
    return this.http.post<any>("http://localhost:7001/api/dashboardmaterial",data) 
    .pipe(map((res:any)=>{ 
      return res; 
    })) 
  } 
  getProfile(){ 
    return this.http.get<any>("http://localhost:7001/api/dashboardmaterial") 
    .pipe(map((res:any)=>{ 
      return res.data; 
    })) 
  } 
 
 updateProfile(data:any, id: number){ 
 
    return this.http.put<any>("http://localhost:7001/api/dashboardmaterial/"+id, data) 
 
      .pipe(map((res:any)=>{ 
 
        return res.data; 
 
      })) 
 
  } 
   
  getDetails(){ 
    return this.http.get<any>("http://localhost:7001/api/getuserdetails") 
    .pipe(map((res:any)=>{ 
      return res.data; 
    })) 
  } 
   
  postLab(data:any){ 
    return this.http.post<any>("http://localhost:7001/api/dashboardmaterial1",data) 
    .pipe(map((res:any)=>{ 
      return res; 
    })) 
  } 
  getLab(){ 
    return this.http.get<any>("http://localhost:7001/api/dashboardmaterial1") 
    .pipe(map((res:any)=>{ 
      return res.data; 
    })) 
  } 
 
 updateLab(data:any, id: number){ 
 
    return this.http.put<any>("http://localhost:7001/api/dashboardmaterial1/"+id, data) 
 
      .pipe(map((res:any)=>{ 
 
        return res.data; 
 
      })) 
 
  } 
postGrow(data:any){ 
  return this.http.post<any>("http://localhost:7001/api/growthmain",data) 
  .pipe(map((res:any)=>{ 
    return res; 
  })) 
} 
 
getGrowth(){ 
  return this.http.get<any>("http://localhost:7001/api/growthmain") 
  .pipe(map((res:any)=>{ 
    return res.data; 
  })) 
} 
deleteGrowth(id:number){ 
  return this.http.delete<any>("http://localhost:7001/api/growthmain/"+id) 
  .pipe(map((res:any)=>{ 
    return res; 
  })) 
} 
 
 
postAppoint(data:any){ 
  return this.http.post<any>("http://localhost:7001/api/addnewappoint", data) 
  .pipe(map((res:any)=>{ 
    return res; 
  })) 
} 
getAppoint(){ 
  return this.http.get<any>("http://localhost:7001/api/appointmentmat") 
  .pipe(map((res:any)=>{ 
    return res.data; 
  })) 
} 
 
updateAppoint(data:any, id:number){ 
  return this.http.put<any>("http://localhost:7001/api/appointmentmat/"+id, data) 
    .pipe(map((res:any)=>{ 
      return res; 
    })) 
 
} 
deletetotalappoint(id:number){ 
  return this.http.delete<any>("http://localhost:7001/api/appointmentmat/"+id) 
  .pipe(map((res:any)=>{ 
    return res; 
  })) 
} 
} 
 
