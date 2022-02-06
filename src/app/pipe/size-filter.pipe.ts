import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sizeFilter'
})
export class SizeFilterPipe implements PipeTransform {
  transform(value: any, searchTerm: any[]): any {
    if (searchTerm.length === 0) {
      return value;
    }
    return value.filter((product: any) => {
      const filteredSize = searchTerm.some(size => {
        if (product.tags) {
          if (product.tags.includes(size)) {
            return size
          }
        }
      })
      return filteredSize
    })
  }
}
