/*!
 * domsi <https://github.com/Kenneth-LJS/domsi>
 *
 * Copyright (c) 2021-Present, Ken <@Kenneth-LJS> (https://github.com/Kenneth-LJS)
 * Released under the MIT license.
 */

import { domsiFind, domsiFindAll, validateDomsiSelector } from './core/domsi/domsi';

export default {
    find: domsiFind,
    findAll: domsiFindAll,
    validateSelector: validateDomsiSelector,
};