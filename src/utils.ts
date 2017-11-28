export function sum(a?: any, b?: any) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("Can pass numbers only")
    }
    return a + b;
}