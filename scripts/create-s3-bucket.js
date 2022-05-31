/*
 *  When running this script make sure you have set your environment with your AWS access key and secret.
 */

const {
  S3Client,
  CreateBucketCommand,
  ListBucketsCommand,
} = require("@aws-sdk/client-s3");

const client = new S3Client({ region: "ap-southeast-1" });

const BUCKET_NAME = "greyhammer-frontend-bucket";

async function bucketExist() {
  const result = await client.send(new ListBucketsCommand({}));
  for (let bucket of result.Buckets) {
    if (bucket.Name === BUCKET_NAME) {
      return true;
    }
  }

  return false;
}

async function createBucket() {
  console.log("Bucket does not exist creating one.");
  const options = {
    Bucket: BUCKET_NAME,
    BucketCannedACL: "public-read",
  };

  await client.send(new CreateBucketCommand(options));
  console.log("Successfully created s3 bucket.");
}

async function start() {
  if (await bucketExist()) {
    console.log("Bucket already exist. skipping bucket creation.");
  } else {
    await createBucket();
  }
}

start();
