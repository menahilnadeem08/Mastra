import { Mastra } from "@mastra/core";
import { myAgent } from "./agents";
import { weatherAgent } from "./agents/weatherAgent";
import { languageAgent } from "./agents/language-agent";
import { colleaguesContactAgent } from "./agents/agent";
import { searchAgent } from "./tools/searchAgent";
export const mastra = new Mastra({
  agents: { myAgent ,weatherAgent,languageAgent,colleaguesContactAgent,searchAgent},
});
