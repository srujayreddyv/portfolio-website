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
    description: "Building agentic AI, cloud native backend, and observability platforms for secure healthcare workflows.",
    achievements: [
      "Built a conversational RAG system from scratch for internal report analysis, implementing retrieval evaluation pipelines to measure answer grounding, retrieval relevance, and response quality.",
      "Engineered an agentic AI workflow orchestration platform (CrewAI) with deterministic execution, schema validation, and persistent memory, reducing multi step failures from 23% to under 7% in production.",
      "Improved retrieval quality (hit@1 from 0.35 to 0.63) by designing a knowledge graph augmented retrieval layer with subgraph expansion, hybrid embeddings, and relevance pruning.",
      "Implemented an enterprise AI observability platform for Claude Code using OpenTelemetry and Grafana Alloy, centralizing metrics, logs, and traces in Prometheus, Loki, Tempo, and Grafana for engineering observability.",
      "Designed and deployed AWS based FastAPI microservices supporting more than 200K daily API requests with sub second P99 latency for secure healthcare workflows.",
      "Built a full stack AI workflow intake portal using Next.js, TypeScript, Express, AWS, and Terraform, reducing submission time from 30 to 10 minutes through automated validation and review."
    ],
    technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "Express", "AWS", "CrewAI", "Terraform", "OpenTelemetry", "Grafana Alloy", "Prometheus", "Loki", "Tempo", "Knowledge Graphs"]
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
      "Reduced data pipeline latency by optimizing Kafka based ingestion of 10+ GB per day from earthquake monitoring stations and supporting real time analytics workloads with Apache Druid.",
      "Implemented identity and access management controls including RBAC, MFA, AWS Secrets Manager, and Azure Entra ID SSO to secure access across 60+ monitoring stations.",
      "Improved geospatial application responsiveness by optimizing Leaflet rendering and GeoServer integration for large datasets and reduced recurring downtime incidents through targeted performance fixes."
    ],
    technologies: ["Python", "OpenQuake", "PHP", "Perl", "AWS", "Apache Kafka", "Apache Druid", "AWS Secrets Manager", "Azure Entra ID", "GeoServer", "Leaflet.js"]
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
      "Built a staff management system using C#, Entity Framework, and SQL Server, optimizing stored procedures and indexing to reduce report generation and data retrieval times by 40%.",
      "Designed and automated health data ETL pipelines using .NET and SQL Server, migrating Access and Oracle datasets into centralized systems while supporting HIPAA aligned data handling practices.",
      "Developed React based data entry tools and analytics dashboards for statewide public health studies, improving data collection quality through automated validation and quality checks.",
      "Implemented role based access controls and server side validation across internal .NET applications to protect sensitive public health and research data."
    ],
    technologies: ["C#", ".NET", "Entity Framework", "React", "SQL Server", "Access", "Oracle", "RBAC"]
  },
  {
    id: "hsrg-2021",
    title: "Software Engineer",
    company: "Human Sciences Research Group (HSRG), IIIT Hyderabad",
    location: "Hyderabad, India",
    startDate: "Jan 2021",
    endDate: "Aug 2022",
    logo: "/logos/iiith-logo.png",
    description: "Architected cloud native analytics systems and ML pipelines for large scale social media analysis.",
    achievements: [
      "Architected a cloud native archival and analytics platform for social media and news streams, enabling near real time analysis of over 1 million social media posts and articles during the Indian Farmers' Protests.",
      "Improved sentiment classification F1 score by 8% over baseline by fine tuning multilingual BERT and IndicBERT models using Hugging Face Transformers for multilingual social media analysis.",
      "Built 13 secure REST API endpoints using C# and ASP.NET Core for high volume data ingestion and metadata management, with React based dashboards supporting exploratory analysis and reporting."
    ],
    technologies: ["Python", "C#", "ASP.NET Core", "React", "Hugging Face Transformers", "BERT", "IndicBERT", "NLP"]
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
      "Automated Python ETL and spatial processing workflows integrating surveys, census, and archival datasets into a unified geospatial repository with automated validation and incremental updates."
    ],
    technologies: ["Python", "Django", "PostgreSQL", "PostGIS", "React", "React Native", "Leaflet.js", "Django REST Framework", "GIS", "Spatial Analysis"]
  }
]
