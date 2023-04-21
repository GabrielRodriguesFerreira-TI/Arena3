import "dotenv/config";
import aws, { S3 } from "aws-sdk";
import path from "path";
import multerConfig from "../config/upload.aws";
import mime from "mime";
import { AppError } from "../errors/erros";
import fs from "fs";

// Note that the AWS config is not being done directly in the code,
// this is because the S3 system itself captures the values inside
// the .env file

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: String(process.env.AWS_REGION),
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
        Bucket: String(process.env.AWS_BUCKET_NAME),
        Key: filename,
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
  }
}

export default S3Storage;
