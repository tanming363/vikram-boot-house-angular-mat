export interface Order {
            articleNo: number,
            title: string;
            price: number;
            discount: number;
            color: string,
            category: string;
            firstImage: string,
            selectedSizeAndQty: any;
            selectedSize: any;
            selectedQty: any;
            dateAndTime: string;
            orderStatus: string;
            paymentStatus: string;
            paymentMethod: string;
}