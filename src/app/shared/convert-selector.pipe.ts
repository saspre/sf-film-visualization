
import { Pipe, PipeTransform } from '@angular/core';


/**
 * Converts from "this_casing" to "This Casing"
 */
@Pipe({name: 'convertSelector'})
export class ConvertSelectorPipe implements PipeTransform {
  transform(selector: string): string {
    if (!selector) {
        return '';
    }
    return selector.split('_').map((word) => {
            return word && word[0].toUpperCase() + word.slice(1, selector.length);
        }).join(' ');

  }
}
