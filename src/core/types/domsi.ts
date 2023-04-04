import { HTMLNode } from './html-node';

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