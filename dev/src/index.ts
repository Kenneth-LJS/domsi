import { domsiFind } from '@lib/index';
import { reversed } from '@lib/utils/array';

console.log(reversed([1,2,3]))
console.log(domsiFind({ tagName: 'h1' }));
document.querySelector('h1').innerText = 'Hi 2'