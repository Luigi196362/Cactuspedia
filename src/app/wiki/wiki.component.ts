import { Component } from '@angular/core';
import { FakePlantComponent } from "../fake-product/fake-plant.component";

@Component({
    selector: 'app-wiki',
    standalone: true,
    templateUrl: './wiki.component.html',
    styleUrl: './wiki.component.css',
    imports: [FakePlantComponent, FakePlantComponent]
})
export class WikiComponent {

}
