import { test, expect } from "@jest/globals";
import { sortPages } from "./report";

test("sortPage", () => {
  const input = {
    "https://blog.dev.tov/path": 3,
    "https://blog.dev.tov": 4,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://blog.dev.tov", 4],
    ["https://blog.dev.tov/path", 3],
  ];
  expect(actual).toEqual(expected);
});
