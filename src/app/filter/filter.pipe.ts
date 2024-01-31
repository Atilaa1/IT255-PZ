import { Pipe, PipeTransform } from '@angular/core';
import { Medicine } from '../models/medicine';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any {
    if (!searchText) items;
    if (!items) return [];
    searchText = searchText.toLowerCase();
    return items.filter((item: Medicine) => {
      return (item.name).toLowerCase().includes(searchText)
    });

  }
}
