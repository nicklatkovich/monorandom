import assert from "assert"

export function assertSafeUInt(v: number, propName: string = "Value"): void {
  assert(Number.isSafeInteger(v), `${propName} is not a safe integer`);
  assert(v >= 0, `${propName} is negative`);
}
