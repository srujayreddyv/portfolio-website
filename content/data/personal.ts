import { PersonalData } from '@/types'

export const personalData: PersonalData = {
  name: "Srujay Reddy Vangoor",
  title: "Full Stack Software Engineer",
  bio: "Full Stack Software Engineer with 6+ years of experience building production full stack applications, scalable backend APIs, and cloud native systems. Strong in Python with FastAPI, React, and AWS, with deep expertise in system design, interoperability architectures, and high throughput distributed services. Known for modernizing legacy systems, designing reliable data pipelines, and integrating GenAI into production systems, including LLMOps pipelines, RAG architectures, and multi-agent workflows that automate complex operational and compliance processes.",
  email: "srujayreddyv@icloud.com",
  location: "Sacramento, CA",
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/srujayreddyv",
      icon: "github"
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/srujayreddyv",
      icon: "linkedin"
    }
  ],
  resumeUrl: "/SrujayReddyVangoor_Resume.pdf", // Optional - can be removed if no resume available
  careerHighlights: [
    "Increased statewide data processing throughput by 30% by architecting and deploying 31 HL7 FHIR compliant REST APIs",
    "Scaled FastAPI services to 20K+ daily requests on AWS ECS and Lambda with 99% uptime",
    "Modernized COBOL, JCL, and Db2 batch systems into Python services, cutting nightly processing time by 60%",
    "Reduced analyst review effort by 85% by building an LLMOps QA platform with AWS Bedrock, LangChain, and FAISS",
    "Delivered a production multi-agent GenAI system providing source-cited answers across healthcare and compliance data",
    "Built a React and TypeScript portal that reduced AI Assessment entry time from 30 to 10 minutes"
  ],
  achievements: [
    "MS in Computer Science from California State University, Sacramento (2025)",
    "BTech in Computer Science from IIIT Hyderabad (2019)",
    "6+ years of full-stack development experience",
    "Expert in GenAI/LLM solutions with production deployments",
    "Proven track record in modernizing legacy systems and cloud migrations",
    "Experience with high-volume data processing and real-time systems"
  ],
  publications: [
    {
      title: "GIS Based Interactive Maps for Exploring the Religious Geography of Spiti Valley, Himachal Pradesh",
      authors: "Srujay Reddy Vangoor",
      venue: "IIIT Hyderabad, Master's Publications",
      year: "2021",
      type: "thesis",
      abstract: "A detailed report on the research conducted as part of my Master's Thesis at IIIT Hyderabad, focusing on creating interactive GIS-based maps to explore and analyze the religious geography of Spiti Valley in Himachal Pradesh."
    },
    {
      title: "Mapping the Chorten's of Spiti Valley, Himachal Pradesh",
      authors: "Srujay Reddy Vangoor",
      venue: "The 9th Annual Kathmandu Conference on Nepal and The Himalaya",
      year: "2020",
      type: "conference",
      abstract: "Initially presented virtually at the Kathmandu Conference from July 28th–31st, 2020. Later selected for publication in the conference proceedings. This research focuses on mapping and analyzing the distribution of Chortens (Buddhist stupas) in the Spiti Valley region."
    },
    {
      title: "Spatial Patterns, Trends and Correlations in the Religious Geography of Spiti Valley",
      authors: "Srujay Reddy Vangoor",
      venue: "4th Undergraduate Research Conference, Jindal School of Liberal Arts and Humanities",
      year: "2020",
      type: "conference",
      abstract: "Abstract accepted for presentation at the 4th Undergraduate Research Conference, 2020, conducted by Jindal School of Liberal Arts and Humanities, Sonipat, India. Research examining spatial patterns and correlations in religious sites across Spiti Valley."
    }
  ]
}
