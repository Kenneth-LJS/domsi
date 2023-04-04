import domsiSrc from '../../build/index.source';

export function initDomsi(varName = 'domsi') {
    return `var ${varName} = (() => { ${domsiSrc}; return domsi; })();`;
}

export function runDomsiAnonymously(func: string | ((domsi: any) => any)): string {
    if (typeof func !== 'string') {
        func = `${stringifyDomsiFunction(func)}`; // how do we want to parse this?
    }
    return `(${func})(() => { ${initDomsi('domsi')}; return domsi; })())`;
}

function stringifyDomsiFunction(fn: (domsi: any) => unknown): string {
    let funcStr = fn.toString();
    try {
        new Function(`(${funcStr})`);
    } catch {
        // Function shorthand provided (e.g. `func(){ ... }`). Prefix with "function"
        let prefix = 'function ';
        if (funcStr.startsWith('async ')) {
            prefix = `async ${prefix}`;
            funcStr = funcStr.substring('async '.length);
        }
        funcStr = `${prefix}${funcStr}`;
        try {
            new Function(`(${funcStr})`);
        } catch {
            // Still unable to serialize
            throw new Error('Function cannot be serialized.');
        }
    }
    return funcStr;
}
