import aws, { S3 } from "aws-sdk";
import path from "path";
import multerConfig from "../config/upload.aws";
import mime from "mime";
import { AppError } from "../errors/erros";
import fs from "fs";

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: "us-east-1",
    });
  }

  async saveFile(filename: string): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, filename);

    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new AppError("File not found!", 400);
    }

    const fileContent = await fs.promises.readFile(originalPath);

    this.client
      .putObject({
        Bucket: "fmd-storage",
        Key: filename,
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
  }
}

export default S3Storage;
