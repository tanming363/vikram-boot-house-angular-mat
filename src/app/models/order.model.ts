export interface Order {
            id: string;
            articleNo: number,
            title: string;
            price: number;
            discount: number;
            color: string,
            category: string;
            firstImage: string,
            selectedQty: number,
            // otherImages: string[],
            // selectedSize: {
            //             availableQty: number,
            //             forSize: number,
            // },
}