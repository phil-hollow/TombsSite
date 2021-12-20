import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    { path: 'info', component: ProductInfoPageComponent },
    { path: 'products', component: ProductsPageComponent },
    { path: 'services', component: ServicesPageComponent },
    { path: '**', component: MainPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
