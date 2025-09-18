import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IdentityService } from '../../admin-layout/identityComponent/identity-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header  implements OnInit{
   isAuthenticated: boolean = false;
   constructor(
    private _identityService:IdentityService,
    private router:Router,
  
  ){}
  ngOnInit(): void {
    this.isUserAuthenticated();
  }
      logout(){ 
    this._identityService.logout().subscribe({
      next:()=>{
        this.router.navigateByUrl('/')
      },
      error:(er) =>{
      console.log(er)
      }
    })
  }

   isUserAuthenticated() {
      this._identityService.isUserAuthenticated().subscribe({
      next: (value) => {
        this.isAuthenticated = value;

      }
   
  });
  }
}
