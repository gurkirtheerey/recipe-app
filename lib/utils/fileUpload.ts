import { FileErrors } from '@/app/data/recipe-error-types';

export const handleUpload = async (file: File) => {
  try {
    if (!file) {
      return FileErrors.NO_FILE_SELECTED;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      return FileErrors.FILE_TOO_LARGE;
    }

    // Only allow JPEG, PNG, or WebP images
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return FileErrors.INVALID_FILE_TYPE;
    }

    // Create a form data object to send the file to the server
    const formData = new FormData();
    formData.append('file', file, `${file.name}-${Date.now()}`);

    // Send the file to the server
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    // If the file upload fails, return the error and show a toast
    if (!res.ok) {
      const error = await res.text();
      console.error('Upload failed:', error);
    }

    // Get the URL from the response
    const data = await res.json();
    if (!data.url) {
      console.error('No URL received from upload');
    }

    // Return the URL
    return data.url;
  } catch (error) {
    // If there is an error, return the error and show a toast
    console.error('Error uploading image:', error);
    return FileErrors.UPLOAD_FAILED;
  }
};
