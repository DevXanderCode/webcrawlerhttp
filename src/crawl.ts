import { JSDOM } from "jsdom";

export function getURLsFromHTML(htmlBody: string, baseURL: string) {
  const urls: string[] = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (let linkElement of linkElements) {
    const link = linkElement.href;
    if (link.slice(0, 1) === "/") {
      // relative url path
      urls.push(`${baseURL}${link}`);
    } else {
      // absolute url path
      urls.push(link);
    }
  }

  return urls;
}

export function normalizeURL(urlString: string) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 1 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}
