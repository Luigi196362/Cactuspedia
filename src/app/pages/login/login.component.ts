import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Credential } from '../../models/user/Credential';
import { ApolloModule} from 'apollo-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,ApolloModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor( private authService:AuthService
  ) 
  { } 

  username : String = "";
  password : String = "";
  myCredential = new Credential();

  callLogin() {

  
   this.myCredential.username = this.username;
   this.myCredential.password = this.password;

    this.authService.login(this.myCredential);
  }
}