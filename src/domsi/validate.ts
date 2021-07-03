import { DomsiSelector } from '../types/public';



export function validateDomsiSelector(selector: DomsiSelector): boolean {
    return !!selector;
}

// make validator type -> move into types

