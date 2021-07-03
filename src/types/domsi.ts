import { DomsiSelector, DomsiHTMLNode } from './public';

// Internal types

export type DomsiSelectorId = number;

export interface IDomsiSelector extends DomsiSelector {
    id: DomsiSelectorId;
    name: string;
    originalSelector: DomsiSelector;

    children?: IDomsiChildrenSelector;
}

export type IDomsiChildrenSelector = undefined | IDomsiComplexChildrenSelector;

export interface IDomsiComplexChildrenSelector {
    [childName: string]: IDomsiChildSelector;
}

export interface IDomsiChildSelector {
    selector: IDomsiSelector;
}

export interface DomsiNode {
    htmlNode: DomsiHTMLNode;
    parent?: DomsiNode;
    children: DomsiNode[];
    domsiMatch: DomsiMatchMap;
    domsiChildrenMatch: DomsiChildrenMatchMap;
}

export interface DomsiMatchMap {
    [id: number]: boolean;
}

export interface DomsiChildrenMatchMap {
    [id: number]: DomsiNode[];
}