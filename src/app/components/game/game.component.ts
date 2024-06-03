import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { GraphqlGameService } from '../../services/graphql/graphql-game.service'
import { Router, RouterLink } from '@angular/router';
import { Game } from '../../models/game/Game';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{

  constructor(
    private storageService: StorageService,
    private graphqlGameService: GraphqlGameService,
    private router: Router,
  ) { }
  arrGames = [];
  gameDetails = new Game;

  id: number;
  name: String;
  description: String;
  icon: String;
  image: String;
  admin:boolean=false;
  loading: boolean;
  token: string = "";

  private graphqlSubscription: Subscription;

  ngOnInit(): void {
    this.getGames();  
  }

  Admin(){
    if(this.admin){
      this.admin=false
    }else{
      this.admin=true
    }
  }

  navigate(id: number) {
    this.router.navigate(['/', id]);
  }
  onInputChange() {
    this.getGames();
  }


  private getGames() {
    this.token = this.storageService.getSession("token");
    console.log(this.token)
    this.gameDetails.gameName = this.name;
    this.gameDetails.gameDescription = this.description;
    this.gameDetails.gameIcon = this.icon;
    this.gameDetails.gameImage = this.image;
    
    this.graphqlSubscription = this.graphqlGameService.getGames(this.token, this.id, this.gameDetails)
      .subscribe(({ data, loading }) => {
        this.loading;
        this.arrGames = JSON.parse(JSON.stringify(data)).games;

        console.log(JSON.stringify(this.arrGames));
        console.log('Data:', data);
        console.log('Loading:', loading);
      });
  }

  confirmDelete(id: number) {
    const confirmation = window.confirm("¿Estás seguro de que quieres eliminar esta planta?");
    if (confirmation) {
      this.deletePlant(id);
    }
  }

  deletePlant(plantid: number) {
    this.token = this.storageService.getSession("token");

    this.graphqlSubscription = this.graphqlGameService.deleteGame(this.token, plantid)
      .subscribe(({ data, loading }) => {

        console.log('Data:', data);
        console.log('Loading:', loading);
        window.location.reload();
      }, error => {

        console.error('Error:', error);
      });
  }


}

