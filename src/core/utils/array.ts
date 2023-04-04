export function reversed<T>(arr: T[]): T[] {
    return [...arr].reverse();
}

export function toOrSeparatedString(arr: string[]): string {
    return toKeywordSeparatedString(arr, ', ', ' or ', ', or ');
}

export function toKeywordSeparatedString(arr: string[], delimiter: string, delimiterAtTwo: string, lastKeyword: string): string {
    if (arr.length === 0) {
        return '';
    } else if (arr.length === 1) {
        return arr[0];
    } else if (arr.length === 2) {
        return arr[0] + delimiterAtTwo + arr[1];
    }
    return arr.slice(0, -1).join(delimiter)
        + lastKeyword
        + arr[arr.length - 1];
}