import { DomsiCountSelector } from './count-selector';

export type DomsiChildrenSelector<T> = undefined | DomsiComplexChildrenSelector<T>;

export interface DomsiComplexChildrenSelector<T> {
    [childName: string]: DomsiChildSelector<T>;
}

export interface DomsiChildSelector<T> {
    type: DomsiChildSelectorType;
    transparent: boolean;
    count: DomsiCountSelector;
    selector: T;
}

export type DomsiChildSelectorType = 'single' | 'multiple' | 'none';