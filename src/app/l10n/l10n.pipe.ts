import {Pipe, PipeTransform} from '@angular/core';
import {L10nService} from './l10n.service';

/**
 * This pipe can translate strings.
 *
 * Usage:
 * {{key | l10n:['param1', 2]}}
 */
@Pipe({
  name: 'l10n',
  pure: false
})
export class L10nPipe implements PipeTransform {

  /**
   * Create a new instance.
   *
   * @param l10nService the {@link L10nService}
   */
  constructor(private l10nService: L10nService) {
  }

  /**
   * Perform filtering.
   *
   * @param key the key
   * @param parameters an array of parameters
   * @returns {string} the string
   */
  transform(key: string, parameters: any[]): string {
    let message: string = this.l10nService.getMessage(key) || key;

    if (message && parameters && parameters.length) {
      for (let i = 0; i < parameters.length; i++) {
        message.replace('{' + i + '}', parameters[i]);
      }
    }

    return message;
  }
}
