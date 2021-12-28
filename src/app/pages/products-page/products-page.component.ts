import { Component, OnInit } from '@angular/core';
import { throwIfEmpty } from 'rxjs';
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
    constructor(private dataService: DataService) {
        this.products = dataService.GetProducts();
        this.pages = Math.ceil(this.products.length / 12);
        this.GetCurrentProducts();
    }

    ngOnInit(): void {
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
        }
    }
}
