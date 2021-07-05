
export function hasOwnProperty(obj: any, property: PropertyKey) {
    return Object.prototype.hasOwnProperty.call(obj, property);
}

export function getInvalidKeys(obj: any, validKeys: string[]): string[] {
    const validKeysSet = new Set(validKeys);
    return Object.keys(obj).filter(objKey => !validKeysSet.has(objKey));
}