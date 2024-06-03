import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DualSidebarsComponent } from '../../components/dual-sidebars/dual-sidebars.component';
import { CommentComponent } from '../../components/comment/comment.component';

@Component({
  selector: 'app-publication-details',
  standalone: true,
  imports: [RouterLink,DualSidebarsComponent,CommentComponent],
  templateUrl: './publication-details.component.html',
  styleUrl: './publication-details.component.css'
})
export class PublicationDetailsComponent {

}
