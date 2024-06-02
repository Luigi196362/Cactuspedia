import { Component } from '@angular/core';
import { Product } from '../../models/product/Product';
import { StorageService } from '../../services/storage.service';
import { GraphqlProductService } from '../../services/graphql/graphql-product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

  constructor(
    private storageService: StorageService,
    private graphqlProductService: GraphqlProductService,
    private router: Router
  ) { }
  token: string = "";
  loading: boolean;
  productDetails= new Product ()  ;
  name: String;
  price: number;
  stock: number;
  description: String;
  image: String;
  
  

  private graphqlSubscription: Subscription;

  createProduct() {
    this.productDetails.productName=this.name
    this.productDetails.productPrice=this.price
    this.productDetails.productStock=this.stock
    this.productDetails.productDescription=this.description
    this.productDetails.productImage=this.image
    this.token = this.storageService.getSession("token");
    this.graphqlSubscription = this.graphqlProductService.createProduct(this.token, this.productDetails)
      .subscribe(({ data, loading }) => {
        
        console.log('Data:', data);
        console.log('Loading:', loading);
        this.router.navigate(['/shop']);
      }, error => {
        
        console.error('Error:', error);
      });
  }

}
