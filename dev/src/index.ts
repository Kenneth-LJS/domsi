import { domsiFind, domsiFindAll, validateDomsiSelector } from '@lib/index';
import { reversed } from '@lib/utils/array';
import { DomsiNodeSelectorValidator } from '@lib/validator/selector-validator';
// import { validateSelector } from '@lib/domsi/validate';
import { isColorValueMatch } from '@lib/matcher/css-matcher';

// console.log(reversed([1,2,3]))
// console.log(domsiFind({ tagName: 'h1' }));
// document.querySelector('h1').innerText = 'Hi 2';

// const selector = {
//     tagName: true,
// } as any;

// console.log('selector', selector);
// console.log('DomsiSelectorValidator', DomsiNodeSelectorValidator);

// console.log('validate', validateSelector(selector, DomsiNodeSelectorValidator));

var userAvatarSelector = {
    'tagName': 'a',
    'children': {
        'image': {
            'type': 'single',
            'selector': {
                'tagName': 'img',
            },
        },
    },
};

var commentUserSelector = {
    'tagName': 'div',
    'children': {
        'userInfo': {
            'type': 'single',
            'transparent': true,
            'selector': {
                'tagName': 'a',
                'property': {
                    'href': {
                        'type': 'regex',
                        'regex': '^https?://twitter.com/[^/]+$',
                    },
                },
                'children': {
                    'name': {
                        'type': 'single',
                        'selector': {
                            'tagName': 'div',
                            'css': {
                                'font-size': '15px',
                                'font-weight': '700',
                            },
                        },
                    },
                    'handle': {
                        'type': 'single',
                        'selector': {
                            'tagName': 'span',
                            'css': {
                                'font-size': '15px',
                                'font-weight': '400',
                            },
                        },
                    },
                },
            }
        },
        'timestampLink': {
            'type': 'single',
            'selector': {
                'tagName': 'a',
                'property': {
                    'href': {
                        'type': 'regex',
                        'regex': '^https?://twitter.com/[^/]+/status/[^/]+$',
                    },
                },
                'children': {
                    'timestamp': {
                        'type': 'single',
                        'selector': {
                            'tagName': 'time',
                        },
                    }
                }
            },
        },
    }
};

var commentContentSelector = {
    'tagName': 'div',
    'children': {
        'replyingTo': {
            'type': 'single',
            'selector': {
                'property': {
                    'innerText': {
                        'type': 'regex',
                        'regex': '^Replying to',
                    },
                },
            },
        },
    },
};

var commentSelector = {
    'tagName': 'article',
    'children': {
        'avatar': {
            'type': 'single',
            'selector': userAvatarSelector,
        },
        'user': {
            'type': 'single',
            'transparent': true,
            'selector': commentUserSelector,
        },
        'content': {
            'type': 'single',
            'selector': commentContentSelector,
        },
    },
};

Object.assign(
    window,
    {
        domsi: {
            find: domsiFind,
            findAll: domsiFindAll,
            validateSelector: validateDomsiSelector,
        }
    },
    {
        userAvatarSelector: userAvatarSelector,
        commentUserSelector: commentUserSelector,
        commentContentSelector: commentContentSelector,
        commentSelector: commentSelector,
    },
);