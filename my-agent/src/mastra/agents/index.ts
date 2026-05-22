import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { weatherTool } from "../tools";

export const myAgent = new Agent({
  name: "My Agent",
  instructions: "You are a helpful assistant. Use tools when appropriate.",
  model: openai("gpt-5.4"),
  tools: { weatherTool },
  id: "myAgent",
});
