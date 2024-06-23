export function sortPages(pages: Record<string, number>) {
  const pagesArr = Object.entries(pages);

  return pagesArr.sort((a, b) => b[1] - a[1]);
}
