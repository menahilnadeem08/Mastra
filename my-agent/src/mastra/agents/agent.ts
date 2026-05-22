import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const colleaguesContactAgent = new Agent({
    id: "colleague-agent",
    name: "Colleagues contact Agent",
    model: openai("gpt-4o"),
    // Use the injected runtime context
    instructions: ({ requestContext }) => {
        const aguiContext = requestContext.get('ag-ui')?.context;
        const colleaguesContextItem = aguiContext?.find(contextItem => contextItem.description === "The current user's colleagues")
        return `
            You are a helpful assistant that can help emailing colleagues.
            The user's colleagues are: ${JSON.stringify(colleaguesContextItem?.value, null, 2)}
        `
    },
    // ... Everything else used to configure your agent
});