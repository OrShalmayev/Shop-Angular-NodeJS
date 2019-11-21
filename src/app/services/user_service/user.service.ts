import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storeUserUrl:string = 'http://localhost:4201/api/register';

  constructor(private http:HttpClient) { }
  //post
  public storeUser(body:User):Observable<any>{
    return this.http.post<User>(this.storeUserUrl, body);
  }
  // get
  public isEmailExists(email:string):Observable<any>{
    return this.http.get<User>(`${this.storeUserUrl}/${email}`);
  }
}
