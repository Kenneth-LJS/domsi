
export function hasOwnProperty(obj: any, property: PropertyKey) {
    return Object.prototype.hasOwnProperty.call(obj, property);
}
