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
      "Distributed Systems",
      "Machine Learning",
      "Database System Design",
      "Advanced Operating Systems",
      "Data Analytics and Mining"
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
      "Operating Systems",
      "Computer Networks",
      "Database Management Systems",
      "Software Engineering",
      "Artificial Intelligence",
      "Machine Learning",
      "Statistical Methods in AI",
      "Natural Language Processing"
    ]
  }
]
