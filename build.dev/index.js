/******/ var __webpack_modules__ = ({

/***/ 691:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"aqua":"#00ffff","aliceblue":"#f0f8ff","antiquewhite":"#faebd7","black":"#000000","blue":"#0000ff","cyan":"#00ffff","darkblue":"#00008b","darkcyan":"#008b8b","darkgreen":"#006400","darkturquoise":"#00ced1","deepskyblue":"#00bfff","green":"#008000","lime":"#00ff00","mediumblue":"#0000cd","mediumspringgreen":"#00fa9a","navy":"#000080","springgreen":"#00ff7f","teal":"#008080","midnightblue":"#191970","dodgerblue":"#1e90ff","lightseagreen":"#20b2aa","forestgreen":"#228b22","seagreen":"#2e8b57","darkslategray":"#2f4f4f","darkslategrey":"#2f4f4f","limegreen":"#32cd32","mediumseagreen":"#3cb371","turquoise":"#40e0d0","royalblue":"#4169e1","steelblue":"#4682b4","darkslateblue":"#483d8b","mediumturquoise":"#48d1cc","indigo":"#4b0082","darkolivegreen":"#556b2f","cadetblue":"#5f9ea0","cornflowerblue":"#6495ed","mediumaquamarine":"#66cdaa","dimgray":"#696969","dimgrey":"#696969","slateblue":"#6a5acd","olivedrab":"#6b8e23","slategray":"#708090","slategrey":"#708090","lightslategray":"#778899","lightslategrey":"#778899","mediumslateblue":"#7b68ee","lawngreen":"#7cfc00","aquamarine":"#7fffd4","chartreuse":"#7fff00","gray":"#808080","grey":"#808080","maroon":"#800000","olive":"#808000","purple":"#800080","lightskyblue":"#87cefa","skyblue":"#87ceeb","blueviolet":"#8a2be2","darkmagenta":"#8b008b","darkred":"#8b0000","saddlebrown":"#8b4513","darkseagreen":"#8fbc8f","lightgreen":"#90ee90","mediumpurple":"#9370db","darkviolet":"#9400d3","palegreen":"#98fb98","darkorchid":"#9932cc","yellowgreen":"#9acd32","sienna":"#a0522d","brown":"#a52a2a","darkgray":"#a9a9a9","darkgrey":"#a9a9a9","greenyellow":"#adff2f","lightblue":"#add8e6","paleturquoise":"#afeeee","lightsteelblue":"#b0c4de","powderblue":"#b0e0e6","firebrick":"#b22222","darkgoldenrod":"#b8860b","mediumorchid":"#ba55d3","rosybrown":"#bc8f8f","darkkhaki":"#bdb76b","silver":"#c0c0c0","mediumvioletred":"#c71585","indianred":"#cd5c5c","peru":"#cd853f","chocolate":"#d2691e","tan":"#d2b48c","lightgray":"#d3d3d3","lightgrey":"#d3d3d3","thistle":"#d8bfd8","goldenrod":"#daa520","orchid":"#da70d6","palevioletred":"#db7093","crimson":"#dc143c","gainsboro":"#dcdcdc","plum":"#dda0dd","burlywood":"#deb887","lightcyan":"#e0ffff","lavender":"#e6e6fa","darksalmon":"#e9967a","palegoldenrod":"#eee8aa","violet":"#ee82ee","azure":"#f0ffff","honeydew":"#f0fff0","khaki":"#f0e68c","lightcoral":"#f08080","sandybrown":"#f4a460","beige":"#f5f5dc","mintcream":"#f5fffa","wheat":"#f5deb3","whitesmoke":"#f5f5f5","ghostwhite":"#f8f8ff","lightgoldenrodyellow":"#fafad2","linen":"#faf0e6","salmon":"#fa8072","oldlace":"#fdf5e6","bisque":"#ffe4c4","blanchedalmond":"#ffebcd","coral":"#ff7f50","cornsilk":"#fff8dc","darkorange":"#ff8c00","deeppink":"#ff1493","floralwhite":"#fffaf0","fuchsia":"#ff00ff","gold":"#ffd700","hotpink":"#ff69b4","ivory":"#fffff0","lavenderblush":"#fff0f5","lemonchiffon":"#fffacd","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightyellow":"#ffffe0","magenta":"#ff00ff","mistyrose":"#ffe4e1","moccasin":"#ffe4b5","navajowhite":"#ffdead","orange":"#ffa500","orangered":"#ff4500","papayawhip":"#ffefd5","peachpuff":"#ffdab9","pink":"#ffc0cb","red":"#ff0000","seashell":"#fff5ee","snow":"#fffafa","tomato":"#ff6347","white":"#ffffff","yellow":"#ffff00","rebeccapurple":"#663399"}');

/***/ }),

/***/ 167:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var url = __webpack_require__(254);
var map = __webpack_require__(900);
var isColor = __webpack_require__(386);
var isLength = __webpack_require__(953);
var normalizeColor = __webpack_require__(590);

var ATTACHMENT = /^(fixed|local|scroll)$/;
var BOX = /^(border-box|padding-box|content-box)$/;
var IMAGE = new RegExp('^(none|' + url().source + ')$', 'i');
var REPEAT_SINGLE = /^(repeat-x|repeat-y)$/i;
var REPEAT_DOUBLE = /^(repeat|space|round|no-repeat)$/i;
var POSITION_HORIZONTAL = /^(left|center|right)$/;
var POSITION_VERTICAL = /^(top|center|bottom)$/;
var SIZE_SINGLE = /^(cover|contain)$/;
var KEYWORD = /^(inherit|initial)$/i;

var normalizeUrl = function(value) {
	return value.replace(url(), function(match) {
		return match
			.replace(/^url\(\s+/, 'url(')
			.replace(/\s+\)$/, ')');
	});
};

module.exports = function(value) {
	var result = {};
	var values = normalizeUrl(normalizeColor(value))
		.replace(/\(.*\/.*\)|(\/)+/g, (match, group1) => (!group1) ? match : ' / ')
		.split(/\s+/);

	var first = values[0];

	if(values.length === 1 && KEYWORD.test(first)) {
		return {
			'background-attachment': first,
			'background-clip': first,
			'background-image': first,
			'background-repeat': first,
			'background-color': first,
			'background-position': first,
			'background-size': first
		};
	}

	for(var i = 0; i < values.length; i++) {
		var v = values[i];

		if(ATTACHMENT.test(v)) {
			if(result.attachment) return;
			result.attachment = v;
		} else if(BOX.test(v)) {
			if(result.clip) return;
			result.clip = v;
		} else if(IMAGE.test(v)) {
			if(result.image) return;
			result.image = v;
		} else if(REPEAT_SINGLE.test(v)) {
			if(result.repeat) return;
			result.repeat = v;
		} else if(REPEAT_DOUBLE.test(v)) {
			if(result.repeat) return;

			var n = values[i + 1];

			if(n && REPEAT_DOUBLE.test(n)) {
				v += ' ' + n;
				i++;
			}

			result.repeat = v;
		} else if(isColor(v)) {
			if(result.color) return;
			result.color = v;
		} else if(POSITION_HORIZONTAL.test(v) || POSITION_VERTICAL.test(v) || isLength(v)) {
			if(result.position) return;

			var n = values[i + 1];
			var isHorizontal = POSITION_HORIZONTAL.test(v) || isLength(v);
			var isVertical = POSITION_VERTICAL.test(n) || isLength(n);

			if(isHorizontal && isVertical) {
				result.position = v + ' ' + n;
				i++;
			} else {
				result.position = v;
			}

			v = values[i + 1];

			if(v === '/') {
				i += 2;
				v = values[i];

				if(SIZE_SINGLE.test(v)) {
					result.size = v;
				} else if(v === 'auto' || isLength(v)) {
					n = values[i + 1];

					if(n === 'auto' || isLength(n)) {
						v += ' ' + n;
						i++;
					}

					result.size = v;
				} else {
					return;
				}
			}
		} else {
			return;
		}
	}

	return map(result, function(key, value) {
		return ['background-' + key, value];
	});
};


/***/ }),

/***/ 135:
/***/ ((module, exports, __webpack_require__) => {

var map = __webpack_require__(900);
var repeat = __webpack_require__(740);

var directional = function(value) {
	var values = value.split(/\s+/);

	if(values.length === 1) values = repeat(values[0], 4);
	else if(values.length === 2) values = values.concat(values);
	else if(values.length === 3) values.push(values[1]);
	else if(values.length > 4) return;

	return [
		'top-left',
		'top-right',
		'bottom-right',
		'bottom-left'
	].reduce(function(acc, direction, i) {
		acc[direction] = values[i];
		return acc;
	}, {});
};

var borderRadius = function(value) {
	var longhand = directional(value);

	return longhand && map(longhand, function(key, value) {
		return [ 'border-' + key + '-radius', value];
	});
}

module.exports = exports = borderRadius;


/***/ }),

/***/ 206:
/***/ ((module, exports, __webpack_require__) => {

var map = __webpack_require__(900);
var extend = __webpack_require__(529);
var directional = __webpack_require__(702);
var isColor = __webpack_require__(386);
var isLength = __webpack_require__(953);
var normalize = __webpack_require__(590);

var WIDTH = /^(thin|medium|thick)$/;
var STYLE = /^(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)$/i;
var KEYWORD = /^(inherit|initial)$/i;

var suffix = function(suffix) {
	return function(value) {
		var longhand = directional(value);

		return longhand && map(longhand, function(key, value) {
			return ['border-' + key + '-' + suffix, value];
		});
	};
};

var direction = function(direction) {
	return function(value) {
		var longhand = all(value);

		return longhand && map(longhand, function(key, value) {
			return ['border-' + direction + '-' + key, value];
		});
	};
};

var all = function(value) {
	var values = normalize(value).split(/\s+/);
	var first = values[0];

	if(values.length > 3) return;
	if(values.length === 1 && KEYWORD.test(first)) {
		return {
			width: first,
			style: first,
			color: first
		};
	}

	var result = {};
	for(var i = 0; i < values.length; i++) {
		var v = values[i];

		if(WIDTH.test(v) || isLength(v)) {
			if(result.width) return;
			result.width = v;
		} else if(STYLE.test(v)) {
			if(result.style) return;
			result.style = v;
		} else if(isColor(v)) {
			if(result.color) return;
			result.color = v;
		} else {
			return;
		}
	}

	return result;
};

var border = function(value) {
	var longhand = all(value);

	return longhand && Object.keys(longhand)
		.reduce(function(acc, key) {
			var props = exports[key](longhand[key]);
			return extend(acc, props);
		}, {});
};

border.width = suffix('width');
border.style = suffix('style');
border.color = suffix('color');
border.top = direction('top');
border.right = direction('right');
border.bottom = direction('bottom');
border.left = direction('left');

module.exports = exports = border;


/***/ }),

/***/ 702:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var repeat = __webpack_require__(740);

module.exports = function(value) {
	var values = value.split(/\s+/);

	if(values.length === 1) values = repeat(values[0], 4);
	else if(values.length === 2) values = values.concat(values);
	else if(values.length === 3) values.push(values[1]);
	else if(values.length > 4) return;

	return [
		'top',
		'right',
		'bottom',
		'left'
	].reduce(function(acc, direction, i) {
		acc[direction] = values[i];
		return acc;
	}, {});
};


/***/ }),

/***/ 990:
/***/ ((module) => {

/**
 Copied from https://github.com/bramstein/css-font-parser
 */

/**
 * @enum {number}
 */
var states = {
	VARIATION: 1,
	LINE_HEIGHT: 2,
	FONT_FAMILY: 3
};

/**
 * @param {string} input
 * @return {Object}
 */
function parse(input) {
	var state = states.VARIATION,
			buffer = '',
			result = {
				'font-family': []
			};

	for (var c, i = 0; c = input.charAt(i); i += 1) {
		if (state === states.FONT_FAMILY && (c === '"' || c === "'")) {
			var index = i + 1;

			// consume the entire string
			do {
				index = input.indexOf(c, index) + 1;
				if (!index) {
					// If a string is not closed by a ' or " return null.
					// TODO: Check to see if this is correct.
					return null;
				}
			} while (input.charAt(index - 2) === '\\');

			result['font-family'].push(input.slice(i + 1, index - 1).replace(/\\('|")/g, "$1"));

			i = index - 1;
			buffer = '';
		} else if (state === states.FONT_FAMILY && c === ',') {
			if (!/^\s*$/.test(buffer)) {
				result['font-family'].push(buffer.replace(/^\s+|\s+$/, '').replace(/\s+/g, ' '));
				buffer = '';
			}
		} else if (state === states.VARIATION && (c === ' ' || c === '/')) {
			if (/^((xx|x)-large|(xx|s)-small|small|large|medium)$/.test(buffer) ||
					/^(larg|small)er$/.test(buffer) ||
					/^(\+|-)?([0-9]*\.)?[0-9]+(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)$/.test(buffer)) {
				state = c === '/' ? states.LINE_HEIGHT : states.FONT_FAMILY;
				result['font-size'] = buffer;
			} else if (/^(italic|oblique)$/.test(buffer)) {
				result['font-style'] = buffer;
			} else if (/^small-caps$/.test(buffer)) {
				result['font-variant'] = buffer;
			} else if (/^(bold(er)?|lighter|normal|[1-9]00)$/.test(buffer)) {
				result['font-weight'] = buffer;
			} else if (/^((ultra|extra|semi)-)?(condensed|expanded)$/.test(buffer)) {
				result['font-stretch'] = buffer;
			}
			buffer = '';
		} else if (state === states.LINE_HEIGHT && c === ' ') {
			if (/^(\+|-)?([0-9]*\.)?[0-9]+(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)?$/.test(buffer)) {
				result['line-height'] = buffer;
			}
			state = states.FONT_FAMILY;
			buffer = '';
		} else {
			buffer += c;
		}
	}

	if (state === states.FONT_FAMILY && !/^\s*$/.test(buffer)) {
		result['font-family'].push(buffer.replace(/^\s+|\s+$/, '').replace(/\s+/g, ' '));
	}

	if (result['font-size'] && result['font-family'].length) {
		return result;
	} else {
		return null;
	}
}

module.exports = function(input) {
	if(/^(inherit|initial)$/.test(input)) {
		return {
			'font-size': input,
			'line-height': input,
			'font-style': input,
			'font-weight': input,
			'font-variant': input,
			'font-stretch': input,
			'font-family': input
		}
	}

	input = input.replace(/\s*\/\s*/, '/');
	var result = parse(input);

	if(result) {
		result['font-family'] = result['font-family'].map(function(family) {
			return /^(serif|sans-serif|monospace|cursive|fantasy)$/.test(family) ? family : ('"' + family + '"');
		}).join(', ');
	}

	return result;
};


/***/ }),

/***/ 404:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = __webpack_require__(900);

var font = __webpack_require__(990);
var border = __webpack_require__(206);
var borderRadius = __webpack_require__(135);
var background = __webpack_require__(167);
var directional = __webpack_require__(702);
var outline = __webpack_require__(862);

var prefix = function(prefix) {
	return function(value) {
		var longhand = directional(value);

		return longhand && map(longhand, function(key, value) {
			return [prefix + '-' + key, value];
		});
	};
};

var shorthand = {
	font: font,
	padding: prefix('padding'),
	margin: prefix('margin'),
	border: border,
	'border-width': border.width,
	'border-style': border.style,
	'border-color': border.color,
	'border-top': border.top,
	'border-right': border.right,
	'border-bottom': border.bottom,
	'border-left': border.left,
	'border-radius': borderRadius,
	background: background,
	outline: outline
};

module.exports = function(property, value) {
	var normalized = value.trim();
	var important = /\s+!important$/.test(normalized);
	normalized = normalized.replace(/\s+!important$/, '');

	var parse = shorthand[property];
	var longhand = parse && parse(normalized);

	if(!longhand) return;
	if(!important) return longhand;

	return map(longhand, function(key, value) {
		return [key, value + ' !important'];
	});
};


/***/ }),

/***/ 386:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hex = __webpack_require__(650);
var hsla = __webpack_require__(757);
var hsl = __webpack_require__(777);
var rgb = __webpack_require__(733);
var rgba = __webpack_require__(388);
var keywords = __webpack_require__(691);

var HEX = new RegExp('^' + hex().source + '$', 'i');
var HSLA = hsla({ exact: true });
var HSL = hsl({ exact: true });
var RGB = rgb({ exact: true });
var RGBA = rgba({ exact: true });

module.exports = function(value) {
	value = value.toLowerCase();

	return !!keywords[value] ||
		value === 'currentcolor' ||
		value === 'transparent' ||
		HEX.test(value) ||
		HSLA.test(value) ||
		HSL.test(value) ||
		RGB.test(value) ||
		RGBA.test(value);
};


/***/ }),

/***/ 953:
/***/ ((module) => {

var LENGTH = /^(\+|-)?([0-9]*\.)?[0-9]+(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)$/i;
var ZERO = /^(\+|-)?(0*\.)?0+$/;

module.exports = function(value) {
	return LENGTH.test(value) || ZERO.test(value);
};


/***/ }),

/***/ 590:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hsla = __webpack_require__(757);
var hsl = __webpack_require__(777);
var rgb = __webpack_require__(733);
var rgba = __webpack_require__(388);

var FUNCTIONS = [
	hsla(),
	hsl(),
	rgb(),
	rgba()
];

module.exports = function(value) {
	return FUNCTIONS.reduce(function(acc, func) {
		return acc.replace(func, function(match) {
			return match.replace(/\s+/g, '');
		});
	}, value);
};


/***/ }),

/***/ 862:
/***/ ((module, exports, __webpack_require__) => {

var map = __webpack_require__(900);
var extend = __webpack_require__(529);
var isColor = __webpack_require__(386);
var isLength = __webpack_require__(953);
var normalize = __webpack_require__(590);

var WIDTH = /^(thin|medium|thick)$/;
var STYLE = /^(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)$/i;
var KEYWORD = /^(inherit|initial)$/i;

var outline = function(value) {
	var values = normalize(value).split(/\s+/);

	if(values.length > 3) return;
	if (values.length === 1 && KEYWORD.test(values[0])) {
		return {
			'outline-width': values[0],
			'outline-style': values[0],
			'outline-color': values[0]
		};
	}

	var result = {};
	for(var i = 0; i < values.length; i++) {
		var v = values[i];

		if (isLength(v) || WIDTH.test(v)) {
			if(result['outline-width']) return;
			result['outline-width'] = v;
		} else if (STYLE.test(v)) {
			if(result['outline-style']) return;
			result['outline-style'] = v;
		} else if (isColor(v)) {
			if(result['outline-color']) return;
			result['outline-color'] = v;
		} else {
			return;
		}
	};

	return result;
};

module.exports = exports = outline;


/***/ }),

/***/ 254:
/***/ ((module) => {

"use strict";


module.exports = function() {
  return /url\(.*?\)/ig;
}


/***/ }),

/***/ 650:
/***/ ((module) => {

"use strict";
/*!
 * hex-color-regex <https://github.com/regexps/hex-color-regex>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */



module.exports = function hexColorRegex(opts) {
  opts = opts && typeof opts === 'object' ? opts : {}

  return opts.strict
    ? /^#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/i
    : /#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})\b/gi
}


/***/ }),

/***/ 777:
/***/ ((module) => {

"use strict";


module.exports = function hslRegex(options) {
  options = options || {};

  return options.exact ?
    /^hsl\(\s*(\d+)\s*,\s*(\d*(?:\.\d+)?%)\s*,\s*(\d*(?:\.\d+)?%)\)$/ :
    /hsl\(\s*(\d+)\s*,\s*(\d*(?:\.\d+)?%)\s*,\s*(\d*(?:\.\d+)?%)\)/ig;
}


/***/ }),

/***/ 757:
/***/ ((module) => {

"use strict";


module.exports = function hslaRegex(options) {
  options = options || {};

  return options.exact ?
    /^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)$/ :
    /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)/ig;
}


/***/ }),

/***/ 900:
/***/ ((module) => {

"use strict";

module.exports = function (obj, cb) {
	var ret = {};
	var keys = Object.keys(obj);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var res = cb(key, obj[key], obj);
		ret[res[0]] = res[1];
	}

	return ret;
};


/***/ }),

/***/ 740:
/***/ ((module) => {

"use strict";
/*!
 * repeat-element <https://github.com/jonschlinkert/repeat-element>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT license.
 */



module.exports = function repeat(ele, num) {
  if (Array.prototype.fill) {
    return new Array(num).fill(ele);
  }

  var arr = new Array(num);

  for (var i = 0; i < num; i++) {
    arr[i] = ele;
  }

  return arr;
};


/***/ }),

/***/ 733:
/***/ ((module) => {

"use strict";


module.exports = function rgbRegex(options) {
  options = options || {};

  return options.exact ?
    /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/ :
    /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/ig;
}


/***/ }),

/***/ 388:
/***/ ((module) => {

"use strict";


module.exports = function rgbaRegex(options) {
  options = options || {};

  return options.exact ?
    /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/ :
    /rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)/ig;
}


/***/ }),

/***/ 529:
/***/ ((module) => {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/env/dev.ts
var NO_VALIDATION = false;
var SMALL_OUTPUT = false;
var OUTPUT_FOR_WEB = false;
var LOAD_RGB_CONVERTER = true;
var LOAD_CSS_EXPANDER = false;
// EXTERNAL MODULE: ./node_modules/css-shorthand-expand/source/index.js
var source = __webpack_require__(404);
var source_default = /*#__PURE__*/__webpack_require__.n(source);
;// CONCATENATED MODULE: ./src/constants/css-selector.ts


var UnwantedCssPropertyNames;

(function (UnwantedCssPropertyNames) {
  UnwantedCssPropertyNames["length"] = "length";
  UnwantedCssPropertyNames["getPropertyPriority"] = "getPropertyPriority";
  UnwantedCssPropertyNames["getPropertyValue"] = "getPropertyValue";
  UnwantedCssPropertyNames["item"] = "item";
  UnwantedCssPropertyNames["removeProperty"] = "removeProperty";
  UnwantedCssPropertyNames["setProperty"] = "setProperty";
  UnwantedCssPropertyNames["parentRule"] = "parentRule";
})(UnwantedCssPropertyNames || (UnwantedCssPropertyNames = {}));

var CssColorPropertyNames;

(function (CssColorPropertyNames) {
  CssColorPropertyNames["backgroundColor"] = "backgroundColor";
  CssColorPropertyNames["borderBlockEndColor"] = "borderBlockEndColor";
  CssColorPropertyNames["borderBlockStartColor"] = "borderBlockStartColor";
  CssColorPropertyNames["borderBottomColor"] = "borderBottomColor";
  CssColorPropertyNames["borderColor"] = "borderColor";
  CssColorPropertyNames["borderInlineEndColor"] = "borderInlineEndColor";
  CssColorPropertyNames["borderInlineStartColor"] = "borderInlineStartColor";
  CssColorPropertyNames["borderLeftColor"] = "borderLeftColor";
  CssColorPropertyNames["borderRightColor"] = "borderRightColor";
  CssColorPropertyNames["borderTopColor"] = "borderTopColor";
  CssColorPropertyNames["caretColor"] = "caretColor";
  CssColorPropertyNames["color"] = "color";
  CssColorPropertyNames["columnRuleColor"] = "columnRuleColor";
  CssColorPropertyNames["floodColor"] = "floodColor";
  CssColorPropertyNames["lightingColor"] = "lightingColor";
  CssColorPropertyNames["outlineColor"] = "outlineColor";
  CssColorPropertyNames["stopColor"] = "stopColor";
  CssColorPropertyNames["textDecorationColor"] = "textDecorationColor";
  CssColorPropertyNames["textEmphasisColor"] = "textEmphasisColor";
  CssColorPropertyNames["webkitTapHighlightColor"] = "webkitTapHighlightColor";
  CssColorPropertyNames["webkitTextFillColor"] = "webkitTextFillColor";
  CssColorPropertyNames["webkitTextStrokeColor"] = "webkitTextStrokeColor";
})(CssColorPropertyNames || (CssColorPropertyNames = {}));

var CssShorthandExpanders = LOAD_CSS_EXPANDER ? {
  'css-shorthand-expand': {
    expand: (source_default()),
    supportedProperties: ['background', 'font', 'padding', 'margin', 'border', 'borderWidth', 'borderStyle', 'borderColor', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderRadius', 'outline']
  }
} : {};
;// CONCATENATED MODULE: ./src/utils/object.ts
function object_hasOwnProperty(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}
function getInvalidKeys(obj, validKeys) {
  var validKeysSet = new Set(validKeys);
  return Object.keys(obj).filter(function (objKey) {
    return !validKeysSet.has(objKey);
  });
}
;// CONCATENATED MODULE: ./src/validator/selector-validator.ts
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}



var DomsiNodeSelectorValidator = {
  selectorName: 'NodeSelector',
  validate: function validate(selector, getValidator) {
    var validatorErrors = [];
    var validFields = ['tagName', 'attribute', 'property', 'css', 'text', 'children'];
    var invalidFields = getInvalidKeys(selector, validFields);
    validatorErrors.push.apply(validatorErrors, _toConsumableArray(invalidFields.map(function (invalidField) {
      return {
        type: 'Invalid field',
        field: invalidField
      };
    })));
    validatorErrors.push.apply(validatorErrors, _toConsumableArray(getValidator('tagName')(undefined, undefined)));
    return validatorErrors;
  }
}; // import { DomsiAttributeSelector, DomsiAttributeValueSelector } from '../types/selectors/attribute-selector';
// import { DomsiChildrenSelector } from '../types/selectors/children-selector';
// import { DomsiCssSelector } from '../types/selectors/css-selector';
// import { DomsiPropertySelector } from '../types/selectors/property-selector';
// import { DomsiTagNameSelector } from '../types/selectors/tag-name-selector';
// import { DomsiTextSelector } from '../types/selectors/text-selector';
// import { IDomsiNodeSelector as DomsiNodeSelector } from '../types/selectors/node-selector';
// import { SelectorValidator } from '../types/validator/selector-validator';
// import { DomsiValueSelector } from '../types/selectors/value-selector';
// import { CssColorPropertyNames } from '../constants/css-selector';
// function getDomsiNodeSelectorValidator(): SelectorValidator<DomsiNodeSelector> {
//     return {
//         name: 'DomsiNodeSelectorValidator',
//         selectorName: 'NodeSelector',
//         validFields: {
//             tagName: DomsiTagNameSelectorValidator,
//             attribute: DomsiAttributeSelectorValidator,
//             property: DomsiPropertySelectorValidator,
//             css: DomsiCssSelectorValidator,
//             text: DomsiTextSelectorValidator,
//             children: DomsiChildrenSelectorValidator,
//         },
//     } as SelectorValidator<DomsiNodeSelector>;
// }
// // Placeholder
// export const DomsiNodeSelectorValidator = {} as SelectorValidator<DomsiNodeSelector>;

var DomsiValueSelectorValidator = {
  selectorName: 'ValueSelector',
  validate: function validate(selector, _validate, makeError) {
    var selectorType = _typeof(selector);

    if (selectorType === 'undefined' || selectorType === 'number' || selectorType === 'string') {
      return [];
    }
  }
};
var DomsiTagNameSelectorValidator = {
  name: 'DomsiTagNameValidator',
  selectorName: 'TagNameSelector',
  validPrimitives: ['undefined', 'number', 'string']
};
var DomsiAttributeValueSelectorValidator = Object.assign({}, DomsiValueSelectorValidator, {
  name: 'DomsiAttributeValueSelectorValidator',
  selectorName: 'AttributeValueSelector'
});
var DomsiAttributeSelectorValidator = {
  name: 'DomsiAttributeSelectorValidator',
  selectorName: 'AttributeSelector',
  allowAnyField: true,
  anyFieldValidator: DomsiAttributeValueSelectorValidator
};
var DomsiPropertyValueSelectorValidator = Object.assign({}, DomsiValueSelectorValidator, {
  name: 'DomsiPropertyValueSelectorValidator',
  selectorName: 'PropertyValueSelector'
});
var DomsiPropertySelectorValidator = {
  name: 'DomsiPropertySelectorValidator',
  selectorName: 'PropertySelector',
  allowAnyField: true,
  anyFieldValidator: DomsiPropertyValueSelectorValidator
};
var DomsiCssColorValueSelectorValidator = Object.assign({}, DomsiValueSelectorValidator, {
  name: 'DomsiCssColorValueSelectorValidator',
  selectorName: 'CssColorValueSelector'
});
var DomsiCssValueSelectorValidator = Object.assign({}, DomsiValueSelectorValidator, {
  name: 'DomsiCssValueSelectorValidator',
  selectorName: 'CssValueSelector'
});
var DomsiCssSelectorValidator = {
  name: 'DomsiCssValueSelectorValidator',
  selectorName: 'CssValueSelector',
  validFields: Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.keys(CssColorPropertyNames).map(function (colorName) {
    return _defineProperty({}, colorName, DomsiCssColorValueSelectorValidator);
  })))),
  allowAnyField: true,
  anyFieldValidator: DomsiCssValueSelectorValidator
};
var DomsiTextSelectorValidator = Object.assign({}, DomsiValueSelectorValidator, {
  name: 'DomsiTextSelectorValidator',
  selectorName: 'TextSelector'
});
var DomsiChildrenSelectorValidator = {};
;// CONCATENATED MODULE: ./dev/src/index.ts
 // import { validateSelector } from '@lib/domsi/validate';
// console.log(reversed([1,2,3]))
// console.log(domsiFind({ tagName: 'h1' }));
// document.querySelector('h1').innerText = 'Hi 2';

var selector = {
  tagName: true
};
console.log('selector', selector);
console.log('DomsiSelectorValidator', DomsiNodeSelectorValidator); // console.log('validate', validateSelector(selector, DomsiNodeSelectorValidator));
})();


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kb21zaS8uL25vZGVfbW9kdWxlcy9jc3Mtc2hvcnRoYW5kLWV4cGFuZC9zb3VyY2UvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly9kb21zaS8uL25vZGVfbW9kdWxlcy9jc3Mtc2hvcnRoYW5kLWV4cGFuZC9zb3VyY2UvYm9yZGVyLXJhZGl1cy5qcyIsIndlYnBhY2s6Ly9kb21zaS8uL25vZGVfbW9kdWxlcy9jc3Mtc2hvcnRoYW5kLWV4cGFuZC9zb3VyY2UvYm9yZGVyLmpzIiwid2VicGFjazovL2RvbXNpLy4vbm9kZV9tb2R1bGVzL2Nzcy1zaG9ydGhhbmQtZXhwYW5kL3NvdXJjZS9kaXJlY3Rpb25hbC5qcyIsIndlYnBhY2s6Ly9kb21zaS8uL25vZGVfbW9kdWxlcy9jc3Mtc2hvcnRoYW5kLWV4cGFuZC9zb3VyY2UvZm9udC5qcyIsIndlYnBhY2s6Ly9kb21zaS8uL25vZGVfbW9kdWxlcy9jc3Mtc2hvcnRoYW5kLWV4cGFuZC9zb3VyY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZG9tc2kvLi9ub2RlX21vZHVsZXMvY3NzLXNob3J0aGFuZC1leHBhbmQvc291cmNlL2lzLWNvbG9yLmpzIiwid2VicGFjazovL2RvbXNpLy4vbm9kZV9tb2R1bGVzL2Nzcy1zaG9ydGhhbmQtZXhwYW5kL3NvdXJjZS9pcy1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vZG9tc2kvLi9ub2RlX21vZHVsZXMvY3NzLXNob3J0aGFuZC1leHBhbmQvc291cmNlL25vcm1hbGl6ZS1jb2xvci5qcyIsIndlYnBhY2s6Ly9kb21zaS8uL25vZGVfbW9kdWxlcy9jc3Mtc2hvcnRoYW5kLWV4cGFuZC9zb3VyY2Uvb3V0bGluZS5qcyIsIndlYnBhY2s6Ly9kb21zaS8uL25vZGVfbW9kdWxlcy9jc3MtdXJsLXJlZ2V4L2luZGV4LmpzIiwid2VicGFjazovL2RvbXNpLy4vbm9kZV9tb2R1bGVzL2hleC1jb2xvci1yZWdleC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kb21zaS8uL25vZGVfbW9kdWxlcy9oc2wtcmVnZXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZG9tc2kvLi9ub2RlX21vZHVsZXMvaHNsYS1yZWdleC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kb21zaS8uL25vZGVfbW9kdWxlcy9tYXAtb2JqL2luZGV4LmpzIiwid2VicGFjazovL2RvbXNpLy4vbm9kZV9tb2R1bGVzL3JlcGVhdC1lbGVtZW50L2luZGV4LmpzIiwid2VicGFjazovL2RvbXNpLy4vbm9kZV9tb2R1bGVzL3JnYi1yZWdleC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kb21zaS8uL25vZGVfbW9kdWxlcy9yZ2JhLXJlZ2V4L2luZGV4LmpzIiwid2VicGFjazovL2RvbXNpLy4vbm9kZV9tb2R1bGVzL3h0ZW5kL2ltbXV0YWJsZS5qcyIsIndlYnBhY2s6Ly9kb21zaS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kb21zaS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9kb21zaS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZG9tc2kvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9kb21zaS8uL3NyYy9lbnYvZGV2LnRzIiwid2VicGFjazovL2RvbXNpLy4vc3JjL2NvbnN0YW50cy9jc3Mtc2VsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vZG9tc2kvLi9zcmMvdXRpbHMvb2JqZWN0LnRzIiwid2VicGFjazovL2RvbXNpLy4vc3JjL3ZhbGlkYXRvci9zZWxlY3Rvci12YWxpZGF0b3IudHMiLCJ3ZWJwYWNrOi8vZG9tc2kvLi9kZXYvc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbIk5PX1ZBTElEQVRJT04iLCJTTUFMTF9PVVRQVVQiLCJPVVRQVVRfRk9SX1dFQiIsIkxPQURfUkdCX0NPTlZFUlRFUiIsIkxPQURfQ1NTX0VYUEFOREVSIiwiVW53YW50ZWRDc3NQcm9wZXJ0eU5hbWVzIiwiQ3NzQ29sb3JQcm9wZXJ0eU5hbWVzIiwiQ3NzU2hvcnRoYW5kRXhwYW5kZXJzIiwiZXhwYW5kIiwic3VwcG9ydGVkUHJvcGVydGllcyIsIk9iamVjdCIsInZhbGlkS2V5c1NldCIsIkRvbXNpTm9kZVNlbGVjdG9yVmFsaWRhdG9yIiwic2VsZWN0b3JOYW1lIiwidmFsaWRhdGUiLCJ2YWxpZGF0b3JFcnJvcnMiLCJ2YWxpZEZpZWxkcyIsImludmFsaWRGaWVsZHMiLCJnZXRJbnZhbGlkS2V5cyIsInR5cGUiLCJmaWVsZCIsImludmFsaWRGaWVsZCIsImdldFZhbGlkYXRvciIsIkRvbXNpVmFsdWVTZWxlY3RvclZhbGlkYXRvciIsInNlbGVjdG9yVHlwZSIsIkRvbXNpVGFnTmFtZVNlbGVjdG9yVmFsaWRhdG9yIiwibmFtZSIsInZhbGlkUHJpbWl0aXZlcyIsIkRvbXNpQXR0cmlidXRlVmFsdWVTZWxlY3RvclZhbGlkYXRvciIsIkRvbXNpQXR0cmlidXRlU2VsZWN0b3JWYWxpZGF0b3IiLCJhbGxvd0FueUZpZWxkIiwiYW55RmllbGRWYWxpZGF0b3IiLCJEb21zaVByb3BlcnR5VmFsdWVTZWxlY3RvclZhbGlkYXRvciIsIkRvbXNpUHJvcGVydHlTZWxlY3RvclZhbGlkYXRvciIsIkRvbXNpQ3NzQ29sb3JWYWx1ZVNlbGVjdG9yVmFsaWRhdG9yIiwiRG9tc2lDc3NWYWx1ZVNlbGVjdG9yVmFsaWRhdG9yIiwiRG9tc2lDc3NTZWxlY3RvclZhbGlkYXRvciIsIkRvbXNpVGV4dFNlbGVjdG9yVmFsaWRhdG9yIiwiRG9tc2lDaGlsZHJlblNlbGVjdG9yVmFsaWRhdG9yIiwic2VsZWN0b3IiLCJ0YWdOYW1lIiwiY29uc29sZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFVBQVUsbUJBQU8sQ0FBQyxHQUFlO0FBQ2pDLFVBQVUsbUJBQU8sQ0FBQyxHQUFTO0FBQzNCLGNBQWMsbUJBQU8sQ0FBQyxHQUFZO0FBQ2xDLGVBQWUsbUJBQU8sQ0FBQyxHQUFhO0FBQ3BDLHFCQUFxQixtQkFBTyxDQUFD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QUFBQTtBQUxsQixHQUs5QixDQUZZLEVBQU5BLENBSHdCO0FBT3JDb0IsZUFBYSxFQVB3QjtBQVFyQ0MsbUJBQWlCLEVBQUVJO0FBUmtCLENBQWxDO0FBV0EsSUFBTUUsMEJBQTBCLEdBQUcsTUFBTSxDQUFOLHdDQUErQztBQUNyRlgsTUFBSSxFQURpRjtBQUVyRmIsY0FBWSxFQUFFO0FBRnVFLENBQS9DLENBQW5DO0FBS0EsSUFBTXlCLDhCQUE4QixHQUFwQyxHOztDQ3hJUDtBQUdBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNQyxRQUFRLEdBQUc7QUFDYkMsU0FBTyxFQUFFO0FBREksQ0FBakI7QUFJQUMsT0FBTyxDQUFQQTtBQUNBQSxPQUFPLENBQVBBLDBELENBRUEsbUYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXJsID0gcmVxdWlyZSgnY3NzLXVybC1yZWdleCcpO1xudmFyIG1hcCA9IHJlcXVpcmUoJ21hcC1vYmonKTtcbnZhciBpc0NvbG9yID0gcmVxdWlyZSgnLi9pcy1jb2xvcicpO1xudmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pcy1sZW5ndGgnKTtcbnZhciBub3JtYWxpemVDb2xvciA9IHJlcXVpcmUoJy4vbm9ybWFsaXplLWNvbG9yJyk7XG5cbnZhciBBVFRBQ0hNRU5UID0gL14oZml4ZWR8bG9jYWx8c2Nyb2xsKSQvO1xudmFyIEJPWCA9IC9eKGJvcmRlci1ib3h8cGFkZGluZy1ib3h8Y29udGVudC1ib3gpJC87XG52YXIgSU1BR0UgPSBuZXcgUmVnRXhwKCdeKG5vbmV8JyArIHVybCgpLnNvdXJjZSArICcpJCcsICdpJyk7XG52YXIgUkVQRUFUX1NJTkdMRSA9IC9eKHJlcGVhdC14fHJlcGVhdC15KSQvaTtcbnZhciBSRVBFQVRfRE9VQkxFID0gL14ocmVwZWF0fHNwYWNlfHJvdW5kfG5vLXJlcGVhdCkkL2k7XG52YXIgUE9TSVRJT05fSE9SSVpPTlRBTCA9IC9eKGxlZnR8Y2VudGVyfHJpZ2h0KSQvO1xudmFyIFBPU0lUSU9OX1ZFUlRJQ0FMID0gL14odG9wfGNlbnRlcnxib3R0b20pJC87XG52YXIgU0laRV9TSU5HTEUgPSAvXihjb3Zlcnxjb250YWluKSQvO1xudmFyIEtFWVdPUkQgPSAvXihpbmhlcml0fGluaXRpYWwpJC9pO1xuXG52YXIgbm9ybWFsaXplVXJsID0gZnVuY3Rpb24odmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlLnJlcGxhY2UodXJsKCksIGZ1bmN0aW9uKG1hdGNoKSB7XG5cdFx0cmV0dXJuIG1hdGNoXG5cdFx0XHQucmVwbGFjZSgvXnVybFxcKFxccysvLCAndXJsKCcpXG5cdFx0XHQucmVwbGFjZSgvXFxzK1xcKSQvLCAnKScpO1xuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dmFyIHJlc3VsdCA9IHt9O1xuXHR2YXIgdmFsdWVzID0gbm9ybWFsaXplVXJsKG5vcm1hbGl6ZUNvbG9yKHZhbHVlKSlcblx0XHQucmVwbGFjZSgvXFwoLipcXC8uKlxcKXwoXFwvKSsvZywgKG1hdGNoLCBncm91cDEpID0+ICghZ3JvdXAxKSA/IG1hdGNoIDogJyAvICcpXG5cdFx0LnNwbGl0KC9cXHMrLyk7XG5cblx0dmFyIGZpcnN0ID0gdmFsdWVzWzBdO1xuXG5cdGlmKHZhbHVlcy5sZW5ndGggPT09IDEgJiYgS0VZV09SRC50ZXN0KGZpcnN0KSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHQnYmFja2dyb3VuZC1hdHRhY2htZW50JzogZmlyc3QsXG5cdFx0XHQnYmFja2dyb3VuZC1jbGlwJzogZmlyc3QsXG5cdFx0XHQnYmFja2dyb3VuZC1pbWFnZSc6IGZpcnN0LFxuXHRcdFx0J2JhY2tncm91bmQtcmVwZWF0JzogZmlyc3QsXG5cdFx0XHQnYmFja2dyb3VuZC1jb2xvcic6IGZpcnN0LFxuXHRcdFx0J2JhY2tncm91bmQtcG9zaXRpb24nOiBmaXJzdCxcblx0XHRcdCdiYWNrZ3JvdW5kLXNpemUnOiBmaXJzdFxuXHRcdH07XG5cdH1cblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHYgPSB2YWx1ZXNbaV07XG5cblx0XHRpZihBVFRBQ0hNRU5ULnRlc3QodikpIHtcblx0XHRcdGlmKHJlc3VsdC5hdHRhY2htZW50KSByZXR1cm47XG5cdFx0XHRyZXN1bHQuYXR0YWNobWVudCA9IHY7XG5cdFx0fSBlbHNlIGlmKEJPWC50ZXN0KHYpKSB7XG5cdFx0XHRpZihyZXN1bHQuY2xpcCkgcmV0dXJuO1xuXHRcdFx0cmVzdWx0LmNsaXAgPSB2O1xuXHRcdH0gZWxzZSBpZihJTUFHRS50ZXN0KHYpKSB7XG5cdFx0XHRpZihyZXN1bHQuaW1hZ2UpIHJldHVybjtcblx0XHRcdHJlc3VsdC5pbWFnZSA9IHY7XG5cdFx0fSBlbHNlIGlmKFJFUEVBVF9TSU5HTEUudGVzdCh2KSkge1xuXHRcdFx0aWYocmVzdWx0LnJlcGVhdCkgcmV0dXJuO1xuXHRcdFx0cmVzdWx0LnJlcGVhdCA9IHY7XG5cdFx0fSBlbHNlIGlmKFJFUEVBVF9ET1VCTEUudGVzdCh2KSkge1xuXHRcdFx0aWYocmVzdWx0LnJlcGVhdCkgcmV0dXJuO1xuXG5cdFx0XHR2YXIgbiA9IHZhbHVlc1tpICsgMV07XG5cblx0XHRcdGlmKG4gJiYgUkVQRUFUX0RPVUJMRS50ZXN0KG4pKSB7XG5cdFx0XHRcdHYgKz0gJyAnICsgbjtcblx0XHRcdFx0aSsrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHQucmVwZWF0ID0gdjtcblx0XHR9IGVsc2UgaWYoaXNDb2xvcih2KSkge1xuXHRcdFx0aWYocmVzdWx0LmNvbG9yKSByZXR1cm47XG5cdFx0XHRyZXN1bHQuY29sb3IgPSB2O1xuXHRcdH0gZWxzZSBpZihQT1NJVElPTl9IT1JJWk9OVEFMLnRlc3QodikgfHwgUE9TSVRJT05fVkVSVElDQUwudGVzdCh2KSB8fCBpc0xlbmd0aCh2KSkge1xuXHRcdFx0aWYocmVzdWx0LnBvc2l0aW9uKSByZXR1cm47XG5cblx0XHRcdHZhciBuID0gdmFsdWVzW2kgKyAxXTtcblx0XHRcdHZhciBpc0hvcml6b250YWwgPSBQT1NJVElPTl9IT1JJWk9OVEFMLnRlc3QodikgfHwgaXNMZW5ndGgodik7XG5cdFx0XHR2YXIgaXNWZXJ0aWNhbCA9IFBPU0lUSU9OX1ZFUlRJQ0FMLnRlc3QobikgfHwgaXNMZW5ndGgobik7XG5cblx0XHRcdGlmKGlzSG9yaXpvbnRhbCAmJiBpc1ZlcnRpY2FsKSB7XG5cdFx0XHRcdHJlc3VsdC5wb3NpdGlvbiA9IHYgKyAnICcgKyBuO1xuXHRcdFx0XHRpKys7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQucG9zaXRpb24gPSB2O1xuXHRcdFx0fVxuXG5cdFx0XHR2ID0gdmFsdWVzW2kgKyAxXTtcblxuXHRcdFx0aWYodiA9PT0gJy8nKSB7XG5cdFx0XHRcdGkgKz0gMjtcblx0XHRcdFx0diA9IHZhbHVlc1tpXTtcblxuXHRcdFx0XHRpZihTSVpFX1NJTkdMRS50ZXN0KHYpKSB7XG5cdFx0XHRcdFx0cmVzdWx0LnNpemUgPSB2O1xuXHRcdFx0XHR9IGVsc2UgaWYodiA9PT0gJ2F1dG8nIHx8IGlzTGVuZ3RoKHYpKSB7XG5cdFx0XHRcdFx0biA9IHZhbHVlc1tpICsgMV07XG5cblx0XHRcdFx0XHRpZihuID09PSAnYXV0bycgfHzCoGlzTGVuZ3RoKG4pKSB7XG5cdFx0XHRcdFx0XHR2ICs9ICcgJyArIG47XG5cdFx0XHRcdFx0XHRpKys7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVzdWx0LnNpemUgPSB2O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG1hcChyZXN1bHQsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcblx0XHRyZXR1cm4gWydiYWNrZ3JvdW5kLScgKyBrZXksIHZhbHVlXTtcblx0fSk7XG59O1xuIiwidmFyIG1hcCA9IHJlcXVpcmUoJ21hcC1vYmonKTtcbnZhciByZXBlYXQgPSByZXF1aXJlKCdyZXBlYXQtZWxlbWVudCcpO1xuXG52YXIgZGlyZWN0aW9uYWwgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHR2YXIgdmFsdWVzID0gdmFsdWUuc3BsaXQoL1xccysvKTtcblxuXHRpZih2YWx1ZXMubGVuZ3RoID09PSAxKSB2YWx1ZXMgPSByZXBlYXQodmFsdWVzWzBdLCA0KTtcblx0ZWxzZSBpZih2YWx1ZXMubGVuZ3RoID09PSAyKSB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KHZhbHVlcyk7XG5cdGVsc2UgaWYodmFsdWVzLmxlbmd0aCA9PT0gMykgdmFsdWVzLnB1c2godmFsdWVzWzFdKTtcblx0ZWxzZSBpZih2YWx1ZXMubGVuZ3RoID4gNCkgcmV0dXJuO1xuXG5cdHJldHVybiBbXG5cdFx0J3RvcC1sZWZ0Jyxcblx0XHQndG9wLXJpZ2h0Jyxcblx0XHQnYm90dG9tLXJpZ2h0Jyxcblx0XHQnYm90dG9tLWxlZnQnXG5cdF0ucmVkdWNlKGZ1bmN0aW9uKGFjYywgZGlyZWN0aW9uLCBpKSB7XG5cdFx0YWNjW2RpcmVjdGlvbl0gPSB2YWx1ZXNbaV07XG5cdFx0cmV0dXJuIGFjYztcblx0fSwge30pO1xufTtcblxudmFyIGJvcmRlclJhZGl1cyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHZhciBsb25naGFuZCA9IGRpcmVjdGlvbmFsKHZhbHVlKTtcblxuXHRyZXR1cm4gbG9uZ2hhbmQgJiYgbWFwKGxvbmdoYW5kLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG5cdFx0cmV0dXJuIFsgJ2JvcmRlci0nICsga2V5ICsgJy1yYWRpdXMnLCB2YWx1ZV07XG5cdH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBib3JkZXJSYWRpdXM7XG4iLCJ2YXIgbWFwID0gcmVxdWlyZSgnbWFwLW9iaicpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJyk7XG52YXIgZGlyZWN0aW9uYWwgPSByZXF1aXJlKCcuL2RpcmVjdGlvbmFsJyk7XG52YXIgaXNDb2xvciA9IHJlcXVpcmUoJy4vaXMtY29sb3InKTtcbnZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXMtbGVuZ3RoJyk7XG52YXIgbm9ybWFsaXplID0gcmVxdWlyZSgnLi9ub3JtYWxpemUtY29sb3InKTtcblxudmFyIFdJRFRIID0gL14odGhpbnxtZWRpdW18dGhpY2spJC87XG52YXIgU1RZTEUgPSAvXihub25lfGhpZGRlbnxkb3R0ZWR8ZGFzaGVkfHNvbGlkfGRvdWJsZXxncm9vdmV8cmlkZ2V8aW5zZXR8b3V0c2V0KSQvaTtcbnZhciBLRVlXT1JEID0gL14oaW5oZXJpdHxpbml0aWFsKSQvaTtcblxudmFyIHN1ZmZpeCA9IGZ1bmN0aW9uKHN1ZmZpeCkge1xuXHRyZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcblx0XHR2YXIgbG9uZ2hhbmQgPSBkaXJlY3Rpb25hbCh2YWx1ZSk7XG5cblx0XHRyZXR1cm4gbG9uZ2hhbmQgJiYgbWFwKGxvbmdoYW5kLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gWydib3JkZXItJyArIGtleSArICctJyArIHN1ZmZpeCwgdmFsdWVdO1xuXHRcdH0pO1xuXHR9O1xufTtcblxudmFyIGRpcmVjdGlvbiA9IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuXHRyZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcblx0XHR2YXIgbG9uZ2hhbmQgPSBhbGwodmFsdWUpO1xuXG5cdFx0cmV0dXJuIGxvbmdoYW5kICYmIG1hcChsb25naGFuZCwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIFsnYm9yZGVyLScgKyBkaXJlY3Rpb24gKyAnLScgKyBrZXksIHZhbHVlXTtcblx0XHR9KTtcblx0fTtcbn07XG5cbnZhciBhbGwgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHR2YXIgdmFsdWVzID0gbm9ybWFsaXplKHZhbHVlKS5zcGxpdCgvXFxzKy8pO1xuXHR2YXIgZmlyc3QgPSB2YWx1ZXNbMF07XG5cblx0aWYodmFsdWVzLmxlbmd0aCA+IDMpIHJldHVybjtcblx0aWYodmFsdWVzLmxlbmd0aCA9PT0gMSAmJiBLRVlXT1JELnRlc3QoZmlyc3QpKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHdpZHRoOiBmaXJzdCxcblx0XHRcdHN0eWxlOiBmaXJzdCxcblx0XHRcdGNvbG9yOiBmaXJzdFxuXHRcdH07XG5cdH1cblxuXHR2YXIgcmVzdWx0ID0ge307XG5cdGZvcih2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdiA9IHZhbHVlc1tpXTtcblxuXHRcdGlmKFdJRFRILnRlc3QodikgfHwgaXNMZW5ndGgodikpIHtcblx0XHRcdGlmKHJlc3VsdC53aWR0aCkgcmV0dXJuO1xuXHRcdFx0cmVzdWx0LndpZHRoID0gdjtcblx0XHR9IGVsc2UgaWYoU1RZTEUudGVzdCh2KSkge1xuXHRcdFx0aWYocmVzdWx0LnN0eWxlKSByZXR1cm47XG5cdFx0XHRyZXN1bHQuc3R5bGUgPSB2O1xuXHRcdH0gZWxzZSBpZihpc0NvbG9yKHYpKSB7XG5cdFx0XHRpZihyZXN1bHQuY29sb3IpIHJldHVybjtcblx0XHRcdHJlc3VsdC5jb2xvciA9IHY7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIGJvcmRlciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHZhciBsb25naGFuZCA9IGFsbCh2YWx1ZSk7XG5cblx0cmV0dXJuIGxvbmdoYW5kICYmIE9iamVjdC5rZXlzKGxvbmdoYW5kKVxuXHRcdC5yZWR1Y2UoZnVuY3Rpb24oYWNjLCBrZXkpIHtcblx0XHRcdHZhciBwcm9wcyA9IGV4cG9ydHNba2V5XShsb25naGFuZFtrZXldKTtcblx0XHRcdHJldHVybiBleHRlbmQoYWNjLCBwcm9wcyk7XG5cdFx0fSwge30pO1xufTtcblxuYm9yZGVyLndpZHRoID0gc3VmZml4KCd3aWR0aCcpO1xuYm9yZGVyLnN0eWxlID0gc3VmZml4KCdzdHlsZScpO1xuYm9yZGVyLmNvbG9yID0gc3VmZml4KCdjb2xvcicpO1xuYm9yZGVyLnRvcCA9IGRpcmVjdGlvbigndG9wJyk7XG5ib3JkZXIucmlnaHQgPSBkaXJlY3Rpb24oJ3JpZ2h0Jyk7XG5ib3JkZXIuYm90dG9tID0gZGlyZWN0aW9uKCdib3R0b20nKTtcbmJvcmRlci5sZWZ0ID0gZGlyZWN0aW9uKCdsZWZ0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGJvcmRlcjtcbiIsInZhciByZXBlYXQgPSByZXF1aXJlKCdyZXBlYXQtZWxlbWVudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHZhciB2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgvXFxzKy8pO1xuXG5cdGlmKHZhbHVlcy5sZW5ndGggPT09IDEpIHZhbHVlcyA9IHJlcGVhdCh2YWx1ZXNbMF0sIDQpO1xuXHRlbHNlIGlmKHZhbHVlcy5sZW5ndGggPT09IDIpIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQodmFsdWVzKTtcblx0ZWxzZSBpZih2YWx1ZXMubGVuZ3RoID09PSAzKSB2YWx1ZXMucHVzaCh2YWx1ZXNbMV0pO1xuXHRlbHNlIGlmKHZhbHVlcy5sZW5ndGggPiA0KSByZXR1cm47XG5cblx0cmV0dXJuIFtcblx0XHQndG9wJyxcblx0XHQncmlnaHQnLFxuXHRcdCdib3R0b20nLFxuXHRcdCdsZWZ0J1xuXHRdLnJlZHVjZShmdW5jdGlvbihhY2MsIGRpcmVjdGlvbiwgaSkge1xuXHRcdGFjY1tkaXJlY3Rpb25dID0gdmFsdWVzW2ldO1xuXHRcdHJldHVybiBhY2M7XG5cdH0sIHt9KTtcbn07XG4iLCIvKipcbiBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYnJhbXN0ZWluL2Nzcy1mb250LXBhcnNlclxuICovXG5cbi8qKlxuICogQGVudW0ge251bWJlcn1cbiAqL1xudmFyIHN0YXRlcyA9IHtcblx0VkFSSUFUSU9OOiAxLFxuXHRMSU5FX0hFSUdIVDogMixcblx0Rk9OVF9GQU1JTFk6IDNcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGlucHV0XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlKGlucHV0KSB7XG5cdHZhciBzdGF0ZSA9IHN0YXRlcy5WQVJJQVRJT04sXG5cdFx0XHRidWZmZXIgPSAnJyxcblx0XHRcdHJlc3VsdCA9IHtcblx0XHRcdFx0J2ZvbnQtZmFtaWx5JzogW11cblx0XHRcdH07XG5cblx0Zm9yICh2YXIgYywgaSA9IDA7IGMgPSBpbnB1dC5jaGFyQXQoaSk7IGkgKz0gMSkge1xuXHRcdGlmIChzdGF0ZSA9PT0gc3RhdGVzLkZPTlRfRkFNSUxZICYmIChjID09PSAnXCInIHx8IGMgPT09IFwiJ1wiKSkge1xuXHRcdFx0dmFyIGluZGV4ID0gaSArIDE7XG5cblx0XHRcdC8vIGNvbnN1bWUgdGhlIGVudGlyZSBzdHJpbmdcblx0XHRcdGRvIHtcblx0XHRcdFx0aW5kZXggPSBpbnB1dC5pbmRleE9mKGMsIGluZGV4KSArIDE7XG5cdFx0XHRcdGlmICghaW5kZXgpIHtcblx0XHRcdFx0XHQvLyBJZiBhIHN0cmluZyBpcyBub3QgY2xvc2VkIGJ5IGEgJyBvciBcIiByZXR1cm4gbnVsbC5cblx0XHRcdFx0XHQvLyBUT0RPOiBDaGVjayB0byBzZWUgaWYgdGhpcyBpcyBjb3JyZWN0LlxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9IHdoaWxlIChpbnB1dC5jaGFyQXQoaW5kZXggLSAyKSA9PT0gJ1xcXFwnKTtcblxuXHRcdFx0cmVzdWx0Wydmb250LWZhbWlseSddLnB1c2goaW5wdXQuc2xpY2UoaSArIDEsIGluZGV4IC0gMSkucmVwbGFjZSgvXFxcXCgnfFwiKS9nLCBcIiQxXCIpKTtcblxuXHRcdFx0aSA9IGluZGV4IC0gMTtcblx0XHRcdGJ1ZmZlciA9ICcnO1xuXHRcdH0gZWxzZSBpZiAoc3RhdGUgPT09IHN0YXRlcy5GT05UX0ZBTUlMWSAmJiBjID09PSAnLCcpIHtcblx0XHRcdGlmICghL15cXHMqJC8udGVzdChidWZmZXIpKSB7XG5cdFx0XHRcdHJlc3VsdFsnZm9udC1mYW1pbHknXS5wdXNoKGJ1ZmZlci5yZXBsYWNlKC9eXFxzK3xcXHMrJC8sICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykpO1xuXHRcdFx0XHRidWZmZXIgPSAnJztcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHN0YXRlID09PSBzdGF0ZXMuVkFSSUFUSU9OICYmIChjID09PSAnICcgfHwgYyA9PT0gJy8nKSkge1xuXHRcdFx0aWYgKC9eKCh4eHx4KS1sYXJnZXwoeHh8cyktc21hbGx8c21hbGx8bGFyZ2V8bWVkaXVtKSQvLnRlc3QoYnVmZmVyKSB8fFxuXHRcdFx0XHRcdC9eKGxhcmd8c21hbGwpZXIkLy50ZXN0KGJ1ZmZlcikgfHxcblx0XHRcdFx0XHQvXihcXCt8LSk/KFswLTldKlxcLik/WzAtOV0rKGVtfGV4fGNofHJlbXx2aHx2d3x2bWlufHZtYXh8cHh8bW18Y218aW58cHR8cGN8JSkkLy50ZXN0KGJ1ZmZlcikpIHtcblx0XHRcdFx0c3RhdGUgPSBjID09PSAnLycgPyBzdGF0ZXMuTElORV9IRUlHSFQgOiBzdGF0ZXMuRk9OVF9GQU1JTFk7XG5cdFx0XHRcdHJlc3VsdFsnZm9udC1zaXplJ10gPSBidWZmZXI7XG5cdFx0XHR9IGVsc2UgaWYgKC9eKGl0YWxpY3xvYmxpcXVlKSQvLnRlc3QoYnVmZmVyKSkge1xuXHRcdFx0XHRyZXN1bHRbJ2ZvbnQtc3R5bGUnXSA9IGJ1ZmZlcjtcblx0XHRcdH0gZWxzZSBpZiAoL15zbWFsbC1jYXBzJC8udGVzdChidWZmZXIpKSB7XG5cdFx0XHRcdHJlc3VsdFsnZm9udC12YXJpYW50J10gPSBidWZmZXI7XG5cdFx0XHR9IGVsc2UgaWYgKC9eKGJvbGQoZXIpP3xsaWdodGVyfG5vcm1hbHxbMS05XTAwKSQvLnRlc3QoYnVmZmVyKSkge1xuXHRcdFx0XHRyZXN1bHRbJ2ZvbnQtd2VpZ2h0J10gPSBidWZmZXI7XG5cdFx0XHR9IGVsc2UgaWYgKC9eKCh1bHRyYXxleHRyYXxzZW1pKS0pPyhjb25kZW5zZWR8ZXhwYW5kZWQpJC8udGVzdChidWZmZXIpKSB7XG5cdFx0XHRcdHJlc3VsdFsnZm9udC1zdHJldGNoJ10gPSBidWZmZXI7XG5cdFx0XHR9XG5cdFx0XHRidWZmZXIgPSAnJztcblx0XHR9IGVsc2UgaWYgKHN0YXRlID09PSBzdGF0ZXMuTElORV9IRUlHSFQgJiYgYyA9PT0gJyAnKSB7XG5cdFx0XHRpZiAoL14oXFwrfC0pPyhbMC05XSpcXC4pP1swLTldKyhlbXxleHxjaHxyZW18dmh8dnd8dm1pbnx2bWF4fHB4fG1tfGNtfGlufHB0fHBjfCUpPyQvLnRlc3QoYnVmZmVyKSkge1xuXHRcdFx0XHRyZXN1bHRbJ2xpbmUtaGVpZ2h0J10gPSBidWZmZXI7XG5cdFx0XHR9XG5cdFx0XHRzdGF0ZSA9IHN0YXRlcy5GT05UX0ZBTUlMWTtcblx0XHRcdGJ1ZmZlciA9ICcnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRidWZmZXIgKz0gYztcblx0XHR9XG5cdH1cblxuXHRpZiAoc3RhdGUgPT09IHN0YXRlcy5GT05UX0ZBTUlMWSAmJiAhL15cXHMqJC8udGVzdChidWZmZXIpKSB7XG5cdFx0cmVzdWx0Wydmb250LWZhbWlseSddLnB1c2goYnVmZmVyLnJlcGxhY2UoL15cXHMrfFxccyskLywgJycpLnJlcGxhY2UoL1xccysvZywgJyAnKSk7XG5cdH1cblxuXHRpZiAocmVzdWx0Wydmb250LXNpemUnXSAmJiByZXN1bHRbJ2ZvbnQtZmFtaWx5J10ubGVuZ3RoKSB7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdGlmKC9eKGluaGVyaXR8aW5pdGlhbCkkLy50ZXN0KGlucHV0KSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHQnZm9udC1zaXplJzogaW5wdXQsXG5cdFx0XHQnbGluZS1oZWlnaHQnOiBpbnB1dCxcblx0XHRcdCdmb250LXN0eWxlJzogaW5wdXQsXG5cdFx0XHQnZm9udC13ZWlnaHQnOiBpbnB1dCxcblx0XHRcdCdmb250LXZhcmlhbnQnOiBpbnB1dCxcblx0XHRcdCdmb250LXN0cmV0Y2gnOiBpbnB1dCxcblx0XHRcdCdmb250LWZhbWlseSc6IGlucHV0XG5cdFx0fVxuXHR9XG5cblx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9cXHMqXFwvXFxzKi8sICcvJyk7XG5cdHZhciByZXN1bHQgPSBwYXJzZShpbnB1dCk7XG5cblx0aWYocmVzdWx0KSB7XG5cdFx0cmVzdWx0Wydmb250LWZhbWlseSddID0gcmVzdWx0Wydmb250LWZhbWlseSddLm1hcChmdW5jdGlvbihmYW1pbHkpIHtcblx0XHRcdHJldHVybiAvXihzZXJpZnxzYW5zLXNlcmlmfG1vbm9zcGFjZXxjdXJzaXZlfGZhbnRhc3kpJC8udGVzdChmYW1pbHkpID8gZmFtaWx5IDogKCdcIicgKyBmYW1pbHkgKyAnXCInKTtcblx0XHR9KS5qb2luKCcsICcpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCJ2YXIgbWFwID0gcmVxdWlyZSgnbWFwLW9iaicpO1xuXG52YXIgZm9udCA9IHJlcXVpcmUoJy4vZm9udCcpO1xudmFyIGJvcmRlciA9IHJlcXVpcmUoJy4vYm9yZGVyJyk7XG52YXIgYm9yZGVyUmFkaXVzID0gcmVxdWlyZSgnLi9ib3JkZXItcmFkaXVzJyk7XG52YXIgYmFja2dyb3VuZCA9IHJlcXVpcmUoJy4vYmFja2dyb3VuZCcpO1xudmFyIGRpcmVjdGlvbmFsID0gcmVxdWlyZSgnLi9kaXJlY3Rpb25hbCcpO1xudmFyIG91dGxpbmUgPSByZXF1aXJlKCcuL291dGxpbmUnKTtcblxudmFyIHByZWZpeCA9IGZ1bmN0aW9uKHByZWZpeCkge1xuXHRyZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcblx0XHR2YXIgbG9uZ2hhbmQgPSBkaXJlY3Rpb25hbCh2YWx1ZSk7XG5cblx0XHRyZXR1cm4gbG9uZ2hhbmQgJiYgbWFwKGxvbmdoYW5kLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gW3ByZWZpeCArICctJyArIGtleSwgdmFsdWVdO1xuXHRcdH0pO1xuXHR9O1xufTtcblxudmFyIHNob3J0aGFuZCA9IHtcblx0Zm9udDogZm9udCxcblx0cGFkZGluZzogcHJlZml4KCdwYWRkaW5nJyksXG5cdG1hcmdpbjogcHJlZml4KCdtYXJnaW4nKSxcblx0Ym9yZGVyOiBib3JkZXIsXG5cdCdib3JkZXItd2lkdGgnOiBib3JkZXIud2lkdGgsXG5cdCdib3JkZXItc3R5bGUnOiBib3JkZXIuc3R5bGUsXG5cdCdib3JkZXItY29sb3InOiBib3JkZXIuY29sb3IsXG5cdCdib3JkZXItdG9wJzogYm9yZGVyLnRvcCxcblx0J2JvcmRlci1yaWdodCc6IGJvcmRlci5yaWdodCxcblx0J2JvcmRlci1ib3R0b20nOiBib3JkZXIuYm90dG9tLFxuXHQnYm9yZGVyLWxlZnQnOiBib3JkZXIubGVmdCxcblx0J2JvcmRlci1yYWRpdXMnOiBib3JkZXJSYWRpdXMsXG5cdGJhY2tncm91bmQ6IGJhY2tncm91bmQsXG5cdG91dGxpbmU6IG91dGxpbmVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocHJvcGVydHksIHZhbHVlKSB7XG5cdHZhciBub3JtYWxpemVkID0gdmFsdWUudHJpbSgpO1xuXHR2YXIgaW1wb3J0YW50ID0gL1xccyshaW1wb3J0YW50JC8udGVzdChub3JtYWxpemVkKTtcblx0bm9ybWFsaXplZCA9IG5vcm1hbGl6ZWQucmVwbGFjZSgvXFxzKyFpbXBvcnRhbnQkLywgJycpO1xuXG5cdHZhciBwYXJzZSA9IHNob3J0aGFuZFtwcm9wZXJ0eV07XG5cdHZhciBsb25naGFuZCA9IHBhcnNlICYmIHBhcnNlKG5vcm1hbGl6ZWQpO1xuXG5cdGlmKCFsb25naGFuZCkgcmV0dXJuO1xuXHRpZighaW1wb3J0YW50KSByZXR1cm4gbG9uZ2hhbmQ7XG5cblx0cmV0dXJuIG1hcChsb25naGFuZCwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiBba2V5LCB2YWx1ZSArICcgIWltcG9ydGFudCddO1xuXHR9KTtcbn07XG4iLCJ2YXIgaGV4ID0gcmVxdWlyZSgnaGV4LWNvbG9yLXJlZ2V4Jyk7XG52YXIgaHNsYSA9IHJlcXVpcmUoJ2hzbGEtcmVnZXgnKTtcbnZhciBoc2wgPSByZXF1aXJlKCdoc2wtcmVnZXgnKTtcbnZhciByZ2IgPSByZXF1aXJlKCdyZ2ItcmVnZXgnKTtcbnZhciByZ2JhID0gcmVxdWlyZSgncmdiYS1yZWdleCcpO1xudmFyIGtleXdvcmRzID0gcmVxdWlyZSgnY3NzLWNvbG9yLW5hbWVzJyk7XG5cbnZhciBIRVggPSBuZXcgUmVnRXhwKCdeJyArIGhleCgpLnNvdXJjZSArICckJywgJ2knKTtcbnZhciBIU0xBID0gaHNsYSh7IGV4YWN0OiB0cnVlIH0pO1xudmFyIEhTTCA9IGhzbCh7IGV4YWN0OiB0cnVlIH0pO1xudmFyIFJHQiA9IHJnYih7IGV4YWN0OiB0cnVlIH0pO1xudmFyIFJHQkEgPSByZ2JhKHsgZXhhY3Q6IHRydWUgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG5cdHJldHVybiAhIWtleXdvcmRzW3ZhbHVlXSB8fFxuXHRcdHZhbHVlID09PSAnY3VycmVudGNvbG9yJyB8fFxuXHRcdHZhbHVlID09PSAndHJhbnNwYXJlbnQnIHx8XG5cdFx0SEVYLnRlc3QodmFsdWUpIHx8XG5cdFx0SFNMQS50ZXN0KHZhbHVlKSB8fFxuXHRcdEhTTC50ZXN0KHZhbHVlKSB8fFxuXHRcdFJHQi50ZXN0KHZhbHVlKSB8fFxuXHRcdFJHQkEudGVzdCh2YWx1ZSk7XG59O1xuIiwidmFyIExFTkdUSCA9IC9eKFxcK3wtKT8oWzAtOV0qXFwuKT9bMC05XSsoZW18ZXh8Y2h8cmVtfHZofHZ3fHZtaW58dm1heHxweHxtbXxjbXxpbnxwdHxwY3wlKSQvaTtcbnZhciBaRVJPID0gL14oXFwrfC0pPygwKlxcLik/MCskLztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRyZXR1cm4gTEVOR1RILnRlc3QodmFsdWUpIHx8IFpFUk8udGVzdCh2YWx1ZSk7XG59O1xuIiwidmFyIGhzbGEgPSByZXF1aXJlKCdoc2xhLXJlZ2V4Jyk7XG52YXIgaHNsID0gcmVxdWlyZSgnaHNsLXJlZ2V4Jyk7XG52YXIgcmdiID0gcmVxdWlyZSgncmdiLXJlZ2V4Jyk7XG52YXIgcmdiYSA9IHJlcXVpcmUoJ3JnYmEtcmVnZXgnKTtcblxudmFyIEZVTkNUSU9OUyA9IFtcblx0aHNsYSgpLFxuXHRoc2woKSxcblx0cmdiKCksXG5cdHJnYmEoKVxuXTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRyZXR1cm4gRlVOQ1RJT05TLnJlZHVjZShmdW5jdGlvbihhY2MsIGZ1bmMpIHtcblx0XHRyZXR1cm4gYWNjLnJlcGxhY2UoZnVuYywgZnVuY3Rpb24obWF0Y2gpIHtcblx0XHRcdHJldHVybiBtYXRjaC5yZXBsYWNlKC9cXHMrL2csICcnKTtcblx0XHR9KTtcblx0fSwgdmFsdWUpO1xufTtcbiIsInZhciBtYXAgPSByZXF1aXJlKCdtYXAtb2JqJyk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZSgneHRlbmQnKTtcbnZhciBpc0NvbG9yID0gcmVxdWlyZSgnLi9pcy1jb2xvcicpO1xudmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pcy1sZW5ndGgnKTtcbnZhciBub3JtYWxpemUgPSByZXF1aXJlKCcuL25vcm1hbGl6ZS1jb2xvcicpO1xuXG52YXIgV0lEVEggPSAvXih0aGlufG1lZGl1bXx0aGljaykkLztcbnZhciBTVFlMRSA9IC9eKG5vbmV8aGlkZGVufGRvdHRlZHxkYXNoZWR8c29saWR8ZG91YmxlfGdyb292ZXxyaWRnZXxpbnNldHxvdXRzZXQpJC9pO1xudmFyIEtFWVdPUkQgPSAvXihpbmhlcml0fGluaXRpYWwpJC9pO1xuXG52YXIgb3V0bGluZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHZhciB2YWx1ZXMgPSBub3JtYWxpemUodmFsdWUpLnNwbGl0KC9cXHMrLyk7XG5cblx0aWYodmFsdWVzLmxlbmd0aCA+IDMpIHJldHVybjtcblx0aWYgKHZhbHVlcy5sZW5ndGggPT09IDEgJiYgS0VZV09SRC50ZXN0KHZhbHVlc1swXSkpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0J291dGxpbmUtd2lkdGgnOiB2YWx1ZXNbMF0sXG5cdFx0XHQnb3V0bGluZS1zdHlsZSc6IHZhbHVlc1swXSxcblx0XHRcdCdvdXRsaW5lLWNvbG9yJzogdmFsdWVzWzBdXG5cdFx0fTtcblx0fVxuXG5cdHZhciByZXN1bHQgPSB7fTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB2ID0gdmFsdWVzW2ldO1xuXG5cdFx0aWYgKGlzTGVuZ3RoKHYpIHx8IFdJRFRILnRlc3QodikpIHtcblx0XHRcdGlmKHJlc3VsdFsnb3V0bGluZS13aWR0aCddKSByZXR1cm47XG5cdFx0XHRyZXN1bHRbJ291dGxpbmUtd2lkdGgnXSA9IHY7XG5cdFx0fSBlbHNlIGlmIChTVFlMRS50ZXN0KHYpKSB7XG5cdFx0XHRpZihyZXN1bHRbJ291dGxpbmUtc3R5bGUnXSkgcmV0dXJuO1xuXHRcdFx0cmVzdWx0WydvdXRsaW5lLXN0eWxlJ10gPSB2O1xuXHRcdH0gZWxzZSBpZiAoaXNDb2xvcih2KSkge1xuXHRcdFx0aWYocmVzdWx0WydvdXRsaW5lLWNvbG9yJ10pIHJldHVybjtcblx0XHRcdHJlc3VsdFsnb3V0bGluZS1jb2xvciddID0gdjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gb3V0bGluZTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIC91cmxcXCguKj9cXCkvaWc7XG59XG4iLCIvKiFcbiAqIGhleC1jb2xvci1yZWdleCA8aHR0cHM6Ly9naXRodWIuY29tL3JlZ2V4cHMvaGV4LWNvbG9yLXJlZ2V4PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBDaGFybGlrZSBNaWtlIFJlYWdlbnQgPEB0dW5uY2tvQ29yZT4gKGh0dHA6Ly93d3cudHVubmNrb2NvcmUudGspXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGV4Q29sb3JSZWdleChvcHRzKSB7XG4gIG9wdHMgPSBvcHRzICYmIHR5cGVvZiBvcHRzID09PSAnb2JqZWN0JyA/IG9wdHMgOiB7fVxuXG4gIHJldHVybiBvcHRzLnN0cmljdFxuICAgID8gL14jKFthLWYwLTldezMsNH18W2EtZjAtOV17NH0oPzpbYS1mMC05XXsyfSl7MSwyfSlcXGIkL2lcbiAgICA6IC8jKFthLWYwLTldezN9fFthLWYwLTldezR9KD86W2EtZjAtOV17Mn0pezAsMn0pXFxiL2dpXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaHNsUmVnZXgob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICByZXR1cm4gb3B0aW9ucy5leGFjdCA/XG4gICAgL15oc2xcXChcXHMqKFxcZCspXFxzKixcXHMqKFxcZCooPzpcXC5cXGQrKT8lKVxccyosXFxzKihcXGQqKD86XFwuXFxkKyk/JSlcXCkkLyA6XG4gICAgL2hzbFxcKFxccyooXFxkKylcXHMqLFxccyooXFxkKig/OlxcLlxcZCspPyUpXFxzKixcXHMqKFxcZCooPzpcXC5cXGQrKT8lKVxcKS9pZztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoc2xhUmVnZXgob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICByZXR1cm4gb3B0aW9ucy5leGFjdCA/XG4gICAgL15oc2xhXFwoKFxcZCspLFxccyooW1xcZC5dKyklLFxccyooW1xcZC5dKyklLFxccyooXFxkKig/OlxcLlxcZCspPylcXCkkLyA6XG4gICAgL2hzbGFcXCgoXFxkKyksXFxzKihbXFxkLl0rKSUsXFxzKihbXFxkLl0rKSUsXFxzKihcXGQqKD86XFwuXFxkKyk/KVxcKS9pZztcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgY2IpIHtcblx0dmFyIHJldCA9IHt9O1xuXHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGtleSA9IGtleXNbaV07XG5cdFx0dmFyIHJlcyA9IGNiKGtleSwgb2JqW2tleV0sIG9iaik7XG5cdFx0cmV0W3Jlc1swXV0gPSByZXNbMV07XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufTtcbiIsIi8qIVxuICogcmVwZWF0LWVsZW1lbnQgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3JlcGVhdC1lbGVtZW50PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVwZWF0KGVsZSwgbnVtKSB7XG4gIGlmIChBcnJheS5wcm90b3R5cGUuZmlsbCkge1xuICAgIHJldHVybiBuZXcgQXJyYXkobnVtKS5maWxsKGVsZSk7XG4gIH1cblxuICB2YXIgYXJyID0gbmV3IEFycmF5KG51bSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgIGFycltpXSA9IGVsZTtcbiAgfVxuXG4gIHJldHVybiBhcnI7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJnYlJlZ2V4KG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgcmV0dXJuIG9wdGlvbnMuZXhhY3QgP1xuICAgIC9ecmdiXFwoKFxcZHsxLDN9KSxcXHMqKFxcZHsxLDN9KSxcXHMqKFxcZHsxLDN9KVxcKSQvIDpcbiAgICAvcmdiXFwoKFxcZHsxLDN9KSxcXHMqKFxcZHsxLDN9KSxcXHMqKFxcZHsxLDN9KVxcKS9pZztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZ2JhUmVnZXgob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICByZXR1cm4gb3B0aW9ucy5leGFjdCA/XG4gICAgL15yZ2JhXFwoKFxcZHsxLDN9KSxcXHMqKFxcZHsxLDN9KSxcXHMqKFxcZHsxLDN9KSxcXHMqKFxcZCooPzpcXC5cXGQrKT8pXFwpJC8gOlxuICAgIC9yZ2JhXFwoKFxcZHsxLDN9KSxcXHMqKFxcZHsxLDN9KSxcXHMqKFxcZHsxLDN9KSxcXHMqKFxcZCooPzpcXC5cXGQrKT8pXFwpL2lnO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJleHBvcnQgY29uc3QgTk9fVkFMSURBVElPTiA9IGZhbHNlO1xyXG5leHBvcnQgY29uc3QgU01BTExfT1VUUFVUID0gZmFsc2U7XHJcbmV4cG9ydCBjb25zdCBPVVRQVVRfRk9SX1dFQiA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGNvbnN0IExPQURfUkdCX0NPTlZFUlRFUiA9IHRydWU7XHJcbmV4cG9ydCBjb25zdCBMT0FEX0NTU19FWFBBTkRFUiA9IGZhbHNlOyIsImltcG9ydCB7IExPQURfQ1NTX0VYUEFOREVSIH0gZnJvbSAnQGVudic7XG5pbXBvcnQgY3NzU2hvcnRoYW5kRXhwYW5kIGZyb20gJ2Nzcy1zaG9ydGhhbmQtZXhwYW5kJztcblxuZXhwb3J0IGVudW0gVW53YW50ZWRDc3NQcm9wZXJ0eU5hbWVzIHtcbiAgICBsZW5ndGggPSAnbGVuZ3RoJyxcbiAgICBnZXRQcm9wZXJ0eVByaW9yaXR5ID0gJ2dldFByb3BlcnR5UHJpb3JpdHknLFxuICAgIGdldFByb3BlcnR5VmFsdWUgPSAnZ2V0UHJvcGVydHlWYWx1ZScsXG4gICAgaXRlbSA9ICdpdGVtJyxcbiAgICByZW1vdmVQcm9wZXJ0eSA9ICdyZW1vdmVQcm9wZXJ0eScsXG4gICAgc2V0UHJvcGVydHkgPSAnc2V0UHJvcGVydHknLFxuICAgIHBhcmVudFJ1bGUgPSAncGFyZW50UnVsZScsXG59XG5cbmV4cG9ydCBlbnVtIENzc0NvbG9yUHJvcGVydHlOYW1lcyB7XG4gICAgYmFja2dyb3VuZENvbG9yID0gJ2JhY2tncm91bmRDb2xvcicsXG4gICAgYm9yZGVyQmxvY2tFbmRDb2xvciA9ICdib3JkZXJCbG9ja0VuZENvbG9yJyxcbiAgICBib3JkZXJCbG9ja1N0YXJ0Q29sb3IgPSAnYm9yZGVyQmxvY2tTdGFydENvbG9yJyxcbiAgICBib3JkZXJCb3R0b21Db2xvciA9ICdib3JkZXJCb3R0b21Db2xvcicsXG4gICAgYm9yZGVyQ29sb3IgPSAnYm9yZGVyQ29sb3InLFxuICAgIGJvcmRlcklubGluZUVuZENvbG9yID0gJ2JvcmRlcklubGluZUVuZENvbG9yJyxcbiAgICBib3JkZXJJbmxpbmVTdGFydENvbG9yID0gJ2JvcmRlcklubGluZVN0YXJ0Q29sb3InLFxuICAgIGJvcmRlckxlZnRDb2xvciA9ICdib3JkZXJMZWZ0Q29sb3InLFxuICAgIGJvcmRlclJpZ2h0Q29sb3IgPSAnYm9yZGVyUmlnaHRDb2xvcicsXG4gICAgYm9yZGVyVG9wQ29sb3IgPSAnYm9yZGVyVG9wQ29sb3InLFxuICAgIGNhcmV0Q29sb3IgPSAnY2FyZXRDb2xvcicsXG4gICAgY29sb3IgPSAnY29sb3InLFxuICAgIGNvbHVtblJ1bGVDb2xvciA9ICdjb2x1bW5SdWxlQ29sb3InLFxuICAgIGZsb29kQ29sb3IgPSAnZmxvb2RDb2xvcicsXG4gICAgbGlnaHRpbmdDb2xvciA9ICdsaWdodGluZ0NvbG9yJyxcbiAgICBvdXRsaW5lQ29sb3IgPSAnb3V0bGluZUNvbG9yJyxcbiAgICBzdG9wQ29sb3IgPSAnc3RvcENvbG9yJyxcbiAgICB0ZXh0RGVjb3JhdGlvbkNvbG9yID0gJ3RleHREZWNvcmF0aW9uQ29sb3InLFxuICAgIHRleHRFbXBoYXNpc0NvbG9yID0gJ3RleHRFbXBoYXNpc0NvbG9yJyxcbiAgICB3ZWJraXRUYXBIaWdobGlnaHRDb2xvciA9ICd3ZWJraXRUYXBIaWdobGlnaHRDb2xvcicsXG4gICAgd2Via2l0VGV4dEZpbGxDb2xvciA9ICd3ZWJraXRUZXh0RmlsbENvbG9yJyxcbiAgICB3ZWJraXRUZXh0U3Ryb2tlQ29sb3IgPSAnd2Via2l0VGV4dFN0cm9rZUNvbG9yJyxcbn1cblxuZXhwb3J0IGNvbnN0IENzc1Nob3J0aGFuZEV4cGFuZGVycyA9IChcbiAgICBMT0FEX0NTU19FWFBBTkRFUlxuICAgICAgICA/IHtcbiAgICAgICAgICAgICdjc3Mtc2hvcnRoYW5kLWV4cGFuZCc6IHtcbiAgICAgICAgICAgICAgICBleHBhbmQ6IGNzc1Nob3J0aGFuZEV4cGFuZCxcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWRQcm9wZXJ0aWVzOiBbXG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQnLFxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZycsXG4gICAgICAgICAgICAgICAgICAgICdtYXJnaW4nLFxuICAgICAgICAgICAgICAgICAgICAnYm9yZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlcldpZHRoJyxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlclN0eWxlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlckNvbG9yJyxcbiAgICAgICAgICAgICAgICAgICAgJ2JvcmRlclRvcCcsXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXJSaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXJCb3R0b20nLFxuICAgICAgICAgICAgICAgICAgICAnYm9yZGVyTGVmdCcsXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXJSYWRpdXMnLFxuICAgICAgICAgICAgICAgICAgICAnb3V0bGluZScsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICAgOiB7fVxuKSBhcyB7IFtleHBhbmRlck5hbWU6IHN0cmluZ106IHsgZXhwYW5kOiBhbnksIHN1cHBvcnRlZFByb3BlcnRpZXM6IHN0cmluZ1tdIH0gfTsiLCJcbmV4cG9ydCBmdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHk6IFByb3BlcnR5S2V5KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3BlcnR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEludmFsaWRLZXlzKG9iajogYW55LCB2YWxpZEtleXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHZhbGlkS2V5c1NldCA9IG5ldyBTZXQodmFsaWRLZXlzKTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5maWx0ZXIob2JqS2V5ID0+ICF2YWxpZEtleXNTZXQuaGFzKG9iaktleSkpO1xufSIsImltcG9ydCB7IERvbXNpQXR0cmlidXRlU2VsZWN0b3IsIERvbXNpQXR0cmlidXRlVmFsdWVTZWxlY3RvciB9IGZyb20gJy4uL3R5cGVzL3NlbGVjdG9ycy9hdHRyaWJ1dGUtc2VsZWN0b3InO1xyXG5pbXBvcnQgeyBEb21zaUNoaWxkcmVuU2VsZWN0b3IgfSBmcm9tICcuLi90eXBlcy9zZWxlY3RvcnMvY2hpbGRyZW4tc2VsZWN0b3InO1xyXG5pbXBvcnQgeyBEb21zaUNzc1NlbGVjdG9yIH0gZnJvbSAnLi4vdHlwZXMvc2VsZWN0b3JzL2Nzcy1zZWxlY3Rvcic7XHJcbmltcG9ydCB7IERvbXNpUHJvcGVydHlTZWxlY3RvciB9IGZyb20gJy4uL3R5cGVzL3NlbGVjdG9ycy9wcm9wZXJ0eS1zZWxlY3Rvcic7XHJcbmltcG9ydCB7IERvbXNpVGFnTmFtZVNlbGVjdG9yIH0gZnJvbSAnLi4vdHlwZXMvc2VsZWN0b3JzL3RhZy1uYW1lLXNlbGVjdG9yJztcclxuaW1wb3J0IHsgRG9tc2lUZXh0U2VsZWN0b3IgfSBmcm9tICcuLi90eXBlcy9zZWxlY3RvcnMvdGV4dC1zZWxlY3Rvcic7XHJcbmltcG9ydCB7IElEb21zaU5vZGVTZWxlY3RvciBhcyBEb21zaU5vZGVTZWxlY3RvciB9IGZyb20gJy4uL3R5cGVzL3NlbGVjdG9ycy9ub2RlLXNlbGVjdG9yJztcclxuaW1wb3J0IHsgU2VsZWN0b3JWYWxpZGF0b3IsIFZhbGlkYXRlRnVuY3Rpb25HZXR0ZXIgfSBmcm9tICcuLi90eXBlcy92YWxpZGF0b3Ivc2VsZWN0b3ItdmFsaWRhdG9yJztcclxuaW1wb3J0IHsgRG9tc2lWYWx1ZVNlbGVjdG9yIH0gZnJvbSAnLi4vdHlwZXMvc2VsZWN0b3JzL3ZhbHVlLXNlbGVjdG9yJztcclxuaW1wb3J0IHsgQ3NzQ29sb3JQcm9wZXJ0eU5hbWVzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2Nzcy1zZWxlY3Rvcic7XHJcbmltcG9ydCB7IGdldEludmFsaWRLZXlzIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0JztcclxuaW1wb3J0IHsgVmFsaWRhdG9yRXJyb3IgfSBmcm9tICcuLi90eXBlcy92YWxpZGF0b3IvdmFsaWRhdG9yLWVycm9ycyc7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgY29uc3QgRG9tc2lOb2RlU2VsZWN0b3JWYWxpZGF0b3IgPSB7XHJcbiAgICBzZWxlY3Rvck5hbWU6ICdOb2RlU2VsZWN0b3InLFxyXG4gICAgdmFsaWRhdGU6IChzZWxlY3RvcjogRG9tc2lOb2RlU2VsZWN0b3IsIGdldFZhbGlkYXRvcjogVmFsaWRhdGVGdW5jdGlvbkdldHRlcjxhbnk+KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRhdG9yRXJyb3JzID0gW10gYXMgVmFsaWRhdG9yRXJyb3JbXTtcclxuXHJcbiAgICAgICAgY29uc3QgdmFsaWRGaWVsZHMgPSBbJ3RhZ05hbWUnLCAnYXR0cmlidXRlJywgJ3Byb3BlcnR5JywgJ2NzcycsICd0ZXh0JywgJ2NoaWxkcmVuJ107XHJcbiAgICAgICAgY29uc3QgaW52YWxpZEZpZWxkcyA9IGdldEludmFsaWRLZXlzKHNlbGVjdG9yLCB2YWxpZEZpZWxkcyk7XHJcbiAgICAgICAgdmFsaWRhdG9yRXJyb3JzLnB1c2goLi4uaW52YWxpZEZpZWxkcy5tYXAoaW52YWxpZEZpZWxkID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdJbnZhbGlkIGZpZWxkJyxcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBpbnZhbGlkRmllbGQsXHJcbiAgICAgICAgICAgIH0gYXMgVmFsaWRhdG9yRXJyb3I7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB2YWxpZGF0b3JFcnJvcnMucHVzaCguLi5nZXRWYWxpZGF0b3IoJ3RhZ05hbWUnKSh1bmRlZmluZWQsIHVuZGVmaW5lZCBhcyB1bmtub3duIGFzIFNlbGVjdG9yVmFsaWRhdG9yPGFueT4pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRvckVycm9ycztcclxuICAgIH0sXHJcbn0gYXMgU2VsZWN0b3JWYWxpZGF0b3I8RG9tc2lOb2RlU2VsZWN0b3I+O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyBpbXBvcnQgeyBEb21zaUF0dHJpYnV0ZVNlbGVjdG9yLCBEb21zaUF0dHJpYnV0ZVZhbHVlU2VsZWN0b3IgfSBmcm9tICcuLi90eXBlcy9zZWxlY3RvcnMvYXR0cmlidXRlLXNlbGVjdG9yJztcclxuLy8gaW1wb3J0IHsgRG9tc2lDaGlsZHJlblNlbGVjdG9yIH0gZnJvbSAnLi4vdHlwZXMvc2VsZWN0b3JzL2NoaWxkcmVuLXNlbGVjdG9yJztcclxuLy8gaW1wb3J0IHsgRG9tc2lDc3NTZWxlY3RvciB9IGZyb20gJy4uL3R5cGVzL3NlbGVjdG9ycy9jc3Mtc2VsZWN0b3InO1xyXG4vLyBpbXBvcnQgeyBEb21zaVByb3BlcnR5U2VsZWN0b3IgfSBmcm9tICcuLi90eXBlcy9zZWxlY3RvcnMvcHJvcGVydHktc2VsZWN0b3InO1xyXG4vLyBpbXBvcnQgeyBEb21zaVRhZ05hbWVTZWxlY3RvciB9IGZyb20gJy4uL3R5cGVzL3NlbGVjdG9ycy90YWctbmFtZS1zZWxlY3Rvcic7XHJcbi8vIGltcG9ydCB7IERvbXNpVGV4dFNlbGVjdG9yIH0gZnJvbSAnLi4vdHlwZXMvc2VsZWN0b3JzL3RleHQtc2VsZWN0b3InO1xyXG4vLyBpbXBvcnQgeyBJRG9tc2lOb2RlU2VsZWN0b3IgYXMgRG9tc2lOb2RlU2VsZWN0b3IgfSBmcm9tICcuLi90eXBlcy9zZWxlY3RvcnMvbm9kZS1zZWxlY3Rvcic7XHJcbi8vIGltcG9ydCB7IFNlbGVjdG9yVmFsaWRhdG9yIH0gZnJvbSAnLi4vdHlwZXMvdmFsaWRhdG9yL3NlbGVjdG9yLXZhbGlkYXRvcic7XHJcbi8vIGltcG9ydCB7IERvbXNpVmFsdWVTZWxlY3RvciB9IGZyb20gJy4uL3R5cGVzL3NlbGVjdG9ycy92YWx1ZS1zZWxlY3Rvcic7XHJcbi8vIGltcG9ydCB7IENzc0NvbG9yUHJvcGVydHlOYW1lcyB9IGZyb20gJy4uL2NvbnN0YW50cy9jc3Mtc2VsZWN0b3InO1xyXG5cclxuLy8gZnVuY3Rpb24gZ2V0RG9tc2lOb2RlU2VsZWN0b3JWYWxpZGF0b3IoKTogU2VsZWN0b3JWYWxpZGF0b3I8RG9tc2lOb2RlU2VsZWN0b3I+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgbmFtZTogJ0RvbXNpTm9kZVNlbGVjdG9yVmFsaWRhdG9yJyxcclxuLy8gICAgICAgICBzZWxlY3Rvck5hbWU6ICdOb2RlU2VsZWN0b3InLFxyXG4vLyAgICAgICAgIHZhbGlkRmllbGRzOiB7XHJcbi8vICAgICAgICAgICAgIHRhZ05hbWU6IERvbXNpVGFnTmFtZVNlbGVjdG9yVmFsaWRhdG9yLFxyXG4vLyAgICAgICAgICAgICBhdHRyaWJ1dGU6IERvbXNpQXR0cmlidXRlU2VsZWN0b3JWYWxpZGF0b3IsXHJcbi8vICAgICAgICAgICAgIHByb3BlcnR5OiBEb21zaVByb3BlcnR5U2VsZWN0b3JWYWxpZGF0b3IsXHJcbi8vICAgICAgICAgICAgIGNzczogRG9tc2lDc3NTZWxlY3RvclZhbGlkYXRvcixcclxuLy8gICAgICAgICAgICAgdGV4dDogRG9tc2lUZXh0U2VsZWN0b3JWYWxpZGF0b3IsXHJcbi8vICAgICAgICAgICAgIGNoaWxkcmVuOiBEb21zaUNoaWxkcmVuU2VsZWN0b3JWYWxpZGF0b3IsXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgIH0gYXMgU2VsZWN0b3JWYWxpZGF0b3I8RG9tc2lOb2RlU2VsZWN0b3I+O1xyXG4vLyB9XHJcblxyXG4vLyAvLyBQbGFjZWhvbGRlclxyXG4vLyBleHBvcnQgY29uc3QgRG9tc2lOb2RlU2VsZWN0b3JWYWxpZGF0b3IgPSB7fSBhcyBTZWxlY3RvclZhbGlkYXRvcjxEb21zaU5vZGVTZWxlY3Rvcj47XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBEb21zaVZhbHVlU2VsZWN0b3JWYWxpZGF0b3IgPSB7XHJcbiAgICBzZWxlY3Rvck5hbWU6ICdWYWx1ZVNlbGVjdG9yJyxcclxuICAgIHZhbGlkYXRlOiAoc2VsZWN0b3IsIHZhbGlkYXRlLCBtYWtlRXJyb3IpID0+IHtcclxuICAgICAgICBjb25zdCBzZWxlY3RvclR5cGUgPSB0eXBlb2Ygc2VsZWN0b3I7XHJcbiAgICAgICAgaWYgKHNlbGVjdG9yVHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgc2VsZWN0b3JUeXBlID09PSAnbnVtYmVyJyB8fCBzZWxlY3RvclR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxufSBhcyBTZWxlY3RvclZhbGlkYXRvcjxEb21zaVZhbHVlU2VsZWN0b3I+O1xyXG5cclxuZXhwb3J0IGNvbnN0IERvbXNpVGFnTmFtZVNlbGVjdG9yVmFsaWRhdG9yID0ge1xyXG4gICAgbmFtZTogJ0RvbXNpVGFnTmFtZVZhbGlkYXRvcicsXHJcbiAgICBzZWxlY3Rvck5hbWU6ICdUYWdOYW1lU2VsZWN0b3InLFxyXG4gICAgdmFsaWRQcmltaXRpdmVzOiBbJ3VuZGVmaW5lZCcsICdudW1iZXInLCAnc3RyaW5nJ10sXHJcbn0gYXMgU2VsZWN0b3JWYWxpZGF0b3I8RG9tc2lUYWdOYW1lU2VsZWN0b3I+O1xyXG5cclxuZXhwb3J0IGNvbnN0IERvbXNpQXR0cmlidXRlVmFsdWVTZWxlY3RvclZhbGlkYXRvciA9IE9iamVjdC5hc3NpZ24oe30sIERvbXNpVmFsdWVTZWxlY3RvclZhbGlkYXRvciwge1xyXG4gICAgbmFtZTogJ0RvbXNpQXR0cmlidXRlVmFsdWVTZWxlY3RvclZhbGlkYXRvcicsXHJcbiAgICBzZWxlY3Rvck5hbWU6ICdBdHRyaWJ1dGVWYWx1ZVNlbGVjdG9yJyxcclxufSBhcyBTZWxlY3RvclZhbGlkYXRvcjxEb21zaUF0dHJpYnV0ZVZhbHVlU2VsZWN0b3I+KTtcclxuXHJcbmV4cG9ydCBjb25zdCBEb21zaUF0dHJpYnV0ZVNlbGVjdG9yVmFsaWRhdG9yID0ge1xyXG4gICAgbmFtZTogJ0RvbXNpQXR0cmlidXRlU2VsZWN0b3JWYWxpZGF0b3InLFxyXG4gICAgc2VsZWN0b3JOYW1lOiAnQXR0cmlidXRlU2VsZWN0b3InLFxyXG4gICAgYWxsb3dBbnlGaWVsZDogdHJ1ZSxcclxuICAgIGFueUZpZWxkVmFsaWRhdG9yOiBEb21zaUF0dHJpYnV0ZVZhbHVlU2VsZWN0b3JWYWxpZGF0b3IsXHJcbn0gYXMgU2VsZWN0b3JWYWxpZGF0b3I8RG9tc2lBdHRyaWJ1dGVTZWxlY3Rvcj47XHJcblxyXG5leHBvcnQgY29uc3QgRG9tc2lQcm9wZXJ0eVZhbHVlU2VsZWN0b3JWYWxpZGF0b3IgPSBPYmplY3QuYXNzaWduKHt9LCBEb21zaVZhbHVlU2VsZWN0b3JWYWxpZGF0b3IsIHtcclxuICAgIG5hbWU6ICdEb21zaVByb3BlcnR5VmFsdWVTZWxlY3RvclZhbGlkYXRvcicsXHJcbiAgICBzZWxlY3Rvck5hbWU6ICdQcm9wZXJ0eVZhbHVlU2VsZWN0b3InLFxyXG59IGFzIFNlbGVjdG9yVmFsaWRhdG9yPERvbXNpQXR0cmlidXRlVmFsdWVTZWxlY3Rvcj4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IERvbXNpUHJvcGVydHlTZWxlY3RvclZhbGlkYXRvciA9IHtcclxuICAgIG5hbWU6ICdEb21zaVByb3BlcnR5U2VsZWN0b3JWYWxpZGF0b3InLFxyXG4gICAgc2VsZWN0b3JOYW1lOiAnUHJvcGVydHlTZWxlY3RvcicsXHJcbiAgICBhbGxvd0FueUZpZWxkOiB0cnVlLFxyXG4gICAgYW55RmllbGRWYWxpZGF0b3I6IERvbXNpUHJvcGVydHlWYWx1ZVNlbGVjdG9yVmFsaWRhdG9yLFxyXG59IGFzIFNlbGVjdG9yVmFsaWRhdG9yPERvbXNpUHJvcGVydHlTZWxlY3Rvcj47XHJcblxyXG5leHBvcnQgY29uc3QgRG9tc2lDc3NDb2xvclZhbHVlU2VsZWN0b3JWYWxpZGF0b3IgPSBPYmplY3QuYXNzaWduKHt9LCBEb21zaVZhbHVlU2VsZWN0b3JWYWxpZGF0b3IsIHtcclxuICAgIG5hbWU6ICdEb21zaUNzc0NvbG9yVmFsdWVTZWxlY3RvclZhbGlkYXRvcicsXHJcbiAgICBzZWxlY3Rvck5hbWU6ICdDc3NDb2xvclZhbHVlU2VsZWN0b3InLFxyXG59IGFzIFNlbGVjdG9yVmFsaWRhdG9yPERvbXNpQXR0cmlidXRlVmFsdWVTZWxlY3Rvcj4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IERvbXNpQ3NzVmFsdWVTZWxlY3RvclZhbGlkYXRvciA9IE9iamVjdC5hc3NpZ24oe30sIERvbXNpVmFsdWVTZWxlY3RvclZhbGlkYXRvciwge1xyXG4gICAgbmFtZTogJ0RvbXNpQ3NzVmFsdWVTZWxlY3RvclZhbGlkYXRvcicsXHJcbiAgICBzZWxlY3Rvck5hbWU6ICdDc3NWYWx1ZVNlbGVjdG9yJyxcclxufSBhcyBTZWxlY3RvclZhbGlkYXRvcjxEb21zaUF0dHJpYnV0ZVZhbHVlU2VsZWN0b3I+KTtcclxuXHJcbmV4cG9ydCBjb25zdCBEb21zaUNzc1NlbGVjdG9yVmFsaWRhdG9yID0ge1xyXG4gICAgbmFtZTogJ0RvbXNpQ3NzVmFsdWVTZWxlY3RvclZhbGlkYXRvcicsXHJcbiAgICBzZWxlY3Rvck5hbWU6ICdDc3NWYWx1ZVNlbGVjdG9yJyxcclxuICAgIHZhbGlkRmllbGRzOiBPYmplY3QuYXNzaWduKFxyXG4gICAgICAgIHt9LFxyXG4gICAgICAgIC4uLk9iamVjdC5rZXlzKENzc0NvbG9yUHJvcGVydHlOYW1lcykubWFwKGNvbG9yTmFtZSA9PiAoeyBbY29sb3JOYW1lXTogRG9tc2lDc3NDb2xvclZhbHVlU2VsZWN0b3JWYWxpZGF0b3IgfSkpXHJcbiAgICApLFxyXG4gICAgYWxsb3dBbnlGaWVsZDogdHJ1ZSxcclxuICAgIGFueUZpZWxkVmFsaWRhdG9yOiBEb21zaUNzc1ZhbHVlU2VsZWN0b3JWYWxpZGF0b3IsXHJcbn0gYXMgU2VsZWN0b3JWYWxpZGF0b3I8RG9tc2lDc3NTZWxlY3Rvcj47XHJcblxyXG5leHBvcnQgY29uc3QgRG9tc2lUZXh0U2VsZWN0b3JWYWxpZGF0b3IgPSBPYmplY3QuYXNzaWduKHt9LCBEb21zaVZhbHVlU2VsZWN0b3JWYWxpZGF0b3IsIHtcclxuICAgIG5hbWU6ICdEb21zaVRleHRTZWxlY3RvclZhbGlkYXRvcicsXHJcbiAgICBzZWxlY3Rvck5hbWU6ICdUZXh0U2VsZWN0b3InLFxyXG59IGFzIFNlbGVjdG9yVmFsaWRhdG9yPERvbXNpVGV4dFNlbGVjdG9yPik7XHJcblxyXG5leHBvcnQgY29uc3QgRG9tc2lDaGlsZHJlblNlbGVjdG9yVmFsaWRhdG9yID0ge30gYXMgU2VsZWN0b3JWYWxpZGF0b3I8RG9tc2lDaGlsZHJlblNlbGVjdG9yPERvbXNpTm9kZVNlbGVjdG9yPj47XHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgZG9tc2lGaW5kIH0gZnJvbSAnQGxpYi9pbmRleCc7XG5pbXBvcnQgeyByZXZlcnNlZCB9IGZyb20gJ0BsaWIvdXRpbHMvYXJyYXknO1xuaW1wb3J0IHsgRG9tc2lOb2RlU2VsZWN0b3JWYWxpZGF0b3IgfSBmcm9tICdAbGliL3ZhbGlkYXRvci9zZWxlY3Rvci12YWxpZGF0b3InO1xuLy8gaW1wb3J0IHsgdmFsaWRhdGVTZWxlY3RvciB9IGZyb20gJ0BsaWIvZG9tc2kvdmFsaWRhdGUnO1xuaW1wb3J0IHsgaXNDb2xvclZhbHVlTWF0Y2ggfSBmcm9tICdAbGliL21hdGNoZXIvY3NzLW1hdGNoZXInO1xuXG4vLyBjb25zb2xlLmxvZyhyZXZlcnNlZChbMSwyLDNdKSlcbi8vIGNvbnNvbGUubG9nKGRvbXNpRmluZCh7IHRhZ05hbWU6ICdoMScgfSkpO1xuLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDEnKS5pbm5lclRleHQgPSAnSGkgMic7XG5cbmNvbnN0IHNlbGVjdG9yID0ge1xuICAgIHRhZ05hbWU6IHRydWUsXG59IGFzIGFueTtcblxuY29uc29sZS5sb2coJ3NlbGVjdG9yJywgc2VsZWN0b3IpO1xuY29uc29sZS5sb2coJ0RvbXNpU2VsZWN0b3JWYWxpZGF0b3InLCBEb21zaU5vZGVTZWxlY3RvclZhbGlkYXRvcik7XG5cbi8vIGNvbnNvbGUubG9nKCd2YWxpZGF0ZScsIHZhbGlkYXRlU2VsZWN0b3Ioc2VsZWN0b3IsIERvbXNpTm9kZVNlbGVjdG9yVmFsaWRhdG9yKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==