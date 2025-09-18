import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ProductService } from '../../admin-layout/ProductComponent/product-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../Shared/Models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails {
 urlImages = environment.urlImages;
  product!: IProduct;
 
  
  constructor(
     private _productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') 
    if(id){
    this._productService.getById(id).subscribe({
      next: (value) => {
        this.product = value.data;
      },
    });
    }

  }

  CalculateDiscount
(oldPrice: number, newPrice: number): number {
    return parseFloat(
      Math.round(((oldPrice - newPrice) / oldPrice) * 100).toFixed(1)
    );
  }

 
}
