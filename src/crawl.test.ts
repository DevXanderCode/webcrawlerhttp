import { normalizeURL } from "./crawl";
import { test, expect } from "@jest/globals";

test("normalizeURL", () => {
  let input = "";
  const actual = normalizeURL(input);
  const expected = "something else";
  expect(actual).toEqual(expected);
});
