import { Component, OnInit } from '@angular/core';
import { AdminSessionService } from 'src/app/services/admin-session.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-works-page',
    templateUrl: './works-page.component.html',
    styleUrls: ['./works-page.component.scss']
})
export class WorksPageComponent implements OnInit {
    ServerImagesUrl: string = environment.serverUrl
    worksImages =[];
    deletedWorkImage:any;
    deleteQuestion =false;
    addMode =false;
    imgToUpload:any;
    fileExtension: string ="";
    constructor(public adminSessionService: AdminSessionService,
        private productService:ProductService) { }

    ngOnInit(): void {
        this.productService.GetWorksImages().subscribe((res:any)=>{
            this.worksImages =res;
        })
    }
    DeleteWorkImage(){
        this.productService.DeleteWorksImage(this.deletedWorkImage).subscribe(res=>{
            this.deleteQuestion =false;
            this.ngOnInit();
        })
    }
    UploadWorksImage(){
        this.productService.UploadWorkImage(this.imgToUpload,Date.now().toString() + this.fileExtension).subscribe(res=>{
            this.addMode =false;
            this.imgToUpload = undefined;
            this.fileExtension ="";
            this.ngOnInit();   
        })
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
        this.fileExtension = fileExtension;
        if (".jpeg, .JPEG, .png, .PNG, .JPG, .jpg".includes(fileExtension)) {
          const reader = new FileReader();
            
            reader.onload = () => {
              this.imgToUpload = reader.result;
            };
            reader.readAsDataURL(file);
        }
      }
      ClickOnInputTypeFile(){
        document.getElementById("upfile")?.click();
      }
}
