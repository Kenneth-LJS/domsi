# Domsi Selector Docs

Table of Contents

- [Domsi Selector Docs](#domsi-selector-docs)
  - [DomsiNodeSelector](#domsinodeselector)
  - [DomsiValueSelector](#domsivalueselector)
  - [DomsiObjectSelector](#domsiobjectselector)
  - [DomsiChildrenSelector](#domsichildrenselector)
    - [DomsiChildSelector](#domsichildselector)

## DomsiNodeSelector

The `DomsiNodeSelector` is the main selector used in the `domsi.find` and `domsi.findAll`. It takes on the following structure:

```typescript
{
    tagName?: DomsiValueSelector;
    attribute?: DomsiObjectSelector;
    property?: DomsiObjectSelector;
    css?: DomsiObjectSelector;
    text?: DomsiValueSelector;
    children?: DomsiChildrenSelector;
}
```

-   `tagName` filters elements based on their tag name by comparing it against a [DomsiValueSelector](#domsivalueselector).
-   `attribute` filters elements based on their attributes by comparing it against a [DomsiAttributeSelector](#domsiattributeselector)
-   `property` filters elements based on their properties by comparing it against a [DomsiPropertySelector](#domsipropertyselector)
-   `css` filters elements based on their element styles by comparing it against a [DomsiCssSelector](#domsicssselector)
-   `text` filters elements based on their `innerText` by comparing it against a [DomsiValueSelector](#domsivalueselector)
-   `children` filters elements based on their children by comparing it against a [DomsiChildrenSelector](#domsichildrenselector)

All sub-selectors must match in order for the node to be returned. If a specific sub-selector is not defined, then it is not checked.

## DomsiValueSelector

The `DomsiValueSelector` is a selector for basic attributes. If it is a primitive value such as a `number` or a `string`, the value is compared. Otherwise, it can also take one of the following forms:

**Undefined**

```typescript
{
    type: 'undefined';
}
```

Matches the value if the value is also `undefined`.

**Null**

```typescript
{
    type: 'null';
}
```

Matches the value if the value is also `null`.

**Comparison**

```typescript
{
    type: 'compare';
    operator: '==' | '!=' | '===' | '!==' | '>' | '>=' | '<' | '<=';
    value: any;
}
```

Matches the value if: `element’s value [operator] selector value` returns true. For instance, if the element’s value is 5, the operator is `<`, and the selector value is `7`, then the selector returns a match.

**Regex**

```typescript
{
    type: 'regex';
    regex: string | RegExp;
    flags?: string;
}
```

Matches if the value matches a regex.

**Not**

```typescript
{
    type: 'not';
    operand: DomsiValueSelector;
}
```

Matches if the operand does not match the value.

**And / Or**

```typescript
{
    type: 'and' | 'or';
    operands: DomsiValueSelector[];
}
```

If the type is `and`, matches if all the operands are true.
If the type is `or`, matches if at least one of the operands is true.

## DomsiObjectSelector

The `DomsiObjectSelector` is a selector for complex attributes such as element attributes, properties, and styles.

```typescript
{
    [keyName: string]: DomsiValueSelector;
}
```

If all of the corresponding properties match their respective [DomsiValueSelector](#domsivalueselector), then this selector returns a match.

## DomsiChildrenSelector

```typescript
{
    [childName: string]: DomsiChildSelector;
}
```

Matches an element by the presence of specified children element. The [DomsiObject](./readme.md) returned will have a `children` property based on the children selector.

For instance, the children selector in the form:

```typescript
{
    header: [...],
    'banner-img': [...],
    body: [...]
}
```

Will result in `DomsiObject`s of the form:

```typescript
{
    node: [HTMLElement],
    children: {
        header: DomsiObject | DomsiObject | undefined,
        'banner-img': DomsiObject | DomsiObject | undefined,
        body: [DomsiObject],
    }
}
```

Depending on the `type` attribute of the `DomsiChildSelector`, an array of `DomsiObject`s may be found in place of a single `DomsiObject`.

### DomsiChildSelector

The `DomsiChildSelector` matches a specific child on the parent. It need not be a direct child.

```typescript
{
    type: 'single' | 'multiple' | 'optional' | 'none';
    transparent?: boolean;
    count?: DomsiValueSelector;
    selector: DomsiNodeSelector;
}
```

**type**

If the `type` is `single`, then the selector matches if at least 1 child of that element matches the child selector. The parent’s `children.[childname]` property will contain a single `DomsiObject`.

If the `type` is `multiple`, then the selector matches if the number of child element that matches the child selector ALSO matches the `count` selector. If no `count` selector is specified, then it automatically matches. The parent’s `children.[childname]` property will contain an array of `DomsiObject`s.

If the `type` is `optional`, then the selector automatically matches. The parent’s `children.[childname]` property will be a `DomsiObject` if a matching child is found, otherwise it is `undefined`.

If the `type` is `none`, then the selector matches if none of the child elements matches the child selector. The parent’s `children.[childname]` property will not be defined.