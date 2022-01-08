import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data/data.service';
import { Tomb } from 'src/app/models/tomb';



@Component({
    selector: 'app-products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

    currentProducts: Array<Tomb> = new Array<Tomb>();
    products: Tomb[];
    currentPage: number = 1;
    pages: number;
    currentPageId: any = 1;
    constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.products = dataService.GetProducts();
        this.pages = Math.ceil(this.products.length / 12);
        this.GetCurrentProducts();
        this.currentPageId = Number(activatedRoute.snapshot.params['page']);
        if(typeof this.currentPageId === 'number' && this.currentPageId > 0 && this.currentPageId <= this.pages){
            this.currentPage = this.currentPageId; 
        }else{
            this.currentPageId = this.currentPage = 1;
        }

        this.GetCurrentProducts();
        console.log(this.currentPageId);
        
        
    }

    ngOnInit(): void {
        console.log(this.currentPage)
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

    CurrentTomb(id: number){
        this.router.navigate([`/product`, id])
      }

      // Пора пойти пожрать



}