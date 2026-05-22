import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { LibSQLStore } from "@mastra/libsql";
import { z } from "zod";
import { Memory } from "@mastra/memory";
import { createTool } from "@mastra/core/tools";
// Define the agent state schema
const AgentStateSchema = z.object({
  searches: z.array(
    z.object({
      query: z.string(),
      done: z.boolean(),
    })
  ).default([]),
});
export type AgentState = z.infer<typeof AgentStateSchema>;
// Create tools that update working memory
const addSearch = createTool({
  id: "addSearch",
  inputSchema: z.object({
    query: z.string(),
  }),
  description: "Add a search to the agent's list of searches",
  execute: async ({ query }) => {
    // Tool implementation - working memory is automatically updated
    return { success: true, query };
  },
});
export const searchAgent = new Agent({
  name: "Search Agent",
  model: openai("gpt-5.4"),
  instructions: `
    You are a helpful assistant for storing searches.
    IMPORTANT:
    - Use the addSearch tool to add a search to the agent's state
    - ONLY USE THE addSearch TOOL ONCE FOR A GIVEN QUERY
  `,
  tools: {
    addSearch,
  },
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