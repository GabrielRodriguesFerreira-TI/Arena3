import "dotenv/config";
import aws, { S3 } from "aws-sdk";
import path from "path";
import multerImageProfileConfig from "../config/imageProfile.multer";
import multerPostMidia from "../config/postMidia.multer";
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
    const originalPath = path.resolve(
      multerImageProfileConfig.directory,
      filename
    );

    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new AppError("File not found!", 400);
    }

    const fileContent = await fs.promises.readFile(originalPath);

    this.client
      .putObject({
        Bucket: String(process.env.AWS_PROFILE_BUCKET_NAME),
        Key: filename,
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
  }

  async deleteFile(filename: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: String(process.env.AWS_PROFILE_BUCKET_NAME),
        Key: filename,
      })
      .promise();
  }

  async savePostFile(filename: string): Promise<void> {
    const originalPath = path.resolve(
      multerPostMidia.config.directory,
      filename
    );

    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new AppError("File not found!", 400);
    }

    const fileContent = await fs.promises.readFile(originalPath);

    this.client
      .putObject({
        Bucket: String(process.env.AWS_POST_BUCKET_NAME),
        Key: filename,
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
  }

  async deletePostFile(filename: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: String(process.env.AWS_POST_BUCKET_NAME),
        Key: filename,
      })
      .promise();
  }
}

export default S3Storage;
