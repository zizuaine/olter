import { aiActions } from "../aiActions.js";
import { actionIntent } from "../detectActionIntent.js";
import { getContentForAction } from "./content.service.js";

export const handleActionResponse = async (query: string, user: string, chat: any) => {
    //detect intent of the prompt
    const promptIntent = await actionIntent(query);
    if (promptIntent.type !== "none") {
        const contentResult = await getContentForAction(query, user, chat);

        if (contentResult.response) {
            return contentResult.response;
        }

        const action = await aiActions(promptIntent.type, contentResult.content, user, chat._id.toString());

        chat.messages.push({
            role: "assistant",
            content: JSON.stringify(action)
        });

        await chat.save();

        return {
            message: "AI action completed successfully",
            result: action,
            sources: [],
            chatId: chat._id
        };
    }

    return null;
}
