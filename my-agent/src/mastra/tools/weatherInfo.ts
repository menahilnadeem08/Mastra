import { createTool } from "@mastra/core/tools";
import { z } from "zod";
export const weatherInfo = createTool({
  id: "weatherInfo",
  inputSchema: z.object({
    location: z.string(),
  }),
  description: `Fetches the current weather information for a given location`,
  execute: async ({ location }) => {
    // Tool logic here (e.g., API call)
    console.log("Using tool to fetch weather information for", location);
    return { temperature: 20, conditions: "Sunny" }; // Example return
  },
});
