/*!
 * domsi <https://github.com/Kenneth-LJS/domsi>
 *
 * Copyright (c) 2021-Present, Ken <@Kenneth-LJS> (https://github.com/Kenneth-LJS)
 * Released under the MIT license.
 */

// import {
//     domsiFind as _domsiFind,
//     domsiFindAll as _domsiFindAll,
//     validateDomsiSelector as _validateDomsiSelector
// } from './core/domsi/domsi';
// import _domsiSrc from '../build/index.source';

// export const domsiFind = _domsiFind;
// export const domsiFindAll = _domsiFindAll;
// export const validateDomsiSelector = _validateDomsiSelector;
// export const domsiSrc = _domsiSrc;  

import {
    initDomsi as _initDomsi,
    runDomsiAnonymously as _runDomsiAnonymously,
} from './wrapper';

export const initDomsi = _initDomsi;
export const runDomsiAnonymously = _runDomsiAnonymously;