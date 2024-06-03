import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DualSidebarsComponent } from '../../components/dual-sidebars/dual-sidebars.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,DualSidebarsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
