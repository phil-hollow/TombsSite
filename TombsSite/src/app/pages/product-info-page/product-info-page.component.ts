import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Order } from 'src/app/models/order';
import { ProductWork } from 'src/app/models/productWork';
import { Tomb } from 'src/app/models/tomb';
import { environment } from 'src/environments/environment.prod';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product-info-page',
  templateUrl: './product-info-page.component.html',
  styleUrls: ['./product-info-page.component.scss']
})
export class ProductInfoPageComponent implements OnInit {
  productId: number;
  currentProduct: Tomb = new Tomb();
  ServerImagesUrl: string = environment.serverUrl
  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public orderService:OrderService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.productId = Number(this.activatedRoute.snapshot.params['info']);

  }

  ngOnInit(): void {
    this.productService.GetProductById(this.productId).subscribe((res: any) => {
      this.currentProduct = res;
    });
  }
  AddToOrder() {
    this.orderService.AddTomb(this.currentProduct);
  }
  GoBack() {
    let previousPageJSON = sessionStorage.getItem('previousPage');
    if (previousPageJSON) {
      let previousPage =JSON.parse(previousPageJSON);
      
      this.router.navigate([previousPage.url[0].path, previousPage.url[1].path],{queryParams:previousPage.queryParams});
    } else {
      this.router.navigate(['/products', 1]);
    }

  }

}
