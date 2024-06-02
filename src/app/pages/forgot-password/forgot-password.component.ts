import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {


  email : String = "";

  constructor( private userService: UserService,
               private router: Router)
  { 
  }
  resetPassword() {
    console.log(this.email);
    
    var myValidUser = this.userService.sendUrlResetPassword(
        this.email
       );

    if (myValidUser.id != 0)
        this.router.navigate(['/']);

     console.log(myValidUser);


  }
}
