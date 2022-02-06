export interface Stock {
  value: number;
  viewValue: number;
}
export interface SizeAndQty {
  forSize: number,
  availableQty: number,
}
export interface ProductModelServer {
  product: any;
  selectedSizeAndQty: any;
  selectedSize: null;
  id: string;
  articleNo: number,
  title: string;
  price: number;
  discount: number;
  color: string,
  numOfColor: number,
  category: string;
  description: string;
  tags: string[],
  // sizeAndqty: SizeAndQty[],
  sizeAndqty: any,
  forSize: number,
  availableQty: number,
  firstImage: string,
  otherImages: string[],
  rating: string,
}