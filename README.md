# MonoRandom

Fast pseudorandom number generator for node.js and browsers.

## API

### Constructor
Create instance with seed using:
```ts
const rnd = new MonoRandom(123);
```

### Numbers Generation
```ts
// a random number between 0.0 and 1.0
rnd.nextDouble(); // 0.8265167855781116

// a non-negative random integer
rnd.nextInt(); // 567916045

// a non-negative random integer less than the specified maximum
rnd.nextMax(234); // 83

// a random integer within the specified range
// minValue is inclusive, maxValue is exclusive
rnd.next(345, 456); // 411
```

### Array shuffling

**Method 1**:
* Leaves the original array unmodified;
* Is equivalent to doing `.OrderBy(x => rnd.NextDouble())` in C#.
```ts
rnd.shuffleArray([567, "qwe", null, false]); // [null, 567, false, "qwe"]
```

**Method 2 (Fisher–Yates shuffle)**:
* Brings an array into random order using the Fisher-Yates shuffle;
* This is an inplace array, i.e. the input array is modified.
```ts
const arr = [678, "asd", undefined, true];
rnd.shuffleFisherYates(arr);
console.log(arr); // [undefined, true, "asd", 678]
```
