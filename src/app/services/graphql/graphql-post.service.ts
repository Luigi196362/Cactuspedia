import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { Plant } from '../../models/plant/Plant';


const POST_QUERY = gql`
  query Posts  {
    posts {
        id
        postUser{username}
        postUser{profileImage}
        postUser{isAdmin}
        postUser{isPremium}
        postText
        postImage
        createdAt
      }
  }
`;
const POST_MUTATION = gql`
   mutation (
    $postText:String
    $postImage:String
  ) {
    createPost(postText:$postText, postImage:$postImage) {
        id
        postUser{username}
        postText
        postImage
        createdAt
      }
  }
`;

const DELETE_POST = gql`
mutation (
  $postId:Int!
) {
  deletePost(postId:$postId) {
      id
    }
}
`;

@Injectable({
  providedIn: 'root'
})
export class GraphqlPostService {

  constructor(private apollo: Apollo) { }

  getPosts(mytoken: string) {

    return this.apollo.query({
      query: POST_QUERY,
      variables: {

      },
      context: {

        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });

  }

  createPost(mytoken: string,postText:String, postImage:String) {

    return this.apollo.mutate({
      mutation: POST_MUTATION,
      variables: {
        postText:postText,
        postImage: postImage,
      },
      context: {
        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });
  }

  deletePost(mytoken: string, postId: number) {

    return this.apollo.mutate({
      mutation: DELETE_POST,
      variables: {
        postId: postId
      },
      context: {
        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });
  }


}