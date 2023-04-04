# Domsi Selector Docs

- [Domsi Selector Docs](#domsi-selector-docs)
  - [DomsiNodeSelector](#domsinodeselector)
  - [DomsiTagNameSelector](#domsitagnameselector)
  - [DomsiAttributeSelector](#domsiattributeselector)
  - [DomsiPropertySelector](#domsipropertyselector)
  - [DomsiCssSelector](#domsicssselector)
  - [DomsiTextSelector](#domsitextselector)
  - [DomsiChildrenSelector](#domsichildrenselector)
  - [DomsiValueSelector](#domsivalueselector)

## DomsiNodeSelector 

```typescript
{
    tagName?: DomsiTagNameSelector;
    attribute?: DomsiAttributeSelector;
    property?: DomsiPropertySelector;
    css?: DomsiCssSelector;
    text?: DomsiTextSelector;

    children?: DomsiChildrenSelector<this>;
}
```

## DomsiTagNameSelector

Alias for [DomsiValueSelector](#domsivalueselector).

## DomsiAttributeSelector

```typescript
{
    [attributeName: string]: DomsiValueSelector;
}
```



## DomsiPropertySelector

```typescript
{
    [propertyName: string]: DomsiValueSelector;
}
```

## DomsiCssSelector

## DomsiTextSelector

## DomsiChildrenSelector

```typescript
{
    [childName: string]: DomsiChildSelector;
}
```

## DomsiValueSelector

