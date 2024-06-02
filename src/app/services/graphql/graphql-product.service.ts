import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { Product } from '../../models/product/Product';


const PRODUCT_ID_QUERY = gql`
  query Product($id:Int!)  {
    
    product (id:$id){
        id
        productName
        productPrice
        productStock
        productDescription
        productImage
      }
  }
`;

const PRODUCTS_QUERY = gql`
  query Products (
    $id:Int
    $name:String
    $price:Int
    $stock:Int
    $description:String
  ) {
    products (id:$id, productName:$name,  productPrice:$price,  productStock:$stock,  productDescription:$description) {
      id
      productName
      productPrice
      productStock
      productDescription
      productImage
      }
  }
`;
const PRODUCT_MUTATION = gql`
   mutation (
    $name:String!
    $price:Int!
    $stock:Int!
    $description:String!
    $image:String!
  ) {
    createProduct(productName:$name,  productPrice:$price,  productStock:$stock,  productDescription:$description,  productImage:$image) {
      id
      productName
      productPrice
      productStock
      productDescription
      productImage
      }
  }
`;

const DELETE_PPRODUCT = gql`
mutation (
  $productId:Int!
) {
  deleteProduct(productId:$productId) {
      id
    }
}
`;





@Injectable({
  providedIn: 'root'
})
export class GraphqlProductService {

  constructor(private apollo: Apollo) { }


  getProducts(mytoken: string,id:number,productDetails:Product) {

    return this.apollo.query({
      query: PRODUCTS_QUERY,
      variables: {
        id:id,
        name: productDetails.productName , 
        price: productDetails.productPrice  ,
        stock: productDetails.productStock,
        description: productDetails.productDescription ,
      },
      context: {

        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });

  }
  getIDProduct(mytoken: string, id: number) {

    return this.apollo.query({
      query: PRODUCT_ID_QUERY,
      variables: {
        id: id
      },
      context: {

        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });

  }



  createProduct(mytoken: string, productDetails: Product) {

    return this.apollo.mutate({
      mutation: PRODUCT_MUTATION,
      variables: {
        name: productDetails.productName,
        price: productDetails.productPrice,
        stock: productDetails.productStock,
        description: productDetails.productDescription,
        image: productDetails.productImage
      },
      context: {
        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });
  }

  deleteProduct(mytoken: string, productId: number) {

    return this.apollo.mutate({
      mutation: DELETE_PPRODUCT,
      variables: {
        productId: productId
      },
      context: {
        headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
      },
    });
  }


}