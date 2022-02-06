import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
    // console.log(searchTerm);
    if (searchTerm.length === 0) {
      return value;
    }
    return value.filter((item: any) => {
      if (item.discount) {
        let price = item.price * item.discount / 100;
        return item.price - price >= searchTerm.minPrice && item.price - price <= searchTerm.maxPrice;
      } else {
        return item.price >= searchTerm.minPrice && item.price <= searchTerm.maxPrice;
      }
    });
  }
}
