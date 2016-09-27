import {Pipe, PipeTransform} from '@angular/core';

/**
 * This pipe can filter an array of objects by multiple (string) properties.
 *
 * Usage:
 * {{list | filter:['prop1', 'prop2']:searchTerm}}
 */
@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {

  /**
   * Perform filtering.
   *
   * @param items the original array of items
   * @param parameters an array of parameter names to search
   * @param value the search term
   * @returns {any[]} the items matching the search term
   */
  transform(items: any[], parameters: string[], value: string): any[] {
    if (items && value && value.length > 0 && parameters && parameters.length > 0) {
      return items.filter(function (item) {
        for (let i = 0; i < parameters.length; i++) {
          let property = item[parameters[i]];
          if (property && property.toLowerCase().lastIndexOf(value.toLowerCase()) >= 0) {
            return true;
          }
        }

        return false;
      });
    } else {
      return items;
    }
  }
}
