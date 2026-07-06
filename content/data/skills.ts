import { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    category: "AI & LLM Systems",
    skills: [
      { name: "RAG Pipelines", level: "Advanced" },
      { name: "Multi-Agent Systems", level: "Advanced" },
      { name: "MCP", level: "Advanced" },
      { name: "LangChain", level: "Advanced" },
      { name: "LangGraph", level: "Advanced" },
      { name: "CrewAI", level: "Advanced" },
      { name: "Vector Search (FAISS, Pinecone)", level: "Advanced" },
      { name: "Evaluation (RAGAS, LangSmith)", level: "Advanced" },
      { name: "Hugging Face Transformers", level: "Advanced" },
      { name: "PyTorch", level: "Advanced" },
      { name: "Scikit-learn", level: "Advanced" }
    ]
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "Python", level: "Expert" },
      { name: "FastAPI", level: "Expert" },
      { name: "Django", level: "Advanced" },
      { name: "C#", level: "Advanced" },
      { name: "ASP.NET Core", level: "Advanced" },
      { name: "Node.js", level: "Advanced" },
      { name: "Express", level: "Advanced" },
      { name: "REST", level: "Expert" },
      { name: "GraphQL", level: "Advanced" },
      { name: "WebSockets", level: "Advanced" }
    ]
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: "Expert" },
      { name: "Azure", level: "Advanced" },
      { name: "Docker", level: "Expert" },
      { name: "Kubernetes", level: "Advanced" },
      { name: "Terraform", level: "Advanced" },
      { name: "CI/CD", level: "Expert" },
      { name: "OpenTelemetry", level: "Advanced" },
      { name: "Grafana", level: "Intermediate" },
      { name: "Prometheus", level: "Intermediate" }
    ]
  },
  {
    category: "Data Systems",
    skills: [
      { name: "PostgreSQL", level: "Expert" },
      { name: "Redis", level: "Advanced" },
      { name: "Kafka", level: "Advanced" },
      { name: "DynamoDB", level: "Advanced" },
      { name: "MS SQL Server", level: "Advanced" },
      { name: "Snowflake", level: "Intermediate" },
      { name: "Power BI", level: "Advanced" }
    ]
  },
  {
    category: "Frontend & Mobile",
    skills: [
      { name: "React", level: "Expert" },
      { name: "Next.js", level: "Advanced" },
      { name: "TypeScript", level: "Expert" },
      { name: "JavaScript", level: "Expert" },
      { name: "React Native", level: "Advanced" }
    ]
  }
]
