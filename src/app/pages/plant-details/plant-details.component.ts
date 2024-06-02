import { Component } from '@angular/core';

import { GraphqlPlantService } from '../../services/graphql/graphql-plant.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { Subscription } from 'rxjs';
import { Plant } from '../../models/plant/Plant';

@Component({
  selector: 'app-plant-details',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './plant-details.component.html',
  styleUrl: './plant-details.component.css'
})
export class PlantDetailsComponent {
  constructor(
    private storageService: StorageService,
    private graphqlPlantService: GraphqlPlantService,
    private route: ActivatedRoute,
  ) { }
  token:string
  plantDetails= new Plant();
  ngAfterViewInit(): void {
    this.getPlant();

  }
  private graphqlSubscription: Subscription;
  
  private getPlant(){
    this.token = this.storageService.getSession("token");
    const plantId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.graphqlSubscription = this.graphqlPlantService.getIDPlant(this.token, plantId)
      .subscribe(({ data, loading }) => {
        
        this.plantDetails=JSON.parse(JSON.stringify(data)).plant;
        
        console.log(JSON.stringify(this.plantDetails));
        console.log('Data:', data);
        console.log('Loading:', loading);
      }, error => {
        
        console.error('Error:', error);
      });
  }
}

