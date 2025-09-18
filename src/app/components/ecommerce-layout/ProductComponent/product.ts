import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Shared/Models/product';
import { ProductService } from '../../admin-layout/ProductComponent/product-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-product',
    imports: [CommonModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class Product implements OnInit {
products : IProduct[] = [];
 urlImages = environment.urlImages;

constructor(
  private _productService: ProductService,
  

){}

ngOnInit(): void {
this.getALlProducts();
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
