import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login/pages/home-page/login-page.component';
import { ProductosPageComponent } from './productos/pages/productos-page/productos-page.component';
import { CartaPageComponent } from './carta/pages/carta-page/carta-page.component';
import { UsuariosPageComponent } from './usuarios/pages/usuarios-page/usuarios-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'usuarios',
    component: UsuariosPageComponent,
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'carta',
    component: CartaPageComponent,
    loadChildren: () => import('./carta/carta.module').then(m => m.CartaModule)
  },
  {
    path: 'productos',
    component: ProductosPageComponent,
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
