import { Component } from '@angular/core';
import { FakePlantService } from '../services/fake-plant.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fake-plant',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './fake-plant.component.html',
  styleUrl: './fake-plant.component.css'
})
export class FakePlantComponent {
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
