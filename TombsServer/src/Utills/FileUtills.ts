import * as fs from 'fs';

export class FileUtills{
    private static productFilePath:string;
    private static productWorksFilePath:string;
    private static pathToImages:string;
    private static pathToWorksImages:string;
    constructor(){
     
    }
    static getPathToWorksImages(){
      let splitedDirPath = __dirname.split('\\');
      splitedDirPath.pop();
      FileUtills.pathToWorksImages = (splitedDirPath.join('\\') + "\\Data\\works-images\\").toString();
    }
    static getPathToImages(){
      let splitedDirPath = __dirname.split('\\');
      splitedDirPath.pop();
      FileUtills.pathToImages = (splitedDirPath.join('\\') + "\\Data\\images\\").toString();
    }
    static getProductFilePath(){
      let splitedDirPath = __dirname.split('\\');
      splitedDirPath.pop();
      FileUtills.productFilePath = (splitedDirPath.join('\\') + "\\Data\\products.json").toString();
    }
    static readProductsFile(){
      return fs.readFileSync(FileUtills.productFilePath).toString('utf8');;
    }
    static writeProductFile(content:string){
        fs.writeFileSync(FileUtills.productFilePath,content);
    }
    static getProductWorkFilePath(){
      let splitedDirPath = __dirname.split('\\');
      splitedDirPath.pop();
      FileUtills.productWorksFilePath = (splitedDirPath.join('\\') + "\\Data\\productWorks.json").toString();
    }
    static readProductWorksFile(){
      return fs.readFileSync(FileUtills.productWorksFilePath).toString('utf8');;
    }
    static writeProductWorksFile(content:string){
        fs.writeFileSync(FileUtills.productWorksFilePath,content);
    }
    static saveBase64FileImages(imgName: string, base64Content: string) {
      fs.writeFileSync(FileUtills.pathToImages + imgName, base64Content, { encoding: 'base64' });
    } 
    static saveBase64FileWorksImages(imgName: string, base64Content: string) {
      fs.writeFileSync(FileUtills.pathToWorksImages + imgName, base64Content, { encoding: 'base64' });
    } 
    static getImages(){
      return fs.readdirSync(FileUtills.pathToImages);
    }
    static getWorksImages(){
      return fs.readdirSync(FileUtills.pathToWorksImages);
    }
    static deleteImage(name:string){
      fs.unlinkSync(FileUtills.pathToImages + name);
    }
    static deleteWorksImage(name:string){
      fs.unlinkSync(FileUtills.pathToWorksImages + name);
    }
}