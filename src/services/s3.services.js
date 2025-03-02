import dotenv from "dotenv";
import { S3 } from "aws-sdk";

dotenv.config();

/*
const region = process.env.VUE_AWS_REGION;
const bucketName = process.env.VUE_AWS_BUCKET_NAME;
const accessKeyId = process.env.VUE_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.VUE_AWS_SECRET_ACCESS_KEY;

VUE_AWS_REGION=us-east-1
VUE_AWS_BUCKET_NAME=marido-image-bucket
VUE_AWS_ACCESS_KEY_ID=AKIA5GXTYY2OKZ6IAJXT
VUE_AWS_SECRET_ACCESS_KEY=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

*/

// TODO: implement process.env. to get values
const region = "us-east-1";
const bucketName = "marido-image-bucket";
const accessKeyId = "AKIA5GXTYY2OKZ6IAJXT";
const secretAccessKey = "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";

// console.log("bucket-Name", process.env.VUE_AWS_BUCKET_NAME);

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

// Article Reference: https://github.com/Sam-Meech-Ward/image-upload-s3/blob/master/backend/s3.js

const s3Svc = {
  uploadFile(file) {
    // const fileStream = fs.createReadStream(file.path);
    const fileStream = file;

    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.name,
    };
    // console.log("uploadParams", uploadParams);
    // console.log("file info", file);
    return s3.upload(uploadParams).promise();
  },

  getFileStream(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    };

    return s3.getObject(downloadParams).createReadStream();
  },
};

export { s3Svc };
