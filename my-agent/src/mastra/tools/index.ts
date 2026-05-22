import { createTool } from "@mastra/core/tools";
import { z } from "zod";

// Mocking the showcase tool since the package is not installed
function getWeatherImpl(location: string) {
  return {
    temperature: 22,
    conditions: "sunny",
    humidity: 50,
    wind_speed: 10,
    feels_like: 24,
  };
}

export const weatherTool = createTool({
  id: "get_weather",
  description: "Get current weather for a location",
  inputSchema: z.object({
    location: z.string().describe("City name"),
  }),
  execute: async ({ context: { location } }) => {
    return JSON.stringify(getWeatherImpl(location));
  },
});
