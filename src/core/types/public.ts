import { AbstractDomsiNodeSelector } from './selectors/abstract-node-selector';
import { HTMLNode } from './html-node';

export type DomsiNodeSelector = AbstractDomsiNodeSelector;

// This gets returned to the user
export interface DomsiObject {
    node: HTMLNode;
    children: DomsiObjectChildren;
}

export interface DomsiObjectChildren {
    [name: string]: DomsiObjectChild;
}

export type DomsiObjectChild = DomsiObject | DomsiObject[];