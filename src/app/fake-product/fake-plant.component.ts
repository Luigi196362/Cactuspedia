import { Component } from '@angular/core';
import { FakePlantService } from '../services/fake-plant.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { GraphqlLinkService } from '../services/graphql.link.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fake-plant',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './fake-plant.component.html',
  styleUrl: './fake-plant.component.css'
})
export class FakePlantComponent {
  constructor(
    private storageService: StorageService,
    private fakePlantService: FakePlantService,
    private graphqlLinkService: GraphqlLinkService,
  ) { }
  arrPlants = [];
  loading: boolean;
  token: string = "";

  private querySubscription: Subscription;

  ngAfterViewInit(): void {
    this.getFakePlants();

  }

  private getFakePlants() {
    this.token = this.storageService.getSession("token");

    //alert("token " + this.token);
    this.querySubscription=this.graphqlLinkService.getPlants(this.token).
    subscribe(({data,loading}) => {
      this.loading;
      this.arrPlants=JSON.parse(JSON.stringify(data)).plants;
      
      console.log(JSON.stringify(this.arrPlants));
    });

  }
}
