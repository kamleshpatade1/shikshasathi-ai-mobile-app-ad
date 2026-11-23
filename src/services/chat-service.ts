import { apiRequest } from "./api-client";

type ChatLanguage = "English" | "Hindi";

type ChatReply = {
  reply: string;
};

export async function sendChatMessage(
  message: string,
  language: ChatLanguage,
): Promise<string> {
  const response = await apiRequest<ChatReply>("/chat", {
    method: "POST",
    body: JSON.stringify({ message, language }),
  });

  return response.data.reply;
}
