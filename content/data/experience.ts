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
    description: "Leading development of GenAI solutions and API systems for healthcare claims processing and regulatory compliance.",
    achievements: [
      "Built a reusable conversational RAG framework on AWS Bedrock, reducing analysis time by 85%, latency by 30%, and hallucinations by 45% through grounded retrieval, guardrails, and structured evaluation loops.",
      "Engineered a CrewAI multi agent orchestration layer with deterministic execution, structured output validation, and persistent memory across four knowledge bases, reducing multi step failures by 25%.",
      "Deployed a knowledge graph driven semantic retrieval layer with subgraph expansion, narrative aware embeddings, and relevance pruning, increasing hit@1 accuracy by 78% (0.358 to 0.639) over baseline vector search.",
      "Scaled FastAPI microservices handling 20K+ daily requests across distributed ECS and Lambda infrastructure with Cognito and EventBridge, sustaining 99% uptime for healthcare integrations.",
      "Developed a React and TypeScript AI workflow intake portal on AWS provisioned via Terraform, reducing submission time from 30 to 10 minutes through automated review pipelines.",
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
    description: "Developed seismic hazard modeling platforms and data processing systems for earthquake monitoring and prediction.",
    achievements: [
      "Engineered a seismic modeling service on AWS integrating a PHP application layer, Python OpenQuake, and Perl services, generating ground motion prediction curves with under 3 second compute time per request.",
      "Architected Kafka ingestion pipelines processing 10+ GB daily from earthquake monitoring stations, routing time series to InfluxDB and migrating analytics workloads from PostgreSQL to Druid, reducing retrieval latency by 50%.",
      "Implemented two factor authentication and RBAC for 60+ monitoring stations using Azure Entra ID and IAM integrated API Gateway, passing compliance audits with zero findings.",
      "Resolved React frontend rendering and performance issues in geospatial applications, optimizing Leaflet and GeoServer integration to improve stability and reduce downtime."
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
    description: "Developed staff management systems and health data ETL pipelines for public health research and survey operations.",
    achievements: [
      "Built a staff management system using C#, Entity Framework, and SQL Server, optimizing stored procedures and indexing to reduce administrative workload by 40%.",
      "Designed and automated health data ETL pipelines with .NET, SQL Server, and PowerShell, migrating Access and Oracle datasets into centralized SQL analytics stores for Power BI within HIPAA compliant workflows.",
      "Developed data entry tools and analytics dashboards for statewide public health studies, increasing collection efficiency by 60% through automated validation and data quality checks.",
      "Supported high volume CATI survey operations by implementing system upgrades and PowerShell diagnostic utilities, reducing survey delays by 30%."
    ],
    technologies: ["C#", "Entity Framework", "SQL Server", ".NET", "PowerShell", "Power BI", "Oracle", "HIPAA Compliance"]
  },
  {
    id: "hsrg-2021",
    title: "Software Engineer",
    company: "Human Sciences Research Group (HSRG), IIIT-H",
    location: "Hyderabad, IN",
    startDate: "Jan 2021",
    endDate: "Aug 2022",
    logo: "/logos/iiith-logo.png",
    description: "Designed cloud-native platforms for social media data analysis and developed ML models for sentiment analysis during major social events.",
    achievements: [
      "Architected a cloud native archival and analytics platform for social media and news streams, enabling real time analysis of 1M+ data points during the Indian Farmers' Protests.",
      "Fine tuned multilingual BERT and IndicBERT models using Hugging Face Transformers for sentiment classification and topic modeling, improving accuracy by 8% over baseline models.",
      "Built secure REST APIs with C# and ASP.NET Core to support high volume data ingestion and metadata management, with React based dashboards for exploratory analysis.",
      "Containerized services with Docker and implemented CI/CD pipelines using GitHub Actions, reducing release cycles by 40% and improving deployment reproducibility."
    ],
    technologies: ["Python", "C#", "ASP.NET Core", "React", "Docker", "GitHub Actions", "Hugging Face Transformers", "BERT", "IndicBERT", "Machine Learning", "NLP"]
  },
  {
    id: "spiti-2018",
    title: "Software Engineer",
    company: "Change and Continuity in Spiti Valley, ICSSR Sponsored Project",
    location: "Hyderabad, IN",
    startDate: "Jul 2018",
    endDate: "Dec 2020",
    logo: "/logos/iiith-logo.png",
    description: "Engineered cross-platform GIS systems for mapping Buddhist heritage sites and developed mobile applications for field data collection.",
    achievements: [
      "Engineered a cross platform GIS system using Python, Django, PostgreSQL, and PostGIS to map 280+ heritage sites across 25 villages, enabling spatial search, analytics, and interactive visualization.",
      "Built responsive React web and offline first React Native mobile clients with Leaflet, achieving 60% faster load times in low bandwidth field environments.",
      "Designed and deployed REST APIs with Django REST Framework supporting spatial and attribute queries with pagination and caching, reducing query latency and improving scalability.",
      "Developed Python based ETL and spatial processing workflows integrating survey, census, and archival datasets into a unified geospatial repository, improving metadata accuracy by 40% and enabling near real time updates."
    ],
    technologies: ["Python", "Django", "PostgreSQL", "PostGIS", "React", "React Native", "Leaflet.js", "Django REST Framework", "GIS", "Spatial Analysis"]
  }
]
