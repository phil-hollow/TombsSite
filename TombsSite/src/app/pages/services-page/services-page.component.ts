import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProductWork } from 'src/app/models/productWork';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit {
  productWorks: Array<ProductWork> = new Array<ProductWork>();
  subscribes:Array<Subscription> = new Array<Subscription>();
  ServerImagesUrl:string = environment.serverUrl;
  constructor(private productService:ProductService,private orderService:OrderService) { 
    this.subscribes.push(this.productService.GetProductWorks().subscribe((res: any) => {
      this.productWorks = res;
    }))
  }

  ngOnInit(): void {
    
  }
  AddToOrder(productWork:ProductWork){
    this.orderService.AddProductWork(productWork);
  }
  ngOnDestroy() {
    this.subscribes.forEach(sub => {
        sub.unsubscribe();
    })
}
}
