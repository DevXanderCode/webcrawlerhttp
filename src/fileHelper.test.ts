import { ensureFileExists } from "./fileHelper";
import { promises as fs } from "fs";
import { join } from "path";

jest.mock("fs", () => ({
  promises: {
    access: jest.fn(),
    writeFile: jest.fn(),
  },
}));

describe("ensureFileExists", () => {
  const testFilePath = join(__dirname, "testfile.txt");

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create the file if it does not exist", async () => {
    (fs.access as jest.Mock).mockImplementation(() => {
      throw { code: "ENOENT" };
    });

    await ensureFileExists(testFilePath);

    expect(fs.writeFile).toHaveBeenCalledWith(testFilePath, "");
  });

  it("should not create the file if it exists", async () => {
    (fs.access as jest.Mock).mockResolvedValue(undefined);

    await ensureFileExists(testFilePath);

    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it("should rethrow errors other than file not existing", async () => {
    const error = new Error("Some other error");
    (fs.access as jest.Mock).mockImplementation(() => {
      throw error;
    });

    await expect(ensureFileExists(testFilePath)).rejects.toThrow(
      "Some other error"
    );
  });
});
