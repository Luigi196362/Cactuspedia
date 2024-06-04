import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  isLoggedIn :boolean;
  
  
    constructor(private authService: AuthService,private router: Router) {}
  
    ngOnInit(): void {
      this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      });
    }
    handleSession(){
      if (this.isLoggedIn){
        this.authService.logout()
        
      }else{
        this.router.navigate(['/login']);
      }
      
    }

    navigate(){
      if(this.isLoggedIn){
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/']);
      }
    }
}
