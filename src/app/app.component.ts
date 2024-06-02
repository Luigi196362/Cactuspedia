import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private router: Router,
    private storageService: StorageService) {

  }
  title = 'Cactuspedia';
  isLoggedIn = false;
  
  ngOnInit(): void {
  
    //alert("comprobacion")
    this.getisLoggedIn();
  }

  ngAfterViewInit(): void {
  
    //alert("comprobacion")
    this.getisLoggedIn();
  }

  private getisLoggedIn() {
    //alert(this.storageService.getSession("token"))
    if (this.storageService.getSession("token") == null) {
      
      this.isLoggedIn=false;
      //alert(this.isLoggedIn)

    }else{

      this.isLoggedIn=true;
      //alert(this.isLoggedIn)
    }
  }

  handleSession():void{
    if (this.isLoggedIn){
      this.storageService.sessionDeleteAll()
      this.isLoggedIn=false
      window.location.reload();
    }else{
      this.router.navigate(['/login']);
    }
  }
}

