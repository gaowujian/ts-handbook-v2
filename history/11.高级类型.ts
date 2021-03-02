import { PromiseType } from "utility-types";

interface User {
  name: string;
  age: number;
}
// Expect: string
type ProUser = PromiseType<Promise<User>>;

function getString(name: string): ProUser {
  return name as any;
}

const result = getString("dd");
