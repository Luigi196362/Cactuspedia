import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Token } from '../models/user/Token';
import { Credential } from '../models/user/Credential';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService:UserService,
    private router:Router
  ){}
  
  email:string ="luis@gmail.com";
  password:string ="123";
  myLogin= new Token();

  callLogin(){
    //alert("Login ...")
    var myCredential = new Credential();
    myCredential.email= this.email;
    myCredential.password = this.password;


    this.myLogin=this.userService.postLogin(
      myCredential
    );
    if (this.myLogin.token!="")
      this.router.navigate(['/home']);

    console.log(this.myLogin);
  }
}
