import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductComponent } from '../../components/product/product.component'
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink,ProductComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

}
