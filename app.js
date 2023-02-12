const fs =require('fs');
const { clearScreenDown } = require('readline');

ruta = './products.json';


class ProductsManager {
    constructor(archivo){
        this.path= archivo;
    }

    async getProducts(){
        if(fs.existsSync(this.path)){
            let lectura=await fs.promises.readFile(this.path,"utf-8");

            return JSON.parse(lectura);
        }else{
            return[]
        }
    }

    async getProductById(id) {
        let products = await this.getProducts();
        let productIndex = products.findIndex((product) => product.id === id);
        let productExists = productIndex !== -1;
        if (productExists) {
          return products[productIndex];
        } else {
          console.log("Product not found.");
        }
      }

      async deleteProduct(id) {
        let products = await this.getProducts();
        let productIndex = products.findIndex((product) => product.id === id);
        let productExists = productIndex !== -1;
        if (productExists) {
          products[productIndex] = {};
          await fs.promises.writeFile(this.path, JSON.stringify(products,null,2));
          console.log(`Product with ID ${id} deleted successfully`);
        } else {
          console.log("Product not found.");
        }
      }

      async updateProduct(id, name, description, price, img, code, stock) {
        let products = await this.getProducts();
        let productIndex = products.findIndex((product) => product.id === id);
        let productExists = productIndex !== -1;
        if (productExists) {
          products[productIndex].name = name;
          products[productIndex].description = description;
          products[productIndex].price = price;
          products[productIndex].img = img;
          products[productIndex].code = code;
          products[productIndex].stock = stock;
          await fs.promises.writeFile(this.path, JSON.stringify(products,null,2));
          console.log(`Product ${name} with ID ${id} updated successfully`);
        } else {
          console.log("Product not found.");
        }
      }
    


        async addProduct(name, description, price, img, code, stock) {
            let products = await this.getProducts();
            let productExists = products.findIndex((product) => product.code === code) !== -1;
            let aFieldIsEmpty = !(name && description && price && img && code && stock);
            if (productExists || aFieldIsEmpty) {
              console.log(`Product not added.\nErrors:${productExists ? "\nProduct already exists." : ""} ${aFieldIsEmpty ? "\nMust complete all fields." : ""}`);
            } else {
              let id = products.length + 1;
              let newProduct = new Product(id, name, description, price, img, code, stock);
              products.push(newProduct);
              await fs.promises.writeFile(this.path, JSON.stringify(products,null,2));
              console.log(`Product ${name} added with ID ${id}`);
            }
          }
}


        
    
        

    module.exports=ProductsManager;

    