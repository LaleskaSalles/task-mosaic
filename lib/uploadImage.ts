import { storage, ID } from "@/appwrite";


const uploadImage =async (file: File) => {
    if (!file) return;

    const fileUploaded = await storage.createFile(
        "65468a03533010f66eb1",
        ID.unique(),
        file
        );

        return fileUploaded
}

export default uploadImage;