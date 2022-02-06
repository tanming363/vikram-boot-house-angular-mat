import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {
  transform(value: any, searchTerm: any[]): any {
    if (searchTerm.length === 0) {
      return value;
    }
    return value.filter((product: any) => {
      const filteredColor = searchTerm.some(color => {
        if (product.tags) {
          if (product.tags.includes(color)) {
            return color
          }
        }
      })
      return filteredColor;
    })
  }
}
