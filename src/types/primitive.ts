

export type Primitive = undefined | boolean | number | string;
export const AllPrimitiveNames = new Set(['undefined', 'boolean', 'number', 'string']) as Set<'undefined' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'object'>;
export type NonPrimitive<T> = Exclude<T, Primitive>;

export type PrimitiveName<T> = PrimitiveUndefinedName<T> | PrimitiveBooleanName<T> | PrimitiveNumberName<T> | PrimitiveStringName<T>;
type PrimitiveUndefinedName<T> = T | undefined extends T ? 'undefined' : never;
type PrimitiveBooleanName<T> = T | boolean extends T ? 'boolean' : never;
type PrimitiveNumberName<T> = T | number extends T ? 'number' : never;
type PrimitiveStringName<T> = T | string extends T ? 'string' : never;