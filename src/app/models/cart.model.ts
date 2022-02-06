import { ProductModelServer } from "./product.model";

export interface Quantity {
        availableStock: number;
        value: number;
        viewValue: number;
}

export interface Cart {
        quantity: number;
        total: number;
        availableStock: number;
        value: number;
        viewValue: number;
}

export interface CartModelServer {
        total: number;
        data: [{
                product: ProductModelServer,
                numInCart: number
        }];
}

export interface sizeAndQtyModel {
        selectedQty: null,
        selectedSize: null,
}
