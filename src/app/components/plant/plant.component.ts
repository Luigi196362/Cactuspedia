import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { GraphqlPlantService } from '../../services/graphql/graphql-plant.service';
import { Subscription } from 'rxjs';
import { Plant } from '../../models/plant/Plant';

@Component({
  selector: 'app-plant',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.css'
})
export class PlantComponent {
  constructor(
    private storageService: StorageService,
    private graphqlPlantService: GraphqlPlantService,
    private router: Router,
  ) { }
  arrPlants = [];
  plantDetails = new Plant;

  id: number;
  name: String;
  type: String;
  origin: String;
  description: String;
  image: String;

  loading: boolean;
  token: string = "";

  private graphqlSubscription: Subscription;

  ngAfterViewInit(): void {
    this.getPlants();

  }

  navigate(id: number) {
    this.router.navigate(['/plant-details', id]);
  }
  onInputChange() {
    this.getPlants();
  }


  private getPlants() {
    this.token = this.storageService.getSession("token");
    this.plantDetails.plantName = this.name;
    this.plantDetails.plantType = this.type;
    this.plantDetails.plantOrigin = this.origin;
    this.plantDetails.plantDescription = this.description;
    this.plantDetails.plantImage = this.image;
    this.graphqlSubscription = this.graphqlPlantService.getPlants(this.token, this.id,this.plantDetails)
      .subscribe(({ data, loading }) => {
        this.loading;
        this.arrPlants = JSON.parse(JSON.stringify(data)).plants;

        console.log(JSON.stringify(this.arrPlants));
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

    this.graphqlSubscription = this.graphqlPlantService.deletePlant(this.token, plantid)
      .subscribe(({ data, loading }) => {

        console.log('Data:', data);
        console.log('Loading:', loading);
        window.location.reload();
      }, error => {

        console.error('Error:', error);
      });
  }


}
