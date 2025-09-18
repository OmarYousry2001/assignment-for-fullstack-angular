import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Shared/Models/product';
import { ProductService } from '../../admin-layout/ProductComponent/product-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [RouterLink , CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class Product implements OnInit {
products : IProduct[] = [];

constructor(
  private _productService: ProductService,
  private _routerlink: RouterLink

){}

ngOnInit(): void {
  throw new Error('Method not implemented.');
}

getALlProducts()
{
  this._productService.getAll().subscribe({
    next:(response)=>{
      this.products = response.data;
    },
    error:(err)=>{
      console.log(err);
    }
  })
}



}
