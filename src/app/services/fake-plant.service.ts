import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../models/fake-plant/Plant';

@Injectable({
  providedIn: 'root'
})
export class FakePlantService {

  fake_plants_url: string = '/assets/data/plants.json';

  constructor(private http: HttpClient) { }

  getFake_Plants(): Observable<Plant> {

    return this.http.get<Plant>(this.fake_plants_url);

  }
}
