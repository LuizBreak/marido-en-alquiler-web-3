import { Auth } from "aws-amplify";
import { S3 } from "aws-sdk";

// The authenticated Cognito identity role must be scoped to the intended bucket.
async function getStorageClient() {
  await Auth.currentAuthenticatedUser();
  const credentials = await Auth.currentCredentials();
  if (!credentials || !credentials.sessionToken) {
    throw new Error("Image storage requires temporary authenticated credentials.");
  }
  return new S3({
    region: process.env.VUE_APP_AWS_REGION || "us-east-1",
    credentials: Auth.essentialCredentials(credentials),
    signatureVersion: "v4",
  });
}
function getBucket() {
  const bucket = process.env.VUE_APP_IMAGE_BUCKET;
  if (!bucket) throw new Error("Image storage is not configured.");
  return bucket;
}
export const s3Svc = {
  async uploadFile(file) {
    const bucket = getBucket();
    const s3 = await getStorageClient();
    return s3.upload({ Bucket: bucket, Body: file, Key: file.name }).promise();
  },
  async getFileStream(fileKey) {
    const bucket = getBucket();
    const s3 = await getStorageClient();
    return s3.getObject({ Key: fileKey, Bucket: bucket }).promise();
  },
};
