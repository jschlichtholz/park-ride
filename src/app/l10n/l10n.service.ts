import {Injectable, Inject} from '@angular/core';
import {MESSAGES} from './messages';

import 'rxjs/add/operator/toPromise';

/**
 * This service provides translations.
 */
@Injectable()
export class L10nService {

  /**
   * The current language.
   */
  private _currentLanguage: string;

  /**
   * Create a new instance.
   *
   * @param _messages the translations
   */
  constructor(@Inject(MESSAGES) private _messages: any) {
  }

  /**
   * Get the current language.
   *
   * @returns {string} the current language
   */
  public get currentLanguage(): string {
    return this._currentLanguage;
  }

  /**
   * Set the current language.
   *
   * @param lang the current language
   */
  public set currentLanguage(lang: string) {
    this._currentLanguage = lang;
  }

  /**
   * Get a message in the current language.
   *
   * @param key the key
   * @returns {string} the translated message
   */
  public getMessage(key: string): string {
    let translation = key;

    if (this._messages[this.currentLanguage] && this._messages[this.currentLanguage][key]) {
      return this._messages[this.currentLanguage][key];
    }

    return translation;
  }
}
