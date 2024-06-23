import { crawlPage } from "./crawl";

async function main() {
  const args = process.argv;
  if (args.length < 3) {
    console.log("no website provided.");
    process.exit(1);
  }

  if (args.length > 3) {
    console.log("too many command line args.");
    process.exit(1);
  }

  const baseURL = args[2];

  console.log(`starting crawl of ${baseURL}`);
  await crawlPage(baseURL);
}

main();
