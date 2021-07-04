import { AbstractDomsiNodeSelector } from './selectors/abstract-node-selector';
import { HTMLNode } from './html-node';
import { DomsiNodeSelector } from './public';

// Internal types

export type DomsiSelectorId = number;

export interface IDomsiNodeSelector extends AbstractDomsiNodeSelector {
    id: DomsiSelectorId;
    name: string;
    originalSelector: DomsiNodeSelector;
}

// Internal computation

export interface DomsiNode {
    htmlNode: HTMLNode;
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