"use client"
import { CopilotSidebar,useRenderTool,useFrontendTool } from "@copilotkit/react-core/v2"; 
import { useAgent } from "@copilotkit/react-core/v2"; 
import { AgentState } from "@/mastra/agents/language-agent";
import { useState } from "react";
import { useAgentContext } from "@copilotkit/react-core/v2"; 
import { z } from "zod";
type AgentState = {
  searches: {
    query: string;
    done: boolean;
  }[];
};
export default function Page() {
    useAgent({
    agentId: "searchAgent",
    render: ({ state }) => (
      <div>
        {state.searches?.map((search, index) => (
          <div key={index}>
            {search.done ? "✅" : "❌"} {search.query}{search.done ? "" : "..."}
          </div>
        ))}
      </div>
    ),
  });
    const { agent } = useAgent({
    agentId: "languageAgent",
    // optionally provide a type-safe initial state
    initialState: { language: "english" }
  });
  const toggleLanguage = () => {
    agent.setState({ language: agent.state?.language === "english" ? "spanish" : "english" }); 
  };
      const [colleagues, setColleagues] = useState([
        { id: 1, name: "John Doe", role: "Developer" },
        { id: 2, name: "Jane Smith", role: "Designer" },
        { id: 3, name: "Bob Wilson", role: "Product Manager" }
    ]);
    // Define agent context
    useAgentContext({
        description: "The current user's colleagues",
        value: colleagues,
    });

  useFrontendTool({
    name: "sayHello",
    description: "Say hello to the user",
    parameters: z.object({
      name: z.string().describe("The name of the user to say hello to"),
    }),
    handler: async ({ name }) => {
      alert(`Hello, ${name}!`);
      return `Said hello to ${name}!`;
    },
  });

  useRenderTool({
    name: "weatherInfo",
    render: ({ status, args }) => {
      return (
        <p className="text-gray-500 mt-2">
          {status !== "complete" && "Calling weather API..."}
          {status === "complete" &&
            `Called the weather API for ${args.location}.`}
        </p>
      );
    },
  });
  return (
    <main>
      <h1>Your App</h1>
          <div>
      <h1>Your main content</h1>
      {/* <p>Language: {agent.state?.language}</p>
      <button onClick={toggleLanguage}>Toggle Language</button> */}
    </div>
      <CopilotSidebar />
    </main>
  );
}