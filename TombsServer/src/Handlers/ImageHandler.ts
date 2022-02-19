import { ProductWork } from "../Models/ProductWork";
import { FileUtills } from "../Utills/FileUtills";
import { ProductHandler } from "./ProductHandler";

export class ImageHandler{
    constructor(){

    }
    static uploadImg(file:string,filename:string) {
        file = file.replace(/^data:image\/png;base64,/, "");
        file = file.replace(/^data:image\/jpeg;base64,/, "");
        file = file.replace(/^data:image\/jpg;base64,/, "");
        FileUtills.saveBase64FileImages(filename, file);
    }
    static uploadWorkImg(file:string,filename:string) {
        file = file.replace(/^data:image\/png;base64,/, "");
        file = file.replace(/^data:image\/jpeg;base64,/, "");
        file = file.replace(/^data:image\/jpg;base64,/, "");
        FileUtills.saveBase64FileWorksImages(filename, file);
    }
    static deleteUnusedImages(){
        let mas = new Array<any>();
        ProductHandler.GetProducts().forEach(el=>mas.push(el));
        ProductHandler.GetProductWorks().forEach(el=>mas.push(el));
        FileUtills.getImages().forEach(img=>{
           let index = mas.findIndex(item=>img === item.picture)
            if(index < 0){
                FileUtills.deleteImage(img);
            }
        })
    }  
}