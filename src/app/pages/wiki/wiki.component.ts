import { Component } from '@angular/core';
import { PlantComponent } from "../../components/plant/plant.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-wiki',
    standalone: true,
    templateUrl: './wiki.component.html',
    styleUrl: './wiki.component.css',
    imports: [PlantComponent, PlantComponent,RouterLink]
})
export class WikiComponent {

}
