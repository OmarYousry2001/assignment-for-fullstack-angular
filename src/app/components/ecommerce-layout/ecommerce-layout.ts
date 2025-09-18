import { Component } from '@angular/core';
import { Header } from './headerComponent/header';
import { Footer } from './footerComponent/footer';
import { Home } from './homecomponent/home';
import { RouterOutlet } from '@angular/router';
import { Product } from './ProductComponent/product';


@Component({
  selector: 'app-ecommerce-layout',
  imports: [Header, Footer, Home, RouterOutlet , Product],
  templateUrl: './ecommerce-layout.html',
  styleUrl: './ecommerce-layout.scss'
})
export class EcommerceLayout {

}
