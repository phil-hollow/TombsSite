import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Tomb } from 'src/app/models/tomb';
import { environment } from 'src/environments/environment.prod';
import { AdminSessionService } from 'src/app/services/admin-session.service';
import { HttpParams } from '@angular/common/http';





@Component({
    selector: 'app-products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
    ServerImagesUrl: string = environment.serverUrl
    currentProducts: Array<Tomb> = new Array<Tomb>();
    products: Array<Tomb> = new Array<Tomb>();
    initialProducts: Array<Tomb> = new Array<Tomb>();
    currentPage: number = 1;
    pages: number = 1;
    currentPageId: any = 1;
    subscribes = new Array<Subscription>();
    constructor(private productService: ProductService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public adminSessionService: AdminSessionService) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {

        this.subscribes.push(this.productService.GetProducts().subscribe((res: any) => {
            this.initialProducts = res;
            this.products = res;
            this.subscribes.push(
                this.activatedRoute.queryParamMap.subscribe((queryParams: any) => {
                    let params= queryParams.params;
                    if (params.search) {
                        this.products = this.products.filter(el => {
                            return el.name?.toLowerCase().includes(params.search.toLowerCase()) ||
                                el.description?.toLowerCase().includes(params.search.toLowerCase()) ||
                                el.material?.toLowerCase().includes(params.search.toLowerCase());
                        });
                        (document.getElementById('searchInput') as HTMLInputElement).value = params.search;
                    }
                    if (params.from) {
                        this.products = this.products.filter(el => {
                            if (el.price) {
                                return el?.price >= Number.parseInt(params.from);
                            } else {
                                return true;
                            }
                        });
                        (document.getElementById("priceFrom") as HTMLInputElement).value = params.from ;
                    }
                    if (params.to) {
                        this.products = this.products.filter(el => {
                            if (el.price) {
                                return el?.price <= Number.parseInt(params.to);
                            } else {
                                return true;
                            }
                        });
                        (document.getElementById("priceTo") as HTMLInputElement).value = params.to ;
                    }
                    if (params.sort) {
                        if (params.sort === 'cheapest') {
                            this.products.sort((a, b) => {
                                if (a.price != undefined && b.price != undefined) {
                                    return a.price - b.price;
                                } else {
                                    return 1;
                                }
                            });
                            (document.getElementById("sorting") as HTMLButtonElement).textContent ='Сначала дорогие'
                        }
                        if (params.sort === 'expensive') {
                            this.products.sort((a, b) => {
                                if (a.price != undefined && b.price != undefined) {
                                    return b.price - a.price;
                                } else {
                                    return 1;
                                }
                            });
                            (document.getElementById("sorting") as HTMLButtonElement).textContent ='Сначала дешевые'
                        }
                    }
                })
            );

            this.CalculateAllPages();
            this.CheckCurrentPage();
            this.GetCurrentProducts();

        })
        )
    }
    CheckCurrentPage() {
        this.currentPageId = Number(this.activatedRoute.snapshot.params['page']);
        if (typeof this.currentPageId === 'number' && this.currentPageId > 0 && this.currentPageId <= this.pages ) {
            this.currentPage = this.currentPageId;
        } else if(this.currentPage != 1) {
            this.router.navigate([`/products`, 1], {queryParamsHandling: 'preserve'});
        }
    }
    CalculateAllPages() {
        this.pages = Math.ceil(this.products.length / 12);
        if(this.pages === 0){
            this.pages =1;
        }
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
            this.router.navigate(['/products', this.currentPage],{queryParamsHandling: 'preserve'})
            console.log(newPage);
        }
    }

    CurrentTomb(id: number) {
        console.log(this.activatedRoute.snapshot.url);
        let previousPage ={
            url:this.activatedRoute.snapshot.url,
            queryParams:this.activatedRoute.snapshot.queryParams
        }
        sessionStorage.setItem('previousPage', JSON.stringify(previousPage));
        this.router.navigate([`/product`, id])
    }
    SearchProducts() {
        let searchCriteria = (document.getElementById("searchInput") as HTMLInputElement).value;
        this.router.navigate(['/products',this.currentPage], { queryParams: { search: searchCriteria }});

    }
    PriceFromChanged(){
        let priceFrom = (document.getElementById("priceFrom") as HTMLInputElement).value;
        this.router.navigate(['/products',this.currentPage], { queryParams: { from: priceFrom }, queryParamsHandling: 'merge'});
    }
    PriceToChanged(){
        let priceTo = (document.getElementById("priceTo") as HTMLInputElement).value;
        this.router.navigate(['/products',this.currentPage], { queryParams: { to: priceTo }, queryParamsHandling: 'merge'});
    }
    SortingChanged(){
        let sorting = (document.getElementById("sorting") as HTMLButtonElement).textContent;
        if(sorting ==="Сначала дешевые"){
            this.router.navigate(['/products',this.currentPage], { queryParams: { sort: 'cheapest' }, queryParamsHandling: 'merge'});
        }else{
            this.router.navigate(['/products',this.currentPage], { queryParams: { sort: 'expensive' }, queryParamsHandling: 'merge'});
        }

    }
    AdminDeleteProduct(id: number) {
        this.subscribes.push(
            this.productService.DeleteProductById(id).subscribe((res: any) => {
                console.log(res);
                this.ngOnInit();
            })
        )
    }

    ngOnDestroy() {
        this.subscribes.forEach(sub => {
            sub.unsubscribe();
        })
    }



}