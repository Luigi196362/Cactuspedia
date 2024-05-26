import { Component } from '@angular/core';
import { FakePlantService } from '../services/fake-plant.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plant-details',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './plant-details.component.html',
  styleUrl: './plant-details.component.css'
})
export class PlantDetailsComponent {
  constructor(private fakePlantService: FakePlantService,
  ) { }
  arrFakePlants = [];

  ngAfterViewInit(): void {
    this.getFakePlants();

  }

  private getFakePlants() {
    this.fakePlantService.getFake_Plants().subscribe((fakePlants: any) => {
      this.arrFakePlants = fakePlants;
      console.log(this.arrFakePlants);
    });

  }

}
