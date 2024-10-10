import { foo } from "../src/";

describe("foo", () => {
  it("should work", () => {
    expect(foo()).toEqual("foo");
  });
});
