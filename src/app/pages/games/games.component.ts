import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameComponent } from '../../components/game/game.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [RouterLink,GameComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {

}
