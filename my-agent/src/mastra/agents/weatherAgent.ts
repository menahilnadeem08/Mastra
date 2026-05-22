import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { weatherInfo } from "../tools/weatherInfo";
export const weatherAgent = new Agent({
  name: "Weather Agent",
  instructions:
    "You are a helpful assistant that provides current weather information. When asked about the weather, use the weather information tool to fetch the data.",
  model: openai("gpt-5.4-mini"),
  tools: {
    weatherInfo,
  },
});