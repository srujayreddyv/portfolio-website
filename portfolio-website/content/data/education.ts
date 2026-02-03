import { Education } from '@/types'

export const education: Education[] = [
  {
    id: "csus-ms",
    degree: "Master of Science (MS)",
    field: "Computer Science",
    institution: "California State University, Sacramento",
    location: "Sacramento, California",
    startDate: "Aug 2022",
    endDate: "Jan 2025",
    logo: "/logos/csus-logo.png", // Add your CSUS logo file here
    relevantCoursework: [
      "Algorithms and Paradigms",
      "Machine Learning",
      "Database System Design",
      "Advanced Operating System Principles and Design",
      "Distributed Systems",
      "Data Analytics and Mining",
      "Human-Computer Interface Design",
      "Research Methodology",
      "Professional Writing in Computer Science"
    ]
  },
  {
    id: "iiith-btech",
    degree: "Bachelor of Technology (BTech)",
    field: "Computer Science",
    institution: "International Institute of Information Technology (IIIT-H)",
    location: "Hyderabad, India",
    startDate: "Aug 2015",
    endDate: "July 2019",
    logo: "/logos/iiith-logo.png", // Add your IIIT-H logo file here
    relevantCoursework: [
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Computer Networks",
      "Operating Systems",
      "Software Engineering",
      "Computer Graphics",
      "Artificial Intelligence",
      "Statistical Methods in AI",
      "Machine Learning",
      "Natural Language Processing",
      "Distributed Systems"
    ]
  }
]