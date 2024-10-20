import { Injectable, OnInit } from '@angular/core';
import { ProductoCarrito } from '../interfaces/producto-carrito.interface';

@Injectable({
    providedIn: 'root'
})
export class CarritoService {

    private carrito : ProductoCarrito[] = [];

    constructor() { 
        this.getCarritoStorage();
    }
    
    get carritoCompra() {
        return [...this.carrito];
    }

    addProduct(newProd: ProductoCarrito) {
        const index = this.carrito.findIndex( (prod) => prod.idProd === newProd.idProd )  
        if(index > -1) {
            this.increaseQuantity(this.carrito[index]);
            return;
        }
        this.carrito.push(newProd); 
        this.saveCarritoStorage();       
    }

    increaseQuantity(prodCart: ProductoCarrito) {
        const index = this.carrito.findIndex( (prod) => prod.idProd === prodCart.idProd )  
        if(index > -1) {
            this.carrito[index].cantidad++;     
            this.saveCarritoStorage();        
        }
      }
    
    reduceQuantity(prodCart: ProductoCarrito) {
        const index = this.carrito.findIndex( (prod) => prod.idProd === prodCart.idProd )  
        if(index === -1) {
            return;
        }          
        if(prodCart.cantidad <= 1){
            return;
        } 
        this.carrito[index].cantidad--;
        this.saveCarritoStorage(); 
    }

    deleteProdCarrito(prodCart: ProductoCarrito) {
        if(this.carrito.includes(prodCart)) {
            this.carrito = this.carrito.filter( (prod) => prod.idProd !== prodCart.idProd);
            this.saveCarritoStorage(); 
        }
    }

    deleteCarrito() {
        this.carrito = [];
        this.deleteCarritoStorage();
    }


    // session storage
    getCarritoStorage() {
        const data = sessionStorage.getItem('pedido');
        if(data) {
            this.carrito = JSON.parse(data);
        }
    }

    saveCarritoStorage() {
        sessionStorage.setItem('pedido', JSON.stringify(this.carritoCompra));
    }

    deleteCarritoStorage() {
        sessionStorage.removeItem('pedido');
    }

}