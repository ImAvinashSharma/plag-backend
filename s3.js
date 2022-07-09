const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

//uplode obj to s3

function uploadFile(file) {
  const filestream = fs.createReadStream(file.path);
  const uplodeParams = {
    Bucket: bucketName,
    Body: filestream,
    Key: file.filename
  };
  return s3
    .upload(uplodeParams)
    .promise()
    .catch(err => {
      console.log("Falied do upload", err);
      throw err;
    });
}
exports.uploadFile = uploadFile;

//download obj from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey
  };
  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
