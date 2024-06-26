import { writeReportToFile } from "./fileHelper";

export async function printReport(
  pages: Record<string, number>,
  baseURL: string
) {
  console.log("===========================================");
  console.log("REPORT");
  console.log("===========================================");
  let content = `
  ==========================================================
  Start Report on ${baseURL}
  ==========================================================
  `;
  const sortedPages = sortPages(pages);

  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const hits = sortedPage[1];
    console.log(`Found ${hits} links to page: ${url}`);
    content += `\n Found ${hits} links to page: ${url}`;
  }

  content += `\n
  ==========================================================
    End Report on ${baseURL}
  ==========================================================
  `;

  console.log("===========================================");
  console.log("END REPORT");
  console.log("===========================================");

  await writeReportToFile(content);
}

export function sortPages(pages: Record<string, number>) {
  const pagesArr = Object.entries(pages);

  return pagesArr.sort((a, b) => b[1] - a[1]);
}
