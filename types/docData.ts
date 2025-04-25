export interface DocData {
    title: string;
    introduction: { text: string };
    problem_statement: { text: string };
    solution_overview: { text: string };
    key_features: { name: string; description: string }[];
    technical_architecture: {
      hardware_components: { name: string; description: string }[];
      tech_stack: {
        web_stack: string[];
        web_tools: string[];
        deployment: string;
        database: string;
        ide: string;
        auth: string;
      };
      working_mechanism: string[];
    };
    unique_selling_points: { name: string; description: string }[];
    market_potential_and_impact: {
      market_potential: string[];
      impact: string[];
    };
    future_enhancements: string[];
    conclusion: { text: string };
  }