import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant/Plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  plants_url: string = '/assets/data/plants.json';

  constructor(private http: HttpClient) { }

  getPlants(): Observable<Plant> {

    return this.http.get<Plant>(this.plants_url);

  }
}
