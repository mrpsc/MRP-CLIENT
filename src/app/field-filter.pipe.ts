import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldFilter'
})
export class FieldFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
        return null;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
   let res = items.filter(item => item['cat'] === filter);
    return res;
}

}
