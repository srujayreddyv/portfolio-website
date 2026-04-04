import { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: "dds-2025",
    title: "AI Software Engineer",
    company: "California Department of Developmental Services (DDS)",
    location: "Sacramento, CA (Hybrid)",
    startDate: "Feb 2025",
    endDate: "Present",
    current: true,
    logo: "/logos/dds-logo.png",
    description: "Building GenAI systems and cloud native backend workflows for healthcare report analysis and operational modernization.",
    achievements: [
      "Built a conversational RAG system for internal report analysis, reducing processing time by 65% and lowering hallucinations by 35% using grounded retrieval and evaluation driven pipelines.",
      "Improved retrieval quality (hit@1 from 0.35 to 0.63) by designing a knowledge graph augmented retrieval layer with subgraph expansion, hybrid embeddings, and relevance pruning.",
      "Engineered a multi agent orchestration system (CrewAI) with deterministic execution, schema validation, and persistent memory, reducing multi step failures from 23% to under 7% in production.",
      "Designed and scaled FastAPI microservices handling 200K+ daily requests with P99 latency under 500ms on ECS and Lambda, integrating Cognito and EventBridge for secure healthcare workflows.",
      "Built a React and TypeScript AI workflow intake portal on AWS provisioned via Terraform, reducing submission time from 30 to 10 minutes through automated validation and review.",
      "Modernized COBOL, JCL, and Db2 workflows into event driven Python services aligned with FHIR standards, reducing nightly processing time by 60% and eliminating 200+ manual steps."
    ],
    technologies: ["Python", "FastAPI", "React", "TypeScript", "AWS Bedrock", "LangChain", "CrewAI", "MCP", "Claude", "FAISS", "PostgreSQL", "Docker", "AWS ECS", "Lambda", "Terraform", "Azure DevOps"]
  },
  {
    id: "doc-2024",
    title: "Software Engineer",
    company: "California Department of Conservation (DOC)",
    location: "Sacramento, CA (Remote)",
    startDate: "Jan 2024",
    endDate: "Feb 2025",
    logo: "/logos/doc-logo.png",
    description: "Engineered seismic modeling and real time geospatial data systems for earthquake monitoring and prediction.",
    achievements: [
      "Engineered a seismic modeling service on AWS, integrating Python (OpenQuake) with legacy PHP and Perl systems, delivering ground motion predictions in under 3 seconds per request.",
      "Reduced data pipeline latency by 50% by optimizing Kafka-based ingestion of 10+ GB/day from earthquake monitoring stations and migrating analytics from PostgreSQL to Druid for real time querying.",
      "Implemented RBAC and two factor authentication for 60+ monitoring stations, integrating Azure Entra ID for SSO and IAM authorization with session authentication, supporting compliance audit requirements.",
      "Improved geospatial applications performance by 40% by optimizing Leaflet rendering and GeoServer integration for large geospatial datasets, eliminating recurring downtime."
    ],
    technologies: ["Python", "Perl", "PHP", "D3.js", "OpenQuake", "AWS", "Apache Kafka", "InfluxDB", "Druid", "PostgreSQL", "Azure Entra ID", "AWS IAM", "API Gateway", "GeoServer", "Leaflet.js", "React", "JavaScript"]
  },
  {
    id: "prc-2023",
    title: "Software Application Developer Intern",
    company: "Population Research Center (PRC), Sacramento State",
    location: "Sacramento, CA",
    startDate: "Jan 2023",
    endDate: "Jun 2024",
    logo: "/logos/csus-logo.png",
    description: "Built internal public health tools and analytics workflows for survey operations and reporting.",
    achievements: [
      "Built a staff management system using C#, Entity Framework, and SQL Server, optimizing stored procedures and indexing to reduce administrative workload by 40%.",
      "Designed and automated health data ETL pipelines using .NET, SQL Server, and PowerShell, migrating Access and Oracle datasets into centralized analytics systems and enabling HIPAA compliant reporting workflows.",
      "Developed data entry tools and analytics dashboards for statewide public health studies, increasing data collection efficiency by 60% through automated validation and quality checks.",
      "Reduced survey delays by 30% by implementing system upgrades and PowerShell diagnostic utilities to support high volume CATI survey operations."
    ],
    technologies: ["C#", "Entity Framework", "SQL Server", ".NET", "PowerShell", "Power BI", "Oracle", "HIPAA Compliance"]
  },
  {
    id: "hsrg-2021",
    title: "Software Engineer",
    company: "Human Sciences Research Group (HSRG), IIIT-H",
    location: "Hyderabad, India",
    startDate: "Jan 2021",
    endDate: "Aug 2022",
    logo: "/logos/iiith-logo.png",
    description: "Architected cloud native analytics systems and ML pipelines for large scale social media analysis.",
    achievements: [
      "Architected a cloud native archival and analytics platform for social media and news streams, enabling near real time analysis of 1M+ data points during the Indian Farmers' Protests.",
      "Achieved 8% accuracy improvement over baseline by fine-tuning multilingual BERT and IndicBERT using Hugging Face Transformers for sentiment classification and topic modeling.",
      "Built 13 secure REST API endpoints using C# and ASP.NET Core for high volume data ingestion and metadata management, with React based dashboards supporting exploratory analysis."
    ],
    technologies: ["Python", "C#", "ASP.NET Core", "React", "Docker", "GitHub Actions", "Hugging Face Transformers", "BERT", "IndicBERT", "Machine Learning", "NLP"]
  },
  {
    id: "spiti-2018",
    title: "Software Engineer",
    company: "Change and Continuity in Spiti Valley, ICSSR Sponsored Project",
    location: "Hyderabad, India",
    startDate: "Jul 2018",
    endDate: "Dec 2020",
    logo: "/logos/iiith-logo.png",
    description: "Built GIS and mobile systems for spatial mapping and field data collection in low bandwidth environments.",
    achievements: [
      "Built a GIS platform using Python, Django, PostgreSQL, and PostGIS to map 280+ heritage sites across 25 villages, enabling spatial search, analytics, and interactive visualization.",
      "Developed responsive React web and offline capable React Native mobile applications using Leaflet, achieving 60% faster load times in low bandwidth field environments.",
      "Automated Python based ETL and spatial processing workflows integrating surveys, census, and archival datasets into a unified geospatial repository, improving metadata accuracy by 40% and enabling near real time updates."
    ],
    technologies: ["Python", "Django", "PostgreSQL", "PostGIS", "React", "React Native", "Leaflet.js", "Django REST Framework", "GIS", "Spatial Analysis"]
  }
]
