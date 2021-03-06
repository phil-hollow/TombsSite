import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductInfoPageComponent } from './pages/product-info-page/product-info-page.component';
import { OrdersConfirmationPageComponent } from './pages/orders-confirmation-page/orders-confirmation-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { OrderService } from './services/order.service';
import { FormsModule } from '@angular/forms';
import { WorksPageComponent } from './pages/works-page/works-page.component';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        ProductsPageComponent,
        ProductInfoPageComponent,
        OrdersConfirmationPageComponent,
        ServicesPageComponent,
        NavbarComponent,
        AdminLoginComponent,
        WorksPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [OrderService],
    bootstrap: [AppComponent]
})
export class AppModule { }
