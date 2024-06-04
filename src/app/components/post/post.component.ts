import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { GraphqlPostService } from '../../services/graphql/graphql-post.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ RouterLink,CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  
  constructor(private userSevice: UserService,
    private storageService: StorageService,
    private graphqlPostService: GraphqlPostService,
    private router: Router,) { }


    private graphqlSubscription: Subscription;

  token: string;
  loading: boolean;
  arrPost = [];
  Admin:boolean;

  ngOnInit(){
    this.getPosts()
    this.token = this.storageService.getSession("token");
    if (this.token) {
      this.getAdmin();
    } else {
      this.router.navigate(['/login']);
    }

  }
  private getPosts() {
    this.token = this.storageService.getSession("token");

    this.graphqlSubscription = this.graphqlPostService.getPosts(this.token)
      .subscribe(({ data, loading }) => {
        this.loading;
        this.arrPost = JSON.parse(JSON.stringify(data)).posts;

        this.arrPost.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        console.log(JSON.stringify(this.arrPost));
        console.log('Data:', data);
        console.log('Loading:', loading);
      });
  }

  getAdmin() {
    console.log("premium")

    this.graphqlSubscription = this.userSevice.getAdmin(this.token)
      .subscribe(({ data, loading }) => {
        this.Admin = JSON.parse(JSON.stringify(data)).isAdmin;
        console.log(this.Admin)
      });
  }


  confirmDelete(id: number) {
    const confirmation = window.confirm("¿Estás seguro de que quieres eliminar este post?");
    if (confirmation) {
      this.deletePost(id);
    }
  }

  deletePost(postid: number) {
    this.token = this.storageService.getSession("token");

    this.graphqlSubscription = this.graphqlPostService.deletePost(this.token, postid)
      .subscribe(({ data, loading }) => {

        console.log('Data:', data);
        console.log('Loading:', loading);
        window.location.reload();
      }, error => {

        console.error('Error:', error);
      });
  }
}
