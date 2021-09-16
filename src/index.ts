import { assertSafeUInt } from "./utils";

export class MonoRandom {
  private _seedArray = new Array<number>(56).fill(0);
  private _inext = 0;
  private _inextp = 31;

  constructor(public readonly seed: number) {
    assertSafeUInt(seed, "Seed");
    this._seedArray = new Array(56);
    let num = 161803398 - seed;
    this._seedArray[55] = num;
    let num2 = 1;
    for (let i = 1; i < 55; i += 1) {
      const num3 = Math.imul(21, i) % 55;
      this._seedArray[num3] = num2;
      num2 = num - num2;
      if (num2 < 0) num2 += 2147483647;
      num = this._seedArray[num3];
    }
    for (let j = 1; j < 5; j += 1) {
      for (let k = 1; k < 56; k += 1) {
        this._seedArray[k] -= this._seedArray[1 + (k + 30) % 55];
        if (this._seedArray[k] < 0) this._seedArray[k] += 2147483647;
      }
    }
  }

  /** @returns a random number between 0.0 and 1.0. */
  public nextDouble(): number {
    if (++this._inext >= 56) this._inext = 1;
    if (++this._inextp >= 56) this._inextp = 1;
    let num = this._seedArray[this._inext] - this._seedArray[this._inextp];
    if (num < 0) num += 2147483647;
    this._seedArray[this._inext] = num;
    return num * 4.6566128752457969E-10;
  }

  /** @returns a non-negative random integer. */
  public nextInt(): number {
    return (this.nextDouble() * 2147483647) | 0;
  }

  /** @returns a non-negative random integer less than the specified maximum. */
  public nextMax(maxValue: number): number {
    return (this.nextDouble() * maxValue) | 0;
  }

  /** @returns a random integer within the specified range (minValue is inclusive, maxValue is exclusive). */
  next(minValue: number, maxValue: number) {
    return maxValue - minValue <= 1 ? minValue : this.nextMax(maxValue - minValue) + minValue;
  }

  /**
   * Brings an array into random order.
   * This method is equivalent to doing `.OrderBy(x => rnd.NextDouble())` in C#.
   * Leaves the original array unmodified.
   * @returns a new array
   */
  shuffleArray<T>(arr: T[]): T[] {
    const sortArr = arr.map((v) => ({ r: this.nextDouble(), v }));
    sortArr.sort((a, b) => a.r - b.r);
    return sortArr.map((x) => x.v);
  }

  /**
   * Brings an array into random order using the Fisher-Yates shuffle.
   * This is an inplace array, i.e. the input array is modified.
   */
  shuffleFisherYates(list: unknown[]): void {
    let i = list.length;
    while (i > 1) {
      const index = this.next(0, i);
      i--;
      const value = list[index];
      list[index] = list[i];
      list[i] = value;
    }
  }
}
