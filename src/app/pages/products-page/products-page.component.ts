import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/data/product.service';
import { Tomb } from 'src/app/models/tomb';



@Component({
    selector: 'app-products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

    currentProducts: Array<Tomb> = new Array<Tomb>();
    products: Array<Tomb> = new Array<Tomb>();
    currentPage: number = 1;
    pages: number = 1;
    currentPageId: any = 1;
    subscribes = new Array<Subscription>();
    constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
        
        this.subscribes.push(this.productService.GetProducts().subscribe((res: any) => {
            this.products = res;
            this.pages = Math.ceil(this.products.length / 12);

            this.GetCurrentProducts();
            this.currentPageId = Number(this.activatedRoute.snapshot.params['page']);
            if (typeof this.currentPageId === 'number' && this.currentPageId > 0 && this.currentPageId <= this.pages) {
                this.currentPage = this.currentPageId;
            } else {
                this.currentPageId = this.currentPage = 1;
            }
            this.GetCurrentProducts();
        })
        )
    }

    GetCurrentProducts() {

        let endIndex = this.currentPage * 12;
        if (endIndex > this.products.length) {
            this.currentProducts = this.products.slice(this.currentPage * 12 - 12);
        } else {
            this.currentProducts = this.products.slice(this.currentPage * 12 - 12, endIndex);
        }
    }

    ChangePage(changedNymber: number) {
        let newPage = changedNymber + this.currentPage;
        if (newPage <= this.pages && newPage > 0) {
            this.currentPage = newPage;
            this.GetCurrentProducts();
            this.router.navigate(['/products', this.currentPage])
            console.log(newPage);
        }
    }

    CurrentTomb(id: number) {
        this.router.navigate([`/product`, id])
    }

    ngOnDestroy() {
        this.subscribes.forEach(sub => {
            sub.unsubscribe();
        })
        this.router.routeReuseStrategy.shouldReuseRoute = () => true;
    }



}