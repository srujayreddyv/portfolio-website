import { PersonalData } from '@/types'

export const personalData: PersonalData = {
  name: "Srujay Reddy Vangoor",
  title: "Full Stack Software Engineer",
  bio: "Full Stack Software Engineer with 6+ years of experience building backend APIs, data pipelines, and production applications at scale. Strong in Python with FastAPI, React, and AWS, with deep expertise in system design, distributed architectures, and cloud native services. Known for modernizing legacy platforms, building reliable high throughput systems, and delivering production GenAI solutions including LLM powered workflows that support real users and business critical operations.",
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
    "Reduced analyst review effort by 85% with LLMOps QA pipeline using AWS Bedrock and LangChain",
    "Increased statewide processing throughput by 30% by designing 31 REST APIs using HL7 FHIR",
    "Achieved 98% uptime for 20K+ daily requests with Dockerized FastAPI services on AWS",
    "Built production seismic hazard modeling platform with sub-3-second response times",
    "Automated large scale data pipelines handling 10+ GB/day with 50% faster retrieval",
    "Fine-tuned multilingual BERT models achieving 8% accuracy improvement over baseline"
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