import { queryResolver } from "../handleQuery.ts/queryResolver.js";
import { contentResolver } from "../handleQuery.ts/contentResolver.js";
export const handleQuery = async (query, user, chat) => {
    const intent = await queryResolver(query, chat);
    if (!intent) {
        throw new Error("intent not found");
    }
    const resolvedContent = await contentResolver(intent, chat, query, user);
    return { intent, resolvedContent };
};
//# sourceMappingURL=handleQuery.js.map