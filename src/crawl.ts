export function normalizeURL(urlString: string) {
  const urlObj = new URL(urlString);
  return `${urlObj.hostname}${urlObj.pathname}`;
}
