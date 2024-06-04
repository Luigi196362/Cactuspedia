import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { GraphqlPostService } from '../../services/graphql/graphql-post.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  constructor(
    private storageService: StorageService,
    private graphqlPostService: GraphqlPostService,
    private router: Router) { }

    token:string;
    text:string;
    image:string;

    private graphqlSubscription: Subscription;
  createPost() {

    this.token = this.storageService.getSession("token");
    this.graphqlSubscription = this.graphqlPostService.createPost(this.token,this.text,this.image)
      .subscribe(({ data, loading }) => {

        console.log('Data:', data);
        console.log('Loading:', loading);
        this.router.navigate(['/home']);
      }, error => {

        console.error('Error:', error);
      });
  }
}
