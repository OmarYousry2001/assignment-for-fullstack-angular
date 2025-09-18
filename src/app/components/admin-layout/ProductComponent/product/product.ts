import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment.development';
import { ProductService } from '../product-service';
import { IProduct } from '../../../Shared/Models/product';

@Component({
  selector: 'app-project',
  imports: [RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class product implements OnInit {
  projects: IProduct[] = [];
  urlImages = environment.urlImages;
  constructor(
    private _ProductService: ProductService,
    private _toaService: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._ProductService.getAll().subscribe({
      next: (response) => {
        this.projects = response.data;
      },
      error: (err) => {
        console.log(err);
        this._toaService.error('Failed to load projects', 'Error');
      },
    });
  }

  deleteCategory(id: string) {
    this._ProductService.Delete(id).subscribe({
      next: (response) => {
        this.projects = this.projects.filter((c) => c.id !== id);
        this._toaService.success(response.message, 'Success');
      },
      error: (err) => {
        console.log(err);
        this._toaService.error('Failed to delete category', 'Error');
      },
    });
  }
}
