import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './headerComponent/header/header';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet , Header],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {
  showNav = true;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNav = !event.url.includes('/admin/account/Login')  && !event.url.includes('/admin/account/Register');
      }
    });
  }
}
