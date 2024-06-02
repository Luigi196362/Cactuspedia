import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { Game } from '../../models/game/Game';
import { FormsModule } from '@angular/forms';
import { ApolloModule } from 'apollo-angular';
import { Router, RouterLink } from '@angular/router';
import { GraphqlGameService } from '../../services/graphql/graphql-game.service';
@Component({
  selector: 'app-create-game',
  standalone: true,
  imports: [RouterLink,FormsModule,ApolloModule],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.css'
})
export class CreateGameComponent {


  constructor(
    private storageService: StorageService,
    private graphqlGameService: GraphqlGameService,
    private router: Router
  ) { }
  token: string = "";
  loading: boolean;
  gameDetails = new Game();
  name: String;
  description: String;
  icon: String;
  image: String;



  private graphqlSubscription: Subscription;

  createPlant() {
    this.gameDetails.gameName = this.name
    this.gameDetails.gameDescription = this.description
    this.gameDetails.gameIcon=this.icon
    this.gameDetails.gameImage = this.image
    this.token = this.storageService.getSession("token");
    this.graphqlSubscription = this.graphqlGameService.createGame(this.token, this.gameDetails)
      .subscribe(({ data, loading }) => {

        console.log('Data:', data);
        console.log('Loading:', loading);
        this.router.navigate(['/games']);
      }, error => {

        console.error('Error:', error);
      });
  }

}
