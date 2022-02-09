export interface Order {
            id: string;
            articleNo: number,
            title: string;
            price: number;
            discount: number;
            color: string,
            category: string;
            firstImage: string,
            otherImages: string[],
            selectedQty: number,
            selectedSize: {
                        availableQty: number,
                        forSize: number,
            },
}