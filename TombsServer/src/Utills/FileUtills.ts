import * as fs from 'fs';

export class FileUtills{
    private static productFilePath:string;

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
}