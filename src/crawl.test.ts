import { normalizeURL, getURLsFromHTML } from "./crawl";
import { test, expect } from "@jest/globals";

test("normalizeURL strip protocol", () => {
  let input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://blog.dev.tov/path/";
  const actual = normalizeURL(input);
  const expected = "blog.dev.tov/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https:BLOG.dev.toV/path";
  const actual = normalizeURL(input);
  const expected = "blog.dev.tov/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http:blog.dev.tov/path";
  const actual = normalizeURL(input);
  const expected = "blog.dev.tov/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute urls", () => {
  const inputHtmlBody = `
  <html>
    <body>
      <a href="https://blog.dev.tov/">Dev.tov Blog</a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.dev.tov";
  const actual = getURLsFromHTML(inputHtmlBody, inputBaseUrl);
  const expected = ["https://blog.dev.tov/"];
  expect(actual).toEqual(expected);
});
