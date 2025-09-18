import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IGenericResponse } from '../../Shared/Models/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

   baseURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  
Login(form: any) {
  return this.http.post(this.baseURL + 'Authentication/Login', form, {
    withCredentials: true
  });
}

Register(form: any): Observable<any> {
  return this.http.post(this.baseURL+'User/Register', form);
}
  SendResetPassword(email: string) {
    return this.http.get(
      this.baseURL + `User/SendResetPassword?email=${email}`
    );
  }


    logout(){
    return this.http.get(this.baseURL + 'Authentication/Logout' , { withCredentials: true });
   
  }
  ChangePassword(form: any)
{

  return this.http.post<IGenericResponse<string>>(this.baseURL+ 'User/ChangePassword', form,{ withCredentials: true })
}


  isUserAuthenticated() {
  return this.http.get(this.baseURL + "user/IsAuthenticated", {
    withCredentials: true,
    observe: 'response'  
  }).pipe(
    map(response => {
      return response.status === 200; 
    }),
  
  );

}

refreshToken(oldRefreshToken: string) {
  return this.http.post<any>(
    this.baseURL + 'Authentication/RefreshToken',
    oldRefreshToken, 
    { withCredentials: true }
  );
}



}
