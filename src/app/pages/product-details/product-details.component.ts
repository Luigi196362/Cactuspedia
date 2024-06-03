import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductComponent } from '../../components/product/product.component'
import { StorageService } from '../../services/storage.service';
import { GraphqlProductService } from '../../services/graphql/graphql-product.service';
import { Product } from '../../models/product/Product';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, ProductComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  constructor(
    private storageService: StorageService,
    private graphqlProductService: GraphqlProductService,
    private route: ActivatedRoute,
  ) { }
  token: string
  productDetails = new Product();
  ngAfterViewInit(): void {
    this.getProduct();

  }
  private graphqlSubscription: Subscription;

  private getProduct() {
    this.token = this.storageService.getSession("token");
    const productId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.graphqlSubscription = this.graphqlProductService.getIDProduct(productId)
      .subscribe(({ data, loading }) => {

        this.productDetails = JSON.parse(JSON.stringify(data)).product;

        console.log(JSON.stringify(this.productDetails));
        console.log('Data:', data);
        console.log('Loading:', loading);
      }, error => {

        console.error('Error:', error);
      });
  }
}
