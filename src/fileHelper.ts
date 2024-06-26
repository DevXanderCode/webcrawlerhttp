import { promises as fs } from "fs";
import { join } from "path";

export async function ensureFileExists(filePath: string) {
  try {
    await fs.access(filePath);
  } catch (error: any) {
    // If the file does not exist, create it
    if (error?.code === "ENOENT") {
      await fs.writeFile(filePath, "");
    } else {
      throw error;
    }
  }
}

export async function writeReportToFile(content: string) {
  const filePath = join(__dirname, "report.txt");
  await ensureFileExists(filePath);

  await fs.writeFile(filePath, content);
}
