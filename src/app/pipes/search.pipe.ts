import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  filteredItems: any;

  transform(value: any, searchFilterString: string): any {
    if (searchFilterString == "undefined") {
      return value;
    }

    this.filteredItems = value.filter(val => {
      return val['name'].toLowerCase() == searchFilterString.toLowerCase()
    })
    return this.filteredItems;
  }

}
