import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { OrdersConfirmationPageComponent } from './pages/orders-confirmation-page/orders-confirmation-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ProductInfoPageComponent } from './pages/product-info-page/product-info-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';

const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'order-confirm', component: OrdersConfirmationPageComponent },
    { path: 'order', component: OrdersPageComponent },
    { path: 'product/:info', component: ProductInfoPageComponent },
    { path: 'products/:page', component: ProductsPageComponent },
    { path: 'services', component: ServicesPageComponent },
    { path: 'admin-login', component: AdminLoginComponent },
    { path: '**', component: MainPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
