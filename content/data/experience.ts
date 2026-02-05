import { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: "dds-2025",
    title: "Software Engineer",
    company: "California Department of Developmental Services (DDS)",
    location: "Sacramento, CA (Hybrid)",
    startDate: "Feb 2025",
    endDate: "Present",
    current: true,
    logo: "/logos/dds-logo.png",
    description: "Leading development of GenAI solutions and API systems for healthcare claims processing and regulatory compliance.",
    achievements: [
      "Reduced analyst review effort by 85% by developing an LLMOps QA pipeline using AWS Bedrock, LangChain, FAISS, and Titan embeddings to automate claims policy review, utilization summaries, and regulatory document search",
      "Delivered a production multi-agent GenAI system using React, FastAPI, CrewAI, and Claude, providing source-cited answers across healthcare and compliance data",
      "Increased statewide processing throughput by 30% by designing and deploying 31 REST APIs using HL7 FHIR based data models, enabling interoperability across DDS programs and State Operated Facilities",
      "Achieved 99% uptime for more than 20K daily requests by scaling Dockerized FastAPI services on AWS ECS and Lambda, with Cognito based authentication and EventBridge workflows for DxF ready realtime data exchange",
      "Built and deployed a React TypeScript portal backed by Express and PostgreSQL on Terraform provisioned AWS, integrated with Azure DevOps CI/CD, cutting AI Initial Assessment entry time from 30 to 10 minutes",
      "Refactored COBOL, JCL, and Db2 batch jobs into Python services, mapping legacy datasets into FHIR aligned structures and reducing nightly runtimes by 60% while eliminating 200+ manual steps"
    ],
    technologies: ["Python", "FastAPI", "React", "TypeScript", "AWS Bedrock", "LangChain", "CrewAI", "Claude 4.5", "FAISS", "PostgreSQL", "Docker", "AWS ECS", "Lambda", "Terraform", "Azure DevOps"]
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
      "Built a production seismic hazard modeling platform using Python, Perl, PHP, D3.js, and OpenQuake to deliver ground motion predictions for California fault zones with response times under 3 seconds",
      "Automated large scale seismic data pipelines handling 10+ GB/day, streamlining ingestion while cutting data retrieval time by 50% and increasing throughput for detection workflows",
      "Secured 60+ remote monitoring stations by developing a PHP based authentication gateway with AES encryption, AWS IAM roles, and AWS Secrets Manager, passing all audits with zero findings",
      "Improved geospatial service reliability by resolving ArcGIS server issues and enhancing map rendering with GeoServer, Leaflet.js, and custom JavaScript components, reducing downtime incidents"
    ],
    technologies: ["Python", "Perl", "PHP", "D3.js", "OpenQuake", "AWS", "AES Encryption", "AWS IAM", "AWS Secrets Manager", "ArcGIS", "GeoServer", "Leaflet.js", "JavaScript"]
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
      "Built a staff management system using C#, Entity Framework, and SQL Server that optimized stored procedures, indexing, and query performance to reduce administrative workload by 40%",
      "Automated health data ETL pipelines using .NET, SQL Server, and PowerShell, migrating legacy Access and Oracle datasets into centralized SQL analytics stores for Power BI reporting under HIPAA compliant workflows",
      "Developed interactive data entry tools and analytics dashboards for statewide public health studies, boosting data collection efficiency by 60% through automated validation and quality checks",
      "Supported high volume CATI survey operations with system upgrades, PowerShell diagnostic utilities, and HIPAA compliant workflows, reducing survey delays by 30%"
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
      "Designed a cloud native archival and data processing platform for social media and news data, enabling realtime analysis of more than 1 million data points during the Indian Farmers Protests",
      "Fine-tuned multilingual BERT and IndicBERT models using Hugging Face Transformers for sentiment analysis and topic modeling to achieve an 8% accuracy improvement over baseline models",
      "Developed secure REST APIs with C# (ASP.NET Core) to support high volume data ingestion and metadata management, with interactive React dashboards for exploratory data analysis",
      "Containerized all services with Docker and automated builds, testing, and deployments using GitHub Actions CI/CD, ensuring reproducible environments and 40% faster rollouts"
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
      "Engineered a cross platform GIS system using Python (Django, PostgreSQL, PostGIS) to map 280+ Buddhist heritage sites across 25 villages, enabling spatial search, analytics, and interactive visualization",
      "Built responsive React web and offline first React Native mobile clients with Leaflet.js, achieving 60% faster load times in low bandwidth field environments",
      "Designed and deployed RESTful APIs with Django REST Framework to support spatial and attribute based queries with pagination and caching, reducing query latency and improving scalability",
      "Developed Python based ETL and spatial data processing workflows that integrated survey, census, and archival datasets into a single geospatial repository, improving metadata accuracy by 40% and enabling near realtime updates"
    ],
    technologies: ["Python", "Django", "PostgreSQL", "PostGIS", "React", "React Native", "Leaflet.js", "Django REST Framework", "GIS", "Spatial Analysis"]
  }
]
