import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { Plant } from '../../models/plant/Plant';



const PLANTS_ID_QUERY = gql`
  query Plants($id:Int!)  {
    
    plant (id:$id){
        id
        plantName
        plantType
        plantOrigin
        plantDescription
        plantImage
      }
  }
`;

const PLANTS_QUERY = gql`
  query Plants (
    $id:Int
    $name:String
    $type:String
    $origin:String
    $description:String
  ) {
    plants (id:$id,plantName:$name,plantType:$type,plantOrigin:$origin,plantDescription:$description) {
        id
        plantName
        plantType
        plantOrigin
        plantDescription
        plantImage
      }
  }
`;
const PLANT_MUTATION = gql`
   mutation (
    $name:String!
    $type:String!
    $origin:String!
    $description:String!
    $image:String!
  ) {
    createPlant(plantName:$name, plantType:$type, plantOrigin:$origin, plantDescription:$description, plantImage:$image) {
        id
        plantName
        plantType
        plantOrigin
        plantDescription
        plantImage
      }
  }
`;

const DELETE_PLANT = gql`
mutation (
  $plantId:Int!
) {
  deletePlant(plantId:$plantId) {
      id
    }
}
`;





@Injectable({
  providedIn: 'root'
})
export class GraphqlPlantService {

  constructor(private apollo: Apollo) { }


  getPlants(mytoken: string,id:number,plantDetails:Plant) {

    return this.apollo.query({
      query: PLANTS_QUERY,
      variables: {
        id:id,
        name: plantDetails.plantName , 
        type: plantDetails.plantType  ,
        origin: plantDetails.plantOrigin ,
        description: plantDetails.plantDescription ,
      },
      context: {

        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });

  }
  getIDPlant(mytoken: string, id: number) {

    return this.apollo.query({
      query: PLANTS_ID_QUERY,
      variables: {
        id: id
      },
      context: {

        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });

  }



  createPlant(mytoken: string, plantDetails: Plant) {

    return this.apollo.mutate({
      mutation: PLANT_MUTATION,
      variables: {
        name: plantDetails.plantName,
        type: plantDetails.plantType,
        origin: plantDetails.plantOrigin,
        description: plantDetails.plantDescription,
        image: plantDetails.plantImage
      },
      context: {
        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });
  }

  deletePlant(mytoken: string, plantId: number) {

    return this.apollo.mutate({
      mutation: DELETE_PLANT,
      variables: {
        plantId: plantId
      },
      context: {
        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });
  }


}