import { ID } from "appwrite";

import { storage } from "./appwrite";

export default async function uploadImage(imageFile: File) {
  if (!imageFile) return;

  const uploadedFile = await storage.createFile(
    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
    ID.unique(),
    imageFile
  );

  return uploadedFile;
}
