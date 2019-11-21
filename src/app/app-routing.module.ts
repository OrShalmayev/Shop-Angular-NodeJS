import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './shop/cart/cart.component';
import { NotFoundComponent } from './shared_components/not-found/not-found.component';
import { ProductCategoryComponent } from './shop/product-category/product-category.component';
import { MainComponent } from './shared_components/main/main.component';
import { LoginComponent } from './shared_components/login/login.component';
import { RegisterComponent } from './shared_components/register/register.component';


const routes: Routes = [
  {path: '',                        component:MainComponent, pathMatch:'full'},
  {path: 'login',                        component:LoginComponent},
  {path: 'register',                        component:RegisterComponent},
  {path: 'cart',                    component: CartComponent},
  {path: 'shop/:product_category',  component:ProductCategoryComponent},
  {path: 'cms', loadChildren: ()=> import ('./cms/cms.module').then(mod=>mod.CmsModule)},
  
  {path: '**',                      component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
