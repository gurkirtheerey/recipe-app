// Import required AWS S3 SDK components for interacting with S3 bucket
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client with AWS credentials and region configuration
// Make sure these environment variables are properly set in your .env file
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Uploads a file to AWS S3 bucket and returns the public URL
 * @param file - Buffer containing the file data to upload
 * @param fileName - Name to be used for the file in S3 bucket
 * @param contentType - MIME type of the file (e.g., 'image/jpeg', 'application/pdf')
 * @returns Promise<string> - Public URL of the uploaded file
 */
export async function uploadFile(file: Buffer, fileName: string, contentType: string) {
  // Create S3 upload command with specified bucket, file name, content, and type
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: contentType,
  });

  // Execute the upload command
  await s3.send(command);

  // Return the public URL for the uploaded file to be saved in the database
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}
