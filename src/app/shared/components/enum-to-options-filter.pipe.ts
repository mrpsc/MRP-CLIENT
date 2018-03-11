import { PipeTransform } from '@angular/core';
import { Pipe, Injectable } from '@angular/core';

@Pipe({
    name: 'enumToOptions',
    pure: false
})
@Injectable()
export class EnumToOptionsFilter implements PipeTransform {
    transform(items: string[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => typeof item === "number");
    }
}