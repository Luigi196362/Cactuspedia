import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dual-sidebars',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dual-sidebars.component.html',
  styleUrl: './dual-sidebars.component.css'
})
export class DualSidebarsComponent {
  constructor(private user: UserService, private storageService: StorageService, private router: Router) { }
  private graphqlSubscription: Subscription;

  token: string;
  Premium: boolean;


  ngOnInit(): void {
    this.token = this.storageService.getSession("token");
    if (this.token) {
      this.getPremium();
    } else {
      this.router.navigate(['/login']);
    }
  }

  navigate_wiki() {

      if (this.Premium) {
        this.router.navigate(['/wiki']);
      }else{
        this.router.navigate(['/subscription-page']);
      }
  }

  navigate_ia() {

    if (this.Premium) {
      this.router.navigate(['/ia-chat']);
    }else{
      this.router.navigate(['/subscription-page']);
    }
}


  getPremium() {


    console.log("premium")

    this.graphqlSubscription = this.user.getPremium(this.token)
      .subscribe(({ data, loading }) => {
        this.Premium = JSON.parse(JSON.stringify(data)).isPremium;
        console.log(this.Premium)
      });
  }
}
