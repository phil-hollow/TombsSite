import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isAddedToOrder:boolean =false;
  imgToUpload:any;
  isImageChanged: boolean = false;
  showErrorAdminMode: boolean =false;
  deleteQuestion:boolean =false; 
  deletedProductWorkId:number =0;
  constructor(private productService: ProductService, 
    private orderService: OrderService, 
    public adminSessionService: AdminSessionService,
    private router:Router) {
  }

  ngOnInit(): void {
    this.subscribes.push(this.productService.GetProductWorks().subscribe((res: any) => {
      this.productWorks = res;
    }))
    this.editMode =false;
    this.newItemMode =false;
  }
  AddToOrder(productWork: ProductWork) {
    this.isAddedToOrder =true;
    this.orderService.AddProductWork(productWork);
  }
  GoToOrder(){
    this.router.navigate(['/order-confirm']);
  }
  //Admin handlers
  GoToEditMode(productWork: ProductWork) {
    this.imgToUpload =environment.serverUrl+"/images/"+productWork.picture;
    this.editedProductWork=productWork;
    this.editMode =true;
  }
  GoToNewMode(){
    this.imgToUpload ="";
    this.editedProductWork=new ProductWork();
    this.newItemMode =true;
  }
  CancelAdminMode(){
    this.editMode = false;
    this.newItemMode =false;
    this.editedProductWork = new ProductWork();
    this.imgToUpload ="";
}
  AdminDeleteProductWork() {
    this.subscribes.push(this.productService.DeleteProductWorkById(this.deletedProductWorkId).subscribe((res: any) => {
      this.deleteQuestion =false;
      this.ngOnInit();
    }))
  }
SaveItem() {
  console.log(this.editedProductWork);
  if(this.editedProductWork.name === undefined ||
      this.editedProductWork.name.length <= 0 ||
      this.editedProductWork.description === undefined ||
      this.editedProductWork.description.length <= 0 ||
      this.editedProductWork.price === undefined ||
      this.editedProductWork.price === null ||
      Number.isNaN(Number.parseInt(this.editedProductWork.price.toString())))
      {
          this.showErrorAdminMode = true;
          return;
      }
  if (this.editMode === true) {
      this.editedProductWork.price=Number.parseInt(this.editedProductWork.price.toString());
      if(this.isImageChanged && this.editedProductWork.picture){
          this.subscribes.push(
              this.productService.EditProductWork(this.editedProductWork).subscribe(res=>{
                this.editMode = false;
                this.ngOnInit();
          }))
          this.subscribes.push(
              this.productService.UploadImage(this.imgToUpload, this.editedProductWork.picture).subscribe(res=>{
          }))
      }else{
          this.subscribes.push(
              this.productService.EditProductWork(this.editedProductWork).subscribe(res=>{
                this.editMode = false;
                this.ngOnInit();
          }))
      }
      
  }
  if (this.newItemMode === true) {
      if(this.isImageChanged && this.editedProductWork.picture){
          this.subscribes.push(
              this.productService.AddProductWork(this.editedProductWork).subscribe(res=>{
                if(this.editedProductWork.picture){
                this.subscribes.push(
                  this.productService.UploadImage(this.imgToUpload, this.editedProductWork?.picture).subscribe(res=>{
                    if(this.editedProductWork.price){
                    this.editedProductWork.price=Number.parseInt(this.editedProductWork.price.toString());
                    }
                    this.newItemMode = false;
                    this.ngOnInit();
                  }))
                }
          }))
      }else{
          this.showErrorAdminMode =true;
      }
     
  }
  
}
HandleFileInput(event:any) {
  let files = event.target.files;
  if (files.length != 1) {
    return;
  }
  const file = files[0];
  //const extensionRegex = /\.([^.]*?)(?=\?|#|$)/;
  let splitedFilePath = file.name.split(".")
  
  const fileExtension = "." + splitedFilePath[splitedFilePath.length - 1]//.match(extensionRegex)[0];

  if (".jpeg, .JPEG, .png, .PNG, .JPG, .jpg".includes(fileExtension)) {
    const reader = new FileReader();
      
      reader.onload = () => {
        this.imgToUpload = reader.result;
       this.editedProductWork.picture = file.name;
      this.isImageChanged = true;
      };
      reader.readAsDataURL(file);
  }
}
ClickOnInputTypeFile(){
  document.getElementById("upfile")?.click();
}

//End Admin handlers
  ngOnDestroy() {
    this.subscribes.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
