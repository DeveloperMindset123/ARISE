/**
 * Uploads a file to Hugging Face's upload service
 * @param file - The file to upload (must be a File object)
 * @returns {Promise<string>} The URL where the uploaded file can be accessed
 * @throws {Error} If the upload fails
 * @description This function takes a file and uploads it to Hugging Face's upload service using a POST request.
 * The file is sent as-is in the request body, with appropriate headers set for the file type.
 * Once uploaded, Hugging Face returns a URL where the file can be accessed.
 */

export async function uploadToHuggingFace(file: File): Promise<string> {
  const UPLOAD_URL = "https://huggingface.co/uploads";

  try {
    if (!file) {
      throw new Error("No file provided for upload");
    }

    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
        "X-requested-With": "XMLHttpRequest",
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error(
        `Upload failed with status ${response.status}: ${response.statusText}`
      );
    }

    const url = await response.text();

    if (!url) {
      throw new Error("Upload succeeded but no URL was returned");
    }

    console.log("File successfully uploaded to Hugging Face");
    return url;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown error during file upload";
    console.error("Error uploading file to Hugging Face:", errorMessage);
    throw new Error(`Failed to upload file: ${errorMessage}`);
  }
}
