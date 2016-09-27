import {OpaqueToken} from '@angular/core';
import {LANG_DE_NAME, LANG_DE} from './messages_de';
import {LANG_EN, LANG_EN_NAME} from './messages_en';

export const MESSAGES = new OpaqueToken('translations');

const dictionary = {
  [LANG_DE_NAME]: LANG_DE,
  [LANG_EN_NAME]: LANG_EN
};

export const MESSAGE_PROVIDERS = [
  {provide: MESSAGES, useValue: dictionary},
];
