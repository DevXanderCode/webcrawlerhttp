import { JSDOM } from "jsdom";

export async function crawlPage(
  baseUrl: string,
  currentURL: string,
  pages: Record<string, number>
) {
  const baseURLObj = new URL(baseUrl);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizeCurrentURL = normalizeURL(currentURL);

  if (pages[normalizeCurrentURL] > 0) {
    pages[normalizeCurrentURL]++;
    return pages;
  }

  pages[normalizeCurrentURL] = 1;
  console.log(`actively crawling:  ${currentURL}`);

  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status} on page ${currentURL}`
      );
      return pages;
    }

    const contentType = resp.headers.get("content-type");

    if (!contentType?.includes("text/html")) {
      console.log(
        `non html response, content type: ${contentType}, on page: ${currentURL}`
      );
      return pages;
    }
    const htmlBody = await resp.text();
    const nextURLs = getURLsFromHTML(htmlBody, baseUrl);

    for (let nextURL of nextURLs) {
      pages = await crawlPage(baseUrl, nextURL, pages);
    }
  } catch (error: any) {
    console.log("error in fetch: ", error.message, "on page:", currentURL);
  } finally {
    return pages;
  }
}

export function getURLsFromHTML(htmlBody: string, baseURL: string) {
  const urls: string[] = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (let linkElement of linkElements) {
    const link = linkElement.href;
    if (link.slice(0, 1) === "/") {
      // relative url path
      try {
        const urlObj = new URL(`${baseURL}${link}`);
        urls.push(urlObj.href);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(`error with the relative url: ${error.message}`);
        }
        console.log(`error with the absolute url: ${error}`);
      }
    } else {
      // absolute url path
      try {
        const urlObj = new URL(link);
        urls.push(urlObj.href);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(`error with the absolute url: ${error.message}`);
        }
        console.log(`error with the absolute url: ${error}`);
      }
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
