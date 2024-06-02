import { Component } from '@angular/core';
import { GraphqlPlantService } from '../../services/graphql/graphql-plant.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { Plant } from '../../models/plant/Plant';
import { FormsModule } from '@angular/forms';
import { ApolloModule } from 'apollo-angular';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-create-plant',
  standalone: true,
  imports: [RouterLink,FormsModule,ApolloModule],
  templateUrl: './create-plant.component.html',
  styleUrl: './create-plant.component.css'
})
export class CreatePlantComponent {
  
  constructor(
    private storageService: StorageService,
    private graphqlPlantService: GraphqlPlantService,
    private router: Router
  ) { }
  token: string = "";
  loading: boolean;
  plantDetails= new Plant ()  ;
  name: String;
  type: String;
  origin: String;
  description: String;
  image: String;
  
  

  private graphqlSubscription: Subscription;

  createPlant() {
    this.plantDetails.plantName=this.name
    this.plantDetails.plantType=this.type
    this.plantDetails.plantOrigin=this.origin
    this.plantDetails.plantDescription=this.description
    this.plantDetails.plantImage=this.image
    this.token = this.storageService.getSession("token");
    this.graphqlSubscription = this.graphqlPlantService.createPlant(this.token, this.plantDetails)
      .subscribe(({ data, loading }) => {
        
        console.log('Data:', data);
        console.log('Loading:', loading);
        this.router.navigate(['/wiki']);
      }, error => {
        
        console.error('Error:', error);
      });
  }

}