/*! For license information please see index.source.js.LICENSE.txt */
var domsi;(()=>{"use strict";var r={n:e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},d:(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o:(r,e)=>Object.prototype.hasOwnProperty.call(r,e)},e={};function t(r,e){var t="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!t){if(Array.isArray(r)||(t=function(r,e){if(r){if("string"==typeof r)return n(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?n(r,e):void 0}}(r))||e&&r&&"number"==typeof r.length){t&&(r=t);var o=0,i=function(){};return{s:i,n:function(){return o>=r.length?{done:!0}:{done:!1,value:r[o++]}},e:function(r){throw r},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u,a=!0,l=!1;return{s:function(){t=t.call(r)},n:function(){var r=t.next();return a=r.done,r},e:function(r){l=!0,u=r},f:function(){try{a||null==t.return||t.return()}finally{if(l)throw u}}}}function n(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function o(r,e){if(void 0===e)return!0;if("number"==typeof e||"string"==typeof e)return r==e;if("undefined"==e.type)return null==r;if("null"==e.type)return null==r;if("regex"==e.type)return void 0!==r&&new RegExp(e.regex,e.flags).test(r.toString());if("compare"==e.type){var n=e;return"=="==n.operator?r==n.value:"!="==n.operator?r!=n.value:"==="==n.operator?r===n.value:"!=="==n.operator?r!==n.value:void 0!==r&&(">"==n.operator?r>n.value:">="==n.operator?r>=n.value:"<"==n.operator?r<n.value:"<="==n.operator&&r<=n.value)}if("and"==e.type){var i,u=t(e.operands);try{for(u.s();!(i=u.n()).done;)if(!o(r,i.value))return!1}catch(r){u.e(r)}finally{u.f()}return!0}if("or"==e.type){var a,l=t(e.operands);try{for(l.s();!(a=l.n()).done;)if(o(r,a.value))return!0}catch(r){l.e(r)}finally{l.f()}return!1}return"not"==e.type&&!o(r,e.operand)}function i(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}r.d(e,{default:()=>or});var u,a,l=r.n(null);function c(r,e){var t="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!t){if(Array.isArray(r)||(t=f(r))||e&&r&&"number"==typeof r.length){t&&(r=t);var n=0,o=function(){};return{s:o,n:function(){return n>=r.length?{done:!0}:{done:!1,value:r[n++]}},e:function(r){throw r},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,a=!1;return{s:function(){t=t.call(r)},n:function(){var r=t.next();return u=r.done,r},e:function(r){a=!0,i=r},f:function(){try{u||null==t.return||t.return()}finally{if(a)throw i}}}}function f(r,e){if(r){if("string"==typeof r)return d(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?d(r,e):void 0}}function d(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function s(r,e){if(void 0===e)return!0;if(void 0===r)return!1;if("number"==typeof e)return!1;if("string"==typeof e)return p(r,e);if("undefined"==e.type)return void 0===r;if("null"==e.type)return null===r;if("regex"===e.type)return function(){if("string"==typeof e.regex)return new RegExp(e.regex,e.flags);if(e.regex instanceof RegExp)return void 0!==e.flags?new RegExp(e.regex.source,e.flags):e.regex;throw"Invalid regex"}().test(r);if("color"===e.type)return p(r,e.color);if("and"===e.type){var t,n=c(e.operands);try{for(n.s();!(t=n.n()).done;)if(!s(r,t.value))return!1}catch(r){n.e(r)}finally{n.f()}return!0}if("or"===e.type){var o,i=c(e.operands);try{for(i.s();!(o=i.n()).done;)if(s(r,o.value))return!0}catch(r){i.e(r)}finally{i.f()}return!1}return"not"===e.type&&!s(r,e.operand)}!function(r){r.length="length",r.getPropertyPriority="getPropertyPriority",r.getPropertyValue="getPropertyValue",r.item="item",r.removeProperty="removeProperty",r.setProperty="setProperty",r.parentRule="parentRule"}(u||(u={})),function(r){r.backgroundColor="backgroundColor",r.borderBlockEndColor="borderBlockEndColor",r.borderBlockStartColor="borderBlockStartColor",r.borderBottomColor="borderBottomColor",r.borderColor="borderColor",r.borderInlineEndColor="borderInlineEndColor",r.borderInlineStartColor="borderInlineStartColor",r.borderLeftColor="borderLeftColor",r.borderRightColor="borderRightColor",r.borderTopColor="borderTopColor",r.caretColor="caretColor",r.color="color",r.columnRuleColor="columnRuleColor",r.floodColor="floodColor",r.lightingColor="lightingColor",r.outlineColor="outlineColor",r.stopColor="stopColor",r.textDecorationColor="textDecorationColor",r.textEmphasisColor="textEmphasisColor",r.webkitTapHighlightColor="webkitTapHighlightColor",r.webkitTextFillColor="webkitTextFillColor",r.webkitTextStrokeColor="webkitTextStrokeColor"}(a||(a={})),l();var p=function(r,e){var t=l()(r),n=l()(e);return void 0===t?void 0===n:void 0!==n&&t[0]==n[0]&&t[1]==n[1]&&t[2]==n[2]&&Math.abs(t[3]-n[3])<.01};function y(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function v(r,e){var t=e.id;return!(r.domsiChildrenMatch[t].length>0||!function(r,e){if(!e.children)return!0;for(var t=0,n=Object.values(e.children);t<n.length;t++){var i=n[t],u=i.type,a=i.selector.id,l=r.domsiChildrenMatch[a].length;if("single"==u&&0==l)return!1;if("multiple"==u){if(void 0!==i.count&&!o(l,i.count))return!1}else{if("optional"==u)return!0;if("none"==u&&l>0)return!1}}return!0}(r,e)||!function(r,e){return!(void 0!==e.tagName&&!function(r,e){return o((r instanceof Element?r.tagName:"").toLowerCase(),e)}(r,e.tagName)||void 0!==e.attribute&&!function(r,e){if(void 0===e)return!0;if(!(r instanceof Element))return!1;for(var t=0,n=Object.entries(e);t<n.length;t++){var u=(f=2,function(r){if(Array.isArray(r))return r}(c=n[t])||function(r,e){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var n,o,i=[],u=!0,a=!1;try{for(t=t.call(r);!(u=(n=t.next()).done)&&(i.push(n.value),!e||i.length!==e);u=!0);}catch(r){a=!0,o=r}finally{try{u||null==t.return||t.return()}finally{if(a)throw o}}return i}}(c,f)||function(r,e){if(r){if("string"==typeof r)return i(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?i(r,e):void 0}}(c,f)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=u[0],l=u[1];if(!o(r.getAttribute(a)||void 0,l))return!1}var c,f;return!0}(r,e.attribute)||void 0!==e.property&&!function(r,e){if(void 0===e)return!0;for(var t=0,n=Object.entries(e);t<n.length;t++){var i=(c=2,function(r){if(Array.isArray(r))return r}(l=n[t])||function(r,e){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var n,o,i=[],u=!0,a=!1;try{for(t=t.call(r);!(u=(n=t.next()).done)&&(i.push(n.value),!e||i.length!==e);u=!0);}catch(r){a=!0,o=r}finally{try{u||null==t.return||t.return()}finally{if(a)throw o}}return i}}(l,c)||function(r,e){if(r){if("string"==typeof r)return y(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?y(r,e):void 0}}(l,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=i[0],a=i[1];if(!o(r[u],a))return!1}var l,c;return!0}(r,e.property)||void 0!==e.css&&!function(r,e){if(void 0===e)return!0;if(!(r instanceof Element))return!1;for(var t=getComputedStyle(r),n=0,i=Object.entries(e);n<i.length;n++){var u=(p=2,function(r){if(Array.isArray(r))return r}(d=i[n])||function(r,e){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var n,o,i=[],u=!0,a=!1;try{for(t=t.call(r);!(u=(n=t.next()).done)&&(i.push(n.value),!e||i.length!==e);u=!0);}catch(r){a=!0,o=r}finally{try{u||null==t.return||t.return()}finally{if(a)throw o}}return i}}(d,p)||f(d,p)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=u[0],c=u[1];if(Object.values(a).includes(l)){if(!s(t[l],c))return!1}else if(!o(t[l],c))return!1}var d,p;return!0}(r,e.css)||void 0!==e.text&&!function(r,e){return o(r instanceof HTMLElement?r.innerText:void 0,e)}(r,e.text))}(r.htmlNode,e))}function m(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function b(r){return function(r){return function(r){if(Array.isArray(r))return m(r)}(r)||function(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||function(r,e){if(r){if("string"==typeof r)return m(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?m(r,e):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(r).reverse()}var h="<root>";function g(r){return function(r){if(Array.isArray(r))return C(r)}(r)||function(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||S(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(r,e){if(r){if("string"==typeof r)return C(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?C(r,e):void 0}}function C(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function A(r,e){var t={htmlNode:r,parent:e},n=[];return r.childNodes.forEach((function(r){n.push(A(r,t))})),t.children=n,t.htmlNode.domsiNode=t,t}function w(r,e){var t=r.domsiChildrenMatch[e.id].map((function(r){return j(r,e)}));return t.reverse(),t}function j(r,e){var t={};if(e.children)for(var n=function(){var e,n,u=(e=i[o],n=2,function(r){if(Array.isArray(r))return r}(e)||function(r,e){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var n,o,i=[],u=!0,a=!1;try{for(t=t.call(r);!(u=(n=t.next()).done)&&(i.push(n.value),!e||i.length!==e);u=!0);}catch(r){a=!0,o=r}finally{try{u||null==t.return||t.return()}finally{if(a)throw o}}return i}}(e,n)||S(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=u[0],l=u[1],c=l.type,f=l.transparent,d=l.selector,s=d.id,p=void 0;if("single"==c){var y=r.domsiChildrenMatch[s];p=j(y[y.length-1],d)}else if("multiple"==c)(p=r.domsiChildrenMatch[s].map((function(r){return j(r,d)}))).reverse();else{if("optional"!=c)return"continue";var v=r.domsiChildrenMatch[s];p=v.length>0?j(v[0],d):void 0}p&&(t[a]=p),f&&"single"==c&&(t=Object.assign({},p.children,t))},o=0,i=Object.entries(e.children);o<i.length;o++)n();return{node:r.htmlNode,children:t}}var x=new Set(["undefined","boolean","number","string"]);function O(r){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}function I(r){return function(r){if(Array.isArray(r))return E(r)}(r)||function(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||function(r,e){if(r){if("string"==typeof r)return E(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?E(r,e):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function N(r,e,t,n,o){return{selectorName:r,validate:V(e,t,n,o)}}function T(r,e){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=new Set(e),o=[];return t&&(n.add(void 0),o.push("undefined")),o.push.apply(o,I(e.map((function(r){return JSON.stringify(r)})))),{selectorName:r,validate:V((function(r){return n.has(r)}),o)}}function M(r,e,t,n,o){var i=[].concat(I(t),[r]);return{selectorName:r,validate:function(r,t,u){if(!e(r))if(x.has(O(r)))u({type:"Invalid type",provided:O(r),expected:i});else if(null!==r)if(a=r,l=n,Object.prototype.hasOwnProperty.call(a,l)){var a,l,c=r[n];t()(r,o[c])}else u({type:"Missing field",expected:n});else u({type:"Invalid type",provided:"null",expected:i})}}}function V(r,e,t,n){return function(o,i,u){var a,l;r&&r(o)||(void 0!==o?null!==o?t&&((a=o,l=new Set(t),Object.keys(a).filter((function(r){return!l.has(r)}))).forEach((function(r){u({type:"Invalid field",provided:r,expected:t})})),t.forEach((function(r){var e=i(r),t=n?n(r):void 0;e(o[r],t)}))):u({type:"Invalid type",provided:"null",expected:e}):u({type:"Invalid type",provided:"undefined",expected:e}))}}function k(r){return function(e){return r[e]}}function P(r,e,t){var n={},o=N("".concat(r,"CompareEqualityValueSelector"),(function(){return!1}),["Object"],["type","operator","value"],k({type:"compare",operator:T("Equality operator",["==","!=","===","!=="]),value:n})),i=N("".concat(r,"CompareOrderValueSelector"),(function(){return!1}),["Object"],["type","operator","value"],k({type:"compare",operator:T("Equality operator",[">",">=","<","<="]),value:n})),u=N("".concat(r,"CompareOrderValueSelector"),(function(){return!1}),["Object"],["type","operand"],k({type:"not",operand:n})),a=N("".concat(r,"CompareOrderValueSelector"),(function(){return!1}),["Object"],["type","operands"],k({type:"not",operands:n})),l="".concat(r,"ValueSelector");return Object.assign(n,M(l,e,t,"type",{undefined:U,null:D,compare:M(l,(function(){return!1}),[],"operator",{"==":o,"!=":o,"===":o,"!==":o,">":i,">=":i,"<":i,"<=":i}),regex:J,and:a,or:a,not:u})),n}function R(r){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}var U=N("UndefinedValueSelector",(function(){return!1}),["Object"],["type"],(function(){return"undefined"})),D=N("NullValueSelector",(function(){return!1}),["Object"],["type"],(function(){return"null"})),$=N("RegexValue",(function(r){return"string"==typeof r||r instanceof RegExp}),["string","RegExp"]),B=N("RegexFlags",(function(){return!1}),["undefined","string"]),J=N("RegexValueSelector",(function(){return!1}),["Object"],["type","regex","flags"],k({type:"regex",regex:$,flags:B})),L=P("TagName",(function(r){return["undefined","string"].includes(R(r))}),["undefined","string"]),q=P("Count",(function(r){return["undefined","number"].includes(R(r))}),["undefined","number"]),F=P("Attrribute",(function(r){return["undefined","number","string"].includes(R(r))}),["undefined","number","string"]),H=N("AttributeSelector",(function(r){return void 0===r}),["undefined","AttributeSelector"],void 0,(function(){return F})),_=P("Property",(function(r){return["undefined","number","string"].includes(R(r))}),["undefined","number","string"]),W=N("PropertySelector",(function(r){return void 0===r}),["undefined","PropertySelector"],void 0,(function(){return _})),z=P("Color",(function(r){return["undefined","string"].includes(R(r))}),["undefined","string"]),G=P("CSS",(function(r){return["undefined","number","string"].includes(R(r))}),["undefined","number","string"]),K=N("CssSelector",(function(r){return void 0===r}),["undefined","CssSelector"],void 0,(function(r){return r.startsWith("color")||r.includes("Color")?z:G})),Q=P("Text",(function(r){return["undefined","string"].includes(R(r))}),["undefined","string","Text"]),X=function(){var r={},e=N("ChildSelector",(function(){return!1}),["Object"],["type","transparent","count","selector"],k({type:T("ChildType",["single","multiple","none"]),transparent:T("Transparent",[!1,!0],!0),count:q,selector:r})),t=N("ChildrenSelector",(function(r){return void 0===r}),["undefined","ChildrenSelector"],void 0,(function(){return e}));return Object.assign(r,N("NodeSelector",(function(){return!1}),["Object"],["tagName","attribute","property","css","text","children"],k({tagName:L,attribute:H,property:W,css:K,text:Q,children:t}))),{DomsiNodeSelectorValidator:r,DomsiChildSelectorValidator:e,DomsiChildrenSelectorValidator:t}}(),Y=X.DomsiNodeSelectorValidator;function Z(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function rr(r,e){var t=[];return er(r,e,t,[h]),t}function er(r,e,t,n){void 0!==e&&("number"!=typeof e&&"string"!=typeof e?e.validate(r,(function(r){var e,o=r?[].concat(function(r){if(Array.isArray(r))return Z(r)}(e=n)||function(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(e)||function(r,e){if(r){if("string"==typeof r)return Z(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Z(r,e):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[r]):n;return function(r,e){return er(r,e,t,o)}}),(function(r){var o=Object.assign({},r,{selectorName:e.selectorName,path:n});t.push(o)})):r!==e&&t.push({type:"Invalid constant",provided:r,expected:e}))}function tr(r,e){return nr(r),function(r,e){var t=function(r){return JSON.parse(JSON.stringify(r))}(r),n=document,o=function(r){for(var e=[r],t=0;t<e.length;){var n=e[t];if(n.originalSelector=JSON.parse(JSON.stringify(n)),n.id=t,0==t&&(n.name=h),n.children)for(var o=0,i=Object.keys(n.children);o<i.length;o++){var u=i[o],a=n.children[u];a.selector||(a.selector={}),a.selector.name=n.name+"."+u,e.push(a.selector)}t++}return e}(t),i=function(r,e){for(var t=[A(r)],n=0;n<t.length;){var o=t[n];o.domsiMatch=g(new Array(e)).map((function(){return!1})),o.domsiChildrenMatch=g(new Array(e)).map((function(){return[]})),t.push.apply(t,g(o.children)),n++}return t}(n,o.length);return function(r,e){b(r).forEach((function(r){b(e).forEach((function(e){v(e,r)&&function(r,e){r.domsiMatch[e.id]=!0;for(var t=r.parent;t;)t.domsiChildrenMatch[e.id].push(r),t=t.parent}(e,r)}))}))}(o,i),w(i[0],t)}(r)}function nr(r){return rr(r,Y)}X.DomsiChildSelectorValidator,X.DomsiChildrenSelectorValidator;const or={find:function(r,e){return tr(r)[0]},findAll:tr,validateSelector:nr};domsi=e.default})();