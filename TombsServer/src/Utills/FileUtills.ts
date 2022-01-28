import * as fs from 'fs';

export class FileUtills{
    private static productFilePath:string;
    private static productWorksFilePath:string;
    constructor(){
     
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
}