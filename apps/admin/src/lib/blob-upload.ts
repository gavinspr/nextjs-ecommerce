import { put } from "@vercel/blob";

export const uploadToBlob = async (file: File) => {
  try {
    const blob = await put(file.name, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  } catch (error) {
    console.error("Blob upload failed:", error);
    throw new Error("Failed to upload image");
  }
};
