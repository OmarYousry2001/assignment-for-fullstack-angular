import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IdentityService } from '../../identityComponent/identity-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  visible : boolean = false;
 userName: string = '';
 isAuthenticated: boolean = false;


 constructor(
  private _identityService:IdentityService,
  private router:Router,

){}
  ngOnInit(): void {
    this.isUserAuthenticated();
  }


   ToggleDropDown() {
    this.visible  = !this.visible ;
  }

      logout(){ 
    this._identityService.logout().subscribe({
      next:()=>{
        this.router.navigateByUrl('/admin/account/Login')
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
