import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { Router, RouterLink } from '@angular/router';
import { GraphqlProductService } from '../../services/graphql/graphql-product.service'
import { Product } from '../../models/product/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  constructor(
    private storageService: StorageService,
    private graphqlProductService: GraphqlProductService,
    private router: Router,
  ) { }
  arrProducts = [];
  productDetails = new Product;

  id: number;
  name: String;
  price: number;
  stock: number;
  description: String;
  image: String;

  loading: boolean;
  token: string = "";

  private graphqlProductSubscription: Subscription;

  ngAfterViewInit(): void {
    this.getProducts();

  }

  navigate(id: number) {
    this.router.navigate(['/product-details', id]);
  }
  onInputChange() {
    this.getProducts();
  }


  private getProducts() {
    this.token = this.storageService.getSession("token");
    this.productDetails.productName = this.name;
    this.productDetails.productPrice= this.price;
    this.productDetails.productStock = this.stock;
    this.productDetails.productDescription = this.description;
    this.graphqlProductSubscription = this.graphqlProductService.getProducts(this.token, this.id,this.productDetails)
      .subscribe(({ data, loading }) => {
        this.loading;
        this.arrProducts = JSON.parse(JSON.stringify(data)).products;

        console.log(JSON.stringify(this.arrProducts));
        console.log('Data:', data);
        console.log('Loading:', loading);
      });
  }

  confirmDelete(id: number) {
    const confirmation = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (confirmation) {
      this.deleteProduct(id);
    }
  }

  deleteProduct(deleteProduct: number) {
    this.token = this.storageService.getSession("token");

    this.graphqlProductSubscription = this.graphqlProductService.deleteProduct(this.token, deleteProduct)
      .subscribe(({ data, loading }) => {

        console.log('Data:', data);
        console.log('Loading:', loading);
        window.location.reload();
      }, error => {

        console.error('Error:', error);
      });
  }

}
