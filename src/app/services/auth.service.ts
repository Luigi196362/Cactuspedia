import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Credential } from '../models/user/Credential';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService,
    private storageService: StorageService,
    private router: Router) {
  }
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token : String=null;
  get isLoggedIn() {
    this.token= this.storageService.getSession("token");
    if (this.token==null){
      this.loggedIn.next(false);
    }else{
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  login(myCredential: Credential) {
    // Lógica para iniciar sesión

    this.userService.tokenAuth(myCredential)
      .subscribe(({ data }) => {
        console.log('user logged: ', JSON.stringify(data));
        this.storageService.setSession("user", myCredential.username);
        this.storageService.setSession("token", JSON.parse(JSON.stringify(data)).tokenAuth.token);
        
        
        this.router.navigate(['/home']);
      }, (error) => {
        console.log('there was an error sending the query', error);
        myCredential.username = "";
        myCredential.password = "";
        alert(error);
      });

    this.loggedIn.next(true);
  }

  logout() {
    // Lógica para cerrar sesión

    this.storageService.sessionDeleteAll()
    window.location.reload();

    this.loggedIn.next(false);
  }
}
