import { Component } from '@angular/core';
import { Header } from './headerComponent/header';
import { Footer } from './footerComponent/footer';
import { Home } from './homecomponent/home';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-ecommerce-layout',
  imports: [Header, Footer, Home, RouterOutlet],
  templateUrl: './ecommerce-layout.html',
  styleUrl: './ecommerce-layout.scss'
})
export class EcommerceLayout {

}
