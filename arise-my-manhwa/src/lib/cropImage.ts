// async function cropImage(inputImage: string): Promise<{ croppedImage: string; x: number; y: number; width: number; height: number }> {
//     return new Promise((resolve, reject) => {
//         const img = new Image();
//         img.src = inputImage;
//         img.onload = () => {
//             const canvas = document.createElement('canvas');
//             const context = canvas.getContext('2d');
//             if (!context) {
//               reject("Context is null");
//               return;
//             }
//             canvas.width = img.width;
//             canvas.height = img.height;
//             context.drawImage(img, 0, 0, img.width, img.height);
//             const imageData = context.getImageData(0, 0, img.width, img.height);
//             const data = imageData.data;
//             let minX = img.width, minY = img.height, maxX = 0, maxY = 0;

//             for (let y = 0; y < img.height; y++) {
//                 for (let x = 0; x < img.width; x++) {
//                     const i = (y * 4) * img.width + x * 4;
//                     const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
//                     if (avg < 255) {
//                         minX = Math.min(minX, x);
//                         minY = Math.min(minY, y);
//                         maxX = Math.max(maxX, x);
//                         maxY = Math.max(maxY, y);
//                     }
//                 }
//             }

//             const width = maxX - minX;
//             const height = maxY - minY;
//             const croppedCanvas = document.createElement('canvas');
//             croppedCanvas.width = width;
//             croppedCanvas.height = height;
//             const croppedCtx = croppedCanvas.getContext('2d');
//             if (!croppedCtx) {
//               reject("croppedCtx is null");
//               return;
//             }
//             croppedCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);
//             resolve({
//                 croppedImage: croppedCanvas.toDataURL(),
//                 x: minX,
//                 y: minY,
//                 width,
//                 height
//             });
//         };
//         img.onerror = reject;
//     });
//   }

/**
 * Crops an image to its non-white content.
 *
 * This asynchronous function takes a Base64 data URL of an image, loads it,
 * and then identifies the bounding box of all non-white pixels. It creates
 * a new canvas and draws only the content within this calculated bounding box,
 * effectively removing excess white (or very light) borders around the actual
 * image content.
 *
 * The function returns a Promise that resolves with the Base64 data URL of the
 * cropped image and the coordinates and dimensions of the crop area.
 *
 * @param {string} inputImage The Base64 data URL of the image to be cropped (e.g., "data:image/png;base64,...").
 * @returns {Promise<{ croppedImage: string; x: number; y: number; width: number; height: number }>} A Promise that resolves with an object containing:
 * - `croppedImage`: The Base64 data URL of the newly cropped image.
 * - `x`: The x-coordinate (left edge) of the bounding box of the non-white content in the original image.
 * - `y`: The y-coordinate (top edge) of the bounding box of the non-white content in the original image.
 * - `width`: The width of the cropped area.
 * - `height`: The height of the cropped area.
 * @throws {string} Rejects the Promise with an error message if the canvas context cannot be obtained or if the image fails to load.
 */
async function cropImage(
  inputImage: string
): Promise<{
  croppedImage: string;
  x: number;
  y: number;
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = inputImage; // Set the image source to the input Base64 data URL.

    img.onload = () => {
      // Create a temporary canvas to draw the original image and get its pixel data.
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        reject("Context is null"); // Reject if canvas context is not available.
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height); // Draw the original image onto the canvas.

      // Get the pixel data of the entire image.
      const imageData = context.getImageData(0, 0, img.width, img.height);
      const data = imageData.data; // This is a Uint8ClampedArray representing RGBA values.

      // Initialize min/max coordinates to find the bounding box of non-white pixels.
      let minX = img.width,
        minY = img.height,
        maxX = 0,
        maxY = 0;

      // Iterate over each pixel to find the boundaries of the non-white content.
      for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          // Calculate the index for the red component of the current pixel.
          const i = y * 4 * img.width + x * 4;
          // Calculate the average of RGB values to determine "whiteness".
          // An average of 255 means pure white (assuming alpha is also 255 for opaque white).
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

          // If the pixel is not pure white (or very close to it), update the bounding box.
          if (avg < 255) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      // Calculate the width and height of the detected content.
      const width = maxX - minX;
      const height = maxY - minY;

      // Create a new canvas specifically for the cropped image.
      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = width;
      croppedCanvas.height = height;
      const croppedCtx = croppedCanvas.getContext("2d");

      if (!croppedCtx) {
        reject("croppedCtx is null"); // Reject if cropped canvas context is not available.
        return;
      }

      // Draw the relevant portion of the original canvas onto the new cropped canvas.
      // Parameters: sourceCanvas, sourceX, sourceY, sourceWidth, sourceHeight,
      //             destX, destY, destWidth, destHeight
      croppedCtx.drawImage(
        canvas,
        minX,
        minY,
        width,
        height,
        0,
        0,
        width,
        height
      );

      // Resolve the promise with the Base64 data URL of the cropped image
      // and its original coordinates and dimensions.
      resolve({
        croppedImage: croppedCanvas.toDataURL(), // Convert the cropped canvas to a data URL.
        x: minX,
        y: minY,
        width,
        height,
      });
    };
    // If the image fails to load, reject the promise.
    img.onerror = reject;
  });
}
