import { Component } from '@angular/core';
import { PlantComponent } from "../../components/plant/plant.component";

@Component({
    selector: 'app-wiki',
    standalone: true,
    templateUrl: './wiki.component.html',
    styleUrl: './wiki.component.css',
    imports: [PlantComponent, PlantComponent]
})
export class WikiComponent {

}
