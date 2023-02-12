const ProductsManager = require ("./app");

let pm=new ProductsManager("./products.json");

pm.getProducts().then(productos=>{
    console.log(productos)
}) 

let producto={
    name: "zapatillas reebok",
    description: "Excelentes para trotar",
    price: 300,
    img:"reebok.png",
    stock:8,
    code:"BB",
    
}

pm.addProduct(producto).then(res=>{

})

pm.getProductById()
pm.deleteProduct(1)


