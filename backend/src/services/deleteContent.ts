import { pineconeIndex } from "../config/pinecone.js";
import { contentModel } from "../models/contents.js";

export const deleteContentsService = async (user: string, id: string) => {
    const deletedContent = await contentModel.findOneAndDelete({
        userId: user,
        _id: id
    });

    if (!deletedContent) {
        return null;
    }

    await pineconeIndex.deleteMany({
        filter: {
            userId: user,
            mongoId: id
        }
    });

    return deletedContent;
};