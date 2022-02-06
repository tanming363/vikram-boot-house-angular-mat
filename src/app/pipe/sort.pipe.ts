import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<any>, args: any[]): any {
    const sortField = args[0];
    const sortDirection = args[1];
    let multiplier = 1;
    if (sortDirection === undefined) {
      return value;
    }

    if (sortDirection === 'highest-price-to-lowest-price') {
      multiplier = -1;
    }

    value.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier;
      }
      else if (a[sortField] > b[sortField]) {
        return 1 * multiplier;
      }
      else {
        return 0;
      }
    })
    return value;

  }

}
