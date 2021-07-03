import { DomsiSelector } from '../public';

export type DomsiChildrenSelector = undefined | DomsiComplexChildrenSelector;

export interface DomsiComplexChildrenSelector {
    [childName: string]: DomsiChildSelector;
}

export interface DomsiChildSelector {
       selector: DomsiSelector;
}