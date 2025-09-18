import { Routes } from '@angular/router';
import { authGuard } from './guard/auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/ecommerce-layout/homecomponent/home').then(
        (c) => c.Home
      ),
    children: [
      {
        path: 'product',
        loadComponent: () =>
          import('./components/ecommerce-layout/ProductComponent/product').then(
            (c) => c.Product
          ),
        canActivate: [authGuard],
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./components/ecommerce-layout/aboutComponent/about').then(
            (c) => c.About
          ),
        canActivate: [authGuard],
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import(
            './components/ecommerce-layout/ProductDetailsComponent/product-details'
          ).then((c) => c.ProductDetails),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin-layout/admin-layout').then(
        (c) => c.AdminLayout
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/admin-layout/DashboardComponent/dashboard').then(
            (c) => c.Dashboard
          ),
        canActivate: [authGuard],
      },
      {
        path: 'account/Login',
        loadComponent: () =>
          import(
            './components/admin-layout/identityComponent/login/login'
          ).then((c) => c.Login),
      },
      {
        path: 'account/Register',
        loadComponent: () =>
          import(
            './components/admin-layout/identityComponent/register/register'
          ).then((c) => c.Register),
      },

      {
        path: 'product',
        loadComponent: () =>
          import(
            './components/admin-layout/ProductComponent/product/product'
          ).then((c) => c.product),
        canActivate: [authGuard],
      },
      {
        path: 'addProject',
        loadComponent: () =>
          import(
            './components/admin-layout/ProductComponent/add-update/add-update'
          ).then((c) => c.AddUpdate),
        canActivate: [authGuard],
      },
      {
        path: 'addProject/:id',
        loadComponent: () =>
          import(
            './components/admin-layout/ProductComponent/add-update/add-update'
          ).then((c) => c.AddUpdate),
        canActivate: [authGuard],
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
