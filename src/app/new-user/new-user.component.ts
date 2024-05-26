import { Component } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user/User';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  constructor( private userService: UserService,
    private router: Router
) 
{
} 

myPayloadUser = new User();
myNewUser = new User();

createUser() {
console.log(this.myPayloadUser);

this.myNewUser = this.userService.createUser(
    this.myPayloadUser
   );

console.log(this.myNewUser);

if (this.myNewUser.id != 0)
    this.router.navigate(['/login']);

} 

}
