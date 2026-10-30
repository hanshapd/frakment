import type { UIMessage } from "ai";

export { createChat } from "@shadcn/helpers/ai-sdk";

export function getMessageText(message: UIMessage): string {
  if (!Array.isArray(message.parts)) {
    return "";
  }
  return message.parts
    .filter(
      (part): part is { type: "text"; text: string } =>
        part.type === "text" &&
        typeof (part as { text?: string }).text === "string"
    )
    .map((part) => part.text)
    .join("");
}
