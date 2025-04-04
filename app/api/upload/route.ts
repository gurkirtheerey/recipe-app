// app/api/upload/route.ts

/**
 * API route handler for file uploads
 * This endpoint accepts POST requests with form data containing a file
 * and uploads it to S3 storage, returning the uploaded file's URL
 */

import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/utils/s3';

// Prevents Next.js from statically optimizing this route
// Ensures the route is always handled as a dynamic API endpoint
export const dynamic = 'force-dynamic';

/**
 * Handles POST requests for file uploads
 * @param req - The incoming Next.js request object containing the form data
 * @returns A JSON response with either the uploaded file URL or an error message
 */
export async function POST(req: NextRequest) {
  try {
    // Extract the file from the incoming form data
    const formData = await req.formData();
    const file = formData.get('file') as File;

    // Validate that a file was actually provided in the request
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert the file to a buffer for S3 upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload the file to S3 and get back the URL
    const url = await uploadFile(buffer, file.name, file.type);

    // Return the successful response with the file's URL
    return NextResponse.json({ url });
  } catch (error) {
    // Log any errors that occur during the upload process
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
