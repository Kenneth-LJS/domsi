import { domsiFind } from '@lib/index';
import { reversed } from '@lib/utils/array';
import { DomsiNodeSelectorValidator } from '@lib/validator/selector-validator';
// import { validateSelector } from '@lib/domsi/validate';
import { isColorValueMatch } from '@lib/matcher/css-matcher';

// console.log(reversed([1,2,3]))
// console.log(domsiFind({ tagName: 'h1' }));
// document.querySelector('h1').innerText = 'Hi 2';

const selector = {
    tagName: true,
} as any;

console.log('selector', selector);
console.log('DomsiSelectorValidator', DomsiNodeSelectorValidator);

// console.log('validate', validateSelector(selector, DomsiNodeSelectorValidator));