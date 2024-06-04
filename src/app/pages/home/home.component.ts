import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DualSidebarsComponent } from '../../components/dual-sidebars/dual-sidebars.component';
import { PostComponent } from '../../components/post/post.component';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,DualSidebarsComponent,PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
