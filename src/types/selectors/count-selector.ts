import { DomsiValueSelector } from "./value-selector";

export type DomsiCountSelector = undefined | number | DomsiComplexCountSelector;

export type DomsiComplexCountSelector = DomsiValueSelector;