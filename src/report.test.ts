import { test, expect } from "@jest/globals";
import { sortPages } from "./report";

test("sortPage 2 pages", () => {
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

test("sortPage 5 pages", () => {
  const input = {
    "https://blog.dev.tov/path": 3,
    "https://blog.dev.tov": 4,
    "https://blog.dev.tov/path1": 9,
    "https://blog.dev.tov/path2": 7,
    "https://blog.dev.tov/path3": 42,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://blog.dev.tov/path3", 42],
    ["https://blog.dev.tov/path1", 9],
    ["https://blog.dev.tov/path2", 7],
    ["https://blog.dev.tov", 4],
    ["https://blog.dev.tov/path", 3],
  ];
  expect(actual).toEqual(expected);
});
