import { Product } from "./Product.js";
import { ProductManager } from "./ProductManager.js";


const producto1 = new Product("Pelota para perros", "Juguete", 3000, 8, "j987")
const producto2 = new Product("Cucha para perros", "Descanso", 50000, 4, "d654")
const producto3 = new Product("Pipeta para pulgas y garrapatas", "Antipulgas", 1000, 32, "a321")
const producto4 = new Product("Arnes para perros", "Paseos", 9000, 23, "p098")


const productManager = new ProductManager('./Products.json')

