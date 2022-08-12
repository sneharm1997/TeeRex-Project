import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filteredString: any[],searchFilterString:string): any {

    if (!filteredString['color'].length && !filteredString['gender'].length && !filteredString['price'].length && !filteredString['type'].length && searchFilterString=="undefined") {
      return value;
    }

    let items = [];
    let filteredByColor = [];
    let filteredByGender = [];
    let filteredByType = [];
    let filteredItems = [];
    let filteredByPrice = [];
    let filterBySearchString=[]

    /*
    No filters
    all filters
    only type filter
    */

  

    if (filteredString['color'].length) {
      for (let i = 0; i < filteredString['color'].length; i++) {
        filteredByColor = [...filteredByColor, ...value.filter(val => {
          return val['color'].toLowerCase() == filteredString['color'][i].toLowerCase();
        })]
      }
      filteredItems = [...filteredByColor];
    } else {
      filteredItems = [...value];
    }

   
    //if color filter is not present - condition is handled

    if (filteredString['gender'].length) {
      for (let i = 0; i < filteredString['gender'].length; i++) {
        filteredByGender = [...filteredByGender, ...filteredItems.filter(val => {
          return val['gender'].toLowerCase() == filteredString['gender'][i].toLowerCase();
        })]
      }

      //filteredByGender consists of values after filtering by color and gender.
      filteredItems = [...filteredByGender];
    }

    if(filteredString['price'].length){
      for (let i = 0; i < filteredString['price'].length; i++) {
        filteredByPrice = [...filteredByPrice, ...filteredItems.filter(val => {
          let priceArray=filteredString['price'][i].split(",");

          return (val['price'] >= priceArray[0] && val['price'] <= priceArray[1]);
        })]
      }
      filteredItems = [...filteredByPrice]
    }


    if (filteredString['type'].length) {
      for (let i = 0; i < filteredString['type'].length; i++) {
        filteredByType = [...filteredByType, ...filteredItems.filter(val => {
          return val['type'].toLowerCase() == filteredString['type'][i].toLowerCase();
        })]
      }
      filteredItems = [...filteredByType]
    }

    if(searchFilterString){
      filterBySearchString = [...filterBySearchString,...filteredItems.filter(val => {
        return val['name'].toLowerCase().includes(searchFilterString.toLowerCase());
      })]
      filteredItems = [...filterBySearchString];
    }

    return filteredItems;
  }
}
