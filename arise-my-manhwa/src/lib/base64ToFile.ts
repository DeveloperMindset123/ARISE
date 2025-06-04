/**
 * Converts a Base64 data URL to a File object.
 *
 * This function takes a Base64 encoded data URL and converts it into a `File` object,
 * which can be useful for scenarios where you receive file data as a Base64 string
 * (e.g., from an API response or a canvas element) and need to treat it as a file
 * for purposes like uploading, previewing, or further manipulation.
 *
 * @param {string} dataurl The Base64 encoded data URL (e.g., "data:image/png;base64,iVBORw0KGgo...").
 * @param {string} filename The desired filename for the resulting File object (e.g., "image.png").
 * @returns {File} A File object representing the decoded data.
 */
export function base64ToFile(dataurl: string, filename: string) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)?.[1], // Extracts the MIME type from the data URL (e.g., "image/png").
    bstr = atob(arr[arr.length - 1]), // Decodes the Base64 string to a binary string.
    n = bstr.length,
    u8arr = new Uint8Array(n); // Creates a Uint8Array to hold the binary data.
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n); // Populates the Uint8Array with character codes from the binary string.
  }
  return new File([u8arr], filename, { type: mime }); // Creates and returns a new File object.
}
