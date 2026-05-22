import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { LibSQLStore } from "@mastra/libsql";
import { z } from "zod";
import { Memory } from "@mastra/memory";
// 1. Define the agent state schema
export const AgentStateSchema = z.object({
  language: z.enum(["english", "spanish"]),
});
// 2. Infer the agent state type from the schema
export const AgentState = z.infer<typeof AgentStateSchema>;
// 3. Create the agent
export const languageAgent = new Agent({
  name: "Language Agent",
  model: openai("gpt-5.4"),
  instructions: "Always communicate in the preferred language of the user as defined in your working memory. Do not communicate in any other language.",
  memory: new Memory({
    storage: new LibSQLStore({ id: "mastra-storage", url: ":memory:" }),
    options: {
      workingMemory: {
        enabled: true,
        schema: AgentStateSchema,
      },
    },
  }),
});
