function map<E, O>(arr: E[], func: (arg: E) => O): O[] {
  return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));

console.log(parsed);
