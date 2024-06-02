import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { Game } from '../../models/game/Game';



const GAMES_ID_QUERY = gql`
  query Games($id:Int!)  {
    
    game (id:$id){
        id
        gameName
        gameDescription
        gameIcon
        gameImage
      }
  }
`;

const GAMES_QUERY = gql`
  query Games (
    $id:Int
    $name:String
    $description:String
  ) {
    games (id:$id, gameName:$name, gameDescription:$description) {
        id
        gameName
        gameDescription
        gameIcon
        gameImage
      }
  }
`;
const GAME_MUTATION = gql`
   mutation (

    $name:String!
    $description:String!
    $icon:String!
    $image:String!
  ) {
    createGame(gameName:$name, gameDescription:$description, gameIcon:$icon, gameImage:$image) {
        id
        gameName
        gameDescription
        gameIcon
        gameImage
      }
  }
`;

const DELETE_GAME = gql`
mutation (
  $gameId:Int!
) {
  deleteGame(gameId:$gameId) {
      id
    }
}
`;





@Injectable({
  providedIn: 'root'
})
export class GraphqlGameService {

  constructor(private apollo: Apollo) { }


  getGames(mytoken: string,id:number,gameDetails:Game) {

    return this.apollo.query({
      query: GAMES_QUERY,
      variables: {
        id:id,
        name: gameDetails.gameName , 
        description: gameDetails.gameDescription ,
      },
      context: {

        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });

  }
  getIDGame(mytoken: string, id: number) {

    return this.apollo.query({
      query: GAMES_ID_QUERY,
      variables: {
        id: id
      },
      context: {

        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });

  }



  createGame(mytoken: string, gameDetails: Game) {

    return this.apollo.mutate({
      mutation: GAME_MUTATION,
      variables: {
        name: gameDetails.gameName,
        description: gameDetails.gameDescription,
        icon: gameDetails.gameIcon,
        image: gameDetails.gameImage
      },
      context: {
        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });
  }

  deleteGame(mytoken: string, gameId: number) {

    return this.apollo.mutate({
      mutation: DELETE_GAME,
      variables: {
        gameId: gameId
      },
      context: {
        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });
  }


}