import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { GraphqlPlantService } from '../../services/graphql/graphql-plant.service';
import { Subscription } from 'rxjs';
import { Plant } from '../../models/plant/Plant';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-plant',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.css'
})
export class PlantComponent  implements OnInit{
  constructor(
    private userSevice: UserService,
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
  Admin:boolean;
  loading: boolean;
  token: string = "";

  private graphqlSubscription: Subscription;

  ngOnInit(): void {
    //alert(this.admin)
    this.getPlants();
    this.token = this.storageService.getSession("token");
    if (this.token) {
      this.getAdmin();
    } else {
      this.router.navigate(['/login']);
    }

  }


  getAdmin() {
    console.log("premium")

    this.graphqlSubscription = this.userSevice.getAdmin(this.token)
      .subscribe(({ data, loading }) => {
        this.Admin = JSON.parse(JSON.stringify(data)).isAdmin;
        console.log(this.Admin)
      });
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

  /*getAdmin(){
    this.token = this.storageService.getSession("token");
    
    console.log("admin")

    this.graphqlSubscription = this.user.getAdmin(this.token)
    .subscribe(({ data, loading }) => {
      console.log("admin")

    });
  }*/

}
