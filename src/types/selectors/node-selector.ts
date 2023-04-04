import { DomsiNodeSelector } from "../public";
import { AbstractDomsiNodeSelector } from "./abstract-node-selector";

export type DomsiSelectorId = number;

export interface IDomsiNodeSelector extends AbstractDomsiNodeSelector {
    id: DomsiSelectorId;
    name: string;
    originalSelector: DomsiNodeSelector;
}