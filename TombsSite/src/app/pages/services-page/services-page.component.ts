import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProductWork } from 'src/app/models/productWork';
import { AdminSessionService } from 'src/app/services/admin-session.service';
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
  subscribes: Array<Subscription> = new Array<Subscription>();
  ServerImagesUrl: string = environment.serverUrl;
  editedProductWork: ProductWork =new ProductWork();
  editMode: boolean = false;
  newItemMode: boolean = false;
  constructor(private productService: ProductService, private orderService: OrderService, public adminSessionService: AdminSessionService) {
    this.subscribes.push(this.productService.GetProductWorks().subscribe((res: any) => {
      this.productWorks = res;
    }))
  }

  ngOnInit(): void {

  }
  AddToOrder(productWork: ProductWork) {
    this.orderService.AddProductWork(productWork);
  }
  GoToEditMode(productWork: ProductWork) {
    this.editedProductWork=productWork;
    this.editMode =true;
  }
  GoToNewMode(){
    this.editedProductWork=new ProductWork();
    this.newItemMode =true;
  }
  CancelAdminMode(){
    this.editMode = false;
    this.newItemMode =false;
    this.editedProductWork = new ProductWork();
}
  AdminDeleteProductWork(id: number) {
    this.subscribes.push(this.productService.DeleteProductWorkById(id).subscribe((res: any) => {
      let index = this.productWorks.findIndex(el => el.id === id);
      if (index > 0) {
        this.productWorks.splice(index, 1);
      }
    }))
  }
  ngOnDestroy() {
    this.subscribes.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
