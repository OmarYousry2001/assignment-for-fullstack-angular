import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment.development';
import { FileValidators } from '../../../Shared/validators/filevalidators';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './add-update.html',
  styleUrl: './add-update.scss'
})
export class AddUpdate implements OnInit {
  productId: string | null = null;
  formGroup!:FormGroup
  isUpdate:boolean=false;
  imgPreviewUrl: string = '';
  maxNumber :number = Number.MAX_SAFE_INTEGER; 

  urlImages:string = environment.urlImages

  constructor(
    private _activeRoute: ActivatedRoute,
    private _route: Router,
    private _location: Location,
    private _productService:ProductService,
    private _fb: FormBuilder,
    private _toaService: ToastrService
  ){}
  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe((params) =>{
      var id  = params.get('id');
      if(id)
      {
        this._productService.getById(id).subscribe({
          next:(response)=>{
          this.isUpdate=true;
            this.productId = response.data.id;
            
            this.formGroup.patchValue({
               ...response.data
               });

                  if (response.data.imagePath) {
            this.imgPreviewUrl = `${this.urlImages}${response.data.imagePath}`;
          
          }

            
          },
          error:(er)=>{
          this._toaService.error("Failed to load product", "Error");
          }
        })

      }
    })
this.formValidation();

  }

  formValidation()
  {
    this.formGroup=this._fb.group({
      category:['' ,[Validators.required,Validators.minLength(2) , Validators.maxLength(50)]],
      productCode:['' ,[Validators.required,Validators.minLength(2) , Validators.maxLength(20)]],
      name:['' ,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      price:['' ,[Validators.required,Validators.min(1),Validators.max(this.maxNumber)]],
      minimumQuantity:['' ,[Validators.required,Validators.min(1),Validators.max(this.maxNumber)]],
      discountRate:['' ,[Validators.required  ,Validators.min(0),Validators.max(100)]],
      image:[null , [FileValidators.maxFileSize(5) , FileValidators.allowedExtensions(['.jpg', '.jpeg', '.png', '.webp'])]],
    })

  } 

// Getters 
get _category() {
  return this.formGroup.get('category');
}

get _productCode() {
  return this.formGroup.get('productCode');
}

get _name() {
  return this.formGroup.get('name');
}

get _price() {
  return this.formGroup.get('price');
}

get _minimumQuantity() {
  return this.formGroup.get('minimumQuantity');
}

get _discountRate() {
  return this.formGroup.get('discountRate');
}

get _image() {
  return this.formGroup.get('image');
}


onFileSelected(event: any, controlName: string) {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    this.formGroup.patchValue({ [controlName]: file });

    const reader = new FileReader();

    if (file.type.startsWith('image')) {
      reader.onload = () => {
        if (controlName === 'image') {
          this.imgPreviewUrl = reader.result as string;
        } 
      };
      reader.readAsDataURL(file);
    }

       this.formGroup.patchValue({ image: file });
  }
}



 

    goBack() {
    this._location.back();
  }



onSubmit() {




  if(this.formGroup.valid) {
    //  console.log('FormGroup values:', this.formGroup.value); 
    const formData = new FormData();
    formData.append('category', this.formGroup.get('category')?.value);
    formData.append('productCode', this.formGroup.get('productCode')?.value);
    formData.append('name', this.formGroup.get('name')?.value);
    formData.append('price', this.formGroup.get('price')?.value);
    formData.append('minimumQuantity', this.formGroup.get('minimumQuantity')?.value);
    formData.append('discountRate', this.formGroup.get('discountRate')?.value);



  const img = this.formGroup.get('image')?.value;
    if (img) formData.append('image', img);
 

if (this.isUpdate && this.productId) {
      formData.append('Id', this.productId);
        this._productService.update(formData).subscribe({
      next: () => {
         this._toaService.success("product updated successfully", 'success')
         this._route.navigate(['/admin/product'])
      } ,
      error: (er) => this._toaService.error(er.error.message , 'Failed')
    });
    }
    else{
      this._productService.create(formData).subscribe({
      next: () =>{
     this._toaService.success("product created successfully", 'success')
    this._route.navigate(['/admin/product'])
      } ,
      error: () => this._toaService.error("Failed to created product" , 'Failed')

    }
  
  )}
}


}


}
