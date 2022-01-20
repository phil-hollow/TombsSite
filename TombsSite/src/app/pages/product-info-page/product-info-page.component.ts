import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/data/product.service';
import { ProductWork } from 'src/app/models/productWork';
import { Tomb } from 'src/app/models/tomb';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-product-info-page',
  templateUrl: './product-info-page.component.html',
  styleUrls: ['./product-info-page.component.scss']
})
export class ProductInfoPageComponent implements OnInit {
  productId:number;
  currentProduct:Tomb = new Tomb();
  ServerImagesUrl:string = environment.serverUrl
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.productId = Number(this.activatedRoute.snapshot.params['info']);
    
}

  ngOnInit(): void {
    this.productService.GetProductById(this.productId).subscribe((res:any)=>{
      this.currentProduct = res;
    });
  }
  AddToOrder(){

  }
  GoBack(){
    let currentPage = sessionStorage.getItem('previousPage');
    if(currentPage){
      this.router.navigate(['/products',Number.parseInt(currentPage)]);
    }else{
      this.router.navigate(['/products',1]);
    }
    
  }
  
}
